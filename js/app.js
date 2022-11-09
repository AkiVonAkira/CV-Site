export function createContainer() {
    const hero = document.querySelector("body").appendChild(document.createElement('div'));
    hero.classList = "hero";
    const container = hero.appendChild(document.createElement('div'));
    container.classList = "container";
}