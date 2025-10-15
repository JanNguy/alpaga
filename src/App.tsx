import "./css/App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChatBotSection } from "./client/ChatBotSection";
import Home from "./client/Home";
import { OStore } from "./client/oStore";
import { ListAvailableModel } from "./client/available";
import { HStore } from "./client/HStore";

export const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/chat_bot", element: <ChatBotSection /> },
    { path: "/ollama", element: <OStore /> },
    { path: "/hs", element: <HStore /> },
    { path: "/available", element: <ListAvailableModel /> },
]);

export default function App() {
    return <RouterProvider router={router} />;
}
