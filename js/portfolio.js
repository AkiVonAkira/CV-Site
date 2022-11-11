import { getNavbarData } from "./navbar.js";
import { getfooterData } from "./footer.js";
import { stickyHeader } from "./app.js";

getNavbarData(2).then((result) => {
    getPageData().then((result) => {
        getfooterData();
    })
});

window.onscroll = () => { stickyHeader() };

async function getPageData() {
    const container = document.querySelector(".container");
    const dataRaw = "./data/portfolio.json";
    const dataFetch = await fetch(dataRaw)
    if (dataFetch.ok) {
        const data = await dataFetch.json();

        const content = container.appendChild(document.createElement('div'));
        content.classList = "content";
        content.id = "content-portfolio";

        for (const list of data.content) {
            const contentSection = content.appendChild(document.createElement('section'));
            const contentText = contentSection.appendChild(document.createElement('div'));
            contentText.classList = "content-text";

            const contentTextH4 = contentText.appendChild(document.createElement('h4'));
            const contentTextH1 = contentText.appendChild(document.createElement('h1'));
            const contentLink = contentText.appendChild(document.createElement('a'));
            const contentTextP = contentText.appendChild(document.createElement('p'));
            contentTextH4.textContent = list.title;
            contentTextH1.textContent = list.project;
            contentTextP.innerHTML = `${list.paragraph}`;
            contentLink.href = list.linkSrc
            contentLink.textContent = list.link

            const contentFigure = contentSection.appendChild(document.createElement('figure'));
            if (list.image) {
                const figureIMG = contentFigure.appendChild(document.createElement('img'));
                figureIMG.src = list.image;
                figureIMG.alt = list.alt;
            }
        }
    }
}