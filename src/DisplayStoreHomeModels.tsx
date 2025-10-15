import "./css/App.css";
import type { Unit } from "./interfaces";
import ollama from "ollama/browser";
import { useMemo, useState, useEffect } from "react";
import ollamaNode, { type ListResponse } from "ollama";
import { Link } from "react-router-dom";

export function DisplayStoreHomeModels({ units }: { units: Unit[] }) {
    const [query, setQuery] = useState("");
    const [onlyDesc, setOnlyDesc] = useState(false);
    const [loading, setLoading] = useState<Record<string, number>>({});

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return units;
        return units.filter((u) => {
            const inName = u.name.toLowerCase().includes(q);
            const inDesc = u.desc?.toLowerCase().includes(q);
            return onlyDesc ? !!inDesc : inName || !!inDesc;
        });
    }, [units, query, onlyDesc]);

    const handlePull = async (model: string) => {
        const confirmed = window.confirm(
            `Voulez-vous vraiment exécuter le pull pour le modèle "${model}" ?`,
        );
        if (!confirmed) return;
        try {
            setLoading((m) => ({ ...m, [model]: 0 }));
            const res = await ollama.pull({ model, stream: true });
            for await (const ev of res) {
                if (
                    typeof ev?.completed === "number" &&
                    typeof ev?.total === "number" &&
                    ev.total > 0
                ) {
                    const pct = Math.min(
                        100,
                        Math.floor((ev.completed / ev.total) * 100),
                    );
                    setLoading((m) => ({ ...m, [model]: pct }));
                }
            }
            setLoading((m) => {
                const n = { ...m };
                delete n[model];
                return n;
            });
            alert(`Pull terminé: ${model}`);
        } catch (e) {
            console.error(e);
            alert(`Échec du pull: ${model}`);
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div className="flex w-full items-center gap-3 p-2">
                    <div className="w-full sm:w-72">
                        <input
                            className="w-full rounded-lg border border-gray-300 bg-white py-2 px-5 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-700"
                            placeholder="Rechercher un modèle…"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </div>
                    <label className="inline-flex items-center gap-2 text-sm text-gray-700 select-none">
                        <input
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-gray-800 focus:ring-gray-700"
                            checked={onlyDesc}
                            onChange={(e) => setOnlyDesc(e.target.checked)}
                        />
                        Description seulement
                    </label>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filtered.map((u) => {
                    const tag = `${u.name}:latest`;
                    const pct = loading[tag];
                    const isLoading = typeof pct === "number";

                    return (
                        <button
                            key={u.name}
                            type="button"
                            className="text-left bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition h-full disabled:opacity-60"
                            onClick={() => handlePull(tag)}
                            disabled={isLoading}
                        >
                            <div className="flex items-start justify-between">
                                <h2 className="mb-2 text-gray-900 text-xl font-medium">
                                    {u.name}
                                </h2>
                                <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700 border border-gray-200">
                                    latest
                                </span>
                            </div>
                            <h3 className="text-sm text-gray-600 line-clamp-3">
                                {u.desc}
                            </h3>
                            <div className="mt-4 flex items-center justify-between">
                                <span className="text-xs text-gray-500">
                                    {tag}
                                </span>
                                {isLoading ? (
                                    <div className="w-28">
                                        <div className="h-2 w-full bg-gray-200 rounded">
                                            <div
                                                className="h-2 bg-gray-900 rounded"
                                                style={{ width: `${pct}%` }}
                                            />
                                        </div>
                                        <span className="mt-1 block text-right text-xs text-gray-700">
                                            {pct}%
                                        </span>
                                    </div>
                                ) : (
                                    <span className="inline-block text-sm font-medium text-white bg-gray-900 border border-gray-900 px-3 py-1.5 rounded-lg">
                                        Pull
                                    </span>
                                )}
                            </div>
                        </button>
                    );
                })}
            </div>

            {filtered.length === 0 && (
                <p className="text-center text-gray-500 mt-10">
                    Aucun modèle ne correspond à votre recherche.
                </p>
            )}
        </div>
    );
}

export function ListAvailableModel() {
    const [models, setModels] = useState<ListResponse["models"]>([]);
    const [query, setQuery] = useState("");

    useEffect(() => {
        (async () => {
            const response = await ollamaNode.list();
            setModels(response.models);
        })();
    }, []);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();

        if (!q) return models;
        return models.filter(
            (m) =>
                m.name.toLowerCase().includes(q) ||
                m.details.family?.toLowerCase().includes(q),
        );
    }, [models, query]);

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-2xl font-semibold mb-2 text-gray-800">
                Modèles installés
            </h2>
            <Link
                to="/ollama"
                className="inline-block text-gray-700 hover:underline mb-6"
            >
                Retour
            </Link>
            <div className="mb-6">
                <input
                    className="w-full sm:w-96 rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-700"
                    placeholder="Filtrer par nom ou famille…"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filtered.map((model) => (
                    <div
                        key={model.name}
                        className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex flex-col gap-2 hover:shadow-md transition"
                    >
                        <p className="text-lg font-medium text-gray-900">
                            {model.name}
                        </p>
                        <p className="text-sm text-gray-600">
                            Taille: {model.details.parameter_size}
                        </p>
                        <p className="text-sm text-gray-500">
                            {model.details.family}
                        </p>
                    </div>
                ))}
                {filtered.length === 0 && (
                    <p className="col-span-full text-center text-gray-500">
                        Aucun modèle trouvé.
                    </p>
                )}
            </div>
        </div>
    );
}
