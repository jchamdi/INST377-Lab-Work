// never have to look at fetch request as long as we decide where we are going
// to define variables in the mainThread

async function fetchRequest(url) {
  try {
    const request = await fetch(url);
    const json = await request.json();
    // console.table(json);
    return json;
  } catch (err) {
    console.error(err);
    return err;
  }
}
//received code from Griffin
function removeMarkers(map) {
  map.eachLayer((layer) => {
    if (Object.keys(layer.options).length === 0) {
      map.removeLayer(layer);
    }
  });
}
function filterFunction(event, data, list, mymap) {
  list.html = '';
  const filteredList = data.filter((item, index) => {
    const zipcode = event.target.value;
    return item.zip === zipcode;
  });
  const adjustedList = filteredList.slice(0, 5);

  removeMarkers(mymap);

  adjustedList.forEach((item, index) => {
    const point = item.geocoded_column_1;
    if (!point || !point.coordinates) { return; }

    const latLong = point.coordinates;
    const marker = latLong.reverse();
    // use string interpolation to style elements
    // can write string interpolation using emmet in index.html to save time
    list.innerHTML += `
        <li class = "card has-background-primary-light">
          <div class = "card-content">
          <div class = "content">
          ${item.name},<br /> ${item.address_line_1}
          </div>
      </div>
      </li>
      <br/>
      `;
    console.log(marker);
    L.marker(marker).addTo(mymap);
  });
}
 

function mapInIt(accessToken) {
  const mymap = L.map('mapid').setView([38.989, -76.937], 12);
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'
  }).addTo(mymap);
  return mymap;
}

async function mainThread() {
  console.log('loaded main script');
  // pulled out piece of info we can touch and pass into fetch request the url
  const url = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
  const inputBox = document.querySelector('#zipcode');
  const visibleListOfFilteredItems = document.querySelector('.suggestions');
  const accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';
  const mymap = mapInIt(accessToken);

  const data = await fetchRequest(url);
  console.log('external dataset', data);

  const form = document.querySelector('#zip_form');
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const {value} = inputBox;
    console.log('within form submit', value);
    const fromLocalData = await fetch('/api');
    const result = await fromLocalData.text();
    console.log(result);
  });
  inputBox.addEventListener('input', (event) => {
    if (event.target.value) {
      filterFunction(event, data, visibleListOfFilteredItems, mymap);
    } else {
      visibleListOfFilteredItems.innerHTML = '';
      removeMarkers(mymap);
    }
  });
}
window.onload = mainThread;
