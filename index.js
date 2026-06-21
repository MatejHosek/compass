var position = [0, 0];
var userMarker;

var prague = [50.0875, 14.421389];
var distance;

/**
 * Calculate the great circle distance on Earth given their latitude-longitude coordinates.
 * 
 * @param {number[]} pos1 latitude and longitude of the first position
 * @param {number[]} pos2 latitude and longitude of the second position
 * 
 * @returns {number} great circle distance
 */
function calculate_distance(pos1, pos2) {
    // Use the spherical cosine rule
    const a = (90 - pos1[0]) * Math.PI / 180;
    const b = (90 - pos2[0]) * Math.PI / 180;
    const C = (pos2[1] - pos1[1]) * Math.PI / 180;

    const c = Math.acos(Math.cos(a)*Math.cos(b) + Math.sin(a)*Math.sin(b)*Math.cos(C));

    return c * 6378;
}

function geolocate() {
    var userMarker = new Object();

    navigator.geolocation.getCurrentPosition(g => {
        position = [g.coords.latitude, g.coords.longitude];
        map.panTo(position)

        userMarker = L.marker(position, {
            icon: L.icon({
                iconUrl: 'leaflet/images/marker-location.png',

                iconSize:     [30, 30],
                iconAnchor:   [10, 10],

                rotationOrigin: 'center',
                rotationAngle: g.coords.heading,
            }),
            keyboard: false,
        }).addTo(map);
    });

    navigator.geolocation.watchPosition(g => {
        position = [g.coords.latitude, g.coords.longitude];
        userMarker.setRotationAngle(g.coords.heading);
        
        distance = calculate_distance(position, prague);
        // TODO: Update distance alert
    })
}

function initMap() {
    map = L.map('map').setView(position, 15);

    L.tileLayer('https://tile.openstreetmap.de/{z}/{x}/{y}.png', {
        referrerPolicy: 'strict-origin-when-cross-origin',
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    return map;
}

var map = initMap();
geolocate();