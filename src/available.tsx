import { useEffect, useState } from "react";
import "./css/App.css"
import ollama, { type ListResponse } from "ollama"

export function ListAvailableModel() {
    const [models, setModels] = useState<ListResponse["models"]>([]);

    useEffect(() => {
        ollama.list().then((response) => {
            setModels(response.models);
        });
    }, []);

    return (
        <>
            {models.map((model) => (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                    <div key={model.name} className="border border-black border-solid">
                        <p className="text-3xl">{model.name}</p>
                        <p>Size: {model.details.parameter_size}</p>
                        <p>{model.details.family}</p>
                     </div>
                </div>
            ))}
        </>
    )
}
