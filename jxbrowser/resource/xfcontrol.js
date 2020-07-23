var osmUrl = './roadmap/{z}/{x}/{y}.png',
    osmAttrib = '',
    osm = L.tileLayer(osmUrl, {
        maxZoom: 9,
        attribution: osmAttrib
    });


var map = L.map('map').setView([25.92, 79.84], 10).addLayer(osm);

map.on('click', onMapClick);

var pointArray = [];
var xfPolyline;

function onMapClick(e) {
    if (xfPolyline) {
        xfPolyline.remove(map);
    }

    var geojsonFeature = {
        "type": "Feature",
        "properties": {},
        "geometry": {
            "type": "Point",
            "coordinates": [e.latlng.lat, e.latlng.lng]
        }
    }

    var marker;

    L.geoJson(geojsonFeature, {

        pointToLayer: function (feature, latlng) {

            marker = L.marker(e.latlng, {

                title: "Resource Location",
                alt: "Resource Location",
                riseOnHover: true,
                draggable: true,

            }).bindPopup("<input type='button' value='Delete Marker' class='marker-delete-button'/>");

            marker.on("popupopen", onPopupOpen);

            return marker;
        }
    }).addTo(map);

    getAllMarkers();
}

function onPopupOpen() {

    var tempMarker = this;

    $(".marker-delete-button:visible").click(function () {
        map.removeLayer(tempMarker);
    });
}

function getAllMarkers() {

    var allMarkersObjArray = [];//new Array();

    $.each(map._layers, function (ml) {
        if (map._layers[ml].feature) {

            allMarkersObjArray.push(this);
            pointArray.push(this.getLatLng());
        }
    })

    xfPolyline = new L.Polyline(pointArray, {
        color: 'red',
        weight: 3,
        opacity: 0.5,
        smoothFactor: 1
    });
    xfPolyline.addTo(map);
    console.log(allMarkersObjArray);

}

$(".get-markers").on("click", getAllMarkers);
