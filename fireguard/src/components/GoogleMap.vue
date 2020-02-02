<template>
  <div>
    <md-card md-with-hover>
    <gmap-map
      :center="center"
      :zoom="12"
      style="width:100%;  height: 600px;"
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
export default {
    // fetch 
  name: "GoogleMap",
  data() {
    return {
      // default to Montreal to keep it simple
      // change this to whatever makes sense
      center: { lat: 45.508, lng: -73.587 },
      markers: [],
      places: [],
      currentPlace: null,
      notUsed: ''
    };
  },

  mounted() {
    this.geolocate();
    
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
    }
  }
};
</script>