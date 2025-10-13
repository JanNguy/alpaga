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
            <div>
                <div className="m-5">
                    <p className="text-6xl">ollama store</p>
                    <Link to="/chat_bot"><p>Return to chat bots section</p></Link>
                </div>
                <DisplayStoreHomeModels units={map_c}/>
            </div>
        </>
    )
}
