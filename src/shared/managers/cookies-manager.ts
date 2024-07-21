import { decryptData, encryptData } from './helpers-crypt'
import * as math from 'mathjs'
import { pipe } from 'fp-ts/function'

export class CookiesManager {
  //used to:
  // - set new cookie => setCookie('name;, 'value', 10);
  // - remove cookie => setCookie('name', '', -10);
  static setCookie(cname: string, cvalue: any, exdays: number) {
    const encryptedValue = encryptData(cvalue),
      d = new Date()
    pipe(
      math
        .chain(exdays)
        .multiply(24)
        .multiply(60)
        .multiply(60)
        .multiply(1000)
        .add(d.getTime())
        .done(),
      d.setTime,
    )
    const expires = 'expires=' + d.toUTCString()
    document.cookie = cname + '=' + encryptedValue + ';' + expires + ';path=/'
  }
  static getCookie(cname: string) {
    const name = cname + '=',
      ca = document.cookie.split(';')
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i]
      while (c.charAt(0) === ' ') {
        c = c.substring(1)
      }
      if (c.indexOf(name) === 0) {
        const value = c.substring(name.length, c.length)
        return decryptData(value)
      }
    }
    return ''
  }
}
