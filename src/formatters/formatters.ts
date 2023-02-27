import { Decorators } from '@serenity-is/corelib'
import { FormatterContext } from '@serenity-is/sleekgrid'
import { htmlEncode } from '@serenity-is/corelib/q'

export type Formatter = {
  format(ctx: FormatterContext): string
}

@Decorators.registerFormatter('Idevs.ZeroDisplayFormatter')
export class ZeroDisplayFormatter implements Formatter {
  constructor() {
    this.displayValue = ''
  }

  @Decorators.option()
  public displayValue: string

  format(ctx: FormatterContext): string {
    const src = ctx.value as string

    const value = parseFloat(String(src || '0').replace(',', ''))
    if (value == 0) {
      return htmlEncode(this.displayValue)
    }

    return htmlEncode(src)
  }
}

// @Decorators.registerFormatter('Idevs.ZeroToBlankFormatter')
// export class ZeroToBlankFormatter implements Formatter {
//   static format(src: string): string {
//     if (!src) {
//       return ''
//     }

//     const val = parseFloat(String(src).replace(',', ''))
//     if (val == 0) {
//       return ''
//     }

//     return htmlEncode(src)
//   }

//   format(ctx: FormatterContext): string {
//     return ZeroToBlankFormatter.format(ctx.value as string)
//   }
// }

@Decorators.registerFormatter('Idevs.CheckboxFormatter')
export class CheckboxFormatter implements Formatter {
  constructor() {
    this.cssClass = 'text-center fs-2 text-gray-1'
    this.trueValue = 1
    this.falseValue = 0
    this.trueValueIcon = 'mdi mdi-checkbox-marked-outline'
    this.falseValueIcon = 'mdi mdi-checkbox-blank-outline'
  }

  @Decorators.option()
  public trueValue: number | string

  @Decorators.option()
  public falseValue: number | string

  @Decorators.option()
  public cssClass: string

  @Decorators.option()
  public trueValueIcon: string

  @Decorators.option()
  public falseValueIcon: string

  format(ctx: FormatterContext): string {
    const src = ctx.value as string
    if (src == this.trueValue.toString()) {
      return `<i class="${this.trueValueIcon} ${this.cssClass}"></i>`
    } else if (src == this.falseValue.toString()) {
      return `<i class="${this.falseValueIcon} ${this.cssClass}"></i>`
    } else {
      return htmlEncode(src)
    }
  }
}
