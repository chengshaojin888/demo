var url = './roadmap/{z}/{x}/{y}.png';
mymap = L.map('mapid').setView([35.5, 110.5], 10);
L.tileLayer(url, { minZoom: 1, maxZoom: 9, }).addTo(mymap);

mymap.on('click', function (e) {
    var poplocation = e.latlng;
    var marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(mymap);

});