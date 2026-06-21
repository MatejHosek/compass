var position = [0, 0];
var userMarker;

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
        
        // TODO: Recalculate distance to Prague
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