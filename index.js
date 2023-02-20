const searchPlanet = document.querySelector('.search-planet');
const searchButton = document.querySelector('.search-button');
const homePage = document.querySelector('.home-div');
const homeBtn = document.querySelector('.home-btn');
const planetInfo = document.querySelector('.planet-info');
const planetData = document.querySelector('.planet-data');
const notFoundSpan = document.querySelector('.not-found');

// array to store planets data
const planetsData = [];

// object to store planet data for search
let searchInfo = {};

// fetch data from api and push it to planetsData array
fetch('https://majazocom.github.io/Data/solaris.json')
  .then((response) => response.json())
  .then((data) => {
    planetsData.push(...data);
    // console.log(planetsData);
  })
  .catch((err) => console.log(err));

searchButton.addEventListener('click', () => {
  if (!searchPlanet.value) {
    notFoundSpan.textContent = '';
    return;
  } // if input is empty return

  // find planet in planetsData array
  searchInfo = planetsData.find((planet) => {
    // if planet name is equal to input value return planet
    if (planet.name === searchPlanet.value) {
      return planet;
    }
  });

  if (!searchInfo) {
    // if planet is not found then check if an existing planet was already showing if yes then hide it
    if (!planetInfo.classList.contains('hide')) {
      planetInfo.classList.add('hide');
    }
    notFoundSpan.textContent = 'No such planet';
    // console.log(notFoundSpan);
    return;
  }

  // creating a div for the planet card
  const planetCard = document.createElement('div');
  // adding class to the planet card
  planetCard.classList.add('planet-card');
  // adding html to the planet card to display planet data
  planetCard.innerHTML = `
    <h2> Name : ${searchInfo.name}</h2>
    <p>Day temp : ${searchInfo.temp.day}</p>
    <p>Distance from the Sun: ${searchInfo.distance}</p>
    <p>Number of moons: ${searchInfo.moons.length}</p>
    <p>Orbital period: ${searchInfo.orbitalPeriod}</p>
    <p>Planet description : ${searchInfo.desc}</p>
    `;
  // appending planet card to planet Data div
  planetData.innerHTML = planetCard.outerHTML;
  notFoundSpan.textContent = '';

  // adding event listener to home button to go back to home page
  // and remove planet info from the page and clear the input
  // the remove the hide class from home page to make it visible
  homeBtn.addEventListener('click', () => {
    planetInfo.classList.add('hide');
    searchPlanet.value = '';
    homePage.classList.remove('hide');
  });

  if (planetInfo.classList.contains('hide')) {
    planetInfo.classList.remove('hide');
    homePage.classList.add('hide');
  }

  //   console.log(searchInfo);
});
