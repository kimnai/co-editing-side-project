import {
  Add,
  BackupTableOutlined,
  TableViewOutlined,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { View } from "lib/type/View";
import classes from "@style/View.module.css";

export const AddIcon = (handleClick: () => void) => {
  return (
    <IconButton onClick={handleClick}>
      <Add />
    </IconButton>
  );
};

export const ViewBtn = (view: View) => {
  return (
    <button className={classes.tabBtn}>
      {view === "table" ? <TableViewOutlined /> : <BackupTableOutlined />}
      {`${view[0].toUpperCase() + view.slice(1)} view`}
    </button>
  );
};
