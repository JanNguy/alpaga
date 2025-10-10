import type { UserText } from "./interfaces";
import { ask_ollama } from "./ask_ollama";
import type { Dispatch, SetStateAction } from "react";
import { add_context } from "./add_context";

export async function send_payload(payload_map: UserText[], e: React.FormEvent<HTMLFormElement>, setConversation: Dispatch<SetStateAction<UserText[]>>) {
    e.preventDefault();
    const form = e.currentTarget;
    const input = form.querySelector('input') as HTMLInputElement | null;
    const message = input?.value ?? '';

    if (input) input.value = '';
    if (!message.trim()) return;

    const user_packet: UserText = {
        pathPP: "/assets/user.png",
        message,
        type: "user",
        context: ""
    };

    setConversation(prev => [...prev, user_packet]);

    const assistant_packet: UserText = {
        pathPP: "/assets/ChatGPT-Logo.svg",
        message: "",
        type: "assistant",
        context: ""
    };

    const tempMap = [...payload_map, user_packet];

    tempMap.push(assistant_packet);
    add_context(tempMap);

    const idx = tempMap.length - 1;

    setConversation(prev => [...prev, assistant_packet]);

    await ask_ollama(tempMap, idx, setConversation);
}
