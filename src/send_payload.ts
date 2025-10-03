import type { UserText } from "./interfaces";
import { ask_ollama } from "./ask_ollama";

export async function send_payload(payload_map: UserText[], e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const input = form.querySelector('input') as HTMLInputElement | null;
    const message = input?.value ?? '';

    const packet: UserText = {
        pathPP: "/assets/user.png",
        message,
        type: "ask",
    };

    console.log("submit_packet", packet);

    payload_map.push(packet);

    for (let i = payload_map.length - 1; i >= 0; i--) {
        if (payload_map[i].type === "ask") {
        console.log("last_usertext", payload_map[i]);
        break;
        }
    }

    if (input) input.value = '';
    const index = payload_map.length - 1;

    const response = await ask_ollama(payload_map, index);
    console.log("response_packet", response ?? payload_map[payload_map.length - 1]);
}
