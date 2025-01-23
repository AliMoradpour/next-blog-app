import React from "react";

interface ChildrenProps {
  children: React.ReactNode;
}

const Table = ({ children }: ChildrenProps) => {
  return (
    <div className="bg-secondary-0 overflow-x-auto">
      <table>{children}</table>
    </div>
  );
};

export default Table;

const TableHeader = ({ children }: ChildrenProps) => {
  return (
    <thead>
      <tr className="title_row">{children}</tr>
    </thead>
  );
};

const TableBody = ({ children }: ChildrenProps) => {
  return <tbody>{children}</tbody>;
};

const TableRow = ({ children }: ChildrenProps) => {
  return <tr>{children}</tr>;
};

Table.Header = TableHeader;
Table.Body = TableBody;
Table.Row = TableRow;
