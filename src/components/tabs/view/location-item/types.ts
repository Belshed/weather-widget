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
