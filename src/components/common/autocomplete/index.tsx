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
  private readonly value!: AutocompleteProps['value']

  @Prop()
  private readonly whenChange: AutocompleteProps['whenChange']

  @Prop()
  private readonly whenInput: AutocompleteProps['whenInput']

  private handleInput (value: string | AutocompleteItem) {
    // eslint-disable-next-line no-unused-expressions
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
          label={this.label}
          placeholder={this.placeholder}
          value={this.value}
          onChange={this.whenChange}
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
