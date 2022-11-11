const dataRaw = "./data/navbar.json"

export async function getNavbarData(currentPage) {
    const dataFetch = await fetch(dataRaw)
    if (dataFetch.ok) {
        const data = await dataFetch.json();
        const hero = document.querySelector("body").appendChild(document.createElement('div'));
        hero.classList = "hero";
        const header = hero.appendChild(document.createElement('header'));
        const container = hero.appendChild(document.createElement('div'));
        container.classList = "container";

        const headerH1 = header.appendChild(document.createElement('h1'));
        const input = header.appendChild(document.createElement('input'));
        const label = header.appendChild(document.createElement('label'));
        const labelSpan = label.appendChild(document.createElement('span'));
        const nav = header.appendChild(document.createElement('nav'));
        const navList = nav.appendChild(document.createElement('ul'));

        headerH1.classList = "logo";
        headerH1.innerHTML = `<span>${data.name[0].prefix}</span> ${data.name[0].first} <span>/${data.name[0].last}</span>`;
        input.classList = "side-menu";
        input.type = "checkbox";
        input.id = "side-menu";
        label.classList = "burger";
        label.htmlFor = "side-menu";
        labelSpan.classList = "burger-line";
        navList.classList = "nav-list";
        for (const link of data.nav) {
            const navListItemElement = navList.appendChild(document.createElement('li'));
            navListItemElement.classList = "nav-list-item";
            const navLink = navListItemElement.appendChild(document.createElement('a'));
            navLink.href = link.itemReference;
            navLink.textContent = link.itemDesc;
            navListItemElement.value = link.value;
            if (link.value == currentPage) {
                navListItemElement.id = "currentpage"
            }
        }
    }
}