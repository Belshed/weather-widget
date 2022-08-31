import { MetricType } from './types'

export const DegreesUnitsNamesMap: Record<MetricType, string> = {
  [MetricType.METRIC]: 'Цельсии',
  [MetricType.STANDARD]: 'Кельвины',
  [MetricType.IMPERIAL]: 'Фаренгейты'
}

export const DegreesUnitsMap: Record<MetricType, string> = {
  [MetricType.METRIC]: '°C',
  [MetricType.STANDARD]: '°K',
  [MetricType.IMPERIAL]: '°F'
}

export const LOCAL_STORAGE_KEY = 'weather-items'
