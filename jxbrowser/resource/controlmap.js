var url = './roadmap/{z}/{x}/{y}.png';
mymap = L.map('mapid').setView([35.5, 110.5], 10);
L.tileLayer(url, { minZoom: 1, maxZoom: 9, }).addTo(mymap);

var layerGroup;
var markerArray = [];
mymap.on('click', function (e) {
    var poplocation = e.latlng;
    var marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(mymap);
   
    layerGroup = L.layerGroup(marker).addTo(mymap)
    
    var coordinations = [marker.getLatLng().lat, marker.getLatLng().lng]
    markerArray.push(coordinations);
    drawLine(markerArray);

});

function drawLine(markerArr){
    var polyline = L.polyline(markerArr, {color:'blue'}).addTo(mymap);
    polyline.addTo(layerGroup);
}