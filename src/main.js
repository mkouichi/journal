import { createApp } from "vue";
import router from "./router";
import store from "./store";

import App from "./App.vue";
import BaseButton from "./components/ui/BaseButton.vue";

const app = createApp(App);

app.use(router);
app.use(store);

app.component("BaseButton", BaseButton);

app.mount("#app");
