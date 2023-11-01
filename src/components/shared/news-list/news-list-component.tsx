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
        <div id={`${SiteName}-news`} className='component-box shrink'>
            <div className='list-container outer-container-border max-h-56'>
                <h2 className='title list'>{SiteName}</h2>
                <div className='border md:border-none border-slate-300 dark:border-zinc-600/30 rounded overflow-auto px-2 shadow-inner'>
                    {loaded && articles && (
                        <div className='my-3'>
                            {articles.map((data) => (
                                <a
                                    key={`${data.url}-${data.id}`}
                                    href={data.url}
                                    rel='noreferrer'
                                    target='_blank'
                                    className='pr-2 md:pr-0 flex w-full rounded-t xl:rounded text-sky-400 hover:text-sky-600 mb-1'
                                >
                                    <span>
                                        <RightCornerArrow />
                                    </span>
                                    {data.title}
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
