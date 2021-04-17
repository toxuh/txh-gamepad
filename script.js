((window) => {
    const screenHeight = window.screen.height;
    const screenWidth = window.screen.width;
    const step = 5;

    const minSize = 5;
    const maxSize = 500;
    const sizeStep = 3;

    const container = document.querySelector('#root');
    const dot = document.createElement('div');

    container.appendChild(dot);

    window.addEventListener("gamepadconnected", function(e) {
        if (!navigator.getGamepads().length) {
            return;
        }

        const controller = navigator.getGamepads()[0];

        const vibrate = (duration = 1000, type = 'default') => {
            controller.vibrationActuator.playEffect('dual-rumble', {
                    duration: duration,
                    strongMagnitude: type === 'default' ? 1.0 : 0.5,
                    weakMagnitude: type === 'default' ? 1.0 : 0.5
                }
            )
        }

        const checkX = (value) => value > 0 && value < screenWidth;
        const checkY = (value) => value > 0 && value < screenHeight;
        const checkSize = (value) => value > minSize && value < maxSize;

        setInterval(() => {
            const leftXAxis = Math.round(navigator.getGamepads()[0].axes[0] * 100) / 100;
            const leftYAxis = Math.round(navigator.getGamepads()[0].axes[1] * 100) / 100;

            // const rightXAxis = Math.round(navigator.getGamepads()[0].axes[0] * 100) / 100;
            const rightYAxis = Math.round(navigator.getGamepads()[0].axes[3] * 100) / 100;

            const newXCoord = dot.getBoundingClientRect().left + (leftXAxis * step);
            const newYCoord = dot.getBoundingClientRect().top + (leftYAxis * step);

            const newSize = dot.getBoundingClientRect().width - (rightYAxis * sizeStep);

            if (Math.abs(leftXAxis) > 0.1 && checkX(newXCoord)) {
                dot.style.left = `${newXCoord}px`;
            } else if (!checkX(newXCoord)) {
                vibrate(30)
            }

            if (Math.abs(leftYAxis) > 0.1 && checkY(newYCoord)) {
                dot.style.top = `${newYCoord}px`;
            } else if (!checkY(newYCoord)) {
                vibrate(30)
            }

            if (Math.abs(rightYAxis) > 0.15 && checkSize(newSize)) {
                dot.style.height = `${newSize}px`;
                dot.style.width = `${newSize}px`;
            } else if (!checkSize(newSize)) {
                vibrate(30)
            }
        }, 10)
    });
})(window)