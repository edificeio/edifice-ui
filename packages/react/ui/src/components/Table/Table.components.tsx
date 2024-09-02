import { PropsWithChildren } from "react";

interface TableHeadProps
  extends React.HTMLAttributes<HTMLTableSectionElement>,
    PropsWithChildren {}

export const TableThead = (props: TableHeadProps) => {
  const { children, ...restProps } = props;
  return <thead {...restProps}>{children}</thead>;
};

interface TableHeaderProps
  extends React.HTMLAttributes<HTMLTableCellElement>,
    PropsWithChildren {}

export const TableTh = (props: TableHeaderProps) => {
  const { children, ...restProps } = props;

  return <th {...restProps}>{children}</th>;
};

interface TableRowProps
  extends React.HTMLAttributes<HTMLTableRowElement>,
    PropsWithChildren {}

export const TableTr = (props: TableRowProps) => {
  const { children, ...restProps } = props;
  return <tr {...restProps}>{children}</tr>;
};

interface TableBodyProps
  extends React.HTMLAttributes<HTMLTableSectionElement>,
    PropsWithChildren {}

export const TableTbody = (props: TableBodyProps) => {
  const { children, ...restProps } = props;

  return <tbody {...restProps}>{children}</tbody>;
};

interface TableCellProps
  extends React.HTMLAttributes<HTMLTableCellElement>,
    PropsWithChildren {}

export const TableTd = (props: TableCellProps) => {
  const { children, ...restProps } = props;
  return <td {...restProps}>{children}</td>;
};

TableThead.displayName = "Table.Thead";
TableTh.displayName = "Table.Th";
TableTbody.displayName = "Table.Tbody";
TableTr.displayName = "Table.Tr";
TableTd.displayName = "Table.Td";
