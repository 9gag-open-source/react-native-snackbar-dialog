import { AsyncStorage } from 'react-native'

const STORAGE_NAMESPACE = 'SNACKBAR'
const KEY_CURRENT = `${STORAGE_NAMESPACE}:CURRENT`
const KEY_QUEUE = `${STORAGE_NAMESPACE}:QUEUE`

export default class Storage {
  static getCurrent = async () => {
    return JSON.parse(await AsyncStorage.getItem(KEY_CURRENT))
  }

  static setCurrent = async (item) => {
    return await AsyncStorage.setItem(KEY_CURRENT, JSON.stringify(item))
  }

  static removeCurrent = async () => {
    return await AsyncStorage.removeItem(KEY_CURRENT)
  }

  static getItems = async () => {
    return JSON.parse(await AsyncStorage.getItem(KEY_QUEUE))
  }

  static hasItems = async () => {
    const queue = JSON.parse(await AsyncStorage.getItem(KEY_QUEUE))
    return Array.isArray(queue) && queue.length
  }

  static addToQueue = async (item) => {
    const queue = JSON.parse(await AsyncStorage.getItem(KEY_QUEUE))
    const hasQueue = Array.isArray(queue) && queue.length
    await AsyncStorage.setItem(KEY_QUEUE, JSON.stringify(hasQueue ? queue.concat(item) : item))
  }

  static setQueue = async (items) => {
    await AsyncStorage.setItem(KEY_QUEUE, JSON.stringify(tems))
  }
}