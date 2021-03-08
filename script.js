const attribution =
	'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const tilesUrl = 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png';
const tiles = L.tileLayer(tilesUrl, { attribution, noWrap: true });

const map = L.map('map', {
	minZoom: 1,
	worldCopyJump: false,
	maxBounds: null,
}).setView([0, 0], 1);
const issIcon = L.icon({
	iconUrl: 'images/iss.png',
	iconSize: [80, 80],
});

const marker = L.marker([0, 0], { icon: issIcon }).addTo(map);

async function getCoords() {
	const response = await fetch(
		'https://api.wheretheiss.at/v1/satellites/25544'
	);

	const data = await response.json();
	console.log(data);
	const { latitude, longitude } = data;
	marker.setLatLng([latitude, longitude]);

	document.getElementById('lat').innerHTML = `latitude: ${latitude.toFixed(2)}`;
	document.getElementById('lon').innerHTML = `longitude: ${longitude.toFixed(
		2
	)}`;
}
setInterval(() => getCoords(), 1000);
tiles.addTo(map);
