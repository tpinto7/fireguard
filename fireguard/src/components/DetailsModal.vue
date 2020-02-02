<template>
    <b-modal id="detailsModal" size="xl" no-fade ref="detailsModalRef" cancel-variant="outline-secondary">
        <div slot="modal-header" class="d-flex w-500 h-500">
            <h5 class="modal-title align-self-center text-center">Add</h5>
            <button type="button" aria-label="Close" class="close" @click="hideModal"></button>
        </div>
        <b-card-group deck>
            <b-card>
                  <div class="card-body">
                          <h1 id="temperature" style="font-size: 75px;" class="card-title">{{temp}}</h1><span> °C</span>
                          <p class="card-text">Temperature displayed in Celsius degree.</p>
                      </div>
            </b-card>
            <b-card>
                  <div class="card-body">
                          <h1 id="humidity" style="font-size: 75px;" class="card-title"> {{hum}} %</h1>
                          <p class="card-text">Relative humidity displayed in percentage.</p>
                      </div>
            </b-card>
            <b-card>
                  <div class="card-body">
                          <h1 id="co2" style="font-size: 75px;" class="card-title"> {{co}} ppb</h1>
                          <p class="card-text">Number articles of carbon of dioxide in the air in parts per billion.</p>
                      </div>
            </b-card>
            <b-card>
                  <div class="card-body">
                          <h1 id="tvoc" style="font-size: 75px;" class="card-title"> {{tvoc}} ppb</h1>
                          <p class="card-text">Total volatile organic compound in the air in parts per billion.</p>
                    </div>
            </b-card>        
        </b-card-group>
        <br/><br/>
        <b-card-group deck>
             <b-card>
                  <div class="card-body">
                          <h1 id="soil" style="font-size: 75px;" class="card-title"> {{soil}} ppb</h1>
                          <p class="soil">Total volatile organic compound in the air in parts per billion.</p>
                      </div>
            </b-card>
             <b-card>
                  <div class="card-body">
                          <h1 id="temperature" style="font-size: 75px;" class="card-title"> {{uv}} ppb</h1>
                          <p class="card-text">Total volatile organic compound in the air in parts per billion.</p>
                      </div>
            </b-card>
             <b-card>
                  <div class="card-body">
                          <h1 id="soil" style="font-size: 75px;" class="card-title"> {{ct}} ppb</h1>
                          <p class="soil">Total volatile organic compound in the air in parts per billion.</p>
                      </div>
            </b-card>
             <b-card>
                  <div class="card-body">
                          <h1 id="temperature" style="font-size: 75px;" class="card-title"> {{li}} ppb</h1>
                          <p class="card-text">Total volatile organic compound in the air in parts per billion.</p>
                      </div>
            </b-card>
        </b-card-group>
        <div slot="modal-footer" class="w-500">
            <div class="float-right"> 
                <b-btn variant="outline-secondary" @click="hideModal"></b-btn>
                <b-btn type="button" variant="primary" @click="hideModal" :disabled="false"></b-btn>
            </div>
        </div>
    </b-modal>
</template>


<script>
import {database} from '.././main';
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
                li: ''
            };
        },
        created(){
            const tempRef = database.ref('Real').child('DHT11').child('temperature')
            const humRef = database.ref('Real').child('DHT11').child('humidity')
            const coRef = database.ref('Real').child('CCS811').child('CO2')
            const tvocRef = database.ref('Real').child('CCS811').child('TVOC')
            const soilRef = database.ref('Real').child('SEN13322').child('SoilMoisture')
            const uvRef = database.ref('Real').child('VEML6070').child('UV')
            const ctRef = database.ref('Real').child('TCS34725').child('ColorTemperature')
            const liRef = database.ref('Real').child('TCS34725').child('LightIntensity')

            tempRef.limitToLast(1).on('value', querySnapshot => {
            this.temp = Object.values(querySnapshot.val())[0];
            });
            humRef.limitToLast(1).on('value', querySnapshot => {
            this.hum = Object.values(querySnapshot.val())[0];
            });
            coRef.limitToLast(1).on('value', querySnapshot => {
            this.co = Object.values(querySnapshot.val())[0];
            });
            tvocRef.limitToLast(1).on('value', querySnapshot => {
            this.tvoc = Object.values(querySnapshot.val())[0];
            });
            soilRef.limitToLast(1).on('value', querySnapshot => {
            this.soil = Object.values(querySnapshot.val())[0];
            });
            uvRef.limitToLast(1).on('value', querySnapshot => {
            this.uv = Object.values(querySnapshot.val())[0];
            });
            ctRef.limitToLast(1).on('value', querySnapshot => {
            this.ct = Object.values(querySnapshot.val())[0];
            });
            liRef.limitToLast(1).on('value', querySnapshot => {
            this.li = Object.values(querySnapshot.val())[0];
            });

        },
        methods: {
            hideModal () {
                this.resetDialog();
                this.$refs.detailsModalRef.hide();
            },
            // Clean dialog after closing/saving
            resetDialog () {
                // this.selectedGroup = {};
            },
        }
    };
</script>

<style >
.b-modal{
    width: 80%;
    height: 80%;
}
</style>

