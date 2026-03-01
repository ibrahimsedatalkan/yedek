const https = require('https');

const sql = `
CREATE TABLE IF NOT EXISTS marketplace_reviews (
    id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id               UUID REFERENCES tenants(id) ON DELETE CASCADE,
    marketplace             VARCHAR(50)  NOT NULL DEFAULT 'trendyol',
    external_review_id      VARCHAR(200) NOT NULL,
    product_external_id     VARCHAR(200),
    product_id              UUID REFERENCES products(id) ON DELETE SET NULL,
    product_name            TEXT,
    reviewer_name           VARCHAR(200),
    rating                  INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment                 TEXT,
    review_date             TIMESTAMPTZ,
    verified_purchase       BOOLEAN DEFAULT false,
    seller_response         TEXT,
    seller_response_date    TIMESTAMPTZ,
    responded_at            TIMESTAMPTZ,
    sentiment               VARCHAR(20)  CHECK (sentiment IN ('positive','negative','neutral','mixed')),
    sentiment_score         FLOAT,
    sentiment_confidence    FLOAT,
    topics                  TEXT[]        DEFAULT '{}',
    extracted_keywords      TEXT[]        DEFAULT '{}',
    intent                  VARCHAR(50),
    urgency                 VARCHAR(20),
    synced_at               TIMESTAMPTZ  DEFAULT NOW(),
    created_at              TIMESTAMPTZ  DEFAULT NOW(),
    updated_at              TIMESTAMPTZ  DEFAULT NOW(),
    UNIQUE(tenant_id, marketplace, external_review_id)
);

CREATE TABLE IF NOT EXISTS review_response_queue (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id           UUID REFERENCES tenants(id) ON DELETE CASCADE,
    review_id           UUID REFERENCES marketplace_reviews(id) ON DELETE CASCADE,
    suggested_response  TEXT,
    final_response      TEXT,
    ai_confidence       FLOAT,
    tone                VARCHAR(50),
    edited              BOOLEAN DEFAULT false,
    status              VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending','approved','sent','rejected')),
    approved_by         TEXT,
    sent_at             TIMESTAMPTZ,
    created_at          TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS review_insights (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id       UUID REFERENCES tenants(id) ON DELETE CASCADE,
    insight_type    VARCHAR(50),
    scope           VARCHAR(20),
    product_id      UUID REFERENCES products(id) ON DELETE SET NULL,
    title           TEXT,
    description     TEXT,
    severity        VARCHAR(20),
    metric_type     VARCHAR(50),
    current_value   FLOAT,
    suggested_action TEXT,
    action_priority INTEGER,
    status          VARCHAR(20) DEFAULT 'active',
    evidence        JSONB,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_reviews_tenant        ON marketplace_reviews(tenant_id);
CREATE INDEX IF NOT EXISTS idx_reviews_rating        ON marketplace_reviews(tenant_id, rating);
CREATE INDEX IF NOT EXISTS idx_reviews_sentiment     ON marketplace_reviews(tenant_id, sentiment);
CREATE INDEX IF NOT EXISTS idx_reviews_date          ON marketplace_reviews(tenant_id, review_date DESC);
CREATE INDEX IF NOT EXISTS idx_reviews_unanswered    ON marketplace_reviews(tenant_id, seller_response) WHERE seller_response IS NULL;
CREATE INDEX IF NOT EXISTS idx_review_queue_tenant   ON review_response_queue(tenant_id, status);
CREATE INDEX IF NOT EXISTS idx_review_insights_tenant ON review_insights(tenant_id, status);
`;

const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5dmN6eWpmeWpxeWNzY2FncnV3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTUxMDA4OSwiZXhwIjoyMDg1MDg2MDg5fQ.3MaX4dxQ6Aiz9Fq06R6OsHxyRyuXHjSYYuwNZrSBgHU';

const body = JSON.stringify({ query: sql });

const options = {
    hostname: 'yyvczyjfyjqycscagruw.supabase.co',
    path: '/rest/v1/rpc/exec_sql',
    method: 'POST',
    headers: {
        'apikey': SERVICE_KEY,
        'Authorization': `Bearer ${SERVICE_KEY}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body)
    }
};

// Supabase'in management API'sını kullan (pg endpoint)
// Alternatif: /pg endpoint'i yok, doğrudan Postgres connection lazım

// DATABASE_URL üzerinden pg client kullanım
require('dotenv').config({ path: './dashboard/.env.local' });
const { Client } = require('pg');

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

client.connect().then(async () => {
    console.log('Connected to Supabase Postgres!');
    try {
        await client.query(sql);
        console.log('✅ Tables created successfully!');

        // Verify
        const res = await client.query(`
      SELECT table_name FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name IN ('marketplace_reviews','review_response_queue','review_insights')
      ORDER BY table_name;
    `);
        console.log('✅ Tables verified:', res.rows.map(r => r.table_name));
    } catch (err) {
        console.error('❌ SQL Error:', err.message);
    } finally {
        await client.end();
    }
}).catch(err => {
    console.error('❌ Connection error:', err.message);
});
