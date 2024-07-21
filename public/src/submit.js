import { db } from './firebase.js';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';

let map;
let selectedLocation = null;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 37.7749, lng: -122.4194 },
    zoom: 8,
  });

  map.addListener("click", (event) => {
    if (selectedLocation) {
      selectedLocation.setMap(null);
    }
    selectedLocation = new google.maps.Marker({
      position: event.latLng,
      map: map,
    });
  });
}

document.getElementById("locationForm").addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const description = document.getElementById("description").value;

  if (!selectedLocation) {
    alert("Please select a location on the map.");
    return;
  }

  const location = {
    name,
    description,
    lat: selectedLocation.getPosition().lat(),
    lng: selectedLocation.getPosition().lng(),
  };

  const locationRef = collection(db, "locations");

  const q = query(locationRef, where("lat", "==", location.lat), where("lng", "==", location.lng));
  const querySnapshot = await getDocs(q);
  
  if (querySnapshot.empty) {
    await addDoc(locationRef, location);
    alert("Location submitted successfully!");
    selectedLocation.setMap(null);
    document.getElementById("locationForm").reset();
  } else {
    alert("Location already exists.");
  }
});

window.initMap = initMap;