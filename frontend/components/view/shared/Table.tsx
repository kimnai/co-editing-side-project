import React from "react";

export const Table: React.FC = (data) => {
  if (!data) return <></>;
  return (
    <table>
      <thead></thead>
      {data.map((row) => (
        <tr>
          <td></td>
        </tr>
      ))}
    </table>
  );
};
