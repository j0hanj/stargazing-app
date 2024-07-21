const API_URL = 'YOUR_API_URL'; // Replace with actual API URL
const APP_ID = 'YOUR_APP_ID'; // Replace with your Application ID
const APP_SECRET = 'YOUR_APP_SECRET'; // Replace with your Application Secret

async function fetchStarMap() {
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Authorization': 'Basic ' + btoa(APP_ID + ':' + APP_SECRET),
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) throw new Error('Network response was not ok ' + response.statusText);
    
    const data = await response.json();
    console.log(data); // Log the response data
    renderStarMap(data); // Pass data to renderStarMap
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
}

function renderStarMap(data) {
  const canvas = document.getElementById('star-map');
  const width = canvas.width = window.innerWidth;
  const height = canvas.height = window.innerHeight;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas });

  renderer.setSize(width, height);

  // Create geometry and material
  const starsGeometry = new THREE.BufferGeometry();
  const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.1 });

  // Use API data for star positions
  const positions = data.stars.map(star => [star.x, star.y, star.z]).flat();
  starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  const stars = new THREE.Points(starsGeometry, starsMaterial);

  scene.add(stars);

  camera.position.z = 10;

  function animate() {
    requestAnimationFrame(animate);
    stars.rotation.x += 0.001;
    stars.rotation.y += 0.001;
    renderer.render(scene, camera);
  }

  animate();
}

window.onload = fetchStarMap;
