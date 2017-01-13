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

  _updateCurrent (props): SnackBarManager {
    if (!this.current) {
      return this._addCurrent(props)
    }

    // Temporary disabled
    // this.current.update(<SnackBar {...props} onDismiss={this.dismiss} />)

    return this
      ._removeCurrent()
      ._addCurrent(props)
  }

  _removeCurrent (): SnackBarManager {
    if (!this.current) {
      return this
    }

    this.current.destroy()
    this.current = null

    return this
  }

  add (props): void {
    if (this.current) {
      this.queue.push(props)
      return
    }

    this._addCurrent(props)
  }

  show (props): void {
    this._updateCurrent(props)
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