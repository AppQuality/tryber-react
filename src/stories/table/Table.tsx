import React from "react";
import styled from "styled-components";
import Spinner from "../spinner/Spinner";
import { Inboxes } from "react-bootstrap-icons";
import { TableProps } from "./_types";

const cellPadding = "11px 5px";

const TableWrapper = styled.div`
  position: relative;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  table {
    table-layout: auto;
    border-collapse: separate;
    border-spacing: 0;
    text-align: left;
    width: 100%;

    &.aq-striped > tbody > tr:nth-of-type(odd) {
      background-color: ${(props) => props.theme.colors.gray100};
    }

    thead {
      font-family: ${(props) => props.theme.typography.fontFamily.serif};
      color: ${(props) => props.theme.colors.gray600};

      th {
        overflow-wrap: break-word;
        font-weight: 500;
        padding: ${cellPadding};
        border-bottom: 1px solid ${(props) => props.theme.colors.gray300};
      }
    }
    tbody {
      td {
        overflow-wrap: break-word;
        font-weight: 400;
        padding: ${cellPadding};
        vertical-align: text-top;
      }
      tr:hover:not(.aq-table-empty-placeholder) {
        background-color: ${(props) => props.theme.colors.gray300};
      }
      tr:not(:last-child) td {
        border-bottom: 1px solid ${(props) => props.theme.colors.gray300};
      }
    }
    .aq-table-cell-ellipsis {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      word-break: keep-all;
      max-width: 100vw;
    }
    @media (min-width: ${(props) => props.theme.grid.breakpoints.lg}) {
      .aq-table-cell-ellipsis {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-break: keep-all;
        max-width: 0;
      }
    }
  }
  .aq-table-empty-placeholder {
    height: 200px;
    text-align: center;
    color: ${(props) => props.theme.colors.gray600};
    td {
      vertical-align: middle;
    }
  }
  .aq-table-placeholder-icon {
    font-size: 40px;
    margin-bottom: 1rem;
  }
  .aq-table-loading-placeholder {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(255, 255, 255, 0.8);
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
  }
`;

export const Table = ({
  dataSource,
  columns,
  isLoading,
  isStriped,
  pagination,
}: TableProps) => {
  const LoadingStatus = () => (
    <div className="aq-table-loading-placeholder">
      <Spinner />
      <div>Loading Data</div>
    </div>
  );

  const DataPlaceholder = () => (
    <tr className="aq-table-empty-placeholder">
      <td colSpan={columns.length}>
        <Inboxes className="aq-table-placeholder-icon" />
        <div>There's no data here</div>
      </td>
    </tr>
  );

  let tableClass = "aq-table";
  if (isStriped) tableClass += " aq-striped";
  return (
    <TableWrapper>
      {isLoading && <LoadingStatus />}
      <table className={tableClass}>
        <colgroup>
          {columns.map((column, index) => {
            return column.long ? (
              <col key={index} style={{ width: "auto", minWidth: "auto" }} />
            ) : (
              <col
                key={index}
                style={{
                  width: `${column.width || "10ch"}`,
                  minWidth: `${column.width || "10ch"}`,
                }}
              />
            );
          })}
        </colgroup>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataSource.length ? (
            dataSource.map((row, index) => (
              <tr key={index}>
                {columns.map((column) => {
                  let className = "";
                  if (column.long) className = "aq-table-cell-ellipsis";
                  return (
                    <td
                      title={row[column.dataIndex]}
                      className={className}
                      key={`${row.key}-${column.key}`}
                    >
                      {row[column.dataIndex]}
                    </td>
                  );
                })}
              </tr>
            ))
          ) : (
            <DataPlaceholder />
          )}
        </tbody>
      </table>
    </TableWrapper>
  );
};
