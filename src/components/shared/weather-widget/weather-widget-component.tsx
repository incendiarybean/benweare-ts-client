import type { NewsCarousel, WeatherTimeSeries } from '@common/types';
import { IO, sleep } from '@common/utils';
import { ErrorComponent, Loader } from '@components';
import { Cloud, Foggy, Info, Rain, Snow, Sun, Thunder } from '@icons';
import { useEffect, useState } from 'react';

const WeatherWidget = ({ Endpoint, SiteName }: NewsCarousel) => {
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
            className='component-box shrink-0 lg:pl-0 lg:w-1/4 min-w-[230px]'
        >
            <div className='relative outer-container outer-container-border h-32 lg:h-56'>
                <h2 className='title list'>{SiteName}</h2>
                <div className='inner-card-border h-full w-full animate__animated animate__fadeIn animate__faster flex flex-row lg:flex-col justify-between lg:text-center rounded'>
                    <div className='w-1/3 lg:w-full flex flex-col lg:flex-row justify-around items-center lg:h-1/2 bg-zinc-900/30'>
                        {weatherIcon(timeSeries?.weather)}
                    </div>
                    <div className='inner-card-color rounded lg:h-1/2 py-2 w-2/3 lg:w-full px-3 lg:px-0 flex lg:justify-around items-center'>
                        <div className='w-full lg:w-1/2 flex flex-row lg:flex-col justify-between items-center gap-2'>
                            <div className='flex flex-col'>
                                <p className='text-xs text-blue-600 dark:text-sky-500'>
                                    {new Date(
                                        timeSeries?.date ?? ''
                                    ).toLocaleDateString('en-UK')}
                                </p>
                                <p className='text-sm font-bold uppercase'>
                                    {timeSeries?.weatherDescription}
                                </p>
                            </div>
                            <div className='flex justify-around items-center min-w-[4rem]'>
                                <p className='text-sm font-bold uppercase'>
                                    {timeSeries?.lowTemp}
                                </p>
                                |
                                <p className='text-sm font-bold uppercase'>
                                    {timeSeries?.maxTemp}
                                </p>
                            </div>
                        </div>
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

export default WeatherWidget;
