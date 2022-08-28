import { Vue, Component, Prop } from 'vue-property-decorator'

export type IconProps = {
  name: string
  size: number
}

@Component
export class Icon extends Vue {
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
