export type AutocompleteItem = {
  text: string
  value: string
  disabled?: boolean
}

export type AutocompleteProps = {
  value: string
  items: AutocompleteItem[]
  label?: string
  hint?: string
  placeholder?: string
  returnObject?: boolean
  whenChange?: (item: string) => void
  whenBlur?: () => void
  whenInput?: (item: string | AutocompleteItem) => void
}
