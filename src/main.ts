import { createApp } from 'vue'
import store from './store'
import App from './App.vue'
import router from './router'

// Font awesome icons
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faBolt,
  faSheetPlastic,
  faEllipsis,
  faPlus,
  faTag,
  faTags,
  faToggleOn,
  faToggleOff,
  faShield,
  faCircle,
  faSearch,
  faInbox,
  faNoteSticky,
  faTrash,
  faChevronLeft
} from '@fortawesome/free-solid-svg-icons'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives
})

const app = createApp(App)

library.add(
  faTag,
  faTags,
  faBolt,
  faEllipsis,
  faPlus,
  faShield,
  faCircle,
  faSearch,
  faInbox,
  faNoteSticky,
  faSheetPlastic,
  faTrash,
  faToggleOn,
  faToggleOff,
  faChevronLeft
)

app
  .component('font-awesome-icon', FontAwesomeIcon)
  .use(store)
  .use(router)
  .use(vuetify)
  .mount('#app')
