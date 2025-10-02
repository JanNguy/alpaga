import "./App.css";
import ParticleSystem from "./HomeParticles";
import { Link } from "react-router-dom";

function Home() {
    return (
        <>
            <div className="min-h-screen w-screen flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-[-100px] h-full w-[600px] -z-10">
                    <ParticleSystem size={1000} />
                </div>
                <nav className="p-4 px-7 rounded-2xl bg-gray-500/10 flex justify-end w-[97%] mx-auto mt-5">
                    <Link to="/chat_bot">
                        <p className="text-gray-900 transition duration-150 ease-out hover:translate-x-1 hover:-translate-y-1 no-underline hover:underline">
                            Access ChatBot
                        </p>
                    </Link>
                </nav>
                <div className="flex flex-1 flex-col items-center justify-center gap-3 px-4">
                    <h1 className="text-center text-4xl sm:text-6xl">
                        Welcome, {import.meta.env.VITE_USER_NAME ?? "Guest"}
                    </h1>
                    <div className="w-full max-w-2xl rounded-3xl bg-gray-700/20 text-white p-5 pl-9 mt-7">
                        <div className="flex items-center gap-3">
                            <input
                                type="text"
                                name="inputZone"
                                id="input"
                                className="bg-gray-300/20 text-black placeholder-gray-400 outline-none flex-1 rounded-lg px-3 py-2"
                                placeholder="Ask for something"
                            />
                            <button className="rounded-2xl bg-yellow-900 w-10 h-10 ml-auto flex items-center justify-center">
                                →
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
