import Vue from 'vue'
import App from './App.vue'
import * as VueGoogleMaps from "vue2-google-maps";
import VueMaterial from 'vue-material'
import { firestorePlugin } from 'vuefire'
import firebase from 'firebase'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(firestorePlugin)
var firebaseConfig = {
  apiKey: "AIzaSyDHWPY4NelJCF-UkuLjcH2WX4njgU5TDVI",
  authDomain: "fireguard-88888.firebaseapp.com",
  databaseURL: "https://fireguard-88888.firebaseio.com",
  projectId: "fireguard-88888",
  storageBucket: "fireguard-88888.appspot.com",
  messagingSenderId: "434458514176",
  appId: "1:434458514176:web:60d16d55a6f382e7e899e5"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export var database = firebase.database();
Vue.use(VueMaterial)
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyCyyY-HTm04WNkl56o8dVmZOfIvoFcpkn4",
    libraries: "places" // necessary for places input
  }
});

new Vue({
  render: h => h(App),
}).$mount('#app')
