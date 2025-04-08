import '~/main.css';

import { createPinia } from 'pinia';
import { createApp } from 'vue';

import App from '~/App.vue';
import router from '~/lib/router';
import LoadingPlugin from '~/plugin/LoadingPlugin';
import ToastPlugin from '~/plugin/ToastPlugin';
import WindowPlugin from '~/plugin/WindowPlugin';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(LoadingPlugin);
app.use(ToastPlugin);
app.use(WindowPlugin);

app.mount('#app');
