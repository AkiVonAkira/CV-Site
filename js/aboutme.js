import { getNavbarData } from "./navbar.js";
import { getfooterData } from "./footer.js";
import { stickyHeader } from "./app.js";

getNavbarData(1).then((result) => {
    getPageData().then((result) => {
        getfooterData();
    })
});

window.onscroll = function () { stickyHeader() };

async function getPageData() {
    const container = document.querySelector(".container");
    const dataRaw = "./data/aboutme.json";
    const dataFetch = await fetch(dataRaw)
    if (dataFetch.ok) {
        const data = await dataFetch.json();

        const content = container.appendChild(document.createElement('div'));
        content.classList = "content";
        content.id = "content-aboutme";

        const contentFigure = content.appendChild(document.createElement('figure'));
        const figureIMG = contentFigure.appendChild(document.createElement('img'));
        figureIMG.src = data.content[0].image;
        figureIMG.alt = data.content[0].alt;

        const contentSection = content.appendChild(document.createElement('section'));
        const contentText = contentSection.appendChild(document.createElement('div'));
        contentText.classList = "content-text";

        const contentTextH4 = contentText.appendChild(document.createElement('h4'));
        const contentTextP = contentText.appendChild(document.createElement('p'));
        contentTextH4.textContent = data.content[0].introduction;
        contentTextP.innerHTML = `${data.content[0].paragraph}`;

        const skillContainer = container.appendChild(document.createElement('div'));
        skillContainer.classList = "skill-container";
        skillContainer.id = "item-container";

        const skillList = skillContainer.appendChild(document.createElement('ul'));
        skillList.classList = "skill-list";
        skillList.id = "item-list";
        for (const link of data.skills) {
            const linkListItemElement = skillList.appendChild(document.createElement('li'));
            const skillIMG = linkListItemElement.appendChild(document.createElement('img'));
            linkListItemElement.classList = "skill-list-item";
            skillIMG.src = link.image;
        }
    }
}