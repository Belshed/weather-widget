import { State, Mutation, Action, Getter } from 'vuex-simple'
import axios, { AxiosInstance } from 'axios'
import { CommonModule } from '../common-module'

export class ApiModule extends CommonModule {
  constructor () {
    super()

    const axiosInstance = axios.create({
      baseURL: 'https://api.openweathermap.org'
    })

    axiosInstance.interceptors.request.use((config) => ({
      ...config,
      params: {
        ...(config.params ?? {}),
        appid: process.env.VUE_APP_API_KEY
      }
    }))

    this.axios = axiosInstance
  }

  @State()
  private _fetchingCount = 0

  @State()
  protected axios!: AxiosInstance

  @Mutation()
  protected setFetchingCount (count: number): void {
    this._fetchingCount = count
  }

  @Action()
  public setIsFetching (state: boolean): void {
    this.setFetchingCount(state ? this._fetchingCount + 1 : this._fetchingCount - 1)
  }

  @Getter()
  public get isFetching (): boolean {
    return !!this._fetchingCount
  }
}
