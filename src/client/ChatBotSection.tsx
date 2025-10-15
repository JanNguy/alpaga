import "../css/App.css";
import type { UserText } from "../utils/interfaces";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { send_payload } from "../call-manager/send_payload";
import { getAvailableModelNames } from "../call-manager/getAvailableModels";

export function ChatBotSection() {
    const [open, setOpen] = useState(false);
    const [context, setContexte] = useState<string>("");
    const [models, setModels] = useState<string[]>([]);
    const [model, setModel] = useState<string>("");
    const [loadingModels, setLoadingModels] = useState<boolean>(false);
    const modelChoiseRef = useRef<HTMLSelectElement | null>(null);

    const [conversation, setConversation] = useState<UserText[]>([
        {
            pathPP: "/assets/ChatGPT-Logo.svg",
            message: "Hello, how can I help you today?",
            type: "user",
            context: `${context}`,
        },
    ]);

    const loadModels = async () => {
        setLoadingModels(true);
        try {
            const list = await getAvailableModelNames();
            setModels(list);
            if (!model && list.length > 0) {
                setModel(list[0]);
            } else if (model && !list.includes(model) && list.length > 0) {
                setModel(list[0]);
            }
        } finally {
            setLoadingModels(false);
        }
    };

    useEffect(() => {
        loadModels();
    }, []);

    return (
        <>
            <div className="flex h-dvh min-h-0 overflow-hidden bg-[radial-gradient(1200px_600px_at_50%_-10%,#0b1220,transparent)] from-slate-950 to-slate-900">
                <motion.nav
                    className="flex-none h-dvh bg-white/5 backdrop-blur-md border-r border-white/10 order-first overflow-hidden"
                    animate={{ width: open ? "20%" : 0 }}
                    initial={false}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                >
                    <div className="h-full flex flex-col">
                        <div className="flex flex-row items-center justify-center gap-3 p-3">
                            <button
                                className="w-10 h-10 grid place-items-center rounded-xl bg-white/10 text-white hover:bg-white/15 active:scale-95 transition"
                                onClick={() => setOpen(false)}
                            >
                                ←
                            </button>
                            <button
                                className="w-10 h-10 grid place-items-center rounded-xl bg-white/10 text-white hover:bg-white/15 active:scale-95 transition"
                                onClick={() => window.open("/ollama", "_blank")}
                            >
                                <img
                                    src="/assets/ollama.svg"
                                    className="w-6 h-6"
                                    alt="Ollama"
                                    style={{ filter: "invert(1)" }}
                                />
                            </button>
                            <button
                                className="w-10 h-10 grid place-items-center rounded-xl bg-white/10 text-white hover:bg-white/15 active:scale-95 transition"
                                onClick={() => window.open("/hs", "_blank")}
                            >
                                <img
                                    src="/assets/hf-logo-pirate.svg"
                                    className="w-6 h-6"
                                    alt="HF Logo"
                                />
                            </button>
                        </div>

                        <div className="mt-auto p-3 space-y-2">
                            <label
                                htmlFor="modelChoise"
                                className="block text-xs text-white/70 mb-1"
                            >
                                Sélection du modèle
                            </label>
                            <div className="flex gap-2">
                                <select
                                    id="modelChoise"
                                    ref={modelChoiseRef}
                                    className="w-full bg-black/30 text-white placeholder-white/60 border border-white/15 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-white/30"
                                    value={model}
                                    onChange={(e) => setModel(e.target.value)}
                                    onFocus={() => {
                                        if (
                                            models.length === 0 &&
                                            !loadingModels
                                        ) {
                                            loadModels();
                                        }
                                    }}
                                >
                                    {loadingModels && (
                                        <option value="">Chargement…</option>
                                    )}
                                    {!loadingModels && models.length === 0 && (
                                        <option value="">
                                            Aucun modèle détecté
                                        </option>
                                    )}
                                    {!loadingModels &&
                                        models.map((name) => (
                                            <option key={name} value={name}>
                                                {name}
                                            </option>
                                        ))}
                                </select>
                                <button
                                    type="button"
                                    className="px-3 rounded-lg bg-white/10 text-white border border-white/15 hover:bg-white/15 active:scale-95 transition"
                                    onClick={loadModels}
                                    aria-label="Rafraîchir les modèles"
                                >
                                    ↻
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.nav>

                <div className="flex-1 h-dvh flex flex-col relative min-h-0">
                    <button
                        className={`absolute top-4 left-4 z-10 rounded-full bg-white/10 border border-white/15 text-white/90 px-3 py-1.5 backdrop-blur-md hover:bg-white/15 active:scale-95 transition ${open ? "invisible" : ""}`}
                        onClick={() => setOpen((v) => !v)}
                    >
                        {open ? "←" : "→"}
                    </button>

                    <div className="flex-1 overflow-y-auto pt-20 px-4">
                        <div className="mx-auto w-full max-w-4xl space-y-4">
                            {conversation.map((u, index) => (
                                <div
                                    key={index}
                                    className={`w-full flex ${u.type === "assistant" ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`flex items-start gap-3 w-full sm:w-[80%] ${u.type === "assistant" ? "flex-row-reverse" : ""}`}
                                    >
                                        <img
                                            src={u.pathPP}
                                            alt="profile"
                                            className="w-10 h-10 rounded-full object-cover mt-1 ring-1 ring-white/20"
                                        />
                                        <div
                                            className={`px-4 py-3 rounded-2xl leading-relaxed text-sm md:text-base border
                                            ${
                                                u.type === "assistant"
                                                    ? "bg-gradient-to-br from-indigo-600/80 to-fuchsia-600/80 text-white border-white/10"
                                                    : "bg-white/5 text-white/90 border-white/10"
                                            }`}
                                        >
                                            <p className="whitespace-pre-wrap break-words">
                                                {u.message}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col mt-auto mb-8 px-4">
                        <div className="mx-auto w-full max-w-3xl">
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    const chosen =
                                        modelChoiseRef.current?.value || model;
                                    send_payload(
                                        conversation,
                                        e,
                                        setConversation,
                                        chosen,
                                    );
                                    (
                                        e.currentTarget.elements.namedItem(
                                            "input",
                                        ) as HTMLInputElement
                                    ).value = "";
                                }}
                                className="rounded-2xl bg-white/8 border border-white/15 backdrop-blur-xl text-white p-2 pl-4 pr-2 shrink-0"
                            >
                                <div className="flex items-center gap-3 w-full bg-black/30 p-3 rounded-3xl">
                                    <input
                                        type="text"
                                        name="input"
                                        id="input"
                                        className="bg-transparent text-white placeholder:text-white outline-none flex-1 py-2"
                                        placeholder="Écrivez votre message…"
                                        autoComplete="off"
                                    />
                                    <button
                                        type="submit"
                                        className="rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 w-11 h-11 ml-auto flex items-center justify-center text-black font-semibold hover:brightness-110 active:scale-95 transition"
                                        aria-label="Envoyer"
                                        disabled={!model && models.length > 0}
                                    >
                                        →
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
