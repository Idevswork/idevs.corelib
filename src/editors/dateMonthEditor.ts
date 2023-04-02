import { Decorators, SelectEditor, SelectEditorOptions } from '@serenity-is/corelib'

@Decorators.registerEditor('Serenity.DateMonthEditor')
export class DateMonthEditor extends SelectEditor {
  private months: string[] = []

  constructor(hidden: JQuery, opt: DateMonthEditorOptions) {
    super(hidden, opt)

    this.updateItems()
  }

  getItemsList() {
    return this.months
  }

  getItems() {
    const opt = this.options as DateMonthEditorOptions

    if (opt.items != null && opt.items.length >= 1) {
      return opt.items
    }

    const locale = opt.locale ?? 'en'
    const options = { month: opt.display ?? '2-digit' }

    for (let i = 11; i >= 0; i--) {
      this.months.push(new Date(2000, i, 1).toLocaleDateString(locale, options))
    }

    if (opt.descending) {
      return this.months
    }

    const months: string[] = []
    for (let i1 = 0; i1 <= 11; i1++) {
      months.push(new Date(2000, i1, 1).toLocaleDateString(locale, options))
    }

    return months
  }
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export interface DateMonthEditorOptions extends SelectEditorOptions {
  display?: '2-digit' | 'short' | 'long'
  locale?: 'en' | 'th'
  descending?: boolean
}
