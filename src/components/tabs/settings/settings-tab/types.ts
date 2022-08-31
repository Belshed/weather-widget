import { AutocompleteItem } from '@/components/common/autocomplete/types'
import { SelectItem } from '@/components/common/select/types'
import type { ChosenItem, MetricType } from '@/store/modules/weather/types'

export type SettingsTabProps = {
  metricType: MetricType
  items: ChosenItem[]
  citySuggests: AutocompleteItem[]
  metricOptions: SelectItem[]
  whenItemsReorder: (newItems: ChosenItem[]) => void
  whenItemDelete: (index: number) => void
  whenCityAdd: (cityName: string) => void
  whenCitySearch: (cityName: string) => void
  whenMetricTypeChange: (type: MetricType) => void
}

export type MovedData = {
  moved: {
    element: ChosenItem,
    oldIndex: number,
    newIndex: number
  }
}
