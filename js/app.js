export function stickyHeader() {
    const header = document.querySelector("header");
    const sticky = header.offsetTop;
    if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }
} 