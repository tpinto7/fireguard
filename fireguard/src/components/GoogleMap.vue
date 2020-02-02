<template>
  <div>
    <md-card md-with-hover>
    <gmap-map
      :center="center"
      :zoom="12"
      style="width:100%;  height: 600px;"
      ref="mapRef"
    >
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        @click="center=m.position"
      ></gmap-marker>
    </gmap-map>
    </md-card>
  </div>
</template>

<script>
// import {gmapApi} from "vue2-google-maps";
// import gmapsInit from '.././utils/gmaps';
export default {
    // fetch 
  name: "GoogleMap",

  
  data() {
    return {
      // default to Montreal to keep it simple
      // change this to whatever makes sense
      center: { lat: 45.508, lng: -73.587 },
      markers: [
          { position: { lat: 43.653, lng: -79.383}},
          {position: { lat: 44.231, lng: -76.486}},
          {position: { lat: 43.464, lng: -80.52}},
          {position: { lat: 19.076, lng: 72.878} }],
      places: [],
      currentPlace: null,
      notUsed: ''
    };
  },

  async mounted() {
    this.geolocate();
    // const google = await gmapsInit();
    // const geocoder = new google.maps.Geocoder();
    //   const map = new google.maps.Map(this.$el);
    // geocoder.geocode({ address: 'Austria' }, (results, status) => {
    //     if (status !== 'OK' || !results[0]) {
    //       throw new Error(status);
    //     }

    //     map.setCenter(results[0].geometry.location);
    //     map.fitBounds(results[0].geometry.viewport);
    //   });

    this.$root.$on('location', (location) => {
        this.center = location
    });

//     fetch('https://localhost:5000/googleCloudAPI')
//   .then((response) => {
//     return response.json();
//   })
//   .then((myJson) => {
//       this.notUsed = myJson;
//     // console.log(myJson);
//   });
  },

  methods: {
    // receives a place object via the autocomplete component
    setPlace(place) {
      this.currentPlace = place;
    },
    addMarker() {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng()
        };
        this.markers.push({ position: marker });
        this.places.push(this.currentPlace);
        this.center = marker;
        this.currentPlace = null;
      }
    },
    geolocate: function() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    },
//     getPoints() {
//         return [
//           new gmapApi.LatLng(43.653, -79.383),
//           new gmapApi.LatLng(43.653, -79.383),
//           new gmapApi.LatLng(43.653, -79.383),
// new gmapApi.LatLng(43.653, -79.383),
//           new gmapApi.LatLng(43.653, -79.383),
//           new gmapApi.LatLng(43.653, -79.383),
//           new gmapApi.LatLng(43.653, -79.383),
//           new gmapApi.LatLng(43.653, -79.383),
//           new gmapApi.LatLng(43.653, -79.383),
//         ]
//     }
  }
};
</script>