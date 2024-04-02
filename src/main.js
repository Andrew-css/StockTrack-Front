import { createApp } from "vue";
import { router } from "./routes/routes.js";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import axios from "axios";
import { Quasar, Dialog, Notify } from "quasar";
import "@quasar/extras/material-icons/material-icons.css";
import "quasar/src/css/index.sass";
import App from "./App.vue";

// axios.defaults.baseURL = 'http://localhost:4500/api/'
// axios.defaults.baseURL = "https://stocktrack-backend.onrender.com/api/";
axios.defaults.baseURL = "https://stocktracksena.azurewebsites.net/api/"

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate)

const myApp = createApp(App);

myApp.use(Quasar, {
  plugins: { Dialog, Notify },
  config: {
    notify: {},
  },
});

myApp.use(pinia);
myApp.use(router);

myApp.mount("#app");
