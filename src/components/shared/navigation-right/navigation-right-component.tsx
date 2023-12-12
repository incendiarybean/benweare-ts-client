const RightNavigationBar = () => {
    return (
        <div className='navigation navigation-right'>
            <div className='p-2 w-48 mt-28 fixed top-0'>
                <h1 className='px-2 text-xs uppercase border-b border-slate-500 dark:border-slate-100'>
                    external links
                </h1>
                <div className='ml-2 flex flex-col'>
                    <a
                        target='_blank'
                        rel='noreferrer'
                        href='https://steamcommunity.com/id/IncendiaryBean/'
                        className='my-1 px-2 default-link'
                    >
                        Steam
                    </a>
                    <a
                        target='_blank'
                        rel='noreferrer'
                        href='https://discordapp.com/users/Beanerino#0454'
                        className='my-1 px-2 default-link'
                    >
                        Discord
                    </a>
                    <a
                        target='_blank'
                        rel='noreferrer'
                        href='https://www.instagram.com/ben.weare/'
                        className='my-1 px-2 default-link'
                    >
                        Instagram
                    </a>
                    <a
                        target='_blank'
                        rel='noreferrer'
                        href='https://open.spotify.com/user/incendiarybean'
                        className='my-1 px-2 default-link'
                    >
                        Spotify
                    </a>
                </div>
            </div>
        </div>
    );
};

export default RightNavigationBar;
