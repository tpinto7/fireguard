<template>
  <div id="app"> 
    <google-map />
    <br/><br/>
    <md-table v-model="sensors" md-sort="details" md-card>
      <md-table-row slot="md-table-row" slot-scope="{ item }" v-bind:class="testObject(item)" md-selectable="single">
        <md-table-cell md-label="Location" md-sort-by="location" @click.native="updateLocation(item.location.lat, item.location.lng)">{{ item.location.lat }}, {{ item.location.lng }}</md-table-cell>
        <md-table-cell md-label="Severity" md-sort-by="severity">{{ item.severity }}</md-table-cell>
        <md-table-cell md-label="More Details" md-sort-by="details"> <b-btn @click="setFirebase(item)" v-b-modal.detailsModal>{{item.details}}</b-btn></md-table-cell>
        <md-table-cell md-label="EMS" md-sort-by="ems" @click="callEMS">{{ item.ems }}</md-table-cell>
      </md-table-row>
    </md-table>  
    <!-- <b-table hover :items="sensors"></b-table> -->
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

// const Nexmo = require('nexmo');

// const nexmo = new Nexmo({
//   apiKey: 'abf70323',
//   apiSecret: 'm993I4UK2AaQpUtr',
//   applicationId: 'dadacdf9-0088-42ed-a559-3e05ed8f9939',
//   privateKey: './private.key',
// });

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
      randomString: 'medium',
      sensors: [
        {
          location: {
            lat: 43.653,
            lng: -79.383
          },
          severity: 'high',
          details: 'Live',
          ems: ''
        },
        {
          location: {
            lat: 44.231,
            lng: -76.486
          },
          severity: 'medium',
          details: 'Sample1',
          ems: ''
        },
        {
          location: {
            lat: 43.464,
            lng: -80.520
          },
          severity: 'low',
          details: 'Sample2',
          ems: ''
        },
         {
          location: {
            lat: 19.076,
            lng: 72.878
          },
          severity: 'no',
          details: 'Sample3',
          ems: ''
        },
        {
          location: {
            lat: 44.231,
            lng: -76.486
          },
          severity: 'medium',
          details: 'Sample4',
          ems: ''
        },
        {
          location: {
            lat: 43.464,
            lng: -80.520
          },
          severity: 'low',
          details: 'Sample5',
          ems: ''
        },
         {
          location: {
            lat: 19.076,
            lng: 72.878
          },
          severity: 'no',
          details: 'Sample6',
          ems: ''
        },
        {
          location: {
            lat: 44.231,
            lng: -76.486
          },
          severity: 'medium',
          details: 'Sample7',
          ems: ''
        },
        {
          location: {
            lat: 43.464,
            lng: -80.520
          },
          severity: 'low',
          details: 'Sample8',
          ems: ''
        },
         {
          location: {
            lat: 19.076,
            lng: 72.878
          },
          severity: 'no',
          details: 'Sample9',
          ems: ''
        },
      ]
    }
  },
  created() {

    const tempRef = database.ref('Live').child('DHT11').child('temperature')
    const humRef = database.ref('Live').child('DHT11').child('humidity')
    const coRef = database.ref('Live').child('CCS811').child('CO2')
    const tvocRef = database.ref('Live').child('CCS811').child('TVOC')

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
  computed: {
  // testObject: function(severity){
  //      return {
  //        'md-primary': severity === "123",
  //       'md-accent': true
  //     }
  //   },
  },
  methods: {
    updateLocation(lat, long){
      const center = { 
            lat: lat,
            lng: long
      }
      this.$root.$emit('location', center); 
    },
    setFirebase(details){
      this.$root.$emit('setFirebase', details);
    },
    callEMS(){
      // var callback;
      // nexmo.calls.create({
      //   to: [{
      //     type: 'phone',
      //     number: 16474709537
      //   }],
      //     from: {
      //   type: 'phone',
      //   number: 16474709537
      // },
      //   answer_url: [["https://localhost:8082"]]
      // }, callback);
    },
    getDetails(){

    },

      testObject: ({ severity }) => ({
        'md-primary': severity === "medium",
        'md-accent': severity === "low",
        'background-color': 'blue'
      }),
        carbonDioxideClassObject2: function(severity){
       return {
         'md-primary': severity === "123",
        'md-accent': true
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


.sv-low{
  background-color: yellow;
}

.sv-med{
  background-color: orange;
}

.sv-high{
  background-color: red;
}

.md-card{
  margin-left: 5%;
  margin-right: 5%;
}
</style>
