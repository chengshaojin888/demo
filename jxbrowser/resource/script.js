
  //init the data, the data from jxbrowser call
  var flyPointArr = [[0, 109.167424, 18.701901,0],[1, 111.476673, 18.636939,0],[2, 112.160023, 19.26491,0]];
  

  var osmUrl = './roadmap/{z}/{x}/{y}.png',
    osmAttrib = '',
    osm = L.tileLayer(osmUrl, {
        maxZoom: 9,
        attribution: osmAttrib
    });


var map = L.map('map').setView([31.017687129191504,111.86279296875001], 10).addLayer(osm);
//var map = L.map('map').setView(flyPointArr, 10).addLayer(osm);

  function dragStartHandler (e) {
      var latlngs = polyline.getLatLngs(),
          latlng = this.getLatLng();
      for (var i = 0; i < latlngs.length; i++) {
          if (latlng.equals(latlngs[i])) {
              this.polylineLatlng = i;
          }
      }
  }
  
  function dragHandler (e) {
      var latlngs = polyline.getLatLngs(),
          latlng = this.getLatLng();
      latlngs.splice(this.polylineLatlng, 1, latlng);
      polyline.setLatLngs(latlngs);
  }
  
  function dragEndHandler (e) {
      delete this.polylineLatlng;
  }
  
  var a = new L.LatLng(31.017687129191504, 111.86279296875001),
      b = new L.LatLng(30.793861662466583, 111.90124511718751),
      c = new L.LatLng(30.744313885161855, 112.7636718750000);
      
      var marker_a = new L.Marker(a, {draggable: true}).addTo(map),
          marker_b = new L.Marker(b, {draggable: true}).addTo(map),
          marker_c = new L.Marker(c, {draggable: true}).addTo(map);
      
  var polyline = new L.Polyline([a, b, c]).addTo(map);
  
  marker_a
      .on('dragstart', dragStartHandler)
      .on('drag', dragHandler)
      .on('dragend', dragEndHandler);
  
  marker_b
      .on('dragstart', dragStartHandler)
      .on('drag', dragHandler)
      .on('dragend', dragEndHandler);
  
  marker_c
      .on('dragstart', dragStartHandler)
      .on('drag', dragHandler)
      .on('dragend', dragEndHandler);
  