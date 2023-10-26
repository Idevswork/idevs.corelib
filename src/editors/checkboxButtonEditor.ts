/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
// reference: https://github-wiki-see.page/m/serenity-is/Serenity/wiki/CheckBox-Group-Editor

import { Decorators, EnumKeyAttribute, EnumTypeRegistry, IReadOnly, Widget } from '@serenity-is/corelib'
import {
  coalesce,
  Enum,
  getAttributes,
  getLookup,
  isArray,
  isEmptyOrNull,
  toId,
  tryGetText,
} from '@serenity-is/corelib/q'
import Element = Decorators.element

export type CheckboxButtonEditorOptions = {
  enumKey?: string
  enumType?: any
  lookupKey?: string
  isStringId?: boolean
}

@Decorators.registerEditor('CheckboxButtonEditor')
@Element('<div/>')
export class CheckboxButtonEditor extends Widget<CheckboxButtonEditorOptions> implements IReadOnly {
  private _items: Array<{ [key: string]: any }>
  private readonly _idField: string
  private readonly _textField: string
  private readonly _isStringId: boolean

  constructor(input: JQuery, opt: CheckboxButtonEditorOptions) {
    super(input, opt)

    if (isEmptyOrNull(this.options.enumKey) && this.options.enumType == null && isEmptyOrNull(this.options.lookupKey)) {
      return
    }

    this._isStringId = this.options.isStringId

    if (!isEmptyOrNull(this.options.lookupKey)) {
      const lookup = getLookup(this.options.lookupKey)
      this._idField = lookup.idField
      this._textField = lookup.textField
      this.set_items(lookup.items as Array<{ [key: string]: any }>)
    } else {
      const enumType = this.options.enumType || EnumTypeRegistry.get(this.options.enumKey)
      let enumKey = this.options.enumKey

      if (enumKey == null && enumType != null) {
        const enumKeyAttr = getAttributes(enumType, EnumKeyAttribute, false)
        if (enumKeyAttr.length > 0) {
          enumKey = enumKeyAttr[0].value
        }
      }
      const values = Enum.getValues(enumType)
      for (const x of values) {
        const name = Enum.toString(enumType, x)
        this.addCheckbox(x.toString(), coalesce(tryGetText('Enums.' + enumKey + '.' + name), name))
      }
    }

    this.element.addClass('d-flex flex-wrap')
  }

  protected renderCheckboxes() {
    this.element.children('div').remove()

    for (const item of this._items) {
      const textValue = item[this._textField]
      const text = textValue == null ? '' : textValue.toString()
      const idValue = item[this._idField]
      const id = idValue == null ? '' : idValue.toString()
      this.addCheckbox(id, text)
    }
  }

  protected addCheckbox(value: string, text: string) {
    const div = $('<div class="col-12 col-sm-6 col-md-4 col-xl-3" />')
    const label = $('<label/>').text(text.replace(/, /g, ',').replace(/,/g, ', '))
    $('<input type="checkbox" class="me-2" />')
      .attr('name', this.uniqueName)
      .attr('id', this.uniqueName + '_' + value)
      .attr('value', value)
      .prependTo(label)
    label.appendTo(div)
    div.appendTo(this.element)
  }

  get_items(): Array<{ [key: string]: any }> {
    return this._items
  }

  get items(): Array<{ [key: string]: any }> {
    return this.get_items()
  }

  set_items(value: Array<{ [key: string]: any }>) {
    this._items = value
    this.renderCheckboxes()
  }

  set items(v: Array<{ [key: string]: any }>) {
    this.set_items(v)
  }

  get_value(): string {
    const val: unknown[] = []
    this.element.find('input:checked').each((i, e) => {
      val.push(this._isStringId ? $(e).val() : toId($(e).val()))
    })
    return val.join(',')
  }

  get value(): string {
    return this.get_value()
  }

  set_value(value: string): void {
    if (value !== this.get_value()) {
      let values: unknown[] = []
      if (!isEmptyOrNull(value)) {
        values = this._isStringId ? value.split(',') : value.split(',').map(p => Number(p))
      }
      const inputs = this.element.find('input')
      inputs.each((i, e) => {
        ;(e as HTMLInputElement).checked = false
      })

      if (isArray(values)) {
        values.forEach(v => {
          const checks = inputs.filter('[value=' + v + ']')
          if (checks.length > 0) {
            ;(checks[0] as HTMLInputElement).checked = true
          }
        })
      } else {
        const checks = inputs.filter('[value=' + values + ']')
        if (checks.length > 0) {
          ;(checks[0] as HTMLInputElement).checked = true
        }
      }
    }
  }

  set value(v: string) {
    this.set_value(v)
  }

  get_readOnly(): boolean {
    return this.element.attr('disabled') != null
  }

  set_readOnly(value: boolean): void {
    if (this.get_readOnly() !== value) {
      if (value) {
        this.element.attr('disabled', 'disabled').find('input').attr('disabled', 'disabled')
      } else {
        this.element.removeAttr('disabled').find('input').removeAttr('disabled')
      }
    }
  }
}

export class idevsEditors {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public static load() {}
}
