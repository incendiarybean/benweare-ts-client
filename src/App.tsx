import "react-toastify/dist/ReactToastify.css";
import "animate.css";
import "./common/utils/socket";

import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Icon, Navbar, Routes, Sidebar } from "./components/";

function App() {
    const [mobileMenu, setMobileMenu] = useState<boolean>(false);

    useEffect(() => {
        if (
            window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches
        ) {
            toast.dark("👋 Welcome!", {
                position: "bottom-left",
                draggable: true,
            });
        } else {
            toast("👋 Welcome!", { position: "bottom-left", draggable: true });
        }
    }, []);

    return (
        <Router>
            <ToastContainer />
            <div className="text-slate-700 dark:text-white bg-gray-200 dark:bg-slate-700">
                <div className="w-full flex flex-col md:flex-row text-center justify-center">
                    <Navbar
                        Icon={Icon}
                        setMobileMenu={setMobileMenu}
                        mobileMenu={mobileMenu}
                    />
                    <div
                        className={`w-full md:max-w-4xl transition-all duration-150 ${
                            mobileMenu ? "opacity-40" : "opacity-100"
                        } overflow-auto md:h-screen border-l border-r border-slate-300 dark:border-slate-600`}
                    >
                        <Routes Icon={Icon} mobileMenu={mobileMenu} />
                    </div>
                    <Sidebar />
                </div>
            </div>
        </Router>
    );
}

export default App;
