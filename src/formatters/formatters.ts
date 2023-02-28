import { Decorators } from '@serenity-is/corelib'
import { FormatterContext } from '@serenity-is/sleekgrid'
import { htmlEncode } from '@serenity-is/corelib/q'

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
