export type ModalOptions = {
  events?: ModalEvent[]
}

export type ModalEvent = {
  event: string
  callback: (e: Event) => Promise<unknown>
}

export type DialogSize = {
  width?: number
  height?: number
}
