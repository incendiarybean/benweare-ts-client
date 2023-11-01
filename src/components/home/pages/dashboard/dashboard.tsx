import { Card, NewsCarousel, NewsList, WeatherWidget } from '@components';

const DashboardPage = () => {
    return (
        <div className='select-none items-center flex flex-col w-full'>
            <div className='w-full flex flex-col-reverse lg:flex-row mt-4 lg:mt-2 gap-2 lg:gap-0'>
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
