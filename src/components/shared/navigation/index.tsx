import React, { createRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ExternalClickHandler } from "@common/hooks/externalClickHandler";
import { NavbarProps } from "@common/types";

function Component({ Icon, mobileMenu, setMobileMenu }: NavbarProps) {
    const [activePageNumber, setActivePageNumber] = useState<number>(0);
    const [hasBeenNavigated, setHasBeenNavigated] = useState<boolean>(false);

    const navigate = useNavigate();

    const handlePageNavigation = (pageNumber: number) => {
        setActivePageNumber(pageNumber);
        setHasBeenNavigated(true);
        if (mobileMenu) {
            setMobileMenu(false);
        }
    };

    const setActiveRoute = (route: string) => {
        if (route === "/") {
            setActivePageNumber(1);
        } else setActivePageNumber(0);
    };

    useEffect(() => {
        const storedPath = window.localStorage.getItem("path");
        if (!hasBeenNavigated && storedPath) {
            navigate(window.localStorage.getItem("path") as string);
            setHasBeenNavigated(true);
        }

        window.localStorage.setItem("path", window.location.pathname);
        setActiveRoute(window.location.pathname);
    }, [navigate, hasBeenNavigated]);

    const navigationElement = createRef<HTMLDivElement>();
    ExternalClickHandler(navigationElement, setMobileMenu);

    return (
        <div className="flex justify-end md:pl-2 md:mr-4 w-full md:w-1/4 sticky top-0 z-10 md:min-h-screen">
            <div
                ref={navigationElement}
                className="bg-white dark:bg-slate-900 md:bg-gray-200 dark:md:bg-slate-700 shadow md:shadow-none select-none group relative w-full md:w-48 md:mt-28"
            >
                <button
                    onClick={() => setMobileMenu(!mobileMenu)}
                    className="md:hidden hover:shadow-inner w-full h-12 flex items-center"
                >
                    <div className="p-3">
                        <Icon.Burger />
                    </div>

                    <p className="md:w-0 overflow-hidden md:ml-2 text-sm font-normal uppercase">
                        Menu
                    </p>
                </button>
                <div
                    className={`z-10 absolute w-full md:min-w-fit ${
                        mobileMenu
                            ? "bg-white dark:bg-slate-700 shadow-md"
                            : "hidden"
                    } md:grid md:gap-2 `}
                >
                    <Link
                        to="/dashboard"
                        className={`transition-bg ease-in-out duration-100 ${
                            activePageNumber === 0
                                ? "text-white bg-gradient-to-r from-blue-500 to-blue-700 dark:from-blue-600 dark:to-blue-700 hover:from-blue-600 hover:to-blue-800 font-semibold leading-tight shadow-md"
                                : "hover:bg-slate-100 dark:hover:bg-slate-800 hover:shadow-sm"
                        } w-full md:w-48 h-12 flex items-center md:rounded-md`}
                        onClick={() => handlePageNavigation(0)}
                    >
                        <div className="p-3">
                            <Icon.Home />
                        </div>

                        <p className="overflow-hidden md:ml-2 mt-1 text-sm">
                            Dashboard
                        </p>
                    </Link>

                    <Link
                        to="/"
                        className={`transition-bg ease-in-out duration-100 ${
                            activePageNumber === 1
                                ? "text-white bg-gradient-to-r from-blue-500 to-blue-700 dark:from-blue-600 dark:to-blue-700 hover:from-blue-600 hover:to-blue-800 font-semibold leading-tight shadow-md"
                                : "hover:bg-slate-100 dark:hover:bg-slate-800 hover:shadow-sm"
                        } w-full md:w-48 h-12 flex items-center md:rounded-md`}
                        onClick={() => handlePageNavigation(1)}
                    >
                        <div className="p-3">
                            <Icon.Info />
                        </div>

                        <p className="overflow-hidden md:ml-2 mt-1 text-sm">
                            About
                        </p>
                    </Link>

                    <a
                        target="_blank"
                        rel="noreferrer"
                        href="https://www.npmjs.com/~incendiarybean"
                        className="transition-colors ease-in-out duration-100 hover:bg-slate-100 dark:hover:bg-slate-800 hover:shadow-sm w-full md:w-48 h-12 flex items-center md:rounded-md"
                    >
                        <div className="p-3">
                            <Icon.Packages />
                        </div>

                        <p className="overflow-hidden md:ml-2 mt-1 text-sm font-medium">
                            Packages
                        </p>
                    </a>

                    <a
                        target="_blank"
                        rel="noreferrer"
                        href="https://github.com/incendiarybean"
                        className="transition-colors ease-in-out duration-100 hover:bg-slate-100 dark:hover:bg-slate-800 hover:shadow-sm w-full md:w-48 h-12 flex items-center md:rounded-md"
                    >
                        <div className="p-3">
                            <Icon.OpenBox />
                        </div>

                        <p className="overflow-hidden md:ml-2 mt-1 text-sm font-medium">
                            GitHub
                        </p>
                    </a>

                    <a
                        target="_blank"
                        rel="noreferrer"
                        href="https://hub.docker.com/u/incendiarybean"
                        className="transition-colors ease-in-out duration-100 hover:bg-slate-100 dark:hover:bg-slate-800 hover:shadow-sm w-full md:w-48 h-12 flex items-center md:rounded-md"
                    >
                        <div className="p-3">
                            <Icon.Box />
                        </div>

                        <p className="overflow-hidden md:ml-2 mt-1 text-sm font-medium">
                            Docker
                        </p>
                    </a>
                    <a
                        target="_blank"
                        rel="noreferrer"
                        href="/api/docs"
                        className="transition-colors ease-in-out duration-100 hover:bg-slate-100 dark:hover:bg-slate-800 hover:shadow-sm w-full md:w-48 h-12 flex items-center md:rounded-md"
                    >
                        <div className="p-3">
                            <Icon.Newspaper />
                        </div>

                        <p className="overflow-hidden md:ml-2 mt-1 text-sm font-medium">
                            Docs
                        </p>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Component;
