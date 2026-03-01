const Anthropic = require('@anthropic-ai/sdk');
require('dotenv').config({ path: './dashboard/.env.local' });
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

async function test() {
    const models = [
        'claude-3-5-sonnet-20241022',
        'claude-3-sonnet-20240229',
        'claude-3-haiku-20240307',
        'claude-3-opus-20240229',
        'claude-sonnet-4-5',
        'claude-haiku-4-5',
    ];
    for (const model of models) {
        try {
            const r = await client.messages.create({ model, max_tokens: 10, messages: [{ role: 'user', content: 'Hi' }] });
            console.log('OK:', model, '->', r.content[0].text);
        } catch (e) { console.log('FAIL:', model, '->', e.message.slice(0, 100)); }
    }
}
test();
