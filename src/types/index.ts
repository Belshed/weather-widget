import Vue, { VNodeData } from 'vue'

/* eslint-disable */

export type CSSClass = (string | string[] | {
  [key: string]: any
})

type DefaultAttrs = {
  key?: string | number
  class?: CSSClass | CSSClass[]
  style?: VNodeData['style']
  ref?: VNodeData['ref']
}

export class VueComponent<P = {}> extends Vue {
  public $props!: P & DefaultAttrs
}

/* eslint-enable */
