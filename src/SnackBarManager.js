import React from 'react'
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
    this.current = new RootSiblings(<SnackBar {...props} onAutoDismiss={this.dismiss} />)
    return this
  }

  _updateCurrent (props: SnackItemType): SnackBarManager {
    if (!this.current) {
      return this._addCurrent(props)
    }

    // An alternative way to update element content without hiding and showing animation
    // this.current.update(<SnackBar {...props} onAutoDismiss={this.dismiss} />)
    // return this

    return this._removeCurrent()._addCurrent(props)
  }

  _removeCurrent (): SnackBarManager {
    if (!this.current) {
      return this
    }

    this.current.destroy()
    this.current = null

    return this
  }

  get () {
    return {
      current: this.current,
      queue: this.queue
    }
  }

  add (title: string, options?: SnackItemType): void {
    const props = { title, ...options }

    if (this.current) {
      this.queue.push(props)
      return
    }

    this._addCurrent(props)
  }

  show (title: string, options?: SnackItemType): void {
    this._updateCurrent({ title, ...options })
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
