import { AsyncStorage } from 'react-native'

const STORAGE_NAMESPACE = 'SNACKBAR'
const KEY_CURRENT = `${STORAGE_NAMESPACE}:CURRENT`
const KEY_QUEUE = `${STORAGE_NAMESPACE}:QUEUE`

export default class Storage {
  static getCurrent = async () => {
    return await AsyncStorage.getItem(KEY_CURRENT)
  }

  static setCurrent = async (item) => {
    return await AsyncStorage.setItem(KEY_CURRENT, item)
  }

  static removeCurrent = async () => {
    return await AsyncStorage.removeItem(KEY_CURRENT)
  }

  static getItems = async () => {
    return await AsyncStorage.getItem(KEY_QUEUE)
  }

  static hasItems = async () => {
    const queue = await AsyncStorage.getItem(KEY_QUEUE)
    return Array.isArray(queue) && queue.length
  }

  static addToQueue = async (item) => {
    const queue = await AsyncStorage.getItem(KEY_QUEUE)
    const hasQueue = Array.isArray(queue) && queue.length
    await AsyncStorage.setItem(KEY_QUEUE, hasQueue ? queue.concat(item) : item)
  }

  static setQueue = async (items) => {
    await AsyncStorage.setItem(KEY_QUEUE, items)
  }
}