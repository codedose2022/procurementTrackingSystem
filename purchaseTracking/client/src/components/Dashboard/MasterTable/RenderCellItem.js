import { IconButton } from "@material-ui/core";
import React from "react";
import useStyle from './masterTableStyles'

const RenderCellItem = (props) => {
  const classes = useStyle();
  return (
    <>
     
      <IconButton
        variant="contained"
        className={classes.icon}
        size="small"
        style={{ position: 'absolute', right: props.right, }}
        onClick={(e) =>
          props.updateField(
            props.params.row.requestId,
            props.params.row.detailId,
            props.params.field,
            props.params.colDef.headerName,
            props.id
          )
        }
        id={props.id}
      >
        {props.icon}
      </IconButton>
    </>
  );
};

export default RenderCellItem;
