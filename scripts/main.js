import tabJoursEnOrdre from "./Utilitaire/gestionTemps.js";

const CLEAPI = "5d0bd53f3bd3e369fd8c4a1b82421b43";
let resultatsAPI;

const degres = document.querySelector(".degres");
const description = document.querySelector(".description");
const coordonnees = document.querySelector(".coordonnees");
const heurePrevision = document.querySelectorAll(".heure-prevision");
const degresPrevision = document.querySelectorAll(".degres-prevision");
const joursDiv = document.querySelectorAll(".jour-prevision-nom");
const degresMax = document.querySelectorAll(".degres-max");
const degresMin = document.querySelectorAll(".degres-min");
const pluieJour = document.querySelectorAll(".pluie");
const ventJour = document.querySelectorAll(".vent");
const imgIconeActuel = document.querySelector(".img-temps-actuel");
const imgIconeSemaine = document.querySelectorAll(".img-temps-semaine");
const imgIconeJour = document.querySelectorAll(".img-temps-jour");
const chargementContainer = document.querySelector(".overlay-icone-chargement");
const couleurTempsMax = document.querySelectorAll(".temps-couleur-max");
const couleurTempsMin = document.querySelectorAll(".temps-couleur-min");
const couleurTempsHeure = document.querySelectorAll(".couleur-temps-heure");

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      let long = position.coords.longitude;
      let lat = position.coords.latitude;
      appelAPI(long, lat);
    },
    () => {
      alert(
        `Vous avez refusé la géolocalisation, l'application ne peut pas fonctionner sans, veuillez l'activer!`
      );
    }
  );
}

function appelAPI(long, lat) {
  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${CLEAPI}`
  )
    .then((reponse) => {
      return reponse.json();
    })
    .then((data) => {
      resultatsAPI = data;

      console.log(data);

      // degres dans le header
      degres.innerText = `${Math.trunc(resultatsAPI.current.temp)}°`;
      // localisation
      coordonnees.innerText = resultatsAPI.timezone;
      // description pour le header
      description.innerText = resultatsAPI.current.weather[0].description;

      // heures par 3 avec températures

      let heureActuelle = new Date().getHours();

      for (let i = 0; i < heurePrevision.length; i++) {
        let heureIncr = heureActuelle + i * 3;

        if (heureIncr > 24) {
          heurePrevision[i].innerText = `${heureIncr - 24} h`;
        } else if (heureIncr === 24) {
          heurePrevision[i].innerText = "00 h";
        } else {
          heurePrevision[i].innerText = `${heureIncr} h`;
        }
      }

      //  temperature pour 3h

      for (let j = 0; j < degresPrevision.length; j++) {
        degresPrevision[j].innerText = `${Math.trunc(
          resultatsAPI.hourly[j * 3].temp
        )}°`;
      }

      // 3 1ere lettres des jours

      for (let k = 0; k < tabJoursEnOrdre.length; k++) {
        joursDiv[k].innerText = tabJoursEnOrdre[k].slice(0, 3);
      }

      // temp max par jour
      for (let m = 0; m < 7; m++) {
        degresMax[m].innerText = `${Math.trunc(
          resultatsAPI.daily[m + 1].temp.max
        )}°`;
      }

      // temp min par jour
      for (let n = 0; n < 7; n++) {
        degresMin[n].innerText = `${Math.trunc(
          resultatsAPI.daily[n + 1].temp.min
        )}°`;
      }

      // pluie mm par jour
      // for (let o = 0; o < 7; o++) {
      //   if (o < 7) {
      //     pluieJour[o].innerHTML = `<i class="fa-solid fa-droplet"></i> ${
      //       resultatsAPI.daily[o + 1].rain
      //     }mm`;
      //   } else {
      //     pluieJour[o].innerText = `🤔`;
      //   }
      // }

      // vent en kmh par jour

      for (let p = 0; p < 7; p++) {
        ventJour[
          p
        ].innerHTML = `<i class="fa-solid fa-location-arrow"></i> ${Math.round(
          resultatsAPI.daily[p + 1].wind_speed
        )}km/h`;
      }

      // icone Actuel dynamique selon le temps
      if (heureActuelle >= 6 && heureActuelle < 21) {
        imgIconeActuel.src = `ressources/jour/${resultatsAPI.current.weather[0].icon}.svg`;
      } else {
        imgIconeActuel.src = `ressources/nuit/${resultatsAPI.current.weather[0].icon}.svg`;
      }

      // Icone Semaine dynamique selon le temps
      for (let q = 0; q < 7; q++) {
        imgIconeSemaine[q].src = `ressources/jour/${
          resultatsAPI.daily[q + 1].weather[0].icon
        }.svg`;
      }

      // Icone Jour dynamique selon le temps
      for (let i = 0; i < 7; i++) {
        if (heureActuelle >= 6 || heureActuelle < 21 || heureActuelle > 27) {
          imgIconeJour[i].src = `ressources/jour/${
            resultatsAPI.hourly[i + 1].weather[0].icon
          }.svg`;
        } else {
          imgIconeJour[i].src = `ressources/nuit/${
            resultatsAPI.hourly[i + 1].weather[0].icon
          }.svg`;
        }
      }

      // animation loader
      chargementContainer.classList.add("disparition");

      // couleurMAX selon degres
      for (let i = 0; i < couleurTempsMax.length; i++) {
        if (resultatsAPI.daily[i + 1].temp.max > 30) {
          couleurTempsMax[i].classList.add("tres-tres-chaud");
        } else if (resultatsAPI.daily[i + 1].temp.max > 25) {
          couleurTempsMax[i].classList.add("tres-chaud");
        } else if (resultatsAPI.daily[i + 1].temp.max > 20) {
          couleurTempsMax[i].classList.add("chaud");
        } else if (resultatsAPI.daily[i + 1].temp.max > 15) {
          couleurTempsMax[i].classList.add("bon");
        } else if (resultatsAPI.daily[i + 1].temp.max > 10) {
          couleurTempsMax[i].classList.add("normal");
        } else if (resultatsAPI.daily[i + 1].temp.max > 5) {
          couleurTempsMax[i].classList.add("bof");
        }
      }

      // couleurMIN selon degres
      for (let i = 0; i < couleurTempsMin.length; i++) {
        if (resultatsAPI.daily[i + 1].temp.min > 30) {
          couleurTempsMin[i].classList.add("tres-tres-chaud");
        } else if (resultatsAPI.daily[i + 1].temp.min > 25) {
          couleurTempsMin[i].classList.add("tres-chaud");
        } else if (resultatsAPI.daily[i + 1].temp.min > 20) {
          couleurTempsMin[i].classList.add("chaud");
        } else if (resultatsAPI.daily[i + 1].temp.min > 15) {
          couleurTempsMin[i].classList.add("bon");
        } else if (resultatsAPI.daily[i + 1].temp.min > 10) {
          couleurTempsMin[i].classList.add("normal");
        } else if (resultatsAPI.daily[i + 1].temp.min > 5) {
          couleurTempsMin[i].classList.add("bof");
        }
      }

      // couleurHeure selon degres
      for (let i = 0; i < couleurTempsHeure.length; i++) {
        if (resultatsAPI.hourly[i * 3].temp > 25) {
          couleurTempsHeure[i].classList.add("tres-chaud");
        } else if (resultatsAPI.hourly[i * 3].temp > 20) {
          couleurTempsHeure[i].classList.add("chaud");
        } else if (resultatsAPI.hourly[i * 3].temp > 15) {
          couleurTempsHeure[i].classList.add("bon");
        } else if (resultatsAPI.hourly[i * 3].temp > 10) {
          couleurTempsHeure[i].classList.add("normal");
        } else if (resultatsAPI.hourly[i * 3].temp > 5) {
          couleurTempsHeure[i].classList.add("bof");
        }
      }
    });
}
