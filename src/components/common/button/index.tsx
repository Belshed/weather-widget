import { VueComponent } from '@/types'
import { Component, Prop } from 'vue-property-decorator'

import styles from './styles.module.css'
import { ButtonProps } from './types'

@Component
export class Button extends VueComponent<ButtonProps> {
  @Prop({
    default: false
  })
  isDisabled!: ButtonProps['isDisabled']

  @Prop()
  whenClick!: ButtonProps['whenClick']

  render (): JSX.Element {
    return (
      <button
        class={styles.button}
        disabled={this.isDisabled}
        onClick={this.whenClick}
      >
        {this.$slots.default}
      </button>
    )
  }
}
