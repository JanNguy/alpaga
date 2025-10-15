export async function getStringDescriptions(url?: string): Promise<string[]> {
    const res = await fetch('/ext/ollama/library');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const html = await res.text();
    const doc = new DOMParser().parseFromString(html, 'text/html');

    const descs: string[] = [];
    const links = doc.querySelectorAll<HTMLAnchorElement>('a[href^="/library/"]');

    links.forEach(a => {
        const container = a.closest('article,section,div,li') ?? a.parentElement;
        const p = container?.querySelector('p');
        const text = p?.textContent?.trim();
        if (text) descs.push(text);
    });

    return [...new Set(descs)];
}
