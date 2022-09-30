import { createApp } from "vue";
import router from "./router";
import store from "./store";

import App from "./App.vue";
import BaseButton from "./components/ui/BaseButton.vue";
import BaseCard from "./components/ui/BaseCard.vue";

const app = createApp(App);

app.use(router);
app.use(store);

app.component("BaseButton", BaseButton);
app.component("BaseCard", BaseCard);

app.mount("#app");
