import React, { useEffect, useState } from "react";
import { NasaArticle, NewsCard } from "@common/types";
import { sleep } from "@common/utils";
import { Error, Loader } from "@components";

function Component({ Endpoint, SiteName }: NewsCard) {
    const [article, setArticle] = useState<NasaArticle>();
    const [loaded, setLoaded] = useState<boolean | string>(false);

    useEffect(() => {
        const getDetail = async () => {
            fetch(Endpoint)
                .then((data) => data.json())
                .then(({ items }) => {
                    setArticle(items[0]);
                    setLoaded(true);
                })
                .catch(() => {
                    setLoaded("Failed");
                    sleep(5000).then(getDetail);
                });
        };

        getDetail();
    }, [Endpoint, SiteName]);

    return (
        <div className="px-2 md:px-6 my-3 w-full">
            <div className="text-left flex flex-col w-full items-center justify-center md:p-4 md:border border-slate-300 dark:border-slate-600 rounded-xl">
                {loaded === true &&
                    article &&
                    (!article.url.includes("youtube.com") ? (
                        <div
                            className={`animate__animated animate__fadeIn animate__faster w-full rounded-xl flex-col xl:flex-row bg-white dark:bg-slate-900 shadow-md`}
                        >
                            <div
                                className="rounded-t-xl w-full h-52 shadow-sm bg-cover"
                                style={{
                                    backgroundImage: `url(${article.url})`,
                                }}
                            />

                            <div className="w-full p-3 flex flex-col justify-between h-auto md:h-28 overflow-auto lg:h-auto">
                                <h1 className="text-left text-sm xl:text-lg font-bold leading-normal">
                                    {article.title}
                                </h1>
                                <p className="text-sm">{article.explanation}</p>

                                <div className="flex mt-4">
                                    <button
                                        onClick={() =>
                                            window.open(article.url, "_blank")
                                        }
                                        className="transition-all duration-100 text-center p-2 rounded-md text-white w-1/2 bg-gradient-to-r from-blue-700 to-blue-500 hover:shadow-md hover:from-blue-800 hover:to-blue-600"
                                    >
                                        View Full-Size
                                    </button>
                                    <div className="flex flex-col ml-4 w-1/2">
                                        <h2 className="text-center text-xs mt-1 mb-2 text-blue-600 dark:text-blue-400 font-bold uppercase">
                                            {SiteName} Article
                                        </h2>

                                        <span className="self-center text-xs text-blue-700 dark:text-blue-300 -mt-2">
                                            {article.date}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <a
                            href={article.url}
                            rel="noreferrer"
                            target="_blank"
                            className={`animate__animated animate__fadeIn animate__faster w-full rounded-xl flex-col xl:flex-row bg-white dark:bg-slate-900 shadow-md`}
                        >
                            <div className="p-2">
                                <iframe
                                    className="w-full rounded-lg h-96"
                                    src={`https://www.youtube.com/embed/${
                                        article.url.split("/")[
                                            article.url.split("/").length - 1
                                        ]
                                    }`}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    title="Embedded youtube"
                                />
                            </div>

                            <div className="w-full p-3 flex flex-col justify-between h-56 md:h-28 overflow-auto lg:h-auto">
                                <h1 className="text-left text-sm xl:text-lg font-bold leading-normal">
                                    {article.title}
                                </h1>
                                <p className="text-xs">{article.explanation}</p>
                                <div className="flex flex-col ml-4 w-1/2">
                                    <h2 className="text-center text-xs mt-1 mb-2 text-blue-600 dark:text-blue-400 font-bold uppercase">
                                        {SiteName} Article
                                    </h2>

                                    <span className="self-center text-xs text-blue-700 dark:text-blue-300 -mt-2">
                                        {article.date}
                                    </span>
                                </div>
                            </div>
                        </a>
                    ))}
                {loaded === "Failed" && <Error />}
                {loaded === false && <Loader />}
            </div>
        </div>
    );
}

export default Component;
