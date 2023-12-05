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
            className='weather-card component-box shrink-0 lg:pl-0 lg:w-1/4 min-w-[230px]'
        >
            <div className='outer-container relative h-16 md:h-32 lg:h-56 md:p-4'>
                <h2 className='sitename'>{SiteName}</h2>
                <div className='wrapper animate__animated animate__fadeIn animate__faster'>
                    <div className='weather-icon'>
                        {weatherIcon(timeSeries?.weather)}
                    </div>
                    <div className='content'>
                        <p className='text-xs highlighted-text w-full'>
                            {new Date(
                                timeSeries?.date ?? ''
                            ).toLocaleDateString('en-UK')}
                        </p>
                        <div className='context'>
                            <p>{timeSeries?.weatherDescription}</p>
                            <div className='flex justify-around items-center min-w-[4rem]'>
                                <p>{timeSeries?.lowTemp}</p>|
                                <p>{timeSeries?.maxTemp}</p>
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
