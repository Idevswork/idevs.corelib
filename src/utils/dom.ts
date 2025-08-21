/**
 * DOM utility functions
 */

export function getElementWidth(element?: HTMLElement): number {
  if (element) {
    return element.clientWidth
  }
  return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
}

export function getElementHeight(element?: HTMLElement): number {
  if (element) {
    return element.clientHeight
  }
  return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
}

export function removeChildren(parent?: HTMLElement): void {
  if (!parent) {
    return
  }

  while (parent.firstChild) {
    parent.removeChild(parent.firstChild)
  }
}

export function isOverflow(el: HTMLElement): boolean {
  return el.scrollHeight > el.clientHeight || el.scrollWidth > el.clientWidth
}

export function isOverflowY(el: HTMLElement): boolean {
  return el.scrollHeight > el.clientHeight
}

export function isOverflowX(el: HTMLElement): boolean {
  return el.scrollWidth > el.clientWidth
}

export function innerDimensions(el: HTMLElement | null): [number, number] {
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

export function findTarget(el: HTMLElement, target: string): HTMLElement {
  if (target.startsWith('.')) {
    if (!el.classList.contains(target.slice(1))) {
      el = el.closest(target) as HTMLElement
    }
  } else {
    if (el.tagName.toLowerCase() !== target.toLowerCase()) {
      el = el.closest(target) as HTMLElement
    }
  }
  return el
}

export function setCookie(name: string, value: string, expires?: number): void {
  let cookie = `${name}=${value}`
  if (expires) {
    const date = new Date()
    date.setTime(date.getTime() + expires * 24 * 60 * 60 * 1000)
    const exp = `expires=${date.toUTCString()}`
    cookie = `${cookie}; ${exp}`
  }
  document.cookie = `${cookie}; path=/`
}
