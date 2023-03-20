import { useTableData } from "@hooks/useTableData";
import { mock } from "components/view/shared/Table";
import React, { createContext, PropsWithChildren } from "react";

export const TableDataCtx = createContext({});

export const TableDataProvider: React.FC = (
  props: PropsWithChildren
): JSX.Element => {
  const { state, dispatch } = useTableData();
  return (
    <TableDataCtx.Provider value={{ state, dispatch }}>
      {props.children}
    </TableDataCtx.Provider>
  );
};
