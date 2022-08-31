import { MetricType, WeatherDataResponse } from "@/store/modules/weather/types"

export type ViewTabProps = {
  weatherItems: WeatherDataResponse[]
  metricType: MetricType
}
