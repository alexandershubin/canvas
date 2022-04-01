window.addEventListener('DOMContentLoaded', function () {
    const canvasColorsStars = document.getElementById('colors-start');
    const canvasWhiteStars = document.getElementById('white-stars');

    const positionX = 100;
    const positionY = 300;
    const bigRadius = 50;
    const smallRadius = 25;

    const colorsArray = ["#ff0000", "#001bff", "#0eff00", "#ffec00", "#000000", "#ffffff"];

    const startsData = {
        red: {color: colorsArray[0], left: 50, right: 150},
        blue: {color: colorsArray[1], left: 150, right: 250},
        green: {color: colorsArray[2], left: 250, right: 350},
        yellow: {color: colorsArray[3], left: 350, right: 450},
        black: {color: colorsArray[4], left: 450, right: 550},
    }

    const drawStarsCanvas = (element, positionX, positionY, color) => {
        const startFrom = 18;
        const startTo = 52;

        const context = element.getContext('2d');
        context.beginPath();

        const getCordStars = (number, i, radius) => ({
            x: Math.cos((number + i * 72) / 180 * Math.PI) * radius + positionX,
            y: -Math.sin((number + i * 72) / 180 * Math.PI) * radius + positionY
        });

        for (let i = 0; i < 5; i++) {
            context.lineTo(getCordStars(startFrom, i, bigRadius).x, getCordStars(startFrom, i, bigRadius).y);
            context.lineTo(getCordStars(startTo, i, smallRadius).x, getCordStars(startTo, i, smallRadius).y);
        }

        element.style.cursor = 'pointer'
        context.closePath();
        context.fillStyle = color;
        context.fill();
        context.stroke();
    }

    const getCountStar = (count = 5) => {
        for (let i = 0; i < count; i++) {
            const x = (i + 1) * positionX;
            drawStarsCanvas(canvasColorsStars, x, positionY, colorsArray[i]);
            drawStarsCanvas(canvasWhiteStars, x, 80, colorsArray[colorsArray.length - 1]);
        }
    }

    const getSizeCanvas = (element, width = 600, height = 600) => {
        element.width = width;
        element.height = height;

        getCountStar();
    }

    const handlerClickOnStars = (element) => {
        element.addEventListener('click', e => {
            const {offsetX, offsetY} = e;
            const {height} = element.getBoundingClientRect();
            const topCanvas = (height / 2) + bigRadius;
            const bottomCanvas = (height / 2) - bigRadius;

            for (let key in startsData) {
                const cursorPosYColors = offsetY > bottomCanvas && offsetY < topCanvas;
                const cursorPosX = offsetX > startsData[key]['left'] && offsetX < startsData[key]['right'];

                if (cursorPosYColors && cursorPosX) {
                    element === canvasColorsStars
                        ? drawStarsCanvas(canvasWhiteStars, startsData[key]['left'] + 50, 80, startsData[key]['color'])
                        : drawStarsCanvas(canvasWhiteStars, startsData[key]['left'] + 50, 80, colorsArray[colorsArray.length - 1]);
                }
            }
        });
    }

    handlerClickOnStars(canvasColorsStars);
    handlerClickOnStars(canvasWhiteStars);
    getSizeCanvas(canvasColorsStars);
    getSizeCanvas(canvasWhiteStars, 600, 150);
});
