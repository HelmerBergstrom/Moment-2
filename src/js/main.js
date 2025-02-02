"use strict";

document.addEventListener("DOMContentLoaded", function () {
    const hamburgare = document.querySelector(".hamburger");
    const mobilMeny = document.querySelector(".mobile-menu");

    hamburgare.addEventListener("click", () => {
        mobilMeny.classList.toggle("open");
    })
})

async function getData() {
    try {
        const response = await fetch(
            "https://webbutveckling.miun.se/files/ramschema_ht24.json"
        );
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error("Error: ", error);
    }
    console.log("Fortsätt.")
}

getData();