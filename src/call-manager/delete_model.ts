import ollama from "ollama";

export async function delete_model(name: string): Promise<void> {
    const confirmed = window.confirm(
        `Voulez-vous vraiment supprimer ce modèle: "${name}" ?`,
    );

    if (!confirmed) return;
    await ollama.delete({ model: name });

    window.location.reload();
}
