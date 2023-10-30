import type { NewsArticle, NewsCarousel } from '@common/types';
import { IO, sleep } from '@common/utils';
import { ErrorComponent, Loader } from '@components';
import { useEffect, useState } from 'react';
import { RightCornerArrow } from 'src/components/shared/icons';

const NewsList = ({ Endpoint, SiteName }: NewsCarousel) => {
    const [articles, setArticles] = useState<NewsArticle[]>([]);
    const [loaded, setLoaded] = useState<boolean | string>(false);

    useEffect(() => {
        const getNews = async () => {
            fetch(Endpoint)
                .then((data) => data.json())
                .then(({ response }) => {
                    setArticles(response.items);
                    setLoaded(true);
                })
                .catch(() => {
                    setLoaded('Failed');
                    sleep(5000).then(getNews);
                });
        };

        IO.on('RELOAD_NEWS', () => getNews());

        getNews();
    }, [Endpoint, SiteName]);

    return (
        <div
            id={`${SiteName}-news`}
            className='px-1 md:px-6 my-3 w-full md:w-3/4'
        >
            <div className='relative text-left flex flex-col w-full items-center justify-center p-4 border border-slate-300 dark:border-zinc-600/40 dark:md:border-zinc-600/20 rounded'>
                <h2 className='absolute top-0 left-0 px-2 ml-2 -mt-2 flex items-center uppercase text-xs bg-zinc-200 dark:bg-zinc-800'>
                    {SiteName}
                </h2>
                <div className='h-64 md:h-36 overflow-auto'>
                    {loaded && articles && (
                        <div className='w-full rounded shadow-md xl:shadow-none'>
                            {articles.map((data) => (
                                <a
                                    key={`${data.url}-${data.id}`}
                                    href={data.url}
                                    rel='noreferrer'
                                    target='_blank'
                                    className={` pr-2 md:pr-0 flex w-full rounded-t xl:rounded flex-col xl:flex-row text-sky-400 hover:text-sky-600`}
                                >
                                    <div className='w-full flex flex-col justify-between overflow-auto'>
                                        <div>
                                            <p className='text-left text-md md:text-sm leading-normal flex '>
                                                <span>
                                                    <RightCornerArrow />
                                                </span>
                                                {data.title}
                                            </p>
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    )}
                </div>
                {loaded === 'Failed' && (
                    <ErrorComponent err={{ feedName: SiteName }} />
                )}
                {loaded === false && <Loader />}
            </div>
        </div>
    );
};

export default NewsList;
