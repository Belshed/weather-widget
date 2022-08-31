import { Component, Prop } from 'vue-property-decorator'
import { VueComponent } from '@/types'

import styles from './styles.module.css'
import { NoCitiesProps } from './types'

@Component
export default class NoCities extends VueComponent<NoCitiesProps> {
  @Prop()
  private readonly text!: NoCitiesProps['text']

  render(): JSX.Element {
    return (
      <div class={styles.container}>
        {this.text}
      </div>
    )
  }
}
