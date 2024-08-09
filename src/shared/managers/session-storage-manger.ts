import { decryptData, encryptData } from './helpers-crypt'

export class SessionStorageManager {
  static setItem(key: string, data: any) {
    const encryptedValue = encryptData(data)
    sessionStorage.setItem(key, JSON.stringify(encryptedValue))
  }
  static getItem(key: string) {
    const value = sessionStorage.getItem(key)
    try {
      return decryptData(value)
    } catch (_error) {
      return value
    }
  }
  static removeItem(key: string) {
    const value = this.getItem(key)
    sessionStorage.removeItem(key)
    return value
  }
  static clear() {
    sessionStorage.clear()
  }
}
