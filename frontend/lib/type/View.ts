import { ACTION_TYPES } from "lib/enum/View";
import { Properties } from "lib/interface/View";
import React from "react";

export type View = "table" | "board";

export type TaskStatus = "Not started" | "In progress" | "Completed";

export type TableRowData = Properties[];

type Props = keyof Properties;

export type Action = {
  type: ACTION_TYPES;
  payload?: {
    editingIndex: number;
    editingProp?: Props;
    value?: string;
  };
};
