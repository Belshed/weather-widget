import { State, Mutation, Action, Getter } from 'vuex-simple'
import axios from 'axios'

export class ApiModule {
  @State()
  private _fetchingCount = 0

  @State()
  protected axios = axios.create({
    baseURL: 'https://api.openweathermap.org'
  })

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
