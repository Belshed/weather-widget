import { VueComponent } from '@/types'
import { Component, Prop } from 'vue-property-decorator'
import { IconProps } from './types'

@Component
export class Icon extends VueComponent<IconProps> {
  @Prop()
  name!: IconProps['name']

  @Prop({
    default: 16
  })
  size!: IconProps['size']

  get icon (): string {
    return require(`@/assets/img/icons/${this.name}.png`)
  }

  render (): JSX.Element {
    return (
      <img
        src={this.icon}
        alt={this.name}
        height={this.size}
        width={this.size}
      />
    )
  }
}
