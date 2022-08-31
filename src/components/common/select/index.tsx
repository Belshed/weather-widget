import { Component, Prop } from 'vue-property-decorator'
import type { SelectProps } from './types'

import './styles.css'
import { VueComponent } from '@/types'

@Component
export class Select extends VueComponent<SelectProps> {
  @Prop()
  private readonly items!: SelectProps['items']

  @Prop()
  private readonly label: SelectProps['label']

  @Prop()
  private readonly placeholder: SelectProps['placeholder']

  @Prop()
  private readonly value!: SelectProps['value']

  @Prop()
  private readonly whenChange!: SelectProps['whenChange']

  render (): JSX.Element {
    return (
      <div class="select">
        <v-select
          dense
          filled
          rounded
          items={this.items}
          label={this.label}
          placeholder={this.placeholder}
          value={this.value}
          onChange={this.whenChange}
        />
      </div>
    )
  }
}
