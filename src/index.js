import React from 'react'
import { AsyncStorage } from 'react-native'
import RootSiblings from 'react-native-root-siblings'

import SnackBar from './SnackBar'

export default class SnackBarManager {
  constructor () {
    this.current = null
    this.queue = []
  }

  _hasQueue (): boolean {
    return Array.isArray(this.queue) && this.queue.length
  }

  _addCurrent (props): SnackBarManager {
    this.current = new RootSiblings(<SnackBar {...props} onDismiss={this.dismiss} />)
    return this
  }

  _updateCurrent (props, isAnimated: boolean = false): SnackBarManager {
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

  add (title: string, options?: Object): void {
    const props = { children: title, ...options }

    if (this.current) {
      this.queue.push(props)
      return
    }

    this._addCurrent(props)
  }

  show (title: string, options?: Object): void {
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