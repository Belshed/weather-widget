import { Component, Prop } from 'vue-property-decorator'
import type { MetricType } from '@/store/modules/weather/types'
import { LocationItem } from '../location-item'

import styles from './styles.module.css'
import { Select } from '@/components/common/select'
import { Autocomplete } from '@/components/common/autocomplete'
import { VueComponent } from '@/types'
import { AutocompleteItem } from '@/components/common/autocomplete/types'
import { MovedData, SettingsTabProps } from './types'
import Draggable from 'vuedraggable'
import NoCities from '@/components/common/no-cities'

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
  private readonly whenItemsReorder!: SettingsTabProps['whenItemsReorder']

  @Prop()
  private readonly whenMetricTypeChange!: SettingsTabProps['whenMetricTypeChange']

  cityName: string = ''

  handleItemDelete (index: number): void {
    this.whenItemDelete(index)
  }

  handleMetricTypeChange (value: MetricType): void {
    this.whenMetricTypeChange(value)
  }

  async handleCityAdd (value: string | AutocompleteItem): Promise<void> {
    const city = typeof value === 'string' ? value : value.text

    this.cityName = city
    this.whenCityAdd(city)

    await this.$nextTick()

    this.cityName = ''
  }

  handleCitySearch (value: string | AutocompleteItem): void {
    const cityName = typeof value === 'string' ? value : value?.value

    this.whenCitySearch(cityName)
  }

  handleBlur() {
    this.cityName = ''
    this.whenCitySearch('')
  }

  handleItemsOrderChange({ moved }: MovedData) {
    const items = [...this.items]

    items.splice(moved.oldIndex, 1)
    items.splice(moved.newIndex, 0, moved.element)

    this.whenItemsReorder(items)
  }

  render (): JSX.Element {
    return (
      <div class={styles.settings}>
        <h3 class={styles.title}>
          Настройки
        </h3>

        {this.items.length ? (
          <Draggable
            class={styles.locations}
            value={this.items}
            onChange={this.handleItemsOrderChange}
          >
            {this.items.map((item, index) => (
              <div key={item.name}>
                <LocationItem
                  name={item.name}
                  country={item.country}
                  whenDelete={() => this.handleItemDelete(index)}
                />
              </div>
            ))}
          </Draggable>
        ) : (
          <NoCities
            text='Города для отображения не выбраны'
          />
        )}

        <h3 class={styles.title}>
          Добавить город
        </h3>

        <Autocomplete
          value={this.cityName}
          returnObject
          hint='Из-за "особенностей" компонента, вводить города нужно на английском языке'
          items={this.citySuggests}
          placeholder="Выберете новый город"
          whenBlur={this.handleBlur}
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
