
//init the data, the data from jxbrowser call
var flyPointArr = [[0, 31.017687129191504, 111.86279296875001, 0], [1, 30.793861662466583, 111.90124511718751, 0], [2, 30.744313885161855, 112.7636718750000, 0], [2, 31.744313885161855, 113.7636718750000, 0]];
var markerArr = [];
var latlngArr = [];
var nextIndex  = flyPointArr[flyPointArr.length - 1][0] + 1;
var selectPoint;


//Extend the marker to include customized props
XFMarker = L.Marker.extend({
    options: {
        id: '-1',
        height: '0'
    }
});


var xfUrl = './roadmap/{z}/{x}/{y}.png',
    xfAttrib = '',
    xfLayer = L.tileLayer(xfUrl, {
        maxZoom: 9,
        attribution: xfAttrib
    });


var map = L.map('map').setView([31.017687129191504, 111.86279296875001], 10).addLayer(xfLayer);

var flyPolyline = L.polyline([]).addTo(map);


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
    console.table(this.flyPointArr);
    latlngArr = new Array();
        flyPointArr.forEach((flyPoint) => {
            if (id == flyPoint[0]) {
                flyPoint[1] = lat;
                flyPoint[2] = lng;
            }
            var latlngObj = new L.LatLng(flyPoint[1], flyPoint[2]);
            latlngArr.push(latlngObj);            
        });
    
    
    console.table(this.flyPointArr);
}

function addNewFlyPointToArr(id, lat, lng) {
    console.table(this.flyPointArr);
    flyPointArr.push([id, lat, lng]); 
    var latlngObj = new L.LatLng(lat, lng);
    latlngArr.push(latlngObj);

    console.table(this.flyPointArr);
}

function initMarker() {
    this.latlngArr = new Array();
    this.markerArr = new Array();
    flyPointArr.forEach((flyPoint) => {
        var latlngObj = new L.LatLng(flyPoint[1], flyPoint[2]);

        // var marker = new XFMarker(latlngObj, { id: flyPoint[0], length: flyPoint[3], draggable: true }).addTo(map);
        var marker = new XFMarker(latlngObj, { id: flyPoint[0], height: flyPoint[3], draggable: true }).bindPopup("<input type='button' value='Delete Marker' class='marker-delete-button'/>");
        marker.on("popupopen", onPopupOpen);
        
        marker
            .on('dragstart', dragStartHandler)
            .on('drag', dragHandler)
            .on('dragend', dragEndHandler);
        this.markerArr.push(marker);
        this.latlngArr.push(latlngObj);

    });
}

console.table(this.latlngArr);
var polyline = new L.Polyline(this.latlngArr);
var makerLayerGroup = L.layerGroup(this.markerArr);
makerLayerGroup.addTo(map);
var polylineGroup = new L.layerGroup([polyline]);
polylineGroup.addTo(map);

map.on('dblclick', function (e) {
    var marker = new XFMarker(e.latlng, { id: nextIndex, height: 0, draggable: true }).bindPopup("<input type='button' value='Delete Marker' class='marker-delete-button'/>");
    markerArr.push(marker);
    console.log("==============")
    marker.on("popupopen", onPopupOpen);
        
        marker
            .on('dragstart', dragStartHandler)
            .on('drag', dragHandler)
            .on('dragend', dragEndHandler);
    addNewFlyPointToArr(nextIndex, e.latlng.lat, e.latlng.lng);
    map.removeLayer(makerLayerGroup);
    makerLayerGroup = L.layerGroup(markerArr);
    makerLayerGroup.addTo(map);
    map.removeLayer(polylineGroup);
    polyline = new L.Polyline(latlngArr);
    polylineGroup = new L.layerGroup([polyline]);
    polylineGroup.addTo(map);
    nextIndex++;
    
});

function drawFlyPolyline(lat, lng){
    flyPolyline.addLatLng(L.latLng(lat, lng));
}


function onPopupOpen(e) {
    selectMarker = [e.target.options.id, e.target.getLatLng().lat, e.target.getLatLng().lng];
    $(".marker-delete-button:visible").click(function (e) {
        console.log(e.target);
        // console.table(flyPointArr);
        console.log(selectMarker);
        flyPointArr = flyPointArr.filter(function(item){
            return item[0] != selectMarker[0];
        });

        initMarker();

        map.removeLayer(makerLayerGroup);
        makerLayerGroup = L.layerGroup(markerArr);
        makerLayerGroup.addTo(map);
        map.removeLayer(polylineGroup);
        polyline = new L.Polyline(latlngArr);
        polylineGroup = new L.layerGroup([polyline]);
        polylineGroup.addTo(map);
        nextIndex  = flyPointArr[flyPointArr.length - 1][0] + 1;

        console.table(flyPointArr);
    });
}
