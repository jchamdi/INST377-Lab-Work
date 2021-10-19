const searchInput = document.querySelector('.search');
  const suggestions = document.querySelector('.suggestions');


async function windowActions() {
  const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';

  const request = await fetch(endpoint);
  const arrayName = await request.json();
  
  function findMatches(wordToMatch, arrayName) {
    return arrayName.filter((place) => {
      const regex = new RegExp(wordToMatch, 'gi');
      return place.city.match(regex) || place.name.match(regex);
    });
  }
  
  // function numberWithCommas(x) {
  //   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  // }
  
  function displayMatches(event) {
    const matchArray = findMatches(event.target.value, arrayName);
    const html = matchArray.map((place) => {
      const regex = new RegExp(event.target.value, 'gi');
      const cityName = place.city;
      const restaurantName = place.name; 
      return `
    <li class = "card has-background-primary-light">
      <div class = "card-content"> 
      <div class = "content">
        ${restaurantName}, ${cityName}
        </div>
    </div>
    </li>
    <br/>
    `;
    }).join(''); // turns ot from array with multiple items to one big string
    if (event.target.value) {
      suggestions.innerHTML = html;
    } else {
      suggestions.innerHTML = '';
    }
  }

  searchInput.addEventListener('change', displayMatches);
  searchInput.addEventListener('keyup', (evt) => { displayMatches(evt) });
}
window.onload = windowActions;
//<span class = "population"> ${numberWithCommas(place.population)}</span>