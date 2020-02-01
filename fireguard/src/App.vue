<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <!-- <GmapMap :center="{ lat: 10, lng: 10 }"> -->
  <!-- <GmapMarker
    v-for="(m, index) in markers"
    :key="index"
    :position="m.position"
    @click="center = m.position"
  /> -->
   <google-map />
  Adiiiiiis
<!-- </GmapMap> -->

  </div>
</template>

<script>

import GoogleMap from "./components/GoogleMap";
export default {
  name: 'app',
  components: {
    GoogleMap
  },
  // async mounted(){
  //     try {
  //     const google = await gmapsInit();
  //     const geocoder = new google.maps.Geocoder();
  //     const map = new google.maps.Map(this.$el);

  //     geocoder.geocode({ address: 'Austria' }, (results, status) => {
  //       if (status !== 'OK' || !results[0]) {
  //         throw new Error(status);
  //       }

  //       map.setCenter(results[0].geometry.location);
  //       map.fitBounds(results[0].geometry.viewport);
  //     });
  //   } catch (error) {
  //    // console.error(error);
  //   }
  // }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
