export type SelectItem = {
  text: string
  value: string
  disabled?: boolean
}

export type SelectProps = {
  value: string
  items: SelectItem[]
  label?: string
  placeholder?: string
  whenChange: (item: string) => void
}
