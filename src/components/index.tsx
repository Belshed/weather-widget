import { Vue, Component } from 'vue-property-decorator'
import { RootModule } from '@/store/root'
import { useStore } from 'vuex-simple'
import { Button } from './common/button'
import { Icon } from './common/icon'
import { LocationItem } from '@/components/tabs/view/location-item'
import { SettingsTab } from '@/components/tabs/settings/settings-tab'

import styles from './styles.module.css'
import { DegreesUnitsNamesMap } from '@/store/modules/weather/constants'
import { MetricType } from '@/store/modules/weather/types'

@Component
export default class App extends Vue {
  store = useStore<RootModule>(this.$store).weather

  isSettingsPage = false

  get metricTypeOptions (): {label: string; value: string}[] {
    return Object.entries(DegreesUnitsNamesMap)
      .map(([value, label]) => ({
        label,
        value
      }))
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

  render (): JSX.Element {
    return (
      <div class={styles.app}>
        <Button
          class={styles['app__settings-button']}
          whenClick={this.handleSettingsButtonClick}
        >
          <Icon
            name={this.isSettingsPage ? 'cross' : 'gear'}
            size={this.isSettingsPage ? 12 : 16}
          />
        </Button>

        <div
          class={{
            [styles.app__body]: true,
            [styles.app__body_flipped]: this.isSettingsPage
          }}
        >
          <ul class={styles.app__locations}>
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

          <div class={styles.app__settings}>
            <SettingsTab
              items={this.store.chosenItems}
              metricType={this.store.metricType}
              metricOptions={this.metricTypeOptions}
              whenItemDelete={this.handleItemDelete}
              whenMetricTypeChange={this.handleChangeMetricType}
            />
          </div>
        </div>
      </div>
    )
  }
}
