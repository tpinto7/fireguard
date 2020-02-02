<template>
    <b-modal id="detailsModal" size="xl" no-fade ref="detailsModalRef" cancel-variant="outline-secondary">
        <div slot="modal-header" class="d-flex w-500 h-500">
            <h1 class="modal-title align-self-center text-center">{{firebaseName}}</h1>
            <button type="button" aria-label="Close" class="close" @click="hideModal"></button>
        </div>
        <b-card-group deck>
            <b-card v-bind:class="temperatureClassObject">
                  <div class="card-body">
                          <h1 id="temperature" style="font-size: 75px;" class="card-title">{{temp}}</h1><span> °C</span>
                          <p class="card-text">Temperature displayed in Celsius degree.</p>
                      </div>
            </b-card>
            <b-card v-bind:class="humidityClassObject">
                  <div class="card-body">
                          <h1 id="humidity" style="font-size: 75px;" class="card-title"> {{hum}} %</h1>
                          <p class="card-text">Relative humidity displayed in percentage.</p>
                      </div>
            </b-card>
            <b-card v-bind:class="co2ClassObject">
                  <div class="card-body">
                          <h1 id="co2" style="font-size: 75px;" class="card-title"> {{co}} ppb</h1>
                          <p class="card-text">Number articles of carbon of dioxide in the air in parts per billion.</p>
                      </div>
            </b-card>
            <b-card v-bind:class="totalVolatileOrganicCompoundClassObject">
                  <div class="card-body">
                          <h1 id="tvoc" style="font-size: 75px;" class="card-title"> {{tvoc}} ppb</h1>
                          <p class="card-text">Total volatile organic compound in the air in parts per billion.</p>
                    </div>
            </b-card>        
        </b-card-group>
        <br/><br/>
        <b-card-group deck>
             <b-card v-bind:class="soilClassObject">
                  <div class="card-body">
                          <h1 id="soil" style="font-size: 75px;" class="card-title"> {{soil}} %</h1>
                          <p class="soil">Water Moisture in the Soil.</p>
                      </div>
            </b-card>
             <b-card v-bind:class="uvClassObject">
                  <div class="card-body">
                          <h1 id="temperature" style="font-size: 75px;" class="card-title"> {{uv}} </h1>
                          <p class="card-text">Ultraviolet light captured.</p>
                      </div>
            </b-card>
             <b-card v-bind:class="ctClassObject">
                  <div class="card-body">
                          <h1 id="soil" style="font-size: 75px;" class="card-title"> {{ct}} K</h1>
                          <p class="soil">Color Temperature detected in Kelvin.</p>
                      </div>
            </b-card>
             <b-card v-bind:class="liClassObject">
                  <div class="card-body">
                          <h1 id="temperature" style="font-size: 75px;" class="card-title"> {{li}} cd</h1>
                          <p class="card-text">Light Intensity in Candella.</p>
                      </div>
            </b-card>
        </b-card-group>
        <div slot="modal-footer" class="w-500">
            <h3>{{wind.speed}} </h3>
        </div>
    </b-modal>
</template>


<script>
// var fs = require('fs');
// var csv = require('fast-csv');
import {database} from '.././main';
    // import axios from 'axios';
// var ws = fs.createWriteStream('sensorData.csv');

// csv.write([
//     ["a1","b1"]
// ], {headers:true}).pipe(ws);

// const createCsvWriter = require('csv-writer').createObjectCsvWriter;
// const csvWriter = createCsvWriter({
//     path: './sensorData.csv',
//     header: [
//         {id: 'temperature', title: 'TEMPERATURE'},
//         {id: 'humidity', title: 'HUMIDITY'},
//         {id: 'co2', title: 'CO2'},
//         {id: 'tvoc', title: 'TVOC'},
//         {id: 'soil', title: 'SOIL'},
//         {id: 'uv', title: 'UV'},
//         {id: 'colorTemperature', title: 'COLORTEMPERATURE'},
//         {id: 'lightIntensity', title: 'LIGHTINTENSITY'},
//     ]
// }); 
// var csvWriter = require('csv-write-stream')
// var writer = csvWriter()
// writer.pipe(fs.createWriteStream('sensorData.csv'))

// let records = [
//                 // {temperature: this.temp, humidity: this.hum, co2: this.co,
//                 // tvoc: this.tvoc, soil: this.soil, uv: this.uv, colorTemperature: this.ct,
//                 // lightIntensity: this.li }
//             ];
    export default {
        data () {
            return {
                temp: '',
                hum: '',
                co: '',
                tvoc: '',
                soil: '',
                uv: '',
                ct: '',
                li: '',
                firebaseName: 'Live',
                showTemperatureAlert: false,
                showHumidityAlert: false,
                showCarbonDioxideAlert: false,
                showTotalVolatileOrganicCompoundAlert: false,
                showSoilAlert: false,
                showUVAlert: false,
                showCtAlert: false,
                showLiAlert: false,
                tempRef: '',
                humRef: '',
                coRef: '',
                tvocRef: '',
                soilRef: '',
                uvRef: '',
                ctRef: '',
                liRef: '',
                wind: ''
            };
        },
        async created(){
        this.setUpFirebase();
        this.$root.$on('setFirebase', async (item) => {
            this.firebaseName = item.details;
            this.lat = item.location.lat;
            this.lng = item.location.lng;
            await this.setUpFirebase();
        });
        this.getWind();
            
            this.tempRef.limitToLast(1).on('value', querySnapshot => {
            this.temp = Object.values(querySnapshot.val())[0];
             this.showTemperatureAlert = this.temp > 25; 
            });
            this.humRef.limitToLast(1).on('value', querySnapshot => {
            this.hum = Object.values(querySnapshot.val())[0];
             this.showHumidityAlert = this.hum > 50; 
            });
            this.coRef.limitToLast(1).on('value', querySnapshot => {
                this.co = Object.values(querySnapshot.val())[0];
                this.showCarbonDioxideAlert = this.co > 1000; 
            });
            this.tvocRef.limitToLast(1).on('value', querySnapshot => {
                this.tvoc = Object.values(querySnapshot.val())[0];
                this.showTotalVolatileOrganicCompoundAlert = this.tvoc > 200; 
            });
            this.soilRef.limitToLast(1).on('value', querySnapshot => {
            this.soil = Object.values(querySnapshot.val())[0];
             this.showSoilAlert = this.soil > 50; 
            });
            this.uvRef.limitToLast(1).on('value', querySnapshot => {
            this.uv = Object.values(querySnapshot.val())[0];
             this.showUVAlert = this.uv > 1; 
            });
            this.ctRef.limitToLast(1).on('value', querySnapshot => {
            this.ct = Object.values(querySnapshot.val())[0];
             this.showCtAlert = this.ct > 4000; 
            });
            this.liRef.limitToLast(1).on('value', querySnapshot => {
            this.li = Object.values(querySnapshot.val())[0];
             this.showLiAlert = this.li > 100; 



//  records = [
//                 {temperature: this.temp, humidity: this.hum, co2: this.co,
//                 tvoc: this.tvoc, soil: this.soil, uv: this.uv, colorTemperature: this.ct,
//                 lightIntensity: this.li }
//             ];
//              csvWriter.writeRecords(records) 
//                     .then(() => {   
//                         this.temp = -1;
//                     });
            });

        },
        computed: {
            temperatureClassObject(){
                return {
                'bg-danger' : this.showTemperatureAlert,
                'bg-warning': !this.showTemperatureAlert,
                }  
            },
            liClassObject(){
                return {
                'bg-danger' : this.showLiAlert,
                'bg-warning': !this.showLiAlert,
                }
            },
            ctClassObject(){
                return {
                'bg-danger' : this.showCtAlert,
                'bg-warning': !this.showCtAlert,
                }
            },
            humidityClassObject(){
                return {
                'bg-danger' : this.showHumidityAlert,
                'bg-warning': !this.showHumidityAlert,
                }
            },
            uvClassObject(){
                return {
                'bg-danger' : this.showUVAlert,
                'bg-warning': !this.showUVAlert,
                }
            },totalVolatileOrganicCompoundClassObject(){
                return {
                'bg-danger' : this.showTotalVolatileOrganicCompoundAlert,
                'bg-warning': !this.showTotalVolatileOrganicCompoundAlert,
                }
            },
            soilClassObject(){
                return {
                'bg-danger' : this.showSoilAlert,
                'bg-warning': !this.showSoilAlert,
                
                }

            },
            co2ClassObject(){
                return {
                'bg-danger' : this.showCarbonDioxideAlert,
                'bg-warning': !this.showCarbonDioxideAlert,
                }
            }
        },
        
        methods: {
            // writeRecords(records){
            //     if(csvWriter !== 'undefined'){
            //         csvWriter.writeRecords(records) 
            //         .then(() => {   
            //             this.temp = -1;
            //         });
            //     }
            // },
            setUpFirebase(){
                this.tempRef = database.ref(this.firebaseName).child('DHT11').child('temperature')
                this.humRef = database.ref(this.firebaseName).child('DHT11').child('humidity')
                this.coRef = database.ref(this.firebaseName).child('CCS811').child('CO2')
                this.tvocRef = database.ref(this.firebaseName).child('CCS811').child('TVOC')
                this.soilRef = database.ref(this.firebaseName).child('SEN13322').child('SoilMoisture')
                this.uvRef = database.ref(this.firebaseName).child('VEML6070').child('UV')
                this.ctRef = database.ref(this.firebaseName).child('TCS34725').child('ColorTemperature')
                this.liRef = database.ref(this.firebaseName).child('TCS34725').child('LightIntensity')
            },
            hideModal () {
                this.resetDialog();
                this.$refs.detailsModalRef.hide();
            },
            // Clean dialog after closing/saving
            resetDialog () {
                // this.selectedGroup = {};
            },
            getWind(){
                // axios.get('https://weather.ls.hereapi.com/weather/1.0/report.json?product=observation&latitude=52.516&longitude=13.389&oneobservation=true&apiKey=aH65aFeDcJzT5RNUZilyOdV9nQ19jdpEQ5I_CXl9epU',{
                //     headers: { 'Access-Control-Allow-Origin': '*'}
                // }).then((response) => {
                //     this.wind = response.wind;
                // });
            }
        }
    };
</script>

<style >
.b-modal{
    width: 80%;
    height: 80%;
}
</style>

