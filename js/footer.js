const dataRaw = "./data/footer.json"
const body = document.querySelector("body");

export async function getfooterData() {
    const dataFetch = await fetch(dataRaw)
    if (dataFetch.ok) {
        const data = await dataFetch.json();
        const footer = body.appendChild(document.createElement('footer'));
        for (const list of data.content) {
            const container = footer.appendChild(document.createElement('ul'));
            const title = container.appendChild(document.createElement('h1'));
            title.textContent = `${list.title}`;
            for (const info of list.info) {
                const infoContainer = container.appendChild(document.createElement('li'));
                if (info.img) {
                    const element = infoContainer.appendChild(document.createElement('a'));
                    const img = element.appendChild(document.createElement('img'));
                    img.src = info.img
                    element.innerHTML += info.desc
                    if (info.reference) {
                        element.href = info.reference
                    }
                }
                else {
                    const rights = container.appendChild(document.createElement('a'));
                    rights.textContent = `${info.desc}`;
                }
            }
        }
    }
}