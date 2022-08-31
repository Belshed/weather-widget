import { Component, Prop } from 'vue-property-decorator'
import { Button } from '@/components/common/button'
import { Icon } from '@/components/common/icon'

import styles from './styles.module.css'
import { VueComponent } from '@/types'
import { LocationItemProps } from './types'

@Component
export class LocationItem extends VueComponent<LocationItemProps> {
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
      <div class={styles.location}>
        <Icon name="drag"/>

        <span class={styles.title}>
          { this.title }
        </span>

        <Button
          class={styles.deleteButton}
          whenClick={this.handleDeleteButtonClick}
        >
          <Icon name="delete"/>
        </Button>
      </div>
    )
  }
}
