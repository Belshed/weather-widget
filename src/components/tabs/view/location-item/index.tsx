import { Component, Prop } from 'vue-property-decorator'
import { DegreesUnitsMap } from '@/store/modules/weather/constants'
import { Icon } from '@/components/common/icon'

import styles from './styles.module.css'
import { VueComponent } from '@/types'
import { LocationItemProps } from './types'

@Component
export class LocationItem extends VueComponent<LocationItemProps> {
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
        <h3 class={styles.title}>
          { this.title }
        </h3>

        <div class={styles.weather}>
          <img
            src={this.iconPath}
            alt={this.title}
            class={styles.weatherIcon}
          />

          <div>
            <div class={styles.weatherDegrees}>
              { this.degreesWithUnits }
            </div>

            <small class={styles.weatherDescription}>
              { this.description }
            </small>
          </div>
        </div>

        <ul class={styles.details}>
          <li class={styles.detailsItem}>
            ??????????: { this.windSpeed } ??/??

            <Icon
              size={13}
              name="wind"
              style={{
                transform: `rotate(${this.windDegree - 90}deg)`
              }}
            />
          </li>

          <li class={styles.detailsItem}>
            ??????????????????: { this.humidity }%
          </li>

          <li class={styles.detailsItem}>
            ??????????????????: { this.visibilityInKm } ????
          </li>

          <li class={styles.detailsItem}>
            ????????????????: { this.airPressure } ??????
          </li>
        </ul>
      </article>
    )
  }
}
