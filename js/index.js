import { getNavbarData } from "./navbar.js";
import { getfooterData } from "./footer.js";
import { stickyHeader } from "./app.js";

getNavbarData(0).then((result) => {
    getPageData().then((result) => {
        getfooterData();
    })
});

window.onscroll = () => { stickyHeader() };

async function getPageData() {
    const container = document.querySelector(".container");
    const dataRaw = "./data/index.json";
    const dataFetch = await fetch(dataRaw)
    if (dataFetch.ok) {
        const data = await dataFetch.json();

        const content = container.appendChild(document.createElement('div'));
        content.classList = "content";
        content.id = "content-index";

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
    }
}