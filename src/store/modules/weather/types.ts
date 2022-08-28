/* eslint-disable camelcase */
export type Point = {
  lon: number,
  lat: number,
}

export type WeatherItem = {
  id: number,
  main: string,
  description: string,
  icon: string
}

export type Wind = {
  speed: number,
  deg: number,
}

export type MainWeatherData = {
  temp: number,
  feels_like: number,
  temp_min: number,
  temp_max: number,
  pressure: number,
  humidity: number,
}

export type WeatherDataResponse = {
  coord: Point,
  weather: WeatherItem[],
  base: string,
  main: MainWeatherData,
  visibility: number,
  wind: Wind,
  clouds: {
    all: number,
  },
  dt: number,
  sys: {
    type: number,
    id: number,
    country: string,
    sunrise: number,
    sunset: number,
  },
  timezone: number,
  id: number,
  name: string,
  cod: number,
}

export type ChosenItem = {
  name: string,
  country: string,
}

export enum MetricType {
  METRIC = 'metric',
  STANDARD = 'standard',
  IMPERIAL = 'imperial',
}
