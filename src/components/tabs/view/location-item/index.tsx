import { Vue, Component, Prop } from 'vue-property-decorator'
import { DegreesUnitsMap } from '@/store/modules/weather/constants'
import { Icon } from '@/components/common/icon'

import styles from './styles.module.css'
import { MetricType } from '@/store/modules/weather/types'

export type LocationItemProps = {
  name: string
  country: string
  degrees: number
  icon: string
  description: string
  humidity: number
  visibility: number
  units: MetricType
  windDegree: number
  airPressure: number
  windSpeed: number
}

@Component
export class LocationItem extends Vue {
  @Prop()
  private readonly name!: LocationItemProps['name']

  @Prop()
  private readonly country!: LocationItemProps['country']

  @Prop()
  private readonly icon!: LocationItemProps['icon']

  @Prop()
  private readonly degrees!: LocationItemProps['degrees']

  @Prop()
  private readonly units!: LocationItemProps['units']

  @Prop()
  private readonly visibility!: LocationItemProps['visibility']

  @Prop()
  private readonly description!: LocationItemProps['description']

  @Prop()
  private readonly windSpeed!: LocationItemProps['windSpeed']

  @Prop()
  private readonly windDegree!: LocationItemProps['windDegree']

  @Prop()
  private readonly humidity!: LocationItemProps['humidity']

  @Prop()
  private readonly airPressure!: LocationItemProps['airPressure']

  get title (): string {
    return `${this.name}, ${this.country}`
  }

  get iconPath (): string {
    return `http://openweathermap.org/img/wn/${this.icon}@4x.png`
  }

  get degreesWithUnits (): string {
    return `${Math.round(this.degrees)} ${DegreesUnitsMap[this.units]}`
  }

  get visibilityInKm (): number {
    return Math.round(this.visibility / 1000)
  }

  render (): JSX.Element {
    return (
      <article class={styles.location}>
        <h3 class={styles.location__title}>
          { this.title }
        </h3>

        <div class={styles.location__weather}>
          <img
            src={this.iconPath}
            alt={this.title}
            class={styles['location__weather-ico']}
          />

          <div>
            <div class={styles['location__weather-degrees']}>
              { this.degreesWithUnits }
            </div>

            <small class={styles['location__weather-description']}>
              { this.description }
            </small>
          </div>
        </div>

        <ul class={styles.location__details}>
          <li class={styles['location__details-item']}>
            Ветер: { this.windSpeed } м/с

            <Icon
              size={13}
              name="wind"
              style={{
                transform: `rotate(${this.windDegree - 90}deg)`
              }}
            />
          </li>

          <li class={styles['location__details-item']}>
            Влажность: { this.humidity }%
          </li>

          <li class={styles['location__details-item']}>
            Видимость: { this.visibilityInKm } км
          </li>

          <li class={styles['location__details-item']}>
            Давление: { this.airPressure } гПа
          </li>
        </ul>
      </article>
    )
  }
}
