import { getNavbarData } from "./navbar.js";
import { getfooterData } from "./footer.js";
import { stickyHeader } from "./app.js";

getNavbarData(2).then((result) => {
    getPageData().then((result) => {
        getfooterData();
    })
});

window.onscroll = () => { stickyHeader() };
addEventListener('click', (event) => {
    if (event.target.classList == "next") {
        plusSlides(1)
    }
    if (event.target.classList == "prev") {
        plusSlides(-1)
    }
    if (event.target.classList == "dot") {
        currentSlide(event.target.innerHTML)
    }
    return;
});

let slideIndex = 1;

async function getPageData() {
    const container = document.querySelector(".container");
    const dataRaw = "./data/stardew.json";
    const dataFetch = await fetch(dataRaw)
    if (dataFetch.ok) {
        const data = await dataFetch.json();
        const contentElem = container.appendChild(document.createElement('div'));
        contentElem.classList = "content";
        contentElem.id = "content-stardew";

        for (const content of data.content) {
            const contentSection = contentElem.appendChild(document.createElement('section'));
            const contentText = contentSection.appendChild(document.createElement('div'));
            contentText.classList = "content-text";
            const contentTextH1 = contentText.appendChild(document.createElement('h1'));
            if (content.paragraph) {
                const contentTextP = contentText.appendChild(document.createElement('p'));
                contentTextP.innerHTML = `${content.paragraph}`;
            }
            contentTextH1.textContent = content.title;
            if (content.imageClass) {
                const contentFigure = contentSection.appendChild(document.createElement('figure'));
                const figureIMG = contentFigure.appendChild(document.createElement('img'));
                figureIMG.classList = "stardew-image";
                figureIMG.src = content.image;
            }

            else {
                const dotContainer = contentSection.appendChild(document.createElement('div'));
                dotContainer.classList = "dot-container"
                const prev = dotContainer.appendChild(document.createElement('a'));
                prev.classList = "prev";
                prev.textContent = "❮";

                const slideshowContainer = contentSection.appendChild(document.createElement('div'));
                slideshowContainer.classList = "slideshow-container";
                for (const image of content.image) {
                    const mySlides = slideshowContainer.appendChild(document.createElement('div'));
                    const figureIMG = mySlides.appendChild(document.createElement('img'));
                    mySlides.classList = "mySlides fade";
                    figureIMG.src = image;
                }

                for (let i = 0; i < content.image.length; i++) {
                    const dot = dotContainer.appendChild(document.createElement('span'));
                    dot.classList = "dot";
                    dot.textContent = i + 1;
                }
                const next = dotContainer.appendChild(document.createElement('a'));
                next.classList = "next";
                next.textContent = "❯";
            }
        }
        showSlides(slideIndex);
    }
}
var intervalId = window.setInterval(() => {
    plusSlidesInterval(1)
}, 10000);

function plusSlides(n) {
    showSlides(slideIndex += n);
    clearInterval(intervalId)
}

function plusSlidesInterval(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
    clearInterval(intervalId)
}

function showSlides(n) {
    const slides = document.querySelectorAll(".mySlides");
    const dots = document.querySelectorAll(".dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (const slide of slides) {
        slide.style.display = "none";
    }
    for (const dot of dots) {
        dot.className = dot.className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}