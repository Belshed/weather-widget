import { createVuexStore } from 'vuex-simple'

import Vue from 'vue'
import Vuex from 'vuex'
import { RootModule } from './root'

Vue.use(Vuex)

export default (): ReturnType<typeof createVuexStore> => {
  const instance = new RootModule()

  const vuexStoreInstance = createVuexStore(instance, {
    strict: true
  })

  return vuexStoreInstance
}
