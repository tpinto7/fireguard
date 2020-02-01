import Vue from 'vue'
import App from './App.vue'
import * as VueGoogleMaps from "vue2-google-maps";

Vue.config.productionTip = false

// var heatmapData = [
//   new google.maps.LatLng(37.782, -122.447),
//   new google.maps.LatLng(37.782, -122.445),
//   new google.maps.LatLng(37.782, -122.443),
//   new google.maps.LatLng(37.782, -122.441),
//   new google.maps.LatLng(37.782, -122.439),
//   new google.maps.LatLng(37.782, -122.437),
//   new google.maps.LatLng(37.782, -122.435),
//   new google.maps.LatLng(37.785, -122.447),
//   new google.maps.LatLng(37.785, -122.445),
//   new google.maps.LatLng(37.785, -122.443),
//   new google.maps.LatLng(37.785, -122.441),
//   new google.maps.LatLng(37.785, -122.439),
//   new google.maps.LatLng(37.785, -122.437),
//   new google.maps.LatLng(37.785, -122.435)
// ];

// var sanFrancisco = new google.maps.LatLng(37.774546, -122.433523);

// map = new google.maps.Map(document.getElementById('map'), {
//   center: sanFrancisco,
//   zoom: 13,
//   mapTypeId: 'satellite'
// });

// var heatmap = new google.maps.visualization.HeatmapLayer({
//   data: heatmapData
// });
// heatmap.setMap(map);
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyAqi3uNZU9jTFavql1RDAhVOw6H0MaO6bs",
    libraries: "places" // necessary for places input
  }
});

new Vue({
  render: h => h(App),
}).$mount('#app')
