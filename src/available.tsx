import { useEffect, useState } from "react";
import "./css/App.css";
import ollama, { type ListResponse } from "ollama";
import { Link } from "react-router-dom";

export function ListAvailableModel() {
    const [models, setModels] = useState<ListResponse["models"]>([]);

    useEffect(() => {
        ollama.list().then((response) => {
            setModels(response.models);
        });
    }, []);

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="mt-6 text-4xl font-semibold mb-4 text-gray-800">
                Available Models
            </h2>
            <div className="flex flex-col items-start gap-1 mb-10">
                <Link to="/ollama">
                    <p className="text-sm mb-1 text-gray-800 hover:underline transition-transform duration-200 hover:-translate-x-1">
                        Return to model section
                    </p>
                </Link>
                <Link to="/chat_bot">
                    <p className="text-sm text-black hover:underline transition-transform duration-200 hover:-translate-x-1">
                        Retour à la section chat bots
                    </p>
                </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {models.map((model) => (
                    <div
                        key={model.name}
                        className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex flex-col gap-2 hover:shadow-md transition"
                    >
                        <p className="text-lg font-medium text-gray-900">
                            {model.name}
                        </p>
                        <p className="text-sm text-gray-600">
                            Size: {model.details.parameter_size}
                        </p>
                        <p className="text-sm text-gray-500">
                            {model.details.family}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
