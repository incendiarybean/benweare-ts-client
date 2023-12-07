import type { CardProps, NewsArticle } from '@common/types';
import { sleep } from '@common/utils';
import { ArrowComponent, ErrorComponent, Loader } from '@components';
import { useEffect, useState } from 'react';
import { RightCornerArrow } from 'src/components/shared/icons';

const Card = ({ Endpoint, SiteName }: CardProps) => {
    const [article, setArticle] = useState<NewsArticle>();
    const [loaded, setLoaded] = useState<boolean | string>(false);
    const [show, setShow] = useState<boolean>(false);

    useEffect(() => {
        const getDetail = async () => {
            fetch(Endpoint)
                .then((data) => data.json())
                .then(({ response }) => {
                    setArticle(response.items[0]);
                    setLoaded(true);
                })
                .catch(() => {
                    setLoaded('Failed');
                    sleep(5000).then(getDetail);
                });
        };

        getDetail();
    }, [Endpoint, SiteName]);

    return (
        <div className='px-1 md:px-6 my-2 w-full'>
            <div className='animate__animated animate__fadeIn animate__faster text-left flex flex-col w-full items-center justify-center md:p-4 md:border border-slate-300 dark:border-zinc-600/20 rounded'>
                {loaded &&
                    article &&
                    (!article.url.includes('youtube.com') ? (
                        <div className='card border border-slate-300 dark:border-zinc-600/30 w-full rounded flex-col xl:flex-row bg-white dark:bg-zinc-900/70 shadow-md'>
                            <a
                                className='hover:bg-blue-400 h-auto w-auto'
                                href={article.url}
                                aria-label='Open NASA Image of the Day'
                            >
                                <img
                                    alt='NASA Image of the Day'
                                    src={article.url}
                                    className='rounded-t w-full h-64 shadow-sm object-cover'
                                />
                            </a>

                            <div className='w-full p-3 flex flex-col h-auto overflow-auto'>
                                <div>
                                    <div className='flex md:w-full text-xs text-left items-center justify-between text-blue-600 dark:text-sky-500'>
                                        <h2 className='-mx-1 flex items-center font-bold uppercase text-md'>
                                            <span>
                                                <RightCornerArrow />
                                            </span>
                                            {SiteName}
                                        </h2>
                                        <span className='mr-2'>
                                            {new Date(
                                                article.date
                                            ).toLocaleDateString('en-UK')}
                                        </span>
                                    </div>
                                    <p className='text-left text-sm md:text-lg xl:text-xl font-bold leading-normal flex '>
                                        {article.title}
                                    </p>
                                </div>
                                <div className='flex mb-2'>
                                    <button
                                        className='text-blue-500 dark:text-sky-400 hover:text-blue-700 hover:dark:text-sky-600 flex'
                                        onClick={() => setShow(!show)}
                                    >
                                        <div className='min-w-fit text-xs uppercase flex flex-row items-center'>
                                            <p>Read the Article</p>{' '}
                                            <ArrowComponent display={show} />
                                        </div>
                                    </button>
                                </div>
                                {show && (
                                    <p className=''>{article.description}</p>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className='animate__animated animate__fadeIn animate__faster w-full rounded flex-col xl:flex-row bg-white dark:bg-zinc-900/70 shadow-md'>
                            <div>
                                <iframe
                                    className='rounded-t w-full h-96 shadow-sm'
                                    src={`https://www.youtube.com/embed/${
                                        article.url.split('/')[
                                            article.url.split('/').length - 1
                                        ]
                                    }`}
                                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                                    allowFullScreen
                                    title='Embedded youtube'
                                />
                            </div>

                            <div className='w-full p-3 flex flex-col h-auto overflow-auto'>
                                <div>
                                    <div className='flex md:w-full text-xs text-left items-center justify-between text-blue-600 dark:text-sky-500'>
                                        <h2 className='-mx-1 flex items-center font-bold uppercase text-md'>
                                            <span>
                                                <RightCornerArrow />
                                            </span>
                                            {SiteName}
                                        </h2>
                                        <span className='mr-2'>
                                            {new Date(
                                                article.date
                                            ).toLocaleDateString('en-UK')}
                                        </span>
                                    </div>
                                    <p className='text-left text-sm md:text-lg xl:text-xl font-bold leading-normal flex '>
                                        {article.title}
                                    </p>
                                </div>
                                <div className='text-xs items-center uppercase flex justify-between mb-2 text-blue-500 dark:text-sky-400'>
                                    <button
                                        className='uppercase hover:text-blue-700 hover:dark:text-sky-600 flex flex-row items-center'
                                        onClick={() => setShow(!show)}
                                    >
                                        <p>Read the Article</p>
                                        <ArrowComponent display={show} />
                                    </button>
                                    <a
                                        className='hover:text-blue-700 hover:dark:text-sky-600'
                                        href={article.url}
                                        rel='noreferrer'
                                        target='_blank'
                                    >
                                        Watch on Youtube
                                    </a>
                                </div>
                                {show && (
                                    <p className=''>{article.description}</p>
                                )}
                            </div>
                        </div>
                    ))}
                {loaded === 'Failed' && <ErrorComponent feedName={SiteName} />}

                {loaded === false && <Loader />}
            </div>
        </div>
    );
};

export default Card;
