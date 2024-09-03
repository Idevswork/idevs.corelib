import { deepClone, postToService } from '@serenity-is/corelib'
import { IdevsExportOptions, IdevsExportRequest } from '../globals'
import html2pdf from 'html2pdf.js'
import { jsPDF } from 'jspdf'

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
