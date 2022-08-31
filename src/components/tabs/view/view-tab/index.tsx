import { Component, Prop } from 'vue-property-decorator'
import { VueComponent } from '@/types'
import { ViewTabProps } from './types'
import styles from './styles.module.css'
import { LocationItem } from '../location-item'
import NoCities from '@/components/common/no-cities'

@Component
export default class ViewTab extends VueComponent<ViewTabProps> {
  @Prop()
  private readonly weatherItems!: ViewTabProps['weatherItems']

  @Prop()
  private readonly metricType!: ViewTabProps['metricType']

  render(): JSX.Element {
    return (
      <div>
        {this.weatherItems.length ? (
          <ul class={styles.locations}>
            {this.weatherItems.map((item) => (
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
                  units={this.metricType}
                />
              </li>
            ))}
          </ul>
        ) : (
          <NoCities
            text='Города для отображения не выбраны. Выбрать их можно нажав на кнопку с шестеренкой'
          />
        )}
      </div>
    )
  }
}
