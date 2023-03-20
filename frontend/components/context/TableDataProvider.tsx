import { useTableData } from "@hooks/useTableData";
import { mock } from "components/view/shared/Table";
import React, { createContext } from "react";

export const TableDataCtx = createContext({});

export const TableDataProvider: React.FC = ({ children }): JSX.Element => {
  const { state, dispatch } = useTableData();
  return (
    <TableDataCtx.Provider value={{ state, dispatch }}>
      {children}
    </TableDataCtx.Provider>
  );
};
