import type { UserText } from "./interfaces";

export function add_context(p_map: UserText[]) {
    const l_index: number = p_map.length - 1;
    if (l_index < 0) return;

    let context = "";

    for (let i = 0; i < l_index; i++) {
        if (p_map[i].type === "user") {
            context += `User: ${p_map[i].message}\n`;
        } else if (p_map[i].message.trim()) {
            context += `Assistant: ${p_map[i].message}\n`;
        }
    }

    p_map[l_index].context = context;
}
