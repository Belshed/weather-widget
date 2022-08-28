import { State, Mutation, Action } from 'vuex-simple'
import { ApiModule } from '../api'
import { ChosenItem, MetricType, WeatherDataResponse } from './types'

export class WeatherModule extends ApiModule {
  @State()
  metricType: MetricType = MetricType.METRIC

  @State()
  chosenItems: ChosenItem[] = [
    {
      name: 'Санкт-Петербург',
      country: 'RU'
    },
    {
      name: 'Москва',
      country: 'RU'
    },
    {
      name: 'London',
      country: 'GB'
    },
    {
      name: 'New York',
      country: 'US'
    }
  ]

  @State()
  fetchedWeatherItems: WeatherDataResponse[] = []

  @Mutation()
  setChosenItems (items: ChosenItem[]): void {
    this.chosenItems = [...items]
  }

  @Mutation()
  setFetchedWeatherItems (items: WeatherDataResponse[]): void {
    this.fetchedWeatherItems = [...items]
  }

  @Mutation()
  setMetricType (type: MetricType): void {
    this.metricType = type
  }

  @Action()
  async fetchWeatherItems (): Promise<void> {
    const requests = await Promise.all(this.chosenItems
      .map(({ name: q }) => this.axios
        .get('/data/2.5/weather', {
          params: {
            q,
            units: this.metricType,
            lang: navigator.language.split('-')[0],
            appid: ''
          }
        })
        .catch(({ response }) => response)
      ))

    const weatherData = requests
      .filter((response) => response?.status === 200)
      .map((resp) => resp?.data)

    this.setFetchedWeatherItems(weatherData)
  }

  @Action()
  deleteItem (index: number): void {
    const items = this.chosenItems
      .filter((_, idx) => idx !== index)

    this.setChosenItems(items)
  }

  @Action()
  changeMetricType (type: MetricType): void {
    this.setMetricType(type)
  }
}
