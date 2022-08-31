import { State, Mutation, Action } from 'vuex-simple'
import { ApiModule } from '@/store/base/api'
import { LOCAL_STORAGE_KEY } from './constants'
import { ChosenItem, CityItem, MetricType, WeatherDataResponse } from './types'

export class WeatherModule extends ApiModule {
  override init (): void {
    try {
      const itemsFromLS = localStorage.getItem(LOCAL_STORAGE_KEY)

      if (itemsFromLS) {
        this.setChosenItems(JSON.parse(itemsFromLS))
      }
    } catch {
      this.setChosenItems([])
    }
  }

  @State()
  metricType: MetricType = MetricType.METRIC

  @State()
  chosenItems: ChosenItem[] = []

  @State()
  fetchedWeatherItems: WeatherDataResponse[] = []

  @Mutation()
  setChosenItems (items: ChosenItem[]): void {
    const uniqueItems = [...new Set(
      items.map((item) => `${item.name};${item.country}`)
    )]
      .map((item) => {
        const [name, country] = item.split(';')

        return {
          name,
          country
        }
      })

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(uniqueItems))

    this.chosenItems = [...uniqueItems]
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
  async getCitySuggests (cityName: string): Promise<CityItem[]> {
    try {
      const { data } = await this.axios
        .get('/geo/1.0/direct', {
          params: {
            q: cityName,
            limit: '10'
          }
        })

      return data
    } catch {
      return []
    }
  }

  @Action()
  async fetchWeatherItems (): Promise<void> {
    try {
      const requests = await Promise.all(this.chosenItems
        .map(({ name: q }) => this.axios
          .get('/data/2.5/weather', {
            params: {
              q,
              units: this.metricType,
              lang: navigator.language.split('-')[0]
            }
          })
          .catch(({ response }) => response)
        ))

      const weatherData = requests
        .filter((response) => response?.status === 200)
        .map((resp) => resp?.data)

      this.setFetchedWeatherItems(weatherData)
    } catch (e) {
      console.log(e)
    }
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
