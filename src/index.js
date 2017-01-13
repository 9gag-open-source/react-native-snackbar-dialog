import React from 'react'
import { AsyncStorage } from 'react-native'
import RootSiblings from 'react-native-root-siblings'

import type { SnackItemType } from './type'
import SnackBar from './SnackBar'

export default class SnackBarManager {
  current: SnackItemType
  queue: Array<SnackItemType>

  constructor () {
    this.current = null
    this.queue = []
  }

  _hasQueue (): boolean {
    return Array.isArray(this.queue) && this.queue.length
  }

  _addCurrent (props: SnackItemType): SnackBarManager {
    this.current = new RootSiblings(<SnackBar {...props} onDismiss={this.dismiss} />)
    return this
  }

  _updateCurrent (props: SnackItemType, isAnimated: boolean = false): SnackBarManager {
    if (!this.current) {
      return this._addCurrent(props)
    }

    if (isAnimated) {
      return this
        ._removeCurrent()
        ._addCurrent(props)
    }

    this.current.update(<SnackBar {...props} onDismiss={this.dismiss} />)
    return this
  }

  _removeCurrent (): SnackBarManager {
    if (!this.current) {
      return this
    }

    this.current.destroy()
    this.current = null

    return this
  }

  get() {
    return {
      current: this.current,
      queue: this.queue
    }
  }

  add (title: string, options?: SnackItemType): void {
    const props = { children: title, ...options }

    if (this.current) {
      this.queue.push(props)
      return
    }

    this._addCurrent(props)
  }

  show (title: string, options?: SnackItemType): void {
    this._updateCurrent({ children: title, ...options })
  }

  dismiss (): void {
    this._removeCurrent()

    if (!this._hasQueue()) {
      return
    }

    const current = this.queue.shift()
    this._addCurrent(current)
  }
}