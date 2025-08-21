# @idevs/corelib

![npm version](https://img.shields.io/npm/v/@idevs/corelib.svg)
![license](https://img.shields.io/npm/l/@idevs/corelib.svg)

A comprehensive library of extended components and utilities for the Serenity Framework. This library provides additional editors, formatters, UI components, and helper functions to enhance your Serenity applications.

## Features

- 🎛️ **Extended Editors**: Additional input editors like CheckboxButton and DateMonth
- 📊 **Custom Formatters**: Specialized data formatters for grids and displays
- 🎨 **UI Components**: Enhanced toolbar buttons and UI widgets
- 🛠️ **Utility Functions**: Date, DOM, and formatting utilities
- 📄 **Export Helpers**: PDF and Excel export functionality
- 🌐 **TypeScript**: Full TypeScript support with type definitions

## Installation

```bash
npm install @idevs/corelib
```

## Quick Start

### Basic Usage

```typescript
import {
  CheckboxButtonEditor,
  ZeroDisplayFormatter,
  DropdownToolButton,
  // Utility functions
  toDateString,
  getElementWidth,
  createExportToolButton,
} from '@idevs/corelib'

// The library also extends global prototypes for convenience
// (though we recommend using the utility functions directly)
const timeStr = (120).toTimeString() // "02:00"
const truncated = 'Hello World'.truncate(5) // "Hell…"
```

### TypeScript Configuration

After installing, update your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@idevs/*": ["node_modules/@idevs/*/dist/index"]
    }
  }
}
```

> **Note**: Since version 1.0.0, the package only ships with built files. The TypeScript definitions are automatically available from the `dist/` folder.

### Editors

#### CheckboxButtonEditor

A multi-checkbox editor that displays options as button-style checkboxes.

```typescript
@Decorators.registerEditor()
export class MyForm extends EntityDialog {
  protected form = {
    categories: new CheckboxButtonEditor({
      lookupKey: 'MyModule.CategoryLookup',
    }),
  }
}
```

### Formatters

#### ZeroDisplayFormatter

Displays custom text when value is zero.

```typescript
columns.push({
  field: 'Amount',
  formatter: ZeroDisplayFormatter,
  formatterParams: { displayText: 'N/A' },
})
```

#### CheckboxFormatter

Displays checkboxes with customizable icons.

```typescript
columns.push({
  field: 'IsActive',
  formatter: CheckboxFormatter,
  formatterParams: {
    trueValueIcon: 'mdi mdi-check-circle',
    falseValueIcon: 'mdi mdi-close-circle',
  },
})
```

### UI Components

#### DropdownToolButton

A toolbar button with dropdown menu functionality.

```typescript
const exportButton = new DropdownToolButton({
  title: 'Export',
  cssClass: 'export-dropdown',
  items: [
    { text: 'Export PDF', onClick: () => exportToPDF() },
    { text: 'Export Excel', onClick: () => exportToExcel() },
  ],
})
```

### Utility Functions

#### Date Utilities

```typescript
import { toDateString, toSqlDateString, toBeginMonth, toEndMonth } from '@idevs/corelib'

const formatted = toDateString(new Date()) // "31/12/2024"
const sqlDate = toSqlDateString(new Date()) // "2024-12-31"
const monthStart = toBeginMonth('2024-06-15') // "2024-06-01"
const monthEnd = toEndMonth('2024-06-15') // "2024-06-30"
```

#### DOM Utilities

```typescript
import { getElementWidth, removeChildren, isOverflow } from '@idevs/corelib'

const width = getElementWidth(element)
removeChildren(containerElement)
const hasOverflow = isOverflow(element)
```

#### Format Utilities

```typescript
import {
  toTimeString,
  toDecimalString,
  truncateString,
  RoundingMethod,
  roundByMethod,
} from '@idevs/corelib'

const time = toTimeString(150) // "02:30"
const decimal = toDecimalString(123.456, 2) // "123.46"
const short = truncateString('Long text here', 10) // "Long text…"
const rounded = roundByMethod('123.47', RoundingMethod.Quarter25) // 123.25
```

### Export Functionality

```typescript
import { createExportToolButton, ExportOptions } from '@idevs/corelib'

const exportOptions: ExportOptions = {
  grid: myDataGrid,
  service: 'MyModule/MyService',
  exportType: 'PDF',
  title: 'Export PDF',
  onClick: () => handleExport(),
}

const toolButton = createExportToolButton(exportOptions)
```

## Migration Guide

If you're upgrading from an earlier version:

### Breaking Changes in v1.0.0

- Reorganized module structure with better separation of concerns
- Some utility functions moved to dedicated modules
- TypeScript strict mode enabled - may require type fixes
- ESLint rules updated - may require code style updates

### Recommended Migration

1. Update imports to use the new modular structure:

   ```typescript
   // Old
   import { someFunction } from '@idevs/corelib/globals'

   // New
   import { someFunction } from '@idevs/corelib'
   // or more specifically:
   import { someFunction } from '@idevs/corelib/utils'
   ```

2. Consider using utility functions instead of prototype extensions:

   ```typescript
   // Instead of:
   const result = someString.truncate(10)

   // Consider:
   import { truncateString } from '@idevs/corelib'
   const result = truncateString(someString, 10)
   ```

## Development

```bash
# Install dependencies
npm install

# Build the library
npm run build

# Watch for changes during development
npm run dev

# Run linting
npm run lint

# Format code
npm run format
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Authors

- [@klomkling](https://www.github.com/klomkling) - Sarawut Phaekuntod
