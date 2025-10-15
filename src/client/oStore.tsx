import type { Unit } from "../utils/interfaces";
import { useState } from "react";
import { getOllamaModels } from "../call-manager/getOllamaModels";
import "../css/App.css";
import { DisplayStoreHomeModels } from "./DisplayStoreHomeModels";
import { Link } from "react-router-dom";

export function OStore() {
    const [map_c, setMapC] = useState<Unit[]>([]);

    getOllamaModels().then(setMapC);

    return (
        <>
            <div className="flex flex-col items-start mt-8 w-full">
                <div className="flex flex-row mb-6 ml-[17.5%] justify-start">
                    <div className="flex flex-col">
                        <p className="text-4xl font-semibold text-black">
                            Ollama store
                        </p>
                        <div className="flex flex-col items-start gap-1">
                            <Link to="/chat_bot">
                                <p className="text-sm text-black hover:underline transition-transform duration-200 hover:-translate-x-1">
                                    Retour à la section chat bots
                                </p>
                            </Link>
                            <Link to="/available">
                                <p className="text-sm text-black hover:underline transition-transform duration-200 hover:-translate-x-1">
                                    Modèles disponibles
                                </p>
                            </Link>
                        </div>
                    </div>
                </div>
                <DisplayStoreHomeModels units={map_c} />
            </div>
        </>
    );
}
