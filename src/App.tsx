import "./css/App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChatBotSection } from "./ChatBotSection";
import Home from "./Home";
import {OStore} from "./oStore";
import { ListAvailableModel } from "./available";

export const router = createBrowserRouter([
    {path: "/", element: <Home/>},
    {path: "/chat_bot", element: <ChatBotSection/>},
    {path: "/ollama", element: <OStore/>},
    {path: "/available", element: <ListAvailableModel/>}
])


export default function App() {
    return <RouterProvider router={router}/>;
}
