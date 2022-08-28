import { Vue, Component, Prop } from 'vue-property-decorator'
import type { ChosenItem, MetricType } from '@/store/modules/weather/types'
import { LocationItem } from '../location-item'

import styles from './styles.module.css'

export type SettingsTabProps = {
  metricType: MetricType
  items: ChosenItem[]
  metricOptions: unknown[]
  whenItemDelete: (index: number) => void
  whenMetricTypeChange: (type: MetricType) => void
}

@Component
export class SettingsTab extends Vue {
  @Prop()
  private readonly metricType!: SettingsTabProps['metricType']

  @Prop()
  private readonly items!: SettingsTabProps['items']

  @Prop()
  private readonly metricOptions!: SettingsTabProps['metricOptions']

  @Prop()
  private readonly whenItemDelete!: SettingsTabProps['whenItemDelete']

  @Prop()
  private readonly whenMetricTypeChange!: SettingsTabProps['whenMetricTypeChange']

  handleItemDelete (index: number): void {
    this.whenItemDelete(index)
  }

  handleMetricTypeChange ({ value }: { label: string; value: string }): void {
    this.whenMetricTypeChange(value as MetricType)
  }

  render (): JSX.Element {
    return (
      <div class={styles.settings}>
        <h3 class={styles.settings__title}>
          Настройки
        </h3>

        <ul class={styles.settings__locations}>
          {this.items.map((item, index) => (
            <li
              key={item.name}
            >
              <LocationItem
                name={item.name}
                country={item.country}
                whenDelete={() => this.handleItemDelete(index)}
              />
            </li>
          ))}
        </ul>

        <h3 class={styles.settings__title}>
          Добавить город
        </h3>

        <h3 class={styles.settings__title}>
          Единицы измерения
        </h3>
      </div>
    )
  }
}
