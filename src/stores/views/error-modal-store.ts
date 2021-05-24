import { makeAutoObservable } from 'mobx'

enum MessageType {
  error = 'error',
}

class ErrorModalStore {
  message = ''
  type: MessageType = MessageType.error

  display = false

  constructor() {
    makeAutoObservable(this)
  }

  open(message: string, type: keyof typeof MessageType) {
    this.message = message
    this.type = MessageType[type]
    this.display = true
  }

  close() {
    this.display = false
    this.message = ''
  }
}

export const errorModalStore = new ErrorModalStore()
