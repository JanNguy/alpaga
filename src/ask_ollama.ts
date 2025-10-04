import ollama from "ollama";
import type { UserText } from "./interfaces";
import type { Dispatch, SetStateAction } from "react";

export async function ask_ollama(payload_map: UserText[], idx_ask: number, setConversation: Dispatch<SetStateAction<UserText[]>> ): Promise<void> {
    const response = await ollama.chat({
        model: "llama3.1:8b",
        messages: [{ role: "user", content: payload_map[idx_ask]?.message ?? "" }],
    });

    const newMsg: UserText = {
        pathPP: "/assets/ChatGPT-Logo.svg",
        message: response.message.content,
        type: "ask",
    };

    setConversation(prev => [...prev, newMsg]);
}
