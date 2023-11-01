import { ExternalClickHandler } from '@common/hooks/externalClickHandler';
import type { NavbarProps } from '@common/types';
import { animateCSS } from '@common/utils';
import { createRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Box,
    Burger,
    Cross,
    Home,
    Info,
    Newspaper,
    OpenBox,
    Packages,
} from 'src/components/shared/icons';

const MobileNav = ({ setActivePage, isActivePage }: NavbarProps) => {
    const [settingsOpen, setSettingsOpen] = useState(false);

    const accountElement = createRef<HTMLDivElement>();
    ExternalClickHandler(accountElement, setSettingsOpen);

    const openNavigation = (open = !settingsOpen) => {
        if (open) {
            animateCSS('.popin-settings', 'slideInLeft');
            setSettingsOpen(open);
        } else {
            setSettingsOpen(false);
        }
    };

    return (
        <div className='mobile-orientation'>
            <button
                onClick={() => openNavigation()}
                type='button'
                className='burger-menu-icon'
            >
                <span className='sr-only'>Navigation</span>
                <Burger />
            </button>
            <div hidden={!settingsOpen} className='mobile-menu-wrapper'>
                <div className='popin-settings mobile-menu-flex'>
                    <div ref={accountElement} className='mobile-menu'>
                        <div className='space-y-2 mx-2'>
                            <div className='flex justify-between items-center pt-2 pb-1 border-b border-zinc-500'>
                                <h1 className='uppercase leading-wide font-bold mt-2'>
                                    Menu
                                </h1>
                                <button
                                    onClick={() => openNavigation(false)}
                                    className='close-menu-icon'
                                >
                                    <span className='sr-only'>
                                        Close Navigation
                                    </span>
                                    <Cross />
                                </button>
                            </div>

                            <Link
                                to='/dashboard'
                                className={`mobile-internal-link ${
                                    isActivePage('/dashboard')
                                        ? 'active'
                                        : 'inactive'
                                }`}
                                onClick={() => setActivePage('/dashboard')}
                            >
                                <div className='mobile-menu-icon'>
                                    <Home />
                                </div>

                                <p className='mobile-menu-item'>Dashboard</p>
                            </Link>

                            <Link
                                to='/'
                                className={`mobile-internal-link ${
                                    isActivePage('/') ? 'active' : 'inactive'
                                }`}
                                onClick={() => setActivePage('/')}
                            >
                                <div className='mobile-menu-icon'>
                                    <Info />
                                </div>

                                <p className='mobile-menu-item'>About</p>
                            </Link>

                            <a
                                target='_blank'
                                rel='noreferrer'
                                href='/api/docs'
                                className='mobile-external-link'
                            >
                                <div className='mobile-menu-icon'>
                                    <Newspaper />
                                </div>

                                <p className='p-1 mobile-menu-item font-medium'>
                                    Documentation
                                </p>
                            </a>

                            <a
                                target='_blank'
                                rel='noreferrer'
                                href='https://www.npmjs.com/~incendiarybean'
                                className='mobile-external-link'
                            >
                                <div className='mobile-menu-icon'>
                                    <Packages />
                                </div>

                                <p className='mobile-menu-item font-medium'>
                                    Packages
                                </p>
                            </a>

                            <a
                                target='_blank'
                                rel='noreferrer'
                                href='https://github.com/incendiarybean'
                                className='mobile-external-link'
                            >
                                <div className='mobile-menu-icon'>
                                    <OpenBox />
                                </div>

                                <p className='mobile-menu-item font-medium'>
                                    GitHub
                                </p>
                            </a>

                            <a
                                target='_blank'
                                rel='noreferrer'
                                href='https://hub.docker.com/u/incendiarybean'
                                className='mobile-external-link'
                            >
                                <div className='mobile-menu-icon'>
                                    <Box />
                                </div>

                                <p className='mobile-menu-item font-medium'>
                                    Docker
                                </p>
                            </a>
                        </div>
                        <div className='footer'>
                            <span className='footer-info'>
                                <strong className='font-semibold'>
                                    benweare.co.uk
                                </strong>
                            </span>
                            <span className='footer-info'>
                                <strong className='font-semibold'>
                                    v{VITE_APP_VERSION}
                                </strong>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileNav;
