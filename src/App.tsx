import "./css/App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChatBotSection } from "./ChatBotSection";
import Home from "./Home";

export const router = createBrowserRouter([
    {path: "/", element: <Home/>},
    {path: "/chat_bot", element: <ChatBotSection/>}
])


export default function App() {
    return <RouterProvider router={router}/>;
}
