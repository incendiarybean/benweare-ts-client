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
    const [activePage, setActivePage] = useState<string>('/');

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
            <div className='text-slate-800 dark:text-white'>
                <ToastContainer />
                <div className=''>
                    <NavigationBar {...{ setActivePage, isActivePage }} />
                    <div className='w-full flex flex-col md:flex-row text-center justify-center min-w-[20rem]'>
                        <LeftNavigationBar
                            {...{
                                setActivePage,
                                isActivePage,
                            }}
                        />
                        <div className='w-full md:max-w-4xl px-2 sm:px-0 md:h-auto sm:border-l sm:border-r border-slate-300 dark:border-zinc-600/20'>
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
