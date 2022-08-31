import { Component, Prop } from 'vue-property-decorator'
import type { MetricType } from '@/store/modules/weather/types'
import { LocationItem } from '../location-item'

import styles from './styles.module.css'
import { Select } from '@/components/common/select'
import { Autocomplete } from '@/components/common/autocomplete'
import { VueComponent } from '@/types'
import { AutocompleteItem } from '@/components/common/autocomplete/types'
import { SettingsTabProps } from './types'

@Component
export class SettingsTab extends VueComponent<SettingsTabProps> {
  @Prop()
  private readonly metricType!: SettingsTabProps['metricType']

  @Prop()
  private readonly items!: SettingsTabProps['items']

  @Prop()
  private readonly metricOptions!: SettingsTabProps['metricOptions']

  @Prop({
    default: () => []
  })
  private readonly citySuggests!: SettingsTabProps['citySuggests']

  @Prop()
  private readonly whenItemDelete!: SettingsTabProps['whenItemDelete']

  @Prop()
  private readonly whenCityAdd!: SettingsTabProps['whenCityAdd']

  @Prop()
  private readonly whenCitySearch!: SettingsTabProps['whenCitySearch']

  @Prop()
  private readonly whenMetricTypeChange!: SettingsTabProps['whenMetricTypeChange']

  handleItemDelete (index: number): void {
    this.whenItemDelete(index)
  }

  handleMetricTypeChange (value: MetricType): void {
    this.whenMetricTypeChange(value)
  }

  handleCityAdd (value: string | AutocompleteItem): void {
    this.whenCityAdd(typeof value === 'string' ? value : value.text)
  }

  handleCitySearch (value: string | AutocompleteItem): void {
    this.whenCitySearch(typeof value === 'string' ? value : value?.value)
  }

  render (): JSX.Element {
    return (
      <div class={styles.settings}>
        <h3 class={styles.title}>
          Настройки
        </h3>

        <ul class={styles.locations}>
          {this.items.map((item, index) => (
            <li key={item.name}>
              <LocationItem
                name={item.name}
                country={item.country}
                whenDelete={() => this.handleItemDelete(index)}
              />
            </li>
          ))}
        </ul>

        <h3 class={styles.title}>
          Добавить город
        </h3>

        <Autocomplete
          value={''}
          returnObject
          items={this.citySuggests}
          placeholder="Выберете новый город"
          whenInput={this.handleCitySearch}
          whenChange={this.handleCityAdd}
        />

        <h3 class={styles.title}>
          Единицы измерения
        </h3>

        <Select
          value={this.metricType}
          items={this.metricOptions}
          placeholder="Выберете единицы измерения"
          whenChange={(val) => this.handleMetricTypeChange(val as MetricType)}
        />
      </div>
    )
  }
}
