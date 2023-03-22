import { deepClone, postToService } from '@serenity-is/corelib/q'
import { IdevsExportOptions, IdevsExportRequest } from '../globals'

export function doExportPdf(options: IdevsExportOptions): void {
  if (!options.onViewSubmit) {
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
