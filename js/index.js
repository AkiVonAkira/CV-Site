import { createContainer } from "./app.js";
import { getNavbarData } from "./navbar.js";
import { getfooterData } from "./footer.js";

createContainer();

const dataRaw = "./data/index.json";
const container = document.querySelector(".container");

getNavbarData(container, 0).then((result) => {
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

        const contentSection = content.appendChild(document.createElement('section'));
        const contentText = contentSection.appendChild(document.createElement('div'));
        contentText.classList = "content-text";

        const contentTextH4 = contentText.appendChild(document.createElement('h4'));
        const contentTextH1 = contentText.appendChild(document.createElement('h1'));
        contentTextH4.textContent = data.content[0].introduction;
        contentTextH1.innerHTML = `${data.content[0].name}<br><span>${data.content[0].occupation}</span>`;

        const statsList = contentSection.appendChild(document.createElement('ul'));
        statsList.classList = "stats-list";
        for (const stat of data.stats) {
            const statsListItemElement = statsList.appendChild(document.createElement('li'));
            statsListItemElement.classList = "stats-list-item";
            statsListItemElement.innerHTML = `<strong>${stat.itemData}</strong><span>${stat.itemDesc}</span>`;
        }

        const linkContainer = container.appendChild(document.createElement('div'));
        linkContainer.classList = "link-container";
        linkContainer.id = "item-container";

        const linkList = linkContainer.appendChild(document.createElement('ul'));
        linkList.classList = "link-list";
        linkList.id = "item-list";
        for (const link of data.links) {
            const linkListItemElement = linkList.appendChild(document.createElement('li'));
            linkListItemElement.classList = "link-list-item";
            linkListItemElement.innerHTML = `<a href="${link.itemReference}" target="_blank"><img src="${link.itemSrc}"/> ${link.itemDesc}</a>`;
        }
    }
}