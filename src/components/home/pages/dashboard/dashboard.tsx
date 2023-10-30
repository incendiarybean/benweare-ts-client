import { Card, NewsCarousel, NewsList, WeatherWidget } from '@components';

const DashboardPage = () => {
    return (
        <div className='select-none items-center flex flex-col w-full'>
            <div className='w-full flex mt-2'>
                <NewsList
                    Endpoint={'/api/news/theregister'}
                    SiteName='The Register'
                />
                <WeatherWidget
                    Endpoint='/api/forecasts/metoffice'
                    SiteName='MetOffice'
                />
            </div>
            <Card SiteName='NASA' Endpoint={'/api/news/nasa'} />
            <NewsCarousel Endpoint={'/api/news/pcgamer'} SiteName='PCGamer' />
            <NewsCarousel
                Endpoint={'/api/news/rockpapershotgun'}
                SiteName='Rock Paper Shotgun'
            />
            <NewsCarousel Endpoint={'/api/news/bbc'} SiteName='BBC' />
        </div>
    );
};

export default DashboardPage;
