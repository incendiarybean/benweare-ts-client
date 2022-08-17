import React, { useEffect, useState, createRef } from "react";
import { Link } from "react-router-dom";
import { NavbarProps } from "@lib/types";
import { ExternalClickHandler } from "src/hooks/externalClickHandler";

function Component({ Icon, mobileMenu, setMobileMenu }: NavbarProps) {
    const [activePageNumber, setActivePageNumber] = useState(0);

    const handlePageNavigation = (pageNumber: number) => {
        setActivePageNumber(pageNumber);
        if (mobileMenu) {
            setMobileMenu(false);
        }
    };

    useEffect(() => {
        const currentPage = window.location.pathname;
        switch (currentPage) {
            case "/":
                setActivePageNumber(1);
                break;
            default:
                break;
        }
    }, []);

    const navigationElement = createRef<HTMLDivElement>();
    ExternalClickHandler(navigationElement, setMobileMenu);

    return (
        <div className="flex justify-end md:mr-4 md:mt-28">
            <div
                ref={navigationElement}
                className="bg-white md:bg-slate-200 shadow md:shadow-none select-none group relative md:sticky top-0 w-full md:w-48"
            >
                <button
                    onClick={() => setMobileMenu(!mobileMenu)}
                    className="md:hidden hover:shadow-inner w-full h-12 flex items-center border-b"
                >
                    <div className="p-3">
                        <Icon.Burger />
                    </div>

                    <p className="md:w-0 overflow-hidden ml-2 text-sm font-normal uppercase">
                        Menu
                    </p>
                </button>
                <div
                    className={`z-10 absolute w-full md:min-w-fit ${
                        mobileMenu ? "bg-white shadow-md" : "hidden"
                    } md:grid md:gap-2 `}
                >
                    <Link
                        to="/dashboard"
                        className={`transition-colors ease-in-out duration-100 ${
                            activePageNumber === 0
                                ? "text-white bg-gradient-to-r from-blue-500 to-blue-700 font-semibold leading-tight shadow-md"
                                : "hover:bg-slate-100"
                        } hover:shadow-sm w-full md:w-48 h-12 flex items-center md:rounded-md`}
                        onClick={() => handlePageNavigation(0)}
                    >
                        <div className="p-3">
                            <Icon.Home />
                        </div>

                        <p className="overflow-hidden ml-2 mt-1 text-sm">
                            Dashboard
                        </p>
                    </Link>

                    <Link
                        to="/"
                        className={`transition-colors ease-in-out duration-100 ${
                            activePageNumber === 1
                                ? "text-white bg-gradient-to-r from-blue-500 to-blue-700 font-semibold leading-tight shadow-md"
                                : "hover:bg-slate-100"
                        } hover:shadow-sm w-full md:w-48 h-12 flex items-center md:rounded-md`}
                        onClick={() => handlePageNavigation(1)}
                    >
                        <div className="p-3">
                            <Icon.Info />
                        </div>

                        <p className="overflow-hidden ml-2 mt-1 text-sm">
                            About
                        </p>
                    </Link>

                    <a
                        target="_blank"
                        rel="noreferrer"
                        href="https://www.npmjs.com/~incendiarybean"
                        className="transition-colors ease-in-out duration-100 hover:bg-slate-100 hover:shadow-inner w-full md:w-48 h-12 flex items-center md:rounded-md"
                    >
                        <div className="p-3">
                            <Icon.Packages />
                        </div>

                        <p className="overflow-hidden ml-2 mt-1 text-sm font-medium">
                            Packages
                        </p>
                    </a>

                    <a
                        target="_blank"
                        rel="noreferrer"
                        href="https://github.com/incendiarybean"
                        className="transition-colors ease-in-out duration-100 hover:bg-slate-100 hover:shadow-inner w-full md:w-48 h-12 flex items-center md:rounded-md"
                    >
                        <div className="p-3">
                            <Icon.OpenBox />
                        </div>

                        <p className="overflow-hidden ml-2 mt-1 text-sm font-medium">
                            GitHub
                        </p>
                    </a>

                    <a
                        target="_blank"
                        rel="noreferrer"
                        href="https://hub.docker.com/u/incendiarybean"
                        className="transition-colors ease-in-out duration-100 hover:bg-slate-100 hover:shadow-inner w-full md:w-48 h-12 flex items-center md:rounded-md"
                    >
                        <div className="p-3">
                            <Icon.Box />
                        </div>

                        <p className="overflow-hidden ml-2 mt-1 text-sm font-medium">
                            Docker
                        </p>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Component;
