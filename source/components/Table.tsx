import React from 'react'
import { Box, Text } from 'ink'
import crypto from 'crypto'

function sha1(obj: any): string {
  // Convert object to string
  const str = JSON.stringify(obj)
  // Create SHA1 hash using Node's crypto module
  return crypto.createHash('sha1').update(str).digest('hex')
}

/* Table */

type Scalar = string | number | boolean | null | undefined

type ScalarDict = {
  [key: string]: Scalar
}

export type CellProps = React.PropsWithChildren<{ column: number }>

export type TableProps<T extends ScalarDict> = {
  /**
   * List of values (rows).
   */
  data: T[]
  /**
   * Columns that we should display in the table.
   */
  columns?: (keyof T)[]
  /**
   * Cell padding.
   */
  padding?: number
  /**
   * Header component.
   */
  header?: (props: React.PropsWithChildren<{}>) => JSX.Element
  /**
   * Component used to render a cell in the table.
   */
  cell?: (props: CellProps) => JSX.Element
  /**
   * Component used to render the skeleton of the table.
   */
  skeleton?: (props: React.PropsWithChildren<{}>) => JSX.Element
}

/* Table */

export default function Table<T extends ScalarDict>(props: TableProps<T>) {
  /* Config */

  /**
   * Merges provided configuration with defaults.
   */
  const getConfig = (): Required<TableProps<T>> => {
    return {
      data: props.data,
      columns: props.columns || getDataKeys(),
      padding: props.padding || 1,
      header: props.header || Header,
      cell: props.cell || Cell,
      skeleton: props.skeleton || Skeleton,
    }
  }

  /**
   * Gets all keyes used in data by traversing through the data.
   */
  const getDataKeys = (): (keyof T)[] => {
    let keys = new Set<keyof T>()

    // Collect all the keys.
    for (const data of props.data) {
      for (const key in data) {
        keys.add(key)
      }
    }

    return Array.from(keys)
  }

  /**
   * Calculates the width of each column by finding
   * the longest value in a cell of a particular column.
   *
   * Returns a list of column names and their widths.
   */
  const getColumns = (): Column<T>[] => {
    const config = getConfig()
    const { columns, padding } = config

    const widths: Column<T>[] = columns.map((key) => {
      const header = String(key).length
      /* Get the width of each cell in the column */
      const data = props.data.map((data) => {
        const value = data[key]

        if (value == undefined || value == null) return 0
        return String(value).length
      })

      const width = Math.max(...data, header) + padding * 2

      /* Construct a cell */
      return {
        column: key,
        width: width,
        key: String(key),
      }
    })

    return widths
  }

  /**
   * Returns a (data) row representing the headings.
   */
  const getHeadings = (): Partial<T> => {
    const config = getConfig()
    const { columns } = config

    const headings: Partial<T> = columns.reduce(
      (acc, column) => ({ ...acc, [column]: column }),
      {},
    )

    return headings
  }

  /* Rendering utilities */

  const config = getConfig()

  // The top most line in the table.
  const header = row<T>({
    cell: config.skeleton,
    padding: config.padding,
    skeleton: {
      component: config.skeleton,
      // chars
      line: '─',
      left: '┌',
      right: '┐',
      cross: '┬',
    },
  })

  // The line with column names.
  const heading = row<T>({
    cell: config.header,
    padding: config.padding,
    skeleton: {
      component: config.skeleton,
      // chars
      line: ' ',
      left: '│',
      right: '│',
      cross: '│',
    },
  })

  // The line that separates rows.
  const separator = row<T>({
    cell: config.skeleton,
    padding: config.padding,
    skeleton: {
      component: config.skeleton,
      // chars
      line: '─',
      left: '├',
      right: '┤',
      cross: '┼',
    },
  })

  // The row with the data.
  const data = row<T>({
    cell: config.cell,
    padding: config.padding,
    skeleton: {
      component: config.skeleton,
      // chars
      line: ' ',
      left: '│',
      right: '│',
      cross: '│',
    },
  })

  // The bottom most line of the table.
  const footer = row<T>({
    cell: config.skeleton,
    padding: config.padding,
    skeleton: {
      component: config.skeleton,
      // chars
      line: '─',
      left: '└',
      right: '┘',
      cross: '┴',
    },
  })

  /* Data */
  const columns = getColumns()
  const headings = getHeadings()

  /**
   * Render the table line by line.
   */
  return (
    <Box flexDirection="column">
      {/* Header */}
      {header({ key: 'header', columns, data: {} })}
      {heading({ key: 'heading', columns, data: headings })}
      {/* Data */}
      {props.data.map((row, index) => {
        // Calculate the hash of the row based on its value and position
        const key = `row-${sha1(row)}-${index}`

        // Construct a row.
        return (
          <Box flexDirection="column" key={key}>
            {separator({ key: `separator-${key}`, columns, data: {} })}
            {data({ key: `data-${key}`, columns, data: row })}
          </Box>
        )
      })}
      {/* Footer */}
      {footer({ key: 'footer', columns, data: {} })}
    </Box>
  )
}

/* Helper components */

type RowConfig = {
  /**
   * Component used to render cells.
   */
  cell: (props: CellProps) => JSX.Element
  /**
   * Tells the padding of each cell.
   */
  padding: number
  /**
   * Component used to render skeleton in the row.
   */
  skeleton: {
    component: (props: React.PropsWithChildren<{}>) => JSX.Element
    /**
     * Characters used in skeleton.
     *    |             |
     * (left)-(line)-(cross)-(line)-(right)
     *    |             |
     */
    left: string
    right: string
    cross: string
    line: string
  }
}

type RowProps<T extends ScalarDict> = {
  key: string
  data: Partial<T>
  columns: Column<T>[]
}

type Column<T> = {
  key: string
  column: keyof T
  width: number
}

/**
 * Constructs a Row element from the configuration.
 */
function row<T extends ScalarDict>(
  config: RowConfig,
): (props: RowProps<T>) => JSX.Element {
  /* This is a component builder. We return a function. */

  const skeleton = config.skeleton

  /* Row */
  return (props) => (
    <Box flexDirection="row">
      {/* Left */}
      <skeleton.component>{skeleton.left}</skeleton.component>
      {/* Data */}
      {...intersperse(
        (i) => {
          const key = `${props.key}-hseparator-${i}`

          // The horizontal separator.
          return (
            <skeleton.component key={key}>{skeleton.cross}</skeleton.component>
          )
        },

        // Values.
        props.columns.map((column, colI) => {
          // content
          const value = props.data[column.column]

          if (value == undefined || value == null) {
            const key = `${props.key}-empty-${column.key}`

            return (
              <config.cell key={key} column={colI}>
                {skeleton.line.repeat(column.width)}
              </config.cell>
            )
          } else {
            const key = `${props.key}-cell-${column.key}`

            // margins
            const ml = config.padding
            const mr = column.width - String(value).length - config.padding

            return (
              /* prettier-ignore */
              <config.cell key={key} column={colI}>
                {`${skeleton.line.repeat(ml)}${String(value)}${skeleton.line.repeat(mr)}`}
              </config.cell>
            )
          }
        }),
      )}
      {/* Right */}
      <skeleton.component>{skeleton.right}</skeleton.component>
    </Box>
  )
}

/**
 * Renders the header of a table.
 */
export function Header(props: React.PropsWithChildren<{}>) {
  return (
    <Text bold color="blue">
      {props.children}
    </Text>
  )
}

/**
 * Renders a cell in the table.
 */
export function Cell(props: CellProps) {
  return <Text>{props.children}</Text>
}

/**
 * Redners the scaffold of the table.
 */
export function Skeleton(props: React.PropsWithChildren<{}>) {
  return <Text bold>{props.children}</Text>
}

/* Utility functions */

/**
 * Intersperses a list of elements with another element.
 */
function intersperse<T, I>(
  intersperser: (index: number) => I,
  elements: T[],
): (T | I)[] {
  // Intersparse by reducing from left.
  let interspersed: (T | I)[] = elements.reduce((acc, element, index) => {
    // Only add element if it's the first one.
    if (acc.length === 0) return [element]
    // Add the intersparser as well otherwise.
    return [...acc, intersperser(index), element]
  }, [] as (T | I)[])

  return interspersed
}