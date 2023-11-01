import type { NavbarProps } from '@common/types';
import DesktopNav from './device/desktop-orientation';
import MobileNav from './device/mobile-orientation';

const NavigationBar = ({ setActivePage, isActivePage }: NavbarProps) => {
    return (
        <div className='navigation navigation-top'>
            <div className='max-w-8xl mx-auto'>
                <div className='navigation-top-wrapper'>
                    <MobileNav {...{ setActivePage, isActivePage }} />
                    <div className='mx-4 flex items-center justify-between md:justify-start w-full'>
                        <a
                            className='mr-3 flex-none w-auto overflow-hidden'
                            href='/'
                        >
                            <span className='py-1 px-2 border border-sky-500 dark:border-sky-400/20 rounded text-sky-500 dark:text-sky-400 hover:text-blue-600 dark:hover:text-sky-600'>
                                benweare.co.uk
                            </span>
                        </a>
                        <span className='ml-3 text-xs leading-5 font-medium text-sky-600 dark:text-sky-400 bg-sky-400/30 dark:bg-sky-400/10 rounded-full py-1 px-3 items-center'>
                            <strong className='font-semibold'>
                                v{VITE_APP_VERSION}
                            </strong>
                        </span>
                    </div>
                    <DesktopNav />
                </div>
            </div>
        </div>
    );
};

export default NavigationBar;
