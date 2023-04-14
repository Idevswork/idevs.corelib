import { Decorators } from '@serenity-is/corelib'
import { FormatterContext } from '@serenity-is/sleekgrid'
import { getLookup, htmlEncode } from '@serenity-is/corelib/q'

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
  @Decorators.option()
  public lookupKey: string

  format(ctx: FormatterContext): string {
    const src = ctx.value as string
    if (!src) return ''

    if (!this.lookupKey) return src

    const lookup = getLookup(this.lookupKey)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const items = lookup.items as Array<{ [key: string]: any }>
    const idField = lookup.idField
    const textField = lookup.textField
    const idList = src.split(',')

    return idList
      .map(x => {
        const g = items.find(i => i[idField] == x)
        if (!g) return x

        return htmlEncode(g[textField])
      })
      .join(', ')
  }
}

@Decorators.registerFormatter('Idevs.DateMonthFormatter')
export class DateMonthFormatter implements Formatter {
  @Decorators.option()
  public display: '2-digit' | 'short' | 'long'

  @Decorators.option()
  public locale: 'en' | 'th'

  format(ctx: FormatterContext): string {
    const src = ctx.value as number
    if (!src) return ''

    const locale = this.locale ?? 'en'
    const options = { month: this.display ?? '2-digit' }

    return new Date(2000, src - 1, 1).toLocaleDateString(locale, options)
  }
}

export class idevsFormatters {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public static load() {}
}
