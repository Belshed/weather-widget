import { Vue, Component, Prop } from 'vue-property-decorator'
import { Button } from '@/components/common/button'
import { Icon } from '@/components/common/icon'

import styles from './styles.module.css'

export type LocationItemProps = {
  name: string
  country: string
  whenDelete: () => void
}

@Component
export class LocationItem extends Vue {
  @Prop()
  private readonly name!: LocationItemProps['name']

  @Prop()
  private readonly country!: LocationItemProps['country']

  @Prop()
  private readonly whenDelete!: LocationItemProps['whenDelete']

  get title (): string {
    return `${this.name}, ${this.country}`
  }

  handleDeleteButtonClick (): void {
    this.whenDelete()
  }

  render (): JSX.Element {
    return (
      <div class={styles['location-item']}>
        <span class={styles['location-item__title']}>
          { this.title }
        </span>

        <Button
          class={styles['location-item__delete-button']}
          whenCLick={this.handleDeleteButtonClick}
        >
          <Icon
            name="delete"
          />
        </Button>
      </div>
    )
  }
}
