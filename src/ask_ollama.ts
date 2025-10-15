import ollama from "ollama";
import type { UserText } from "./interfaces";
import type { Dispatch, SetStateAction } from "react";

export async function ask_ollama(
    payload_map: UserText[],
    idx_ask: number,
    setConversation: Dispatch<SetStateAction<UserText[]>>,
    s_model: string,
): Promise<void> {
    const contexte = payload_map[idx_ask]?.context ?? "";
    const response = await ollama.chat({
        model: s_model,
        messages: [{ role: "user", content: contexte }],
    });

    setConversation((prev) => {
        const updated = [...prev];
        updated[idx_ask] = {
            ...updated[idx_ask],
            message: response.message.content,
        };
        return updated;
    });
}
