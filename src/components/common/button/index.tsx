import { Vue, Component, Prop } from 'vue-property-decorator'

import styles from './styles.module.css'

export type ButtonProps = {
  isDisabled: boolean
  whenClick: (e: MouseEvent) => void
}

@Component
export class Button extends Vue {
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
