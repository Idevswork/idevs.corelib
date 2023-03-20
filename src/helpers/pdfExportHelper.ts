import { deepClone, postToService } from '@serenity-is/corelib/q'
import { IdevsExportOptions, IdevsExportRequest } from '../globals'

export type PdfExportOptions = IdevsExportOptions & {
  title?: string
  hint?: string
  separator?: boolean
}

export function doExportPdf(options: IdevsExportOptions): void {
  if (!options.onViewSubmit()) {
    return
  }

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

  postToService({ service: options.service, request: request, target: '_blank' })
}

export function createPdfToolButton(options: PdfExportOptions) {
  return {
    hint: options.hint || 'PDF',
    title: options.title || '',
    cssClass: 'export-pdf-button',
    onClick: doExportPdf(options),
    separator: options.separator,
  }
}
