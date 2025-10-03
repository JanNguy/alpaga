import ollama from 'ollama'
import type{ UserText } from './interfaces'

export async function ask_ollama(payload_map: UserText[], idx_ask: number)
{
    const response = await ollama.chat({
        model: 'llama3.1:8b',
        messages: [{ role: 'user', content: `${payload_map[idx_ask].message}` }],
    })
    payload_map.push({
        pathPP: "/assets/ChatGPT-Logo.svg",
        message: `${response.message.content}`,
        type: "response"
    });
}
