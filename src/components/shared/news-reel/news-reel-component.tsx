import { ErrorComponent, Loader } from '@components';
import { createRef, useEffect, useState } from 'react';
import { SwipeHandler } from 'src/common/hooks/swipeHandler';
import { NewsArticle, NewsCarousel } from 'src/common/types';
import { sleep } from 'src/common/utils';
import IO from 'src/common/utils/socket';

const NewsReel = ({ Icon, Endpoint, SiteName, Disabled }: NewsCarousel) => {
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
        const display = index === articlePage ? 'flex ' : 'hidden ';
        const allowClick = Disabled ? 'pointer-events-none ' : '';
        const animateFirstRenderOnly =
            index === 0 && !articleChanged
                ? 'animate__animated animate__fadeIn animate__faster '
                : '';

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
                .then(({ response }) => {
                    setArticles(response.items);
                    preloadImages(response.items);
                })
                .catch(() => {
                    setLoaded('Failed');
                    sleep(5000).then(getNews);
                });
        };

        IO.on('RELOAD_NEWS', () => getNews());

        getNews();
    }, [Endpoint, SiteName]);

    const navigationElement = createRef<HTMLDivElement>();
    SwipeHandler(navigationElement, swipeAction);

    return (
        <div
            ref={navigationElement}
            id={`${SiteName}-news`}
            className='px-1 md:px-6 my-2 w-full'
        >
            <div className='text-left flex flex-col w-full items-center justify-center md:p-4 md:border border-slate-300 dark:border-zinc-600/20 rounded'>
                {loaded === true && articles && (
                    <div className='w-full border xl:border-none border-slate-300 dark:border-zinc-600/30 rounded shadow-md xl:shadow-none'>
                        {articles.map((data, index) => (
                            <a
                                key={`${data.url}-${data.id}`}
                                href={data.url}
                                rel='noreferrer'
                                target='_blank'
                                className={`${generateClassName(
                                    index
                                )}w-full rounded-t xl:rounded xl:shadow-md flex-col xl:flex-row bg-white dark:bg-zinc-900/70 xl:border border-slate-300 dark:border-zinc-600/30`}
                            >
                                <div className='flex-grow'>
                                    <img
                                        src={data.img}
                                        className='w-full md:w-full xl:w-96 h-60 xl:h-60 object-cover shadow rounded-t xl:rounded-tr-none xl:rounded-l'
                                    />
                                </div>

                                <div className='w-full xl:w-1/2 p-3 flex flex-col justify-between h-36 md:h-40 xl:h-60 overflow-auto'>
                                    <div>
                                        <div className='flex md:w-full text-xs text-left items-center justify-between text-blue-600 dark:text-sky-500'>
                                            <h2 className='-mx-1 flex items-center font-bold uppercase text-md'>
                                                <span>
                                                    <Icon.RightCornerArrow />
                                                </span>
                                                {SiteName}
                                            </h2>
                                            <span className='mr-2'>
                                                {new Date(
                                                    data.date
                                                ).toLocaleDateString('en-UK')}
                                            </span>
                                        </div>
                                        <p className='text-left text-md md:text-lg xl:text-xl font-bold leading-normal flex '>
                                            {data.title}
                                        </p>
                                    </div>
                                </div>
                            </a>
                        ))}
                        <div className='w-full xl:mt-2'>
                            <div className='flex justify-center'>
                                <div className='bg-white dark:bg-zinc-900/70 rounded-b xl:rounded flex w-full xl:w-1/2 p-2 justify-between h-12 lg:h-fit items-center xl:shadow xl:border border-slate-300 dark:border-zinc-600/30'>
                                    <button
                                        aria-label='Previous Article'
                                        className='border-slate-500 dark:border-slate-100 hover:text-sky-500 dark:hover:text-sky-400 border hover:border-blue-500 dark:hover:border-blue-400 w-6 h-6 rounded duration-150 hover:scale-105 active:scale-95'
                                        onClick={() =>
                                            handleRotation(articlePage - 1)
                                        }
                                    >
                                        <Icon.LeftArrow />
                                    </button>
                                    {loaded &&
                                        articles.map((data, index) => (
                                            <button
                                                aria-label={`Article ${index}`}
                                                key={`${data.url}-${data.id}-navigator`}
                                                onClick={() =>
                                                    handleRotation(index)
                                                }
                                                className={`transition-all self-center duration-150 hover:scale-150 active:scale-125 ease-in-out rounded xl:p-1 ${
                                                    index === articlePage
                                                        ? 'bg-sky-400 w-3 h-3'
                                                        : 'bg-zinc-400 w-2 h-2'
                                                } shadow`}
                                            />
                                        ))}
                                    <button
                                        aria-label='Next Article'
                                        className='border-slate-500 dark:border-slate-100 hover:text-sky-500 dark:hover:text-sky-400 border hover:border-blue-500 dark:hover:border-blue-400 w-6 h-6 rounded duration-150 hover:scale-105 active:scale-95'
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
                {loaded === 'Failed' && <ErrorComponent />}
                {loaded === false && <Loader />}
            </div>
        </div>
    );
};

export default NewsReel;
