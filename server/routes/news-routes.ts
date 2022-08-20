import { AxiosResponse } from "axios";
import { Application, Request, Response } from "express";
import { MOCK_NEWS_RESPONSE } from "../lib/resource-data";
import { NewsArticle, NewsStorage } from "../lib/types";
const axios = require("axios");
const { JSDOM } = require("jsdom");

const news_route = (app: Application) => {
    /*--------------*/
    /*    CONFIG    */
    /*--------------*/

    let pcRetryCount = 0;
    let ukRetryCount = 0;
    let nasaRetryCount = 0;

    const storage: NewsStorage = {
        timestamp: undefined,
        data: {
            bbc: undefined,
            pc: undefined,
            nasa: undefined,
        },
    };

    /*--------------*/
    /*   ACTIONS    */
    /*--------------*/

    setTimeout(() => {
        console.log(`[${new Date()}] Initialising News Cache...`);

        if (process.env.NODE_ENV === "test") {
            console.log(`[${new Date()}] Mock News Used...`);
            storage.data = MOCK_NEWS_RESPONSE;
            return;
        }

        getNews();
        setTimeout(() => {
            getNews();
        }, 900000);
    }, 0);

    const generateDate = (date: string | undefined | null) => {
        const newDate = date ? new Date(date) : new Date();

        if (newDate.toString() === "Invalid Date") {
            return new Date().toLocaleDateString("en-UK");
        }
        return newDate.toLocaleDateString("en-UK");
    };

    const getNews = () => {
        getPCNews();
        getUKNews();
        getNasaImage();
        storage.timestamp = new Date().toISOString();
    };

    const getPCNews = () =>
        // new Promise((resolve) =>
        axios
            .get("https://www.pcgamer.com/uk/", { responseType: "text" })
            .then((response: AxiosResponse) => {
                const { document } = new JSDOM(response.data).window;
                const newArticles: NewsArticle[] = [];
                const uneditedArticles: HTMLElement[] = [];
                Array.prototype.slice
                    .call(
                        document.querySelectorAll(
                            ".list-text-links-trending-panel"
                        )
                    )
                    .map((container) =>
                        Array.prototype.slice
                            .call(container.querySelectorAll(".listingResult"))
                            .map((article, index) => {
                                if (index > 9) return null;
                                return uneditedArticles.push(article);
                            })
                    );

                uneditedArticles.forEach((HTMLDivElement) => {
                    const title: string =
                        HTMLDivElement.querySelector(".article-name")
                            ?.textContent || "Not Found";

                    const link: string =
                        HTMLDivElement.querySelector("a")?.href || "Not Found";

                    const img: string =
                        HTMLDivElement.querySelector(
                            ".article-lead-image-wrap"
                        )?.getAttribute("data-original") || "Not Found";

                    const date: string = generateDate(
                        HTMLDivElement.querySelector(
                            ".relative-date"
                        )?.getAttribute("datetime")
                    );

                    const site: string =
                        HTMLDivElement.querySelector("a")?.href.split("/")[2] ||
                        "Not Found";

                    newArticles.push({
                        title,
                        link,
                        img,
                        date,
                        site,
                    });
                });

                pcRetryCount = 0;
                storage.data.pc = newArticles;
                // return resolve(newArticles);
            })
            .catch(() => {
                pcRetryCount += 1;
                console.log(`Failed to get PC News... Retrying.`);
                if (pcRetryCount < 5) {
                    return console.log(
                        `Failed to get PC News... (Tried 5 times).`
                    );
                }
                return getPCNews();
            });
    // );

    const getUKNews: any = () =>
        // new Promise((resolve) =>
        axios
            .get("https://www.bbc.co.uk/news/england", {
                responseType: "text",
            })
            .then((response: AxiosResponse) => {
                const { document } = new JSDOM(response.data).window;
                const newArticles: NewsArticle[] = [];
                const uneditedArticles: HTMLElement[] = [];
                const articleTitles: string[] = [];

                Array.prototype.slice
                    .call(document.querySelectorAll("#topos-component"))
                    .map((container) =>
                        Array.prototype.slice
                            .call(
                                container.querySelectorAll(
                                    ".gs-c-promo, .gs-t-News"
                                )
                            )
                            .map((article, index) => {
                                if (index > 9 || !article.textContent) {
                                    return null;
                                }
                                return uneditedArticles.push(article);
                            })
                    );

                uneditedArticles.forEach((HTMLDivElement) => {
                    let imgUrl: string | undefined | null =
                        HTMLDivElement.querySelector("img")?.getAttribute(
                            "data-src"
                        );

                    if (imgUrl) {
                        imgUrl = imgUrl.replace(/\{width}/g, "720");
                    } else {
                        imgUrl =
                            HTMLDivElement.querySelector("img")?.src ||
                            "Not Found";
                    }

                    const title: string =
                        HTMLDivElement.querySelector(
                            ".gs-c-promo-heading__title"
                        )?.textContent || "Not Found";

                    const link: string =
                        `https://bbc.co.uk${
                            HTMLDivElement.querySelector("a")?.href
                        }` || "Not Found";

                    const img = imgUrl;

                    const date: string = generateDate(
                        HTMLDivElement.querySelector("time")?.getAttribute(
                            "datetime"
                        )
                    );

                    const site =
                        HTMLDivElement.querySelector("a")?.href.split("/")[2] ||
                        "Not Found";

                    if (!articleTitles.includes(title)) {
                        articleTitles.push(title);
                        newArticles.push({
                            title,
                            link,
                            img,
                            date,
                            site,
                        });
                    }
                });

                ukRetryCount = 0;
                storage.data.bbc = newArticles;
                // return resolve(newArticles);
            })
            .catch(() => {
                ukRetryCount += 1;
                console.log(`Failed to get UK News... Retrying.`);
                if (ukRetryCount < 5) {
                    return console.log(
                        `Failed to get UK News... (Tried 5 times).`
                    );
                }
                return getUKNews();
            });
    // );

    const getNasaImage = () => {
        // new Promise((resolve) => {
        if (process.env.NASA_API_KEY) {
            axios
                .get(
                    `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}`
                )
                .then((response: AxiosResponse) => {
                    storage.data.nasa = response.data;
                    // return resolve(response.data);
                })
                .catch(() => {
                    nasaRetryCount += 1;
                    console.log(`Failed to get UK News... Retrying.`);
                    if (nasaRetryCount < 5) {
                        return console.log(
                            `Failed to get NASA News... (Tried 5 times).`
                        );
                    }
                    return getNasaImage();
                });
        }
    };
    // });

    /*--------------*/
    /*    HANDLER   */
    /*--------------*/

    app.route("/api/news").get((req: Request, res: Response) => {
        try {
            switch (req.query.outlet) {
                case "bbc":
                    return res.json(storage.data.bbc);
                case "pc":
                    return res.json(storage.data.pc);
                case "nasa":
                    return res.json(storage.data.nasa);
                default:
                    return res.status(404).json({
                        message: `No outlet found: ${
                            req.query.outlet || "Please enter an outlet query."
                        }`,
                    });
            }
        } catch (e: any) {
            return res.status(502).json({
                message: `News feed ${req.query.outlet} isn't working! 🙄`,
                debug: e.toString(),
            });
        }
    });
};

export default news_route;
