import { createContainer } from "./app.js";
import { getNavbarData } from "./navbar.js";
import { getfooterData } from "./footer.js";

createContainer();

const dataRaw = "./data/cv.json";
const container = document.querySelector(".container");

getNavbarData(container).then((result) => {
    getPageData().then((result) => {
        getfooterData();
    })
});

async function getPageData() {
    const dataFetch = await fetch(dataRaw)
    if (dataFetch.ok) {
        const data = await dataFetch.json();

        const content = container.appendChild(document.createElement('div'));
        content.classList = "content";
        content.id = "content-cv";

        for (const list of data.content) {
            const contentSection = content.appendChild(document.createElement('section'));
            const contentText = contentSection.appendChild(document.createElement('div'));
            contentText.classList = "content-text";

            const contentTextH4 = contentText.appendChild(document.createElement('h4'));
            const contentTextH1 = contentText.appendChild(document.createElement('h1'));
            const contentLink = contentText.appendChild(document.createElement('a'));
            const contentTextP = contentText.appendChild(document.createElement('p'));
            contentTextH4.textContent = list.time;
            contentTextH1.textContent = list.occupation;
            contentTextP.innerHTML = `${list.paragraph}`;
            contentLink.href = list.linkSrc
            contentLink.textContent = list.link
            contentLink.target = "_blank";

            const contentFigure = contentSection.appendChild(document.createElement('figure'));
            if (list.imageClass) contentFigure.classList = list.imageClass;
            const figureIMG = contentFigure.appendChild(document.createElement('img'));
            figureIMG.src = list.image;
            figureIMG.alt = list.alt;
            if (list.imageWidth && list.imageHeight) {
                figureIMG.width = list.imageWidth;
                figureIMG.height = list.imageHeight;
            }
        }
    }
}