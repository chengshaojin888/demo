
//init the data, the data from jxbrowser call
var flyPointArr = [[0, 31.017687129191504, 111.86279296875001, 0], [1, 30.793861662466583, 111.90124511718751, 0], [2, 30.744313885161855, 112.7636718750000, 0], [2, 31.744313885161855, 113.7636718750000, 0]];
var markerArr = [];
var latlngArr = [];

//Extend the marker to include customized props
XFMarker = L.Marker.extend({
    options: {
        id: '-1',
        height: '0'
    }
});


var osmUrl = './roadmap/{z}/{x}/{y}.png',
    osmAttrib = '',
    osm = L.tileLayer(osmUrl, {
        maxZoom: 9,
        attribution: osmAttrib
    });


var map = L.map('map').setView([31.017687129191504, 111.86279296875001], 10).addLayer(osm);
//var map = L.map('map').setView(flyPointArr, 10).addLayer(osm);
initMarker();


function dragStartHandler(e) {
    var latlngs = polyline.getLatLngs(),
        latlng = this.getLatLng();
    for (var i = 0; i < latlngs.length; i++) {
        if (latlng.equals(latlngs[i])) {
            this.polylineLatlng = i;
        }
    }
}

function dragHandler(e) {
    var latlngs = polyline.getLatLngs(),
        latlng = this.getLatLng();
    latlngs.splice(this.polylineLatlng, 1, latlng);
    polyline.setLatLngs(latlngs);
}

function dragEndHandler(e) {
    console.log(e.target.getLatLng());
    console.log(e.target.options.id)

    updateFlyPointArr(e.target.options.id, e.target.getLatLng().lat, e.target.getLatLng().lng);
    delete this.polylineLatlng;
}

function updateFlyPointArr(id, lat, lng) {
    console.log(id);
    console.log(lat);
    console.log(lng);
    console.table(this.flyPointArr);
    flyPointArr.forEach((flyPoint) => {
        if (id == flyPoint[0]) {
            flyPoint[1] = lat;
            flyPoint[2] = lng;
        }

    });
    console.table(this.flyPointArr);
}


function initMarker() {
    flyPointArr.forEach((flyPoint) => {
        var latlngObj = new L.LatLng(flyPoint[1], flyPoint[2]);

        var marker = new XFMarker(latlngObj, { id: flyPoint[0], length: flyPoint[3], draggable: true }).addTo(map);
        marker
            .on('dragstart', dragStartHandler)
            .on('drag', dragHandler)
            .on('dragend', dragEndHandler);
        this.markerArr.push(marker);
        this.latlngArr.push(latlngObj);

    });
}

console.table(this.latlngArr);
var polyline = new L.Polyline(this.latlngArr).addTo(map);


