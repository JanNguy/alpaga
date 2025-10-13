export async function getStringModels(url?: string): Promise<string[]> {
    const res = await fetch('/ext/ollama/library');

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const html = await res.text();
    const matches = [...html.matchAll(/href="\/library\/([^"]+)/g)].map(m => m[1]);

    return matches.map(s => `${s}`);
}

