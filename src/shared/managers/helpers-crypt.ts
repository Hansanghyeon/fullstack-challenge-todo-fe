import CryptoJS from 'crypto-js'

const secretKey = 'fullstack-challenge-template-vite'
export const encryptData = (data: any) =>
  CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString()

export const decryptData = (data: any) => {
  const bytes = CryptoJS.AES.decrypt(data, secretKey)
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
}
