export async function getStringTags(): Promise<string[]> {
    const res = await fetch('/ext/ollama/library');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const html = await res.text();
    const doc = new DOMParser().parseFromString(html, 'text/html');

    const tags = new Set<string>();
    const anchors = doc.querySelectorAll<HTMLAnchorElement>(
        'a[href*="/tags/"], a[href^="/tag/"], a[href*="library?tag="]'
    );

    anchors.forEach(a => {
        const t = a.textContent?.trim();
        if (t) tags.add(t);
    });

    return [...tags].sort((a, b) => a.localeCompare(b));
}
