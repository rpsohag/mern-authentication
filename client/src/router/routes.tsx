import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Profile from "../pages/Profile";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>
    },
    {
        path: "/about",
        element: <About/>
    },
    {
        path: "sign-in",
        element: <SignIn/>
    },
    {
        path: "sign-up",
        element: <SignUp/>
    },
    {
        path: "/profile",
        element: <Profile/>
    }
])

export default router