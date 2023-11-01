import { GitHub, Newspaper, Npm } from 'src/components/shared/icons';

const DesktopNav = () => {
    return (
        <div className='desktop-orientation'>
            <nav className='desktop-menu-wrapper'>
                <ul className='flex space-x-4'>
                    <li>
                        <a
                            className='desktop-external-link'
                            href='https://benweare.co.uk/api/docs'
                        >
                            <span className='sr-only'>API Documentation</span>
                            <Newspaper />
                        </a>
                    </li>
                    <li className='flex items-center'>
                        <a
                            className='desktop-external-link'
                            href='https://www.npmjs.com/~incendiarybean'
                        >
                            <span className='sr-only'>
                                IncendiaryBean's NPM
                            </span>
                            <Npm />
                        </a>
                    </li>
                    <li className='flex items-center'>
                        <a
                            className='desktop-external-link'
                            href='https://github.com/incendiarybean'
                        >
                            <span className='sr-only'>
                                IncendiaryBean's Github
                            </span>
                            <GitHub />
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    );
};
export default DesktopNav;
