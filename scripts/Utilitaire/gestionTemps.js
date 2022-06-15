const joursSemaine = [
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche",
];

const dateActuel = document.querySelector(".jour-actuel");

let ajd = new Date();
let options = { weekday: "long" };
let jourActuel = ajd.toLocaleDateString("fr-FR", options);

jourActuel = jourActuel.charAt(0).toUpperCase() + jourActuel.slice(1);

let tabJoursEnOrdre = joursSemaine
  .slice(joursSemaine.indexOf(jourActuel))
  .concat(joursSemaine.slice(0, joursSemaine.indexOf(jourActuel)));

// jour Actuel pour le h3 des heures

dateActuel.innerText = jourActuel;

export default tabJoursEnOrdre;
