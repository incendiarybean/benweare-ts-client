import type { NewsCarousel, WeatherTimeSeries } from '@common/types';
import { IO, sleep } from '@common/utils';
import { ErrorComponent, Loader } from '@components';
import { Cloud, Foggy, Info, Rain, Snow, Sun, Thunder } from '@icons';
import { useEffect, useState } from 'react';

const NewsList = ({ Endpoint, SiteName }: NewsCarousel) => {
    const [timeSeries, setTimeSeries] = useState<
        WeatherTimeSeries | undefined
    >();
    const [loaded, setLoaded] = useState<boolean | string>(false);

    useEffect(() => {
        const getNews = async () => {
            fetch(Endpoint)
                .then((data) => data.json())
                .then(({ response }) => {
                    const items: WeatherTimeSeries[] = response.items;
                    const today = items.filter(({ date }) => {
                        if (process.env.NODE_ENV !== 'production') {
                            return date.split('T')[0] === '2023-02-02';
                        }

                        return (
                            date.split('T')[0] ===
                            new Date().toISOString().split('T')[0]
                        );
                    })[0];

                    setTimeSeries(today);
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

    const weatherIcon = (weather: string | undefined) => {
        switch (weather) {
            case 'sun':
                return <Sun />;
            case 'foggy':
                return <Foggy />;
            case 'snow':
                return <Snow />;
            case 'rain':
                return <Rain />;
            case 'thunder':
                return <Thunder />;
            case 'cloud':
                return <Cloud />;
            default:
                return <Info />;
        }
    };

    return (
        <div
            id={`${SiteName}-news`}
            className='px-1 md:pr-6 my-3 w-full md:w-1/4'
        >
            <div className='relative text-left flex flex-col w-full items-center justify-center p-4 border border-slate-300 dark:border-zinc-600/40 dark:md:border-zinc-600/20 rounded'>
                <h2 className='absolute top-0 left-0 px-2 ml-1 -mt-2 flex items-center uppercase text-xs bg-zinc-200 dark:bg-zinc-800'>
                    {SiteName}
                </h2>
                <div className='text-blue-600 dark:text-sky-500 h-64 md:h-36 overflow-auto items-center flex-col justify-around text-center'>
                    <p>{weatherIcon(timeSeries?.weather)}</p>
                    <p className='text-xs'>
                        {new Date(timeSeries?.date ?? '').toLocaleDateString(
                            'en-UK'
                        )}
                    </p>
                    <p className='text-sm font-bold uppercase'>
                        {timeSeries?.weatherDescription}
                    </p>
                    <div className='flex justify-around items-center'>
                        <p className='text-sm font-bold uppercase text-blue-500 dark:text-sky-400'>
                            {timeSeries?.lowTemp}
                        </p>
                        |
                        <p className='text-sm font-bold uppercase text-blue-500 dark:text-sky-400'>
                            {timeSeries?.maxTemp}
                        </p>
                    </div>
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
