import { Module } from 'vuex-simple'
import { WeatherModule } from './modules/weather'

export class RootModule {
  @Module()
  weather = new WeatherModule()
}
