<template>
  <div id="app">
    <google-map />
    <br/><br/>
    <md-table v-model="sensors" md-card>
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Location" md-sort-by="id" @click.native="updateLocation(item.location.lat, item.location.lng)">{{ item.location.lat }}, {{ item.location.lng }}</md-table-cell>
        <md-table-cell md-label="Severity" md-sort-by="name" v-bind:class="getClass(item.severity)">{{ item.severity }}</md-table-cell>
        <md-table-cell md-label="More Details" md-sort-by="email" @click="getDetails"> <b-btn v-b-modal.detailsModal></b-btn></md-table-cell>
        <md-table-cell md-label="EMS" md-sort-by="gender" @click="callEMS">{{ item.ems }}</md-table-cell>
      </md-table-row>
    </md-table>  
  
  <h1>{{temp}} {{hum}} {{co}} {{tvoc}}</h1>
  <details-modal></details-modal>
  </div>

</template>

<script>
// location (hyperlink on click to the map), severity level (change colour of column; allow sort by severity ), more details (hyperlink to dashboard) , ems contact (hyperlink to vardan, auto send if super high )
// take geofence w locations that are severe ... make a http to radar.io and programmtically create geofence in that location to tell people to get out (in high severe fire area, please leave)
// search bar
// sort by severity
import GoogleMap from "./components/GoogleMap";
import {database} from './main';
import DetailsModal from './components/DetailsModal';
export default {
  name: 'app',
  components: {
    GoogleMap,
    'details-modal': DetailsModal,
  },
  data() {
    return {
      temp: '',
      hum: '',
      co: '',
      tvoc: '',
      sensors: [
        {
          location: {
            lat: 43.653,
            lng: -79.383
          },
          severity: 'high',
          details: '',
          ems: ''
        },
        {
          location: {
            lat: 44.231,
            lng: -76.386
          },
          severity: 'medium',
          details: '',
          ems: ''
        },
        {
          location: {
            lat: 43.464,
            lng: -80.520
          },
          severity: 'low',
          details: '',
          ems: ''
        },
         {
          location: {
            lat: 19.076,
            lng: 72.878
          },
          severity: 'no',
          details: '',
          ems: ''
        },
      ]
    }
  },
  created() {
    const tempRef = database.ref('DHT11').child('temperature')
    const humRef = database.ref('DHT11').child('humidity')
    const coRef = database.ref('CCS811').child('CO2')
    const tvocRef = database.ref('CCS811').child('TVOC')

    tempRef.limitToLast(1).on('value', querySnapshot => {
       this.temp = Object.values(querySnapshot.val());
    });
    humRef.limitToLast(1).on('value', querySnapshot => {
       this.hum = Object.values(querySnapshot.val());
    });
    coRef.limitToLast(1).on('value', querySnapshot => {
       this.co = Object.values(querySnapshot.val());
    });
    tvocRef.limitToLast(1).on('value', querySnapshot => {
       this.tvoc = Object.values(querySnapshot.val());
    });
  },
  methods: {
    updateLocation(lat, long){
      const center = { 
            lat: lat,
            lng: long
      }
      this.$root.$emit('location', center); 
    },
    callEMS(){

    },
    getDetails(){

    },
    getClass(severity){
      return{
        'md-primary': severity === "medium",
        'md-accent': severity === "low"
      }
    }
  }
};

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

.md-card{
  margin-left: 5%;
  margin-right: 5%;
}
</style>
