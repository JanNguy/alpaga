import "./css/App.css";
import type {Unit} from "./interfaces";
import ollama from "ollama/browser";

export function DisplayStoreHomeModels({ units }: { units: Unit[] }) {
    const handlePull = async (model: string) => {
        try {
            alert(`Pull debut: ${model} \n Attendez bien l'alerte de fin pour éviter les erreurs`);
            await ollama.pull({ model, stream: false });
            alert(`Pull terminé: ${model}`);
        } catch (e) {
            console.error(e);
            alert(`Échec du pull: ${model}`);
        }
    };

    return (
        <>
            <div id="sectionStore">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                    {units.map((u, index) => (
                        <button
                            key={index}
                            type="button"
                            className="text-left border border-black/30 border-solid p-4 h-full m-5"
                            onClick={() => handlePull(`${u.name}:latest`)}
                        >
                            <h2 className="mb-5">{u.name}</h2>
                            <h3>{u.desc}</h3>
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
}
