/* TYPES FOR CLIENT */
export type NewsArticle = {
    id: number;
    title: string;
    url: string;
    description?: string;
    img: string;
    date: string;
};

export type WeatherTimeSeries = {
    lowTemp: string;
    maxFeels: string;
    maxTemp: string;
    maxWindSpeed: number;
    weather: string;
    weatherDescription: string;
    date: string;
    id: number;
};

export type NewsCarousel = {
    Endpoint: string;
    SiteName: string;
};

export type Card = {
    Endpoint: string;
};

export type NewsCard = {
    SiteName: string;
} & Card;

export type NavbarProps = {
    isActivePage: (val: string) => boolean;
    setActivePage: React.Dispatch<string>;
};

export type ErrorComponentProps = {
    err: { feedName: string };
};

export type ArrowComponentProps = {
    display: boolean;
};
