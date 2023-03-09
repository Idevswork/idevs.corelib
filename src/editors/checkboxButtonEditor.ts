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
}

@Decorators.registerEditor('CheckboxButtonEditor')
@Element('<div/>')
export class CheckboxButtonEditor extends Widget<CheckboxButtonEditorOptions> implements IReadOnly {
  constructor(input: JQuery, opt: CheckboxButtonEditorOptions) {
    super(input, opt)

    if (isEmptyOrNull(this.options.enumKey) && this.options.enumType == null && isEmptyOrNull(this.options.lookupKey)) {
      return
    }

    if (!isEmptyOrNull(this.options.lookupKey)) {
      const lookup = getLookup(this.options.lookupKey)
      for (const item of lookup.items) {
        const textValue = item[lookup.textField]
        const text = textValue == null ? '' : textValue.toString()
        const idValue = item[lookup.idField]
        const id = idValue == null ? '' : idValue.toString()
        this.addCheckbox(id, text)
      }
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
  }

  protected addCheckbox(value: string, text: string) {
    const div = $('<div class="col-12 col-sm-6 col-md-4 col-xl-3" />')
    const label = $('<label/>').text(text)
    $('<input type="checkbox" class="me-2"/>')
      .attr('name', this.uniqueName)
      .attr('id', this.uniqueName + '_' + value)
      .attr('value', value)
      .prependTo(label)
    label.appendTo(div)
    div.appendTo(this.element)
  }

  get_value(): string {
    const val: number[] = []
    this.element.find('input:checked').each((i, e) => {
      val.push(toId($(e).val()))
    })
    return val.join(',')
  }

  get value(): string {
    return this.get_value()
  }

  set_value(value: string): void {
    if (value !== this.get_value()) {
      let values: number[] = []
      if (!isEmptyOrNull(value)) values = value.split(',').map(p => Number(p))
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
