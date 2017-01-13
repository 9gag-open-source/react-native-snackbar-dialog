import React from 'react'
import { AsyncStorage } from 'react-native'
import RootSiblings from 'react-native-root-siblings'

import SnackBarComponent from './SnackBar'
import Storage from './utils/storage'

export default class SnackBar {
  static add = async (props): void => {
    try {
      const currentElement = await Storage.getCurrent()

      if (currentElement) {
        await Storage.addToQueue(props)
        return
      }

      await Storage.setCurrent(new RootSiblings(<SnackBarComponent {...props} onDismiss={SnackBardismiss} />))
    } catch (e) {
      console.warn(e)
    }
  }

  static show = async (props): void => {
    try {
      console.info('this', this)
      console.info('this.dismiss', this.dismiss)
      const newElement = <SnackBarComponent {...props} onDismiss={SnackBar.dismiss} />
      const currentElement = await Storage.getCurrent()
console.info('currentElement', currentElement)
      if (currentElement) {
        currentElement.update(newElement)
        return
      }
console.info('setCurrent')
      await Storage.setCurrent(new RootSiblings(newElement))
    } catch (e) {
      console.warn(e)
    }
  }

  static dismiss = async (): void => {
    try {
      const currentElement = await Storage.getCurrent()

      if (currentElement) {
        currentElement.destroy()
        await Storage.removeCurrent()
      }

      const queue = await Storage.getItems()
      const hasQueue = Array.isArray(queue) && queue.length

      if (!hasQueue) {
        return
      }

      const [currentProps, ...items] = queue
      await Storage.setCurrent(new RootSiblings(<SnackBarComponent {...currentProps} onDismiss={SnackBar.dismiss} />))

      items.length && await Storage.setQueue(items)
    } catch (e) {
      console.warn(e)
    }
  }
}