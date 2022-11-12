import React, { createRef, useEffect, useState } from "react";
import { SwipeHandler } from "@common/hooks/swipeHandler";
import { NewsArticle, NewsCarousel } from "@common/types";
import { sleep } from "@common/utils";
import IO from "@common/utils/socket";
import { Error, Loader } from "@components";

function Component({ Icon, Endpoint, SiteName, Disabled }: NewsCarousel) {
    const [articles, setArticles] = useState<NewsArticle[]>([]);
    const [articleChanged, setArticleChanged] = useState<boolean>(false);
    const [loaded, setLoaded] = useState<boolean | string>(false);
    const [articlePage, setArticlePage] = useState<number>(0);

    const handleRotation = (index: number) => {
        setArticleChanged(true);
        if (index === articles.length) {
            return setArticlePage(0);
        }
        if (index < 0) {
            return setArticlePage(articles.length - 1);
        }
        setArticlePage(index);
    };

    const swipeAction = (direction: any) => {
        if (direction) {
            return handleRotation(articlePage + 1);
        }
        return handleRotation(articlePage - 1);
    };

    const generateClassName = (index: number) => {
        const display = index === articlePage ? "flex " : "hidden ";
        const allowClick = Disabled ? "pointer-events-none " : "";
        const animateFirstRenderOnly =
            index === 0 && !articleChanged
                ? "animate__animated animate__fadeIn animate__faster "
                : "";

        return `${display}${allowClick}${animateFirstRenderOnly}`;
    };

    const preloadImages = (data: NewsArticle[]) =>
        data.forEach((article) => {
            const img = new Image();
            img.src = article.img;
            setLoaded(true);
        });

    useEffect(() => {
        const getNews = async () => {
            fetch(Endpoint)
                .then((data) => data.json())
                .then(({ items }) => {
                    setArticles(items);
                    preloadImages(items);
                })
                .catch(() => {
                    setLoaded("Failed");
                    sleep(5000).then(getNews);
                });
        };

        IO.on("RELOAD_NEWS", () => getNews());

        getNews();
    }, [Endpoint, SiteName]);

    const navigationElement = createRef<HTMLDivElement>();
    SwipeHandler(navigationElement, swipeAction);

    return (
        <div
            ref={navigationElement}
            id={`${SiteName}-news`}
            className="px-2 md:px-6 my-3 w-full"
        >
            <div className="text-left flex flex-col w-full items-center justify-center md:p-4 md:border border-slate-300 dark:border-slate-600 rounded-xl">
                {loaded === true && articles && (
                    <div className="w-full">
                        {articles.map((data, index) => (
                            <a
                                key={`${data.site}-${index}`}
                                href={data.link}
                                rel="noreferrer"
                                target="_blank"
                                className={`${generateClassName(
                                    index
                                )}w-full rounded-xl flex-col xl:flex-row bg-white dark:bg-slate-900 shadow-md transition-all duration-100 md:hover:scale-95`}
                            >
                                <div className="flex-grow">
                                    <div
                                        className="w-full md:w-full xl:w-96 h-64 shadow bg-cover rounded-t-xl xl:rounded-none xl:rounded-l-xl"
                                        style={{
                                            backgroundImage: `url(${data.img})`,
                                        }}
                                    />
                                </div>

                                <div className="w-full xl:w-1/2 p-3 flex flex-col justify-between h-40 xl:h-64 overflow-auto">
                                    <div>
                                        <div className="flex flex-col md:w-full text-xs text-left">
                                            <span className="text-blue-700 dark:text-blue-300">
                                                {data.date}
                                            </span>
                                            <h2 className="text-blue-600 dark:text-blue-400 font-bold uppercase text-md">
                                                News Article
                                            </h2>
                                        </div>
                                        <p className="text-left text-sm md:text-lg xl:text-xl font-bold leading-normal ">
                                            {data.title}
                                        </p>
                                    </div>
                                    <p className="flex text-left text-xs md:text-sm text-blue-700 dark:text-blue-400 font-bold leading-normal items-center">
                                        <Icon.RightCornerArrow />
                                        {SiteName}
                                    </p>
                                </div>
                            </a>
                        ))}
                        <div className="lg:px-4 w-full mt-2">
                            <div className="flex justify-center">
                                <div className="bg-white dark:bg-slate-900 rounded-xl shadow-md flex w-full lg:w-1/2 p-2 justify-between h-12 lg:h-fit items-center">
                                    <button
                                        className="border-slate-500 dark:border-slate-100 hover:text-blue-500 dark:hover:text-blue-400 border hover:border-blue-500 dark:hover:border-blue-400 w-6 h-6 rounded-xl duration-150 hover:scale-105 active:scale-95"
                                        onClick={() =>
                                            handleRotation(articlePage - 1)
                                        }
                                    >
                                        <Icon.LeftArrow />
                                    </button>
                                    {loaded &&
                                        articles.map((data, index) => (
                                            <button
                                                key={`${data.site}-${index}-navigator`}
                                                onClick={() =>
                                                    handleRotation(index)
                                                }
                                                className={`transition-all w-3 self-center duration-150 hover:scale-150 active:scale-125 ease-in-out rounded-md xl:p-1 ${
                                                    index === articlePage
                                                        ? "bg-blue-400 h-3"
                                                        : "bg-slate-300 h-2"
                                                } shadow`}
                                            />
                                        ))}
                                    <button
                                        className="border-slate-500 dark:border-slate-100 hover:text-blue-500 dark:hover:text-blue-400 border hover:border-blue-500 dark:hover:border-blue-400 w-6 h-6 rounded-xl duration-150 hover:scale-105 active:scale-95"
                                        onClick={() =>
                                            handleRotation(articlePage + 1)
                                        }
                                    >
                                        <Icon.RightArrow />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {loaded === "Failed" && <Error />}
                {loaded === false && <Loader />}
            </div>
        </div>
    );
}

export default Component;
