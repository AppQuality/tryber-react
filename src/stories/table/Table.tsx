import React, {ReactNode} from 'react'
import styled from "styled-components"

export interface Column {
  title: string
  dataIndex: string
  key: string
  long?: boolean // ellipsis with auto width
  width?: string // default 10ch
}

export interface Row {
  key: string
  [index: string]: any
}

export interface TableProps {
  children?: ReactNode
  /**
   * Rows
   */
  dataSource: Row[]
  /**
   * Columns
   */
  columns: Column[]
}

const TableWrapper = styled.div`
  table {
    table-layout: auto;
    border-collapse: separate;
    border-spacing: 0;
    text-align: left;
    width: 100%;
  
    thead {
      font-family: ${props => (props.theme.typography.fontFamily.serif)};
      color: ${props => (props.theme.palette.disabledFont)};
      
      th {
        overflow-wrap: break-word;
        font-weight: 500;
        padding: 1rem .5rem;
        border-bottom: 1px solid ${props => (props.theme.palette.disabledElement)};
      }
    }
    tbody {
      td {
        overflow-wrap: break-word;
        font-weight: 400;
        padding: 1rem .5rem;
      }
      tr:not(:last-child) td {
        border-bottom: 1px solid ${props => (props.theme.palette.disabledElement)};
      }
    }
    .aq-table-cell-ellipsis {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      word-break: keep-all;
      max-width: 0;
    }
  }
`

export const Table = ({dataSource, columns}: TableProps) => {
  return (
    <TableWrapper>
      <table>
        <colgroup>
          {columns.map(column => {
            return (column.long)
              ? <col style={{width: 'auto', minWidth: 'auto'}}/>
              : <col style={{width: `${column.width || '10ch'}`, minWidth: '10ch'}}/>
          })}
        </colgroup>
        <thead>
          <tr>
            {columns.map(column => (
              <th key={column.key}>{column.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataSource.map(row => (
            <tr>
              {columns.map(column => {
                let className = '';
                if (column.long) className = 'aq-table-cell-ellipsis';
                return (
                  <td title={row[column.dataIndex]} className={className} key={`${row.key}-${column.key}`}>
                    {row[column.dataIndex]}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </TableWrapper>
  )
}
