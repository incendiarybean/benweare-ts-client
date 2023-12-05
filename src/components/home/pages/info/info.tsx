import profile_image from '@common/images/profile-sm.webp';
import { ArrowComponent } from '@components';
import { useEffect, useState } from 'react';

const InfoPage = () => {
    const [show, setShow] = useState<boolean>(false);
    const [loaded, setLoaded] = useState<boolean>(false);

    const preloadImage = () => {
        const img = new Image();
        img.src = profile_image;
        setLoaded(true);
    };

    useEffect(() => {
        preloadImage();
    }, []);

    return (
        <div className='info-page'>
            {loaded && (
                <div className='animate__animated animate__fadeIn animate__faster px-2 md:px-6 my-3 w-full'>
                    <div className='wrapper'>
                        <div className='content'>
                            <div className='image-wrapper'>
                                <img
                                    className='image'
                                    src={profile_image}
                                    alt="Ben Weare, Benjamin Weare's mugshot"
                                    loading='eager'
                                />
                            </div>
                            <div className='context'>
                                <h1>Ben Weare</h1>
                                <h2>Gloucestershire, England</h2>
                                <hr />
                                <p>
                                    I'm an aspiring Full-Stack Software
                                    Developer. I work mostly with NodeJS and
                                    Python with hosting using AWS
                                    infrastructure/Heroku.
                                </p>
                            </div>
                            <button
                                className='group hover:text-blue-600 mt-10 flex w-full'
                                onClick={() => setShow(!show)}
                            >
                                <hr className='z-0 w-full' />

                                <div className='z-10 -mt-3 min-w-fit px-2 text-xs uppercase flex flex-row items-center'>
                                    <p className='mr-1'>
                                        Languages &amp; Experience
                                    </p>
                                    <ArrowComponent display={show} />
                                </div>
                                <hr className='z-0 w-full' />
                            </button>
                        </div>
                    </div>
                    <div hidden={!show} className='info-page-service-list'>
                        <div className='snap-start'>
                            <p className='heading'>Services/Environments</p>
                            <div className='service-list-wrapper'>
                                <a
                                    href='https://www.docker.com/'
                                    className='service-list first-item'
                                >
                                    Docker
                                </a>

                                <a
                                    href='https://aws.amazon.com/'
                                    className='service-list item'
                                >
                                    AWS CLI
                                </a>

                                <a
                                    href='https://www.heroku.com/'
                                    className='service-list item'
                                >
                                    HEROKU CLI
                                </a>

                                <a
                                    href='https://microk8s.io/'
                                    className='service-list item'
                                >
                                    MicroK8s
                                </a>

                                <a
                                    href='https://kubernetes.io/'
                                    className='service-list item'
                                >
                                    Kubernetes
                                </a>

                                <a
                                    href='https://nodejs.org/en/'
                                    className='service-list item'
                                >
                                    NodeJS
                                </a>
                            </div>
                        </div>
                        <div className='snap-start'>
                            <p className='heading'>Proficient Languages</p>
                            <div className='service-list-wrapper'>
                                <a
                                    href='https://www.typescriptlang.org/'
                                    className='service-list first-item'
                                >
                                    TYPESCRIPT/JAVASCRIPT
                                </a>

                                <a
                                    href='https://www.python.org/'
                                    className='service-list item'
                                >
                                    PYTHON
                                </a>

                                <a
                                    href='https://www.php.net/'
                                    className='service-list item'
                                >
                                    PHP
                                </a>
                            </div>
                        </div>
                        <div className='snap-start'>
                            <p className='heading'>Minor Language Experience</p>
                            <div className='service-list-wrapper'>
                                <a
                                    href='https://docs.microsoft.com/en-us/cpp/?view=msvc-170'
                                    className='service-list first-item'
                                >
                                    C++
                                </a>

                                <a
                                    href='https://docs.microsoft.com/en-us/dotnet/csharp/'
                                    className='service-list item'
                                >
                                    C#
                                </a>

                                <a
                                    href='https://www.rust-lang.org/'
                                    className='service-list item'
                                >
                                    Rust
                                </a>
                            </div>
                        </div>
                        <div className='snap-start'>
                            <p className='heading'>Databases</p>
                            <div className='service-list-wrapper'>
                                <a
                                    href='https://www.mysql.com/'
                                    className='service-list first-item'
                                >
                                    MySQL
                                </a>

                                <a
                                    href='https://aws.amazon.com/dynamodb/'
                                    className='service-list item'
                                >
                                    DynamoDB
                                </a>

                                <a
                                    href='https://www.mongodb.com/'
                                    className='service-list item'
                                >
                                    MongoDB
                                </a>
                            </div>
                        </div>
                        <div className='snap-start'>
                            <p className='heading'>JS Frameworks</p>
                            <div className='service-list-wrapper'>
                                <a
                                    href='https://www.npmjs.com/package/express'
                                    className='service-list first-item'
                                >
                                    Express
                                </a>

                                <a
                                    href='https://reactjs.org/'
                                    className='service-list item'
                                >
                                    React (Functional)
                                </a>

                                <a
                                    href='https://www.npmjs.com/package/tailwindcss'
                                    className='service-list item'
                                >
                                    Tailwind
                                </a>

                                <a
                                    href='https://www.npmjs.com/package/passport'
                                    className='service-list item'
                                >
                                    Passport
                                </a>

                                <p className='service-list item'>Plus more!</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InfoPage;
