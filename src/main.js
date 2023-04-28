import { createApp } from "vue";
import router from "./router";
import store from "./store";
import WaveUI from "wave-ui";
import "wave-ui/dist/wave-ui.css";

import App from "./App.vue";

const app = createApp(App);

app
  .use(router)
  .use(store)
  .use(WaveUI, {
    /* Some Wave UI options */
  })
  .mount("#app");
