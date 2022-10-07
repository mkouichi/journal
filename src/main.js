import { createApp } from "vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";

import App from "./App.vue";
import BaseButton from "./components/ui/BaseButton.vue";
import BaseCard from "./components/ui/BaseCard.vue";
import BaseModal from "./components/ui/BaseModal.vue";

// const app = createApp(App);

// app.use(router);
// app.use(store);
// app.use(vuetify);

// app.component("BaseButton", BaseButton);
// app.component("BaseCard", BaseCard);
// app.component("BaseModal", BaseModal);

// app.mount("#app");

loadFonts();

createApp(App)
  .use(router)
  .use(store)
  .use(vuetify)
  .component("BaseButton", BaseButton)
  .component("BaseCard", BaseCard)
  .component("BaseModal", BaseModal)
  .mount("#app");

// After Vuetify installation
// import { createApp } from 'vue'
// import App from './App.vue'
// import router from './router'
// import store from './store'
// => import vuetify from './plugins/vuetify'
// import { loadFonts } from './plugins/webfontloader'

// loadFonts()

// createApp(App)
// .use(router)
// .use(store)
// .use(vuetify)
// .mount('#app')

// In the official guide
// import 'vuetify/styles' // Global CSS has to be imported
// import { createApp } from 'vue'
// import { createVuetify } from 'vuetify'
// import App from './App.vue'

// const app = createApp(App)
// const vuetify = createVuetify() // Replaces new Vuetify()

// app.use(vuetify)

// app.mount('#app')
