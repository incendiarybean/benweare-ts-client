import 'animate.css';
import 'react-toastify/dist/ReactToastify.css';
import './common/utils/socket';

import {
    LeftNavigationBar,
    NavigationBar,
    RightNavigationBar,
    Routes,
} from '@components';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const App = () => {
    const [activePage, setActivePage] = useState<string>(
        window.location.pathname
    );

    useEffect(() => {
        if (window.matchMedia('(prefers-color-scheme: dark)')?.matches) {
            toast.dark('👋 Welcome!', {
                position: 'bottom-left',
                draggable: true,
            });
        } else {
            toast('👋 Welcome!', { position: 'bottom-left', draggable: true });
        }

        setActivePage(window.location.pathname);
    }, []);

    const isActivePage = (route: string): boolean => activePage === route;

    return (
        <Router>
            <div>
                <ToastContainer />
                <div>
                    <NavigationBar {...{ setActivePage, isActivePage }} />
                    <div className='body-wrapper'>
                        <LeftNavigationBar
                            {...{
                                setActivePage,
                                isActivePage,
                            }}
                        />
                        <div className='w-full md:max-w-4xl px-4 md:px-0 md:h-auto lg:border-l lg:border-r border-slate-300 dark:border-zinc-600/20'>
                            <Routes />
                        </div>
                        <RightNavigationBar />
                    </div>
                </div>
            </div>
        </Router>
    );
};

export default App;
