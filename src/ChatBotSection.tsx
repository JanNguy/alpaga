import "./css/App.css"
import type { UserText } from "./interfaces";
import { motion } from "motion/react";
import {useState } from "react";
import { send_payload } from "./send_payload";

export function ChatBotSection() {
    const [open, setOpen] = useState(false);
    const [context, setContexte] = useState<string>("");

    const [conversation, setConversation] = useState<UserText[]>([
        { pathPP: "/assets/ChatGPT-Logo.svg", message: "Hello, how can I help you today?", type: "ask", context: `${context}`},
    ]);

    return (
        <>
        <div className="flex h-screen overflow-hidden">
            <motion.nav
            className="h-full bg-neutral-900 order-first overflow-hidden"
            animate={{ width: open ? "20%" : 0 }}
            initial={false}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            >
            <div className="flex flex-row items-center gap-2 py-4">
                <button className="w-12 h-12 flex items-center justify-center text-white" onClick={() => setOpen(false)}>←</button>
                <button className="w-12 h-12 flex items-center justify-center text-white">
                    <img src="/assets/ollama.svg" className="w-8 h-8" alt="Ollama" style={{ filter: "invert(1)" }} onClick={() => window.open("/ollama", "_blank")}/>
                </button>
                <button className="w-12 h-12 flex items-center justify-center text-white">
                    <img src="/assets/hf-logo-pirate.svg" className="w-8 h-8" alt="HF Logo" onClick={() => window.open("/hs", "_blank")}/>
                </button>
            </div>
            </motion.nav>

            <div className="flex-1 h-full bg-neutral-800 flex flex-col relative min-h-0">
            <button
                className={`absolute top-4 left-4 z-10 rounded-md bg-black/60 text-white px-3 py-1 ${open ? "invisible" : ""}`}
                onClick={() => setOpen((v) => !v)}
            >
                {open ? "←" : "→"}
            </button>

            <div className="flex-1 overflow-y-auto pt-16 px-4 space-y-4">
                {conversation.map((u, index) => (
                <div key={index} className={`w-full flex ${u.type === "assistant" ? "justify-end" : "justify-start"}`}>
                    <div
                        className={`flex items-start gap-3 w-[80%] h-auto mx-4 p-2 ${u.type === "assistant" ? "flex-row-reverse" : ""}`}
                    >
                        <img src={u.pathPP} alt="profile" className="w-10 h-10 rounded-full object-cover mt-1" />
                        <p className="text-white pt-3 break-words border border-white p-3 ml-2 rounded-md">{u.message}</p>
                    </div>
                </div>
                ))}
            </div>

            <div className="flex flex-col mt-auto rounded-3xl bg-black mb-7 m-20 text-white p-2 pl-9 pr-4 shrink-0 w-[60%] mx-auto">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        send_payload(conversation, e, setConversation);
                        (e.currentTarget.elements.namedItem('input') as HTMLInputElement).value = '';
                    }}
                    className="flex items-center gap-3 w-full"
                >
                    <input
                        type="text"
                        name="input"
                        id="input"
                        className="bg-black text-white outline-none flex-1"
                        placeholder="Ask for something"
                        autoComplete="off"
                    />
                    <button
                        type="submit"
                        className="rounded-2xl bg-yellow-900 w-10 h-10 ml-auto flex items-center justify-center"
                        aria-label="Envoyer"
                    >
                        →
                    </button>
                </form>
            </div>

            </div>
        </div>
        </>
  );
}
