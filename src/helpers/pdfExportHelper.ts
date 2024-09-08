import { deepClone, postToService } from '@serenity-is/corelib'
import { IdevsExportOptions, IdevsExportRequest } from '../globals'
import html2pdf from 'html2pdf.js'
import { jsPDF } from 'jspdf'
import pdfMake from 'pdfmake/build/pdfmake'
import { vfsFonts } from './custom-fonts'
import htmlToPdfmake from 'html-to-pdfmake'
import { Margins, PageOrientation, PageSize, Style, TDocumentDefinitions } from 'pdfmake/interfaces'

export function doExportPdf(options: IdevsExportOptions): void {
  const grid = options.grid
  const request = deepClone(grid.getView().params) as IdevsExportRequest
  request.Take = 0
  request.Skip = 0
  const sortBy = grid.getView().sortBy
  if (sortBy) {
    request.Sort = sortBy
  }

  request.ExportColumns = []
  const columns = grid.getGrid().getColumns()
  for (const column of columns) {
    request.ExportColumns.push(column.id || column.field || '')
  }
  request.ExportColumns = request.ExportColumns.filter(column => !!column)
  request.viewName = options.viewName
  request.companyName = options.companyName
  request.reportName = options.reportName
  request.selectionRange = options.selectionRange
  request.conditionRange = options.conditionRange
  request.logo = options.logo
  request.entity = options.entity

  postToService({ service: options.service, request: request, target: '_blank' })
}

export type generatePdfOption = {
  unit?: string
  format?: string
  orientation?: string
  margin?: number
}

export function generatePdf(content: string, option?: generatePdfOption): void {
  const margin = option?.margin ?? 10
  const unit = option?.unit ?? 'mm'
  const format = option?.format ?? 'a4'
  const orientation = option?.orientation ?? 'portrait'
  if (content) {
    html2pdf()
      .from(content)
      .set({
        margin: margin,
        filename: 'filename.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, logging: true, dpi: 192, letterRendering: true },
        jsPDF: { unit: unit, format: format, orientation: orientation },
      })
      .toPdf()
      .get('pdf')
      .then((pdf: jsPDF) => {
        const blob = pdf.output('blob')
        const url = URL.createObjectURL(blob)
        window.open(url, '_blank')
      })
  }
}

export function makePdf(html: string, options?: PageOptions): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!html) {
      reject('No html to make a pdf')
    } else {
      pdfMake.vfs = vfsFonts
      pdfMake.fonts = {
        Roboto: {
          normal: 'Roboto-Regular.ttf',
          bold: 'Roboto-Medium.ttf',
          italics: 'Roboto-Italic.ttf',
          bolditalics: 'Roboto-MediumItalic.ttf',
        },
        THSarabun: {
          normal: 'THSarabun.ttf',
          bold: 'THSarabun Bold.ttf',
          italics: 'THSarabun Italic.ttf',
          bolditalics: 'THSarabun Bold Italic.ttf',
        },
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const def: any = htmlToPdfmake(html, { tableAutoSize: true })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let main = def.find((el: any) => el['nodeName'] == 'MAIN')
      if (!main) {
        return
      }
      main = removeEmptyTextNodes(main)

      const defStyle = options?.defaultStyle || {
        font: 'THSarabun',
      }

      const margin = options?.pageMargins ?? 40
      const pageSize = options?.pageSize ?? 'A4'
      const pageOrientation = options?.pageOrientation ?? 'portrait'

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let header: any = def.find((el: any) => el['nodeName'] == 'HEADER')
      header = removeEmptyTextNodes(header)
      const hd = header ? JSON.stringify(header) : undefined

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let footer = def.find((el: any) => el['nodeName'] == 'FOOTER')
      if (footer) {
        footer = removeEmptyTextNodes(footer)
      }
      const ft = footer ? JSON.stringify(footer) : undefined

      const content: TDocumentDefinitions = {
        content: main,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        header: function (currentPage, pageCount, pageSize) {
          if (!hd) {
            return ''
          }

          const h = hd.replace('{{pageNo}}', currentPage.toString()).replace('{{totalPages}}', pageCount.toString())
          return JSON.parse(h)
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        footer: function (currentPage, pageCount, pageSize) {
          if (!ft) {
            return ''
          }
          const f = ft.replace('{{pageNo}}', currentPage.toString()).replace('{{totalPages}}', pageCount.toString())
          return JSON.parse(f)
        },
        pageSize: pageSize,
        pageOrientation: pageOrientation,
        pageMargins: margin,
        defaultStyle: defStyle,
      }

      pdfMake.createPdf(content).open()

      resolve('Make pdf successfully')
    }
  })
}

export type PageOptions = {
  defaultStyle?: Style | undefined
  pageSize?: PageSize | undefined
  pageOrientation?: PageOrientation | undefined
  pageMargins?: Margins | undefined
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const removeEmptyTextNodes = (obj: any): any => {
  // If obj is an array, iterate through each element and filter
  if (Array.isArray(obj)) {
    return obj
      .map(removeEmptyTextNodes) // Recursively apply the function
      .filter(item => !(item && item.text === ' ')) // Remove elements where text is " "
  }

  // If obj is an object, check each key
  if (typeof obj === 'object' && obj !== null) {
    // eslint-disable-next-line prefer-const
    for (let key in obj) {
      // eslint-disable-next-line no-prototype-builtins
      if (obj.hasOwnProperty(key)) {
        obj[key] = removeEmptyTextNodes(obj[key])
      }
    }
  }

  return obj
}
