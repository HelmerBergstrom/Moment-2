"use strict";

document.addEventListener("DOMContentLoaded", function () {
    const hamburgare = document.querySelector(".hamburger");
    const mobilMeny = document.querySelector(".mobile-menu");

    hamburgare.addEventListener("click", () => {
        mobilMeny.classList.toggle("open");
    })
})

let courseInfoEl = [];

window.onload = () => {
    getData();
}

async function getData() {
    try {
        const response = await fetch("https://webbutveckling.miun.se/files/ramschema_ht24.json" );
        if (!response.ok) {
            throw new Error("Fel vid anslutning. Försök igen senare");
        }

        courseInfoEl = await response.json();
        printData(courseInfoEl); 

    } catch (error) {
        console.error(error);
        document.querySelector(`#error`).innerHTML = "<p> Fel. Prova igen senare! </p>"
    }
}

function printData(data) {
    const coursesEl = document.querySelector("#courses"); 

    // Rensar DOM
    coursesEl.innerHTML = "";

    data.forEach(course => {
        let row = document.createElement("tr"); // skapar rad till HTML
        
        // skriver ut kod, kursnamn och progression.
        row.innerHTML = `
            <td>${course.code}</td>
            <td>${course.coursename}</td>
            <td>${course.progression}</td>
        `;

        coursesEl.appendChild(row); 
    });
}