import { db } from './firebase.js';
import { collection, getDocs } from 'firebase/firestore';

let map;
let markers = [];

function fetchLocations() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 37.7749, lng: -122.4194 },
    zoom: 8,
  });

  async function fetchData() {
    const querySnapshot = await getDocs(collection(db, "locations"));
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const latLng = new google.maps.LatLng(data.lat, data.lng);
      const marker = new google.maps.Marker({
        position: latLng,
        map: map,
        title: data.name,
      });

      const infoWindow = new google.maps.InfoWindow({
        content: `<h3>${data.name}</h3><p>${data.description}</p>`,
      });

      marker.addListener("click", () => {
        infoWindow.open(map, marker);
      });

      markers.push(marker);
    });
  }

  fetchData();
}

export { fetchLocations };