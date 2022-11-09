import { createContainer } from "./app.js";
import { getNavbarData } from "./navbar.js";
import { getfooterData } from "./footer.js";

createContainer();

const dataRaw = "./data/stardew.json";
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
        content.id = "content-stardew";

        const contentSection = content.appendChild(document.createElement('section'));
        const contentText = contentSection.appendChild(document.createElement('div'));
        contentText.classList = "content-text";

        const contentTextH1 = contentText.appendChild(document.createElement('h1'));
        const contentLink = contentText.appendChild(document.createElement('a'));
        const contentTextP = contentText.appendChild(document.createElement('p'));
        contentTextH1.textContent = data.main[0].title;
        contentTextP.innerHTML = `${data.main[0].paragraph}`;
        contentLink.href = data.main[0].linkSrc
        contentLink.textContent = data.main[0].link

        const stardewImage = contentSection.appendChild(document.createElement('div'));
        stardewImage.classList = "stardew-image";
        const contentFigure = stardewImage.appendChild(document.createElement('figure'));
        const figureIMG = contentFigure.appendChild(document.createElement('img'));
        figureIMG.src = data.main[0].image;

        for (const list of data.content) {
            const contentSection = content.appendChild(document.createElement('section'));
            const contentText = contentSection.appendChild(document.createElement('div'));
            contentText.classList = "content-text";

            const contentTextH1 = contentText.appendChild(document.createElement('h1'));
            const contentTextP = contentText.appendChild(document.createElement('p'));
            contentTextH1.textContent = list.title;
            contentTextP.innerHTML = `${list.paragraph}`;

            const imageGrid = contentSection.appendChild(document.createElement('div'));
            imageGrid.classList = "image-grid";
            for (const image of list.image) {
                console.log(image);
                const contentFigure = imageGrid.appendChild(document.createElement('figure'));
                const figureIMG = contentFigure.appendChild(document.createElement('img'));
                figureIMG.src = image;
            }
        }
    }


    {/* <div class="content" id="content-stardew">
    <section>
        <div class="content-text">
            <h1>
                Stardew Valley Copy
            </h1>
            <a href="portfolio.html">./Portfolio</a>
            <p>
                I was never able to finish the project but I am happy with the amount of features I was able
                to implement in the short time frame I worked on it. <br>
                Below are some GIF's and Images of the project.
            </p>
        </div>
        <div class="stardew-image">
            <figure>
                <img src="img/stardew/17.18.15Unity_g1jcWO2hc7.png" alt="image">
            </figure>
        </div>
    </section>

    <section>
        <div class="content-text">
            <h1>
                GIF Showcases
            </h1>
            <p>
                Here you can see the character doing various stuff, such as;
                Breaking wood, tilling land, planting crop, talking to an NPC, showcasing
                crafting and going to a different zone.
            </p>
        </div>
    </section>
    <section>
        <div class="image-grid">
            <figure>
                <img src="img/stardew/08.03.22_P3oNlX32TO.gif" alt="image">
            </figure>
            <figure>
                <img src="img/stardew/18.05.57_DBBbdqj0GP.gif" alt="image">
            </figure>
            <figure>
                <img src="img/stardew/18.03.54_f0pIIqinY8.gif" alt="image">
            </figure>
        </div>
    </section>

    <section>
        <div class="content-text">
            <h1>
                Screenshots
            </h1>
        </div>
    </section>
    <section>
        <div class="image-grid">
            <figure>
                <img src="img/stardew/17.18.15Unity_g1jcWO2hc7.png" alt="image">
            </figure>
            <figure>
                <img src="img/stardew/17.18.16Unity_Bh2Ks1Ayoc.png" alt="image">
            </figure>
            <figure>
                <img src="img/stardew/17.18.19Unity_s7DluiHdff.png" alt="image">
            </figure>
            <figure>
                <img src="img/stardew/17.18.22Code_9R2bYCOIYn.png" alt="image">
            </figure>
            <figure>
                <img src="img/stardew/18.06.08Unity_6vn4qArHbc.png" alt="image">
            </figure>
            <figure>
                <img src="img/stardew/18.06.23Unity_WGKS560KSv.png" alt="image">
            </figure>
        </div>
    </section>
</div>
</div> */}
}