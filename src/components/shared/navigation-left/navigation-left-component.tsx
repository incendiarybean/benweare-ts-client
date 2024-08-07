import { Docs, DocsList, Info, Newspaper, OpenBox, Packages } from '@icons';

import { NavLink } from 'react-router-dom';

const LeftNavigationBar = () => {
    return (
        <div
            data-cy='navigation-left'
            className='flex-1 hidden md:flex justify-end md:mx-4 min-w-[12rem]'
        >
            <div className='flex flex-col gap-2 w-48 mt-28 fixed top-0'>
                <NavLink
                    to='/dashboard'
                    className={({ isActive }) =>
                        `left-internal-link ${isActive ? 'active' : 'inactive'}`
                    }
                    aria-label='News Dashboard Page'
                >
                    <Newspaper />

                    <p className='left-menu-item'>Dashboard</p>
                </NavLink>
                <NavLink
                    to='/news-feed'
                    className={({ isActive }) =>
                        `left-internal-link ${isActive ? 'active' : 'inactive'}`
                    }
                    aria-label='All News Page'
                >
                    <DocsList />

                    <p className='left-menu-item'>News Feed</p>
                </NavLink>
                <NavLink
                    to='/'
                    className={({ isActive }) =>
                        `left-internal-link ${isActive ? 'active' : 'inactive'}`
                    }
                    aria-label='About Ben Weare Page'
                >
                    <Info />

                    <p className='left-menu-item'>About</p>
                </NavLink>
                <NavLink
                    to='/documentation'
                    className={({ isActive }) =>
                        `left-internal-link ${isActive ? 'active' : 'inactive'}`
                    }
                    aria-label='API Documentation Page'
                >
                    <Docs />

                    <p className='left-menu-item'>Documentation</p>
                </NavLink>
                <a
                    target='_blank'
                    rel='noreferrer'
                    href='https://github.com/incendiarybean'
                    className='left-external-link'
                    aria-label="Ben's GitHub Page"
                >
                    <OpenBox />

                    <p className='left-menu-item'>GitHub</p>
                </a>
                <a
                    target='_blank'
                    rel='noreferrer'
                    href='https://www.npmjs.com/~incendiarybean'
                    className='left-external-link'
                    aria-label="Ben's NPM Packages"
                >
                    <Packages />

                    <p className='left-menu-item'>Packages</p>
                </a>
            </div>
        </div>
    );
};

export default LeftNavigationBar;
