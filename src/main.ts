import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { testData } from '@/generateTestData'

import App from './App.vue'
import router from './router'

const app = createApp(App)

localStorage.setItem('themes', JSON.stringify(testData, null, 2));

app.use(createPinia())
app.use(router)

app.mount('#app')
