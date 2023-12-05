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
            className='news-list-card component-box shrink hidden md:block'
        >
            <div className='outer-container max-h-56 relative'>
                <h2 className='sitename'>{SiteName}</h2>
                <div className='wrapper animate__animated animate__fadeIn animate__faster'>
                    {loaded && articles && (
                        <div className='my-3'>
                            {articles.map((data) => (
                                <a
                                    key={`${data.url}-${data.id}`}
                                    href={data.url}
                                    rel='noreferrer'
                                    target='_blank'
                                    className='link'
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
