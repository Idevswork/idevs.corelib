import { Decorators } from '@serenity-is/corelib'
import { FormatterContext } from '@serenity-is/sleekgrid'
import { getLookup, htmlEncode, isEmptyOrNull } from '@serenity-is/corelib/q'

export type Formatter = {
  format(ctx: FormatterContext): string
}

@Decorators.registerFormatter('Idevs.ZeroDisplayFormatter')
export class ZeroDisplayFormatter implements Formatter {
  constructor() {
    this.displayText = ''
  }

  @Decorators.option()
  public displayText: string

  format(ctx: FormatterContext): string {
    const src = ctx.value as string

    const value = parseFloat(String(src || '0').replace(',', ''))
    if (value == 0) {
      return htmlEncode(this.displayText)
    }

    return htmlEncode(src)
  }
}

@Decorators.registerFormatter('Idevs.CheckboxFormatter')
export class CheckboxFormatter implements Formatter {
  constructor() {
    this.cssClass = 'text-center fs-2 text-gray-1'
    this.trueText = '1'
    this.falseText = '0'
    this.trueValueIcon = 'mdi mdi-checkbox-marked-outline'
    this.falseValueIcon = 'mdi mdi-checkbox-blank-outline'
  }

  @Decorators.option()
  public trueText: string

  @Decorators.option()
  public falseText: string

  @Decorators.option()
  public cssClass: string

  @Decorators.option()
  public trueValueIcon: string

  @Decorators.option()
  public falseValueIcon: string

  format(ctx: FormatterContext): string {
    const src = ctx.value as string
    if (src == this.trueText) {
      return `<i class="${this.trueValueIcon} ${this.cssClass}"></i>`
    } else if (src == this.falseText) {
      return `<i class="${this.falseValueIcon} ${this.cssClass}"></i>`
    } else {
      return htmlEncode(src)
    }
  }
}

@Decorators.registerFormatter('Idevs.LookupFormatter')
export class LookupFormatter implements Formatter {
  items: unknown[]
  idField: string
  textField: string

  constructor() {
    if (!isEmptyOrNull(this.lookupKey)) {
      const lookup = getLookup(this.lookupKey)
      this.items = lookup.items
      this.idField = lookup.idField
      this.textField = lookup.textField
    }
  }

  @Decorators.option()
  public lookupKey: string

  format(ctx: FormatterContext): string {
    const src = ctx.value as string
    if (!src) return ''

    const idList = Array.from(src).filter(i => i != ',')

    return idList
      .map(x => {
        if (!this.lookupKey) return x

        const g = this.items.find(i => i[this.idField] == x)
        if (!g) return x

        return htmlEncode(g[this.textField])
      })
      .join(', ')
  }
}
