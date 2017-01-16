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

  _setCurrent = (props: SnackItemType, callback?: Function = () => {}): void => {
    if (!('onAutoDismiss' in props)) {
      props.onAutoDismiss = this.dismiss
    }

    const current = new RootSiblings(<SnackBar {...props} />, () => {
      this.current = current
      callback()
    })
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

    this._setCurrent(props, callback)
  }

  show = (
    title: string,
    options?: SnackItemType,
    callback?: Function = () => {}
  ): void => {
    const props = { title, ...options }

    if (this.current) {
      this.queue.unshift(props)
      callback()
      return
    }

    this._setCurrent(props, callback)
  }

  dismiss = (callback?: Function = () => {}): void => {
    this._removeCurrent(() => {
      if (!this.queue.length) {
        callback()
        return
      }

      const current = this.queue.shift()
      this._setCurrent(current, callback)
    })
  }
}
