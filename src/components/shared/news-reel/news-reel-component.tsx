import type { NewsArticle, NewsCarousel } from '@common/types';
import { IO, sleep } from '@common/utils';
import { ErrorComponent, Loader } from '@components';
import { LeftArrow, RightArrow, RightCornerArrow } from '@icons';
import { useEffect, useState } from 'react';

const NewsReel = ({ Endpoint, SiteName }: NewsCarousel) => {
    const [articles, setArticles] = useState<NewsArticle[]>([]);
    const [articlePage, setArticlePage] = useState<number>(0);
    const [loaded, setLoaded] = useState<boolean | string>(false);

    const handleRotation = (index: number) => {
        if (index === articles.length) {
            return setArticlePage(0);
        }
        if (index < 0) {
            return setArticlePage(articles.length - 1);
        }
        setArticlePage(index);
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
        <div id={`${SiteName}-news`} className='component-box'>
            <div className='outer-container news-reel-card md:p-4'>
                {loaded && articles && (
                    <div className='wrapper animate__animated animate__fadeIn animate__faster'>
                        {articles.map((data, index) => (
                            <a
                                key={`${data.url}-${data.id}`}
                                href={data.url}
                                rel='noreferrer'
                                target='_blank'
                                className={`content ${
                                    index === articlePage
                                        ? 'card-active'
                                        : 'card-inactive'
                                }`}
                            >
                                <div className='image-wrapper'>
                                    <img
                                        loading='lazy'
                                        src={data.img}
                                        className='image'
                                    />
                                </div>

                                <div className='context'>
                                    <div className='context-title'>
                                        <h2>
                                            <RightCornerArrow />
                                            {SiteName}
                                        </h2>
                                        <span>
                                            {new Date(
                                                data.date
                                            ).toLocaleDateString('en-UK')}
                                        </span>
                                    </div>
                                    <p>{data.title}</p>
                                </div>
                            </a>
                        ))}
                        <div className='mobile-helper-wrapper'>
                            <div className='mobile-helper'>
                                <span>swipe for more content</span>
                                <RightArrow />
                            </div>
                        </div>
                        <div className='card-navigator'>
                            <div className='flex justify-center'>
                                <div className='rotator'>
                                    <button
                                        aria-label='Previous Article'
                                        className='rotator-button'
                                        onClick={() =>
                                            handleRotation(articlePage - 1)
                                        }
                                    >
                                        <LeftArrow />
                                    </button>
                                    {loaded &&
                                        articles.map((data, index) => (
                                            <button
                                                aria-label={`Article ${index}`}
                                                key={`${data.url}-${data.id}-navigator`}
                                                onClick={() =>
                                                    handleRotation(index)
                                                }
                                                className={`pip ${
                                                    index === articlePage
                                                        ? 'pip-active'
                                                        : 'pip-inactive'
                                                }`}
                                            />
                                        ))}
                                    <button
                                        aria-label='Next Article'
                                        className='rotator-button'
                                        onClick={() =>
                                            handleRotation(articlePage + 1)
                                        }
                                    >
                                        <RightArrow />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {loaded === 'Failed' && (
                    <ErrorComponent err={{ feedName: SiteName }} />
                )}
                {loaded === false && <Loader />}
            </div>
        </div>
    );
};

export default NewsReel;
