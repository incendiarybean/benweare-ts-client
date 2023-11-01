import type { NavbarProps } from '@common/types';
import { Link } from 'react-router-dom';
import {
    Box,
    Home,
    Info,
    Newspaper,
    OpenBox,
    Packages,
} from 'src/components/shared/icons';

const LeftNavigationBar = ({ setActivePage, isActivePage }: NavbarProps) => {
    return (
        <div className='navigation navigation-left'>
            <div className='group navigation-left-wrapper'>
                <Link
                    to='/dashboard'
                    className={`left-menu-internal-link ${
                        isActivePage('/dashboard') ? 'active' : 'inactive'
                    } `}
                    onClick={() => setActivePage('/dashboard')}
                >
                    <div className='left-menu-item-icon'>
                        <Home />
                    </div>

                    <p className='left-menu-item'>Dashboard</p>
                </Link>

                <Link
                    to='/'
                    className={`left-menu-internal-link ${
                        isActivePage('/') ? 'active' : 'inactive'
                    } `}
                    onClick={() => setActivePage('/')}
                >
                    <div className='left-menu-item-icon'>
                        <Info />
                    </div>

                    <p className='left-menu-item'>About</p>
                </Link>

                <Link
                    to='/documentation'
                    className={`left-menu-internal-link ${
                        isActivePage('/documentation') ? 'active' : 'inactive'
                    } `}
                    onClick={() => setActivePage('/documentation')}
                >
                    <div className='left-menu-item-icon'>
                        <Newspaper />
                    </div>

                    <p className='left-menu-item font-medium'>Documentation</p>
                </Link>

                <a
                    target='_blank'
                    rel='noreferrer'
                    href='https://www.npmjs.com/~incendiarybean'
                    className='left-menu-external-link'
                >
                    <div className='left-menu-item-icon'>
                        <Packages />
                    </div>

                    <p className='left-menu-item font-medium'>Packages</p>
                </a>

                <a
                    target='_blank'
                    rel='noreferrer'
                    href='https://github.com/incendiarybean'
                    className='left-menu-external-link'
                >
                    <div className='left-menu-item-icon'>
                        <OpenBox />
                    </div>

                    <p className='left-menu-item font-medium'>GitHub</p>
                </a>

                <a
                    target='_blank'
                    rel='noreferrer'
                    href='https://hub.docker.com/u/incendiarybean'
                    className='left-menu-external-link'
                >
                    <div className='left-menu-item-icon'>
                        <Box />
                    </div>

                    <p className='left-menu-item font-medium'>Docker</p>
                </a>
            </div>
        </div>
    );
};

export default LeftNavigationBar;
