export const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

export const animateCSS = (
    element: string,
    animation: string,
    runOnEnd?: Function
): Promise<void> =>
    new Promise((resolve) => {
        const animationName = `animate__${animation}`;
        const node = document.querySelector(element);

        if (node) {
            node.classList.add(
                'animate__animated',
                'animate__faster',
                animationName
            );
            node.addEventListener(
                'animationend',
                (event: Event) => {
                    event.stopPropagation();

                    if (runOnEnd) {
                        runOnEnd();
                    }

                    node.classList.remove(
                        'animate__animated',
                        'animate__faster',
                        animationName
                    );
                    resolve();
                },
                {
                    once: true,
                }
            );
        }
    });

export { default as IO } from './socket';
