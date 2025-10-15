import ollama, { type ListResponse } from "ollama";

export async function getAvailableModelNames(): Promise<string[]> {
    const res: ListResponse = await ollama.list();
    const names = (res.models ?? [])
        .map((m) => m?.name?.trim())
        .filter((n): n is string => !!n && n.length > 0);
    const unique = Array.from(new Set(names));
    unique.sort((a, b) => a.localeCompare(b));
    return unique;
}
