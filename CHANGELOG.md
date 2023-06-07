# Changelog

## 0.0.65 (2023-06-07)

### Added

- Add google font to idevs.print.css

## 0.0.64 (2023-06-05)

### Added

- Add function find begin month and end month

## 0.0.63 (2023-06-03)

### Added

- Add conditionRange to IdevsExportRequest

## 0.0.62 (2023-06-01)

### Changes

- rename and remove talbe theme property on IdevsExportRequest

## 0.0.61 (2023-06-01)

### Added

- Add support customize table theme style for ExcelExporter
- Add more css

## 0.0.60 (2023-05-31)

### Updates

- Add GROUP to AggregateType enum

## 0.0.59 (2023-05-27)

### Updates

- Update function updateDateQuickFilterProxyValue to return empty string when value is null

## 0.0.58 (2023-05-27)

### Updates

- Change property columnName of IdevsExportRequest to optional

## 0.0.57 (2023-05-27)

### Fixed

- Fixed optional parameter for ExportOptions

## 0.0.56 (2023-05-27)

### Fixed

- Fixed passing parameter from ExportOptions to IdevsExportRequest

## 0.0.55 (2023-05-26)

### Fixed

- Fixed mis-spell

## 0.0.54 (2023-05-26)

### Updates

- Added aggregateColumns property for aggregate column on summary row
- Remove unnecessary property for ExcelExportRequest

## 0.0.53 (2023-05-24)

### Fixed

- Chane property type in IdevsExportRequest

## 0.0.52 (2023-05-24)

### Updates

- Add property to IdevsExportRequest

## 0.0.51 (2023-05-20)

### Updates

- Update CSS

## 0.0.50 (2023-05-18)

### Fixed

- Fixed bug for function toDecimal and toNumber

## 0.0.49 (2023-05-13)

### Updates

- Update CSS

## 0.0.48 (2023-05-11)

### Updates

- Update CSS

## 0.0.47 (2023-05-11)

### Updates

- Update CSS

## 0.0.46 (2023-04-15)

### Updates

- Update css

## 0.0.45 (2023-04-15)

### Updates

- Remove convertToDateString
- Add dateStrignOption() to get default Intl.DateTimeFormatOptions

## 0.0.44 (2023-04-15)

### Fixed

- Fixed pdfExportHelper and excelExportHelper
- rename toLocaleString to convertToLocaleString

## 0.0.43 (2023-04-14)

### Updates

- Update typescript to v.5.0.4 and related packages to latest version
- Update globals.ts

## 0.0.42 (2023-04-06)

### Fixed

- Fixed updateDateQuickFilterProxyValue

## 0.0.41 (2023-04-06)

## Fixed

- Fixed toSqlDate
- Fixed updateDateQuickFilterProxyValue

## 0.0.40 (2023-04-06)

### Changes

- Rename ToolDropdownButton to DropdownToolButton
- Add ToggleToolButton

## 0.0.39 (2023-04-02)

### Added

- Add DateMonthFormatter

## 0.0.38 (2023-04-02)

### Fixed

- Fixed return value from DateMonthEditor

## 0.0.37 (2023-04-02)

### Updates

- Update return value from DateMonthEditor

## 0.0.36 (2023-04-02)

### Fixed

- Fixed error DateMonthEditor

## 0.0.35 (2023-04-02)

### Fixed

- Forget export DateMonthEditor

## 0.0.34 (2023-04-02)

### Added

- Add DateMonthEditor

## 0.0.33 (2023-03-30)

### Added

- Add toSqlDate, toTimeString, toNumber

## 0.0.32 (2023-03-24)

### Updates

- Rename onExportExcel to doExportExcel
- Change IdevsExportRequest property viewName to nullable string type

## 0.0.31 (2023-03-24)

### Added

- add function toSqlDateString to convert date to string in sql format yyyy-MM-dd

## 0.0.30 (2023-03-23)

### Added

- Added more css

## 0.0.29 (2023-03-23)

### Changes

- Rename new properties add from v0.0.28

## 0.0.28 (2023-03-23)

### Changes

- Add more property to IdevsExportRequest

## 0.0.27 (2023-03-22)

## Fixed

- Finally remove onViewSubmit and check within onClick event

## 0.0.26 (2023-03-22)

## Fixed

- Forgot to build

## 0.0.25 (2023-03-22)

### Fixed

- Fixed onViewSubmit

## 0.0.24 (2023-03-22)

### Changes

- bring back onViewSubmit

## 0.0.23 (2023-03-22)

### Fixed

- remove onViewSubmit from excelExportHelper and pdfExportHelper

## 0.0.22 (2023-03-22)

### Fixed

- onViewSubmit on excelExportHelper and pdfExportHelper

## 0.0.21 (2023-03-22)

### Fixed

- onViewSubmit on excelExportHelper and pdfExportHelper

## 0.0.20 (2023-03-22)

### Fixed

- createExportToolButton onClick

## 0.0.19 (2023-03-22)

### Fixed

- createExportToolButton

## 0.0.18 (2023-03-22)

### Updated

- Update pdfExporHelper, excelExportHelper, IDevsExportRequest
- Merge createPdfToolButton and createExcelToolButton with new name createExportToolButton

## 0.0.17 (2023-03-21)

### Fixed

- ExcelExportHelper.createToolButton => createExcelToolButton
- PdfExportHelper.createToolButton => createPdfToolButton

## 0.0.16 (2023-03-20)

### Fixed

- updateDateQuickFilterProxyValue

## 0.0.15 (2023-03-20)

## Added

- addDateQuickFilterProxy
- updateDateQuickFilterProxyValue

## 0.0.14 (2023-03-18)

### Fixed

- Fixed mistake for GridHelper

## 0.0.13 (2023-03-18)

### Added

- Add idevsEditors.load and idevsFormatters.load to force load scripts

## 0.0.12 (2023-03-14)

### Fixed

- Fixed LookupFormatter

## 0.0.11 (2023-03-13)

### Added

- LookupFormatter to display lookup values

## 0.0.10 (2023-03-10)

### Fixed

- Forgot to export CheckboxButtonEditor

## 0.0.9 (2023-03-10)

### Changes

- Include css into CheckboxButtonEditor directly instead of using external css file

## 0.0.8 (2023-03-09)

### Added

- CheckboxButtonEditor

## 0.0.7 (2023-03-04)

### Changes

Remove idevs.font.css

## 0.0.6 (2023-03-03)

### Changes

All new changes

## 0.0.5 (2023-02-28)

### Changes

- TypeScripts
  - Rename arguments all formatter

## 0.0.4 (2023-02-28)

### Added

- TypeScripts
  - ZeroDisplayFormatter

### Removed

- TypeScripts
  - ZeroToBlankFormatter

## 0.0.2 (2023-02-26)

Update package with usable version.

### Added

- TypeScripts

  - ToolDropdownButton
  - CheckboxFormatter
  - ZeroToBlankFormatter

- Stylesheets
  - idevs.dropdown.css
  - idevs.font.css
  - idevs.print.css

## 0.0.1 (2023-02-25)

Test publish on npm libraries.
