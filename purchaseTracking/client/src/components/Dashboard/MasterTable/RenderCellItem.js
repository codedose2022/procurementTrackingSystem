import { IconButton } from "@material-ui/core";
import React from "react";

const RenderCellItem = (props) => {
  return (
    <>
     
      <IconButton
        variant="contained"
        color="secondary"
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
