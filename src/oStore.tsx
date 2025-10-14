import type { Unit } from "./interfaces"
import { useState } from "react";
import { getOllamaModels } from "./getOllamaModels";
import "./css/App.css";
import {DisplayStoreHomeModels} from "./DisplayStoreHomeModels"
import { Link } from "react-router-dom";

export function OStore() {

    const [map_c, setMapC] = useState<Unit[]>([]);

    getOllamaModels().then(setMapC);


    return (
        <>
            <div className="flex flex-col items-center mt-8">
                <div className="mb-6 text-center space-y-2">
                    <p className="text-2xl font-semibold text-neutral-100">Store des modèles</p>
                    <div className="flex flex-col items-center gap-1">
                        <Link to="/chat_bot">
                            <p className="text-sm text-neutral-300 hover:text-neutral-100 hover:underline transition-transform duration-200 hover:-translate-x-1">
                                Retour à la section chat bots
                            </p>
                        </Link>
                        <Link to="/available">
                            <p className="text-sm text-neutral-300 hover:text-neutral-100 hover:underline transition-transform duration-200 hover:-translate-x-1">
                                Modèles disponibles
                            </p>
                        </Link>
                    </div>
                </div>
                <DisplayStoreHomeModels units={map_c} />
            </div>
        </>
    )
}
