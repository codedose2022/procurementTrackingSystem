import React, { useState } from "react";
import { IconButton } from "@material-ui/core";

const RenderCellItem = (props) => {
  return (
    <>
      {props.params.value}
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
