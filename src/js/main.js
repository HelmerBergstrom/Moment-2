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

    document.querySelector(`#search`).addEventListener("input", filterData);
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
            <td id="plans"><a href="${course.syllabus}"> Kursplan</td>
        `;

        coursesEl.appendChild(row); // lägger till raderna till id "courses".
    });
};

// funktion för att filtrera data utifrån vad användaren skriver i input.
function filterData() { 
    const search = document.querySelector(`#search`).value; // lagrar värdet i input "search" genom value.

    // tar "courseInfoEl" som är arrayen längst upp i koden.
    // användare ska bara kunna söka på kurskod och kursnamn, med små eller stora bokstäver.
    const filtered = courseInfoEl.filter(datan =>
        datan.code.toLowerCase().includes(search.toLowerCase()) ||
        datan.coursename.toLowerCase().includes(search.toLowerCase())
    );
    
    // kallar på funktionen som skriver ut datan, med filtret som kallas "filtered."
    printData(filtered);
}