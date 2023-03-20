import { Add } from "@mui/icons-material";
import { TableRowData } from "lib/type/View";
import { AddIcon } from "lib/UI/icons/Icons";
import React from "react";

export const mock: TableRowData = [
  {
    name: "To do 1",
    content: "Do the dishes",
    status: "Not started",
  },
  {
    name: "To do 2",
    content: "Study typescript",
    status: "In progress",
  },
];

export const Table: React.FC<{ data: TableRowData }> = ({
  data,
}): JSX.Element => {
  if (!data) return <></>;

  return (
    <table>
      <thead></thead>
      {mock?.map((row) => (
        <tr>
          <td>{row.name}</td>
          <td>{row.status}</td>
          <td>{row.content}</td>
        </tr>
      ))}
      <td>
        <Add />
        New
      </td>
    </table>
  );
};
