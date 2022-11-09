const dataRaw = "./data/footer.json"
const body = document.querySelector("body");

export async function getfooterData() {
    const dataFetch = await fetch(dataRaw)
    if (dataFetch.ok) {
        const data = await dataFetch.json();
        const footer = body.appendChild(document.createElement('footer'));
        footer.textContent = `${data.content}`;
    }
}