import { DataGrid, ListRequest, ToolButton } from '@serenity-is/corelib'
import { Modal } from 'bootstrap'

declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Number {
    toDecimal(precision?: number): string
    toTimeString(): string
  }

  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface String {
    truncate(maxLength?: number): string
    toNumber(): number
    toMethodRound(method?: number): number
  }

  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Date {
    toSqlDate(): string
    toNumber(): number
  }

  type IModalOptions = {
    events?: IEvent[]
  }

  type IEvent = {
    event: string
    callback: (e: Event) => Promise<unknown>
  }
}

Date.prototype.toSqlDate = function (): string {
  const date = this.valueOf()
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString()
}

Date.prototype.toNumber = function (): number {
  const date = this.valueOf()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()
  return hours * 60 + minutes + seconds / 60
}

Number.prototype.toTimeString = function (): string {
  const value = this.valueOf()
  const hours = `0${Math.floor(value / 60)}`.slice(-2)
  const minutes = `0${value % 60}`.slice(-2)
  return `${hours}:${minutes}`
}

Number.prototype.toDecimal = function (precision?: number): string {
  const numb = precision || 0
  const options = {
    style: 'decimal',
    minimumFractionDigits: numb,
    maximumFractionDigits: numb,
  }
  let value = Intl.NumberFormat('en-US', options).format(this.valueOf())
  value = parseFloat(value.replace(/,/g, '')).toString()
  return Intl.NumberFormat('en-US', options).format(parseFloat(value))
}

String.prototype.truncate = function (maxLength: number) {
  const str = String(this)
  return str.length > maxLength ? str.substring(0, maxLength - 1) + '&hellip;' : str
}

String.prototype.toNumber = function () {
  return this.valueOf() ? parseFloat(this.valueOf().replace(/,/g, '')) : 0
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

export function dateStringOption(): Intl.DateTimeFormatOptions {
  return {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }
}

export function toDateString(date: Date): string {
  return date.toLocaleString('en-GB', dateStringOption())
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

/**
 * addDateQuickFilterProxy
 *
 * @export
 * @param {string} name
 * @param {number} width
 */
export function addDateQuickFilterProxy(name: string, width: number): void {
  const input: HTMLInputElement = document.querySelector(`input[name="${name}"]`)
  const cloneInput: HTMLInputElement = input.cloneNode(true) as HTMLInputElement
  cloneInput.setAttribute('name', `${name}-2`)
  cloneInput.setAttribute('id', `${input.getAttribute('id')}-2`)
  cloneInput.setAttribute('readonly', 'readonly')
  cloneInput.classList.remove('customValidate')
  cloneInput.classList.remove('s-DateEditor')
  cloneInput.classList.remove('s-Serenity-DateEditor')
  cloneInput.classList.remove('dateQ')
  cloneInput.classList.remove('hasDatepicker')
  cloneInput.style.width = `${width}px`

  input.parentNode.insertBefore(cloneInput, input.nextSibling)
  input.classList.add('d-none')
}

/**
 * updateDateQuickFilterProxyValue
 *
 * @export
 * @param {string} name of source element
 * @param {string} locale
 */
export function updateDateQuickFilterProxyValue(name: string, dateValue: string, locale: string): void {
  const target = document.querySelector(`#${name}-2`) as HTMLInputElement
  target.value = new Date(dateValue).toLocaleString(locale, dateStringOption())
}

export function toSqlDateString(date: Date): string {
  const offset = date.getTimezoneOffset()
  date = new Date(date.getTime() - offset * 60 * 1000)
  return date.toISOString().split('T')[0]
}

export enum AggregateType {
  LABEL = 0,
  AVERAGE = 1,
  COUNT = 2,
  SUM = 3,
}

export type AggreateColumn = {
  title: string
  columnName: string
  aggregateType: AggregateType
}

export type IdevsExportRequest = ListRequest & {
  viewName?: string
  companyName?: string
  reportName?: string
  selectionRange?: string
  logo?: string
  entity?: unknown
  aggregateColumns?: AggreateColumn[]
}

export type IdevsExportOptions = IdevsExportRequest & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  grid: DataGrid<any, any>
  service: string
}

export type ExportOptions = IdevsExportOptions & {
  title?: string
  hint?: string
  separator?: boolean
  exportType: 'PDF' | 'XLSX'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick?: (e: any) => void
}

export function createExportToolButton(options: ExportOptions): ToolButton {
  return {
    hint: options.hint || options.exportType,
    title: options.title || '',
    cssClass: `export-${options.exportType.toLowerCase()}-button`,
    onClick: options.onClick,
    separator: options.separator,
  }
}

export class globals {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public static load() {}
}
