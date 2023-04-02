import { Decorators, SelectEditor, SelectEditorOptions } from '@serenity-is/corelib'
import { indexOf } from '@serenity-is/corelib/q'

@Decorators.registerEditor('DateMonthEditor')
export class DateMonthEditor extends SelectEditor {
  private months: string[]

  constructor(hidden: JQuery, opt: DateMonthEditorOptions) {
    super(hidden, opt)

    this.updateItems()
  }

  get valueAsMonth() {
    return indexOf(this.months, x => x == this.value)
  }

  getItems() {
    const opt = this.options as DateMonthEditorOptions

    if (opt.items != null && opt.items.length >= 1) {
      return opt.items
    }

    this.months = []
    const locale = opt.locale ?? 'en'
    const options = { month: opt.display ?? '2-digit' }

    for (let i = 0; i <= 11; i++) {
      this.months.push(new Date(2000, i, 1).toLocaleDateString(locale, options))
    }

    return this.months
  }
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export interface DateMonthEditorOptions extends SelectEditorOptions {
  display?: '2-digit' | 'short' | 'long'
  locale?: 'en' | 'th'
}
