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

  _hasQueue = (): boolean => {
    return Array.isArray(this.queue) && this.queue.length
  }

  _addCurrent = (props: SnackItemType, callback?: Function = () => {}): void => {
    this.current = new RootSiblings(<SnackBar {...props} onAutoDismiss={this.dismiss} />, callback)
  }

  _removeCurrent = (callback?: Function = () => {}): void => {
    if (!this.current) {
      callback()
      return
    }

    this.current.destroy(() => {
      this.current = null
      callback()
    })
  }

  get = () => {
    return {
      current: this.current,
      queue: this.queue
    }
  }

  add = (
    title: string,
    options?: SnackItemType,
    callback?: Function = () => {}
  ): void => {
    const props = { title, ...options }

    if (this.current) {
      this.queue.push(props)
      callback()
      return
    }

    this._addCurrent(props, callback)
  }

  show = (title: string, options?: SnackItemType): void => {
    const props = { title, ...options }

    if (!this.current) {
      this._addCurrent(props)
      return
    }

    this._removeCurrent(() => {
      this._addCurrent(props)
    })
  }

  dismiss = (callback?: Function = () => {}): void => {
    this._removeCurrent(() => {
      if (!this._hasQueue()) {
        callback()
        return
      }

      const current = this.queue.shift()
      this._addCurrent(current, callback)
    })
  }
}
