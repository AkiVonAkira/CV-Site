import { getNavbarData } from "./navbar.js";
import { getfooterData } from "./footer.js";
import { stickyHeader } from "./app.js";

getNavbarData(2).then((result) => {
    getPageData().then((result) => {
        getfooterData();
        showSlides(slideIndex);
    })
});

window.onscroll = function () { stickyHeader() };

async function getPageData() {
    const container = document.querySelector(".container");
    const dataRaw = "./data/stardew.json";
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

        for (const array of data.content) {
            const contentSection = content.appendChild(document.createElement('section'));
            const contentText = contentSection.appendChild(document.createElement('div'));
            contentText.classList = "content-text";

            const contentTextH1 = contentText.appendChild(document.createElement('h1'));
            if (array.paragraph) {
                const contentTextP = contentText.appendChild(document.createElement('p'));
                contentTextP.innerHTML = `${array.paragraph}`;
            }
            contentTextH1.textContent = array.title;

            const slideshowContainer = contentSection.appendChild(document.createElement('div'));
            slideshowContainer.classList = "slideshow-container";

            const prev = slideshowContainer.appendChild(document.createElement('a'));
            prev.classList = "prev";
            prev.setAttribute("onclick", `plusSlides(-1)`);
            prev.textContent = "❮";


            for (const image of array.image) {
                const mySlides = slideshowContainer.appendChild(document.createElement('div'));
                const figureIMG = mySlides.appendChild(document.createElement('img'));
                figureIMG.src = image;
                mySlides.classList = "mySlides fade";
            }


            const next = slideshowContainer.appendChild(document.createElement('a'));
            next.classList = "next";
            next.setAttribute("onclick", "plusSlides(1)");
            next.textContent = "❯";


            const dotContainer = contentSection.appendChild(document.createElement('div'));
            dotContainer.classList = "dot-container"
            for (let i = 0; i < array.image.length; i++) {
                const dot = dotContainer.appendChild(document.createElement('span'));
                dot.classList = "dot";
                dot.onclick = `${currentSlide(i)}`;
            }
        }
    }
}

let slideIndex = 0;

function plusSlides(n) {
    showSlides(slideIndex += n);
    console.log("plusslides");
}

function currentSlide(n) {
    showSlides(slideIndex = n);
    console.log("currentslide");
}

function showSlides(n) {
    let i;
    const slides = document.querySelectorAll(".mySlides");
    const dots = document.querySelectorAll(".dot");
    if (n > slides.length) { slideIndex = 0 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
    console.log(slides);
}