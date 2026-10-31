//this for placing the equations ramdomly in the hero section of the portfolio 
function placeEquations() {

    const eqs = [...document.querySelectorAll(".equations span")];

    const container = document.querySelector(".equations");

    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    const placed = [];

    eqs.forEach(el => {

        // Reset previous position
        el.style.left = "0px";
        el.style.top = "0px";

        const width = el.offsetWidth;
        const height = el.offsetHeight;

        let x, y;
        let attempts = 0;
        let overlapping;

        do {

            x = Math.random() * Math.max(0, containerWidth - width);
            y = Math.random() * Math.max(0, containerHeight * 0.7 - height);

            overlapping = placed.some(pos => {

                return (
                    x < pos.x + pos.width + 20 &&
                    x + width + 20 > pos.x &&
                    y < pos.y + pos.height + 15 &&
                    y + height + 15 > pos.y
                );

            });

            attempts++;

        } while (overlapping && attempts < 100);

        el.style.left = x + "px";
        el.style.top = y + "px";

        placed.push({
            x,
            y,
            width,
            height
        });

        el.style.animationDelay = Math.random() * 4 + "s";

    });
}

placeEquations();

window.addEventListener("resize", placeEquations);