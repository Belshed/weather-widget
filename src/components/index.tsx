import { Component } from 'vue-property-decorator'
import { RootModule } from '@/store/root'
import { useStore } from 'vuex-simple'
import { Button } from './common/button'
import { Icon } from './common/icon'
import { LocationItem } from '@/components/tabs/view/location-item'
import { SettingsTab } from '@/components/tabs/settings/settings-tab'

import styles from './styles.module.css'
import { DegreesUnitsNamesMap } from '@/store/modules/weather/constants'
import { ChosenItem, MetricType } from '@/store/modules/weather/types'
// @ts-expect-error 123
import debounce from 'debounce'
import { AutocompleteItem } from './common/autocomplete/types'
import { VueComponent } from '@/types'

@Component
export default class App extends VueComponent {
  store = useStore<RootModule>(this.$store).weather

  isSettingsPage = true

  citySuggests: AutocompleteItem[] = []

  get metricTypeOptions (): {text: string; value: string}[] {
    return Object.entries(DegreesUnitsNamesMap)
      .map(([value, text]) => ({
        text,
        value
      }))
  }

  get debouncedCitySearch (): (cityName: string) => void {
    return debounce(this.handleCitySearch, 300)
  }

  mounted (): void {
    this.store.fetchWeatherItems()
  }

  handleSettingsButtonClick (): void {
    this.isSettingsPage = !this.isSettingsPage

    if (!this.isSettingsPage) {
      this.store.fetchWeatherItems()
    }
  }

  handleItemDelete (index: number): void {
    this.store.deleteItem(index)
  }

  handleChangeMetricType (type: MetricType): void {
    this.store.changeMetricType(type)
  }

  async handleCityAdd (city: string): Promise<void> {
    const [name, country] = city.split(', ')

    this.store.setChosenItems([
      ...this.store.chosenItems,
      {
        name,
        country
      }
    ])

    await this.store.fetchWeatherItems()
  }

  async handleCitySearch (cityName: string): Promise<void> {
    if (!cityName || cityName.length < 3) {
      return
    }

    const suggests = await this.store.getCitySuggests(cityName)

    this.citySuggests = suggests
      .map((item) => ({
        text: `${item.name}, ${item.country}`,
        value: item.name
      }))
  }

  async handleItemsReorder(items: ChosenItem[]) {
    this.store.setChosenItems(items)

    await this.store.fetchWeatherItems()
  }

  render (): JSX.Element {
    return (
      <v-app>
        <div class={styles.app}>
          <Button
            class={styles.settingsButton}
            whenClick={this.handleSettingsButtonClick}
          >
            <Icon
              name={this.isSettingsPage ? 'cross' : 'gear'}
              size={this.isSettingsPage ? 12 : 16}
            />
          </Button>

          <div
            class={{
              [styles.body]: true,
              [styles.bodyFlipped]: this.isSettingsPage
            }}
          >
            {this.store.fetchedWeatherItems.length ? (
              <ul class={styles.locations}>
                {this.store.fetchedWeatherItems.map((item) => (
                  <li
                    key={item.id}
                  >
                    <LocationItem
                      name={item.name}
                      degrees={item.main.temp}
                      country={item.sys.country}
                      icon={item.weather[0].icon}
                      description={item.weather[0].description}
                      humidity={item.main.humidity}
                      windSpeed={item.wind.speed}
                      windDegree={item.wind.deg}
                      visibility={item.visibility}
                      airPressure={item.main.pressure}
                      units={this.store.metricType}
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <h3 class={styles.locations}>
                Города для отображения не выбраны
              </h3>
            )}

            <div class={styles.settings}>
              <SettingsTab
                items={this.store.chosenItems}
                metricType={this.store.metricType}
                citySuggests={this.citySuggests}
                metricOptions={this.metricTypeOptions}
                whenItemsReorder={this.handleItemsReorder}
                whenCitySearch={this.debouncedCitySearch}
                whenCityAdd={this.handleCityAdd}
                whenItemDelete={this.handleItemDelete}
                whenMetricTypeChange={this.handleChangeMetricType}
              />
            </div>
          </div>
        </div>
      </v-app>
    )
  }
}
