import "./css/App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChatBotSection } from "./ChatBotSection";
import Home from "./Home";
import {OStore} from "./oStore";

export const router = createBrowserRouter([
    {path: "/", element: <Home/>},
    {path: "/chat_bot", element: <ChatBotSection/>},
    {path: "/ollama", element: <OStore/>}
])


export default function App() {
    return <RouterProvider router={router}/>;
}
