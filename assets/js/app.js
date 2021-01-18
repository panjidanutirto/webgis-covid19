$(document).ready(function() {
  $("#introModal").modal("show");
});

$("#about-btn").click(function() {
  $("#aboutModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

function tampilkanCovid() {
          $.getJSON('https://services5.arcgis.com/VS6HdKS0VfIhv8Ct/ArcGIS/rest/services/COVID19_Indonesia_per_Provinsi/FeatureServer/0/query?where=FID%3C100&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=false&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pjson&token=', function (data) {
             let features = data.features;
             $.each(features, function (i, data) {
             $('#list-covid').append('<tr><td>'+ data.attributes.Provinsi +'</td><td class="text-center">'+ data.attributes.Kasus_Posi +'</td><td class="text-center">'+ data.attributes.Kasus_Semb +'</td><td class="text-center">'+ data.attributes.Kasus_Meni +'</td></tr>');
          });
        });
      }
tampilkanCovid();

var map = new L.Map('map', {
    zoomControl: false,
    attribution: true,
    continuousWorld: true
}); 
map.setView(new L.LatLng(-2.53, 117.33),3);

var esristreets = L.esri.basemapLayer('Streets').addTo(map);
var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var osmAttrib='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>';
var osm = new L.TileLayer(osmUrl, {minZoom: 0, maxZoom: 18, attribution: osmAttrib});

var COVID19_Indonesia_per_Provinsi = L.esri.Cluster.featureLayer({
    url: 'https://services5.arcgis.com/VS6HdKS0VfIhv8Ct/ArcGIS/rest/services/COVID19_Indonesia_per_Provinsi/FeatureServer/0'
}).bindPopup(function (layer) {
   return "Provinsi :&nbsp;<b>" + layer.feature.properties.Provinsi + "</b><br>" +
          "Kasus Positif :&nbsp;<b>" + layer.feature.properties.Kasus_Posi + "</b><br>" +
          "Kasus Sembuh :&nbsp;<b>" + layer.feature.properties.Kasus_Semb + "</b><br>" +
          "Kasus Meninggal :&nbsp;<b>" + layer.feature.properties.Kasus_Meni + "</b>";
}).addTo(map);

map.addControl(new L.Control.Fullscreen({
          title: {
            'false': 'View Fullscreen',
            'true': 'Exit Fullscreen'
            }
      }));

var zoom_bar = new L.Control.ZoomBar({position: 'topright'}).addTo(map);
