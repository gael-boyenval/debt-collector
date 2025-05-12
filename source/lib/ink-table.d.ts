import { InkComponent, InkNode, StatelessComponent } from 'ink'
import { TableProps } from 'ink-table'

declare module 'ink-table' {
  export const Table: StatelessComponent<TableProps>
}
