import { Component, Prop } from 'vue-property-decorator'
import { AutocompleteItem, AutocompleteProps } from './types'

import './styles.css'
import { VueComponent } from '@/types'

@Component
export class Autocomplete extends VueComponent<AutocompleteProps> {
  @Prop()
  private readonly items!: AutocompleteProps['items']

  @Prop()
  private readonly label: AutocompleteProps['label']

  @Prop({
    default: false
  })
  private readonly returnObject: AutocompleteProps['returnObject']

  @Prop()
  private readonly placeholder: AutocompleteProps['placeholder']

  @Prop()
  private readonly hint: AutocompleteProps['hint']

  @Prop()
  private readonly value!: AutocompleteProps['value']

  @Prop()
  private readonly whenChange: AutocompleteProps['whenChange']

  @Prop()
  private readonly whenInput: AutocompleteProps['whenInput']

  @Prop()
  private readonly whenBlur: AutocompleteProps['whenBlur']

  private handleInput (value: string | AutocompleteItem) {
    this.whenInput?.(value)
  }

  render (): JSX.Element {
    return (
      <div class="autocomplete">
        <v-autocomplete
          dense
          filled
          rounded
          hide-no-data
          returnObject={this.returnObject}
          items={this.items}
          hint={this.hint}
          label={this.label}
          placeholder={this.placeholder}
          value={this.value}
          onChange={this.whenChange}
          onBlur={this.whenBlur}
          {...{
            on: {
              'update:search-input': this.handleInput
            }
          }}
        />
      </div>
    )
  }
}
