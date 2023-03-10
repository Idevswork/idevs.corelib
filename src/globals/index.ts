import { DataGrid, ListRequest } from '@serenity-is/corelib'
import { Modal } from 'bootstrap'

declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Number {
    toDecimal(precision?: number): string
  }

  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface String {
    truncate(maxLength?: number): string
    toNumber(): number
    toMethodRound(method?: number): number
  }

  type IModalOptions = {
    events?: IEvent[]
  }

  type IEvent = {
    event: string
    callback: (e: Event) => Promise<unknown>
  }
}

Number.prototype.toDecimal = function (precision?: number): string {
  const numb = precision || 0
  const options = {
    style: 'decimal',
    minimumFractionDigits: numb,
    maximumFractionDigits: numb,
  }
  let value = Intl.NumberFormat('en-US', options).format(this.valueOf())
  value = parseFloat(value.replace(',', '')).toString()
  return Intl.NumberFormat('en-US', options).format(parseFloat(value))
}

String.prototype.truncate = function (maxLength: number) {
  const str = String(this)
  return str.length > maxLength ? str.substring(0, maxLength - 1) + '&hellip;' : str
}

String.prototype.toNumber = function () {
  return this.valueOf() ? parseFloat(this.valueOf().replace(',', '')) : 0
}

String.prototype.toMethodRound = function (method: number): number {
  const input = parseFloat(this.valueOf())
  let value = isNaN(input) ? 0 : input
  if (value == 0) return 0

  const r = parseFloat(value.toFixed(2))
  switch (method) {
    case 1:
      value = r - (parseFloat(((r % 1) * 100).toFixed(2)) % 25) / 100
      break

    case 2:
      value = r - (parseFloat(((r % 1) * 100).toFixed(2)) % 50) / 100
      break

    case 3:
      value = Math.floor(r)
      break

    case 4:
      value = Math.floor(r) + (Math.floor((r % 1) * 100) + (25 - (Math.floor((r % 1) * 100) % 25))) / 100
      break

    case 5:
      value = Math.floor(r) + (Math.floor((r % 1) * 100) + (50 - (Math.floor((r % 1) * 100) % 50))) / 100
      break

    case 6:
      value = Math.ceil(r)
      break

    case 7:
      value = Math.floor(r) + (parseFloat((parseFloat(((r % 1) * 100).toString()) / 25).toFixed(0)) * 25) / 100
      break

    case 8:
      value = Math.floor(r) + (parseFloat((parseFloat(((r % 1) * 100).toString()) / 50).toFixed(0)) * 50) / 100
      break

    case 9:
      value = parseFloat(r.toFixed(0))
      break

    default:
      value = r
      break
  }

  return value
}

export function ToTimeString(value: number): string {
  const hours = `0${Math.floor(value / 60)}`.slice(-2)
  const minutes = `0${value % 60}`.slice(-2)
  return `${hours}:${minutes}`
}

export function ToNumber(date: Date): number {
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()
  return hours * 60 + minutes * 60 + seconds
}

export function GetElementWidth(element?: HTMLElement): number {
  if (element) {
    return element.clientWidth
  }

  return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
}

export function GetElementHeight(element?: HTMLElement): number {
  if (element) {
    return element.clientHeight
  }

  return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
}

export function RemoveChildren(parent?: HTMLElement): void {
  if (!parent) {
    return
  }

  while (parent.firstChild) {
    parent.removeChild(parent.firstChild)
  }
}

export function IsOverflow(el: HTMLElement): boolean {
  return el.scrollHeight > el.clientHeight || el.scrollWidth > el.clientWidth
}

export function IsOverflowY(el: HTMLElement): boolean {
  return el.scrollHeight > el.clientHeight
}

export function IsOverflowX(el: HTMLElement): boolean {
  return el.scrollWidth > el.clientWidth
}

export function InnerDimensions(el: HTMLElement | null): [number, number] {
  if (!el) {
    return [0, 0]
  }

  const style = getComputedStyle(el)
  let width = el.clientWidth
  let height = el.clientHeight

  height -= parseFloat(style.paddingTop) + parseFloat(style.paddingBottom)
  width -= parseFloat(style.paddingLeft) + parseFloat(style.paddingRight)

  return [height, width]
}

export function neededTarget(el: HTMLElement, target: string): HTMLElement {
  if (target.slice(0, 1) == '.') {
    if (el.classList.contains(target.slice(1)) === false) {
      el = el.closest(target) as HTMLElement
    }
  } else {
    if (el.tagName.toLowerCase() !== target.toLowerCase()) {
      el = el.closest(target) as HTMLElement
    }
  }
  return el
}

export function toDateString(date: Date): string {
  return new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date)
}

export function GetModal(name: string, options?: IModalOptions): Modal {
  const el = document.querySelector(name) as HTMLElement
  if (options?.events?.length) {
    options.events.forEach(callback => {
      el.addEventListener(
        callback.event,
        (e: Event) => {
          callback.callback(e)
        },
        { once: true },
      )
    })
  }

  return Modal.getOrCreateInstance(el, { backdrop: 'static' })
}

export const setCookie = (name: string, value: string, expires?: number): void => {
  let cookie = `${name}=${value}`
  if (expires) {
    const date = new Date()
    date.setTime(date.getTime() + expires * 24 * 60 * 60 * 1000)
    const exp = `expires=${date.toUTCString()}`
    cookie = `${cookie}; ${exp}`
  }
  document.cookie = `${cookie}; path=/`
}

export function doProxyInput(name: string): HTMLInputElement {
  const input: HTMLInputElement = document.querySelector(`input[name="${name}"]`)
  const cloneInput: HTMLInputElement = input.cloneNode(true) as HTMLInputElement
  cloneInput.setAttribute('name', `${name}-2`)
  cloneInput.setAttribute('id', `${input.getAttribute('id')}-2`)
  cloneInput.classList.remove('customValidate')
  cloneInput.classList.remove('dateQ')

  input.parentNode.insertBefore(cloneInput, input.nextSibling)
  input.classList.add('d-none')

  return cloneInput
}

export type IdevsExportOptions = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  grid: DataGrid<any, any>
  service: string
  viewName: string
  onViewSubmit: () => boolean
}

export type IdevsExportRequest = ListRequest & {
  viewName: string
}

export class globals {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public static load() {}
}
