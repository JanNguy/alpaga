import "./css/App.css";
import type {Unit} from "./interfaces";

export function DisplayStoreHomeModels({ units }: { units: Unit[] }) {
    return (
        <>
            <div id="sectionStore">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                    {units.map((u, index) => (
                        <div key={index} className="border border-black/30 border-solid p-4 h-full m-5">
                            <h2 className="mb-5">{u.name}</h2>
                            <h3>{u.desc}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}