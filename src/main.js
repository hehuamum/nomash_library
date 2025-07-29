import 'bootstrap/dist/css/bootstrap.min.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'


const app = createApp(App)
app.use(PrimeVue, { theme: { preset: Aura } })
app.use(router)

app.mount('#app')

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2fg4mdNQpEII0qSohc8bhn_c3efTyJuU",
  authDomain: "nomash-library-c2622.firebaseapp.com",
  projectId: "nomash-library-c2622",
  storageBucket: "nomash-library-c2622.firebasestorage.app",
  messagingSenderId: "767143738685",
  appId: "1:767143738685:web:1330e4e42a9b41882b5954"
};

// Initialize Firebase
initializeApp(firebaseConfig);