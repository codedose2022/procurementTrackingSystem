import React from "react";
import { Tooltip } from "@material-ui/core";

export default function DisplayTooltip(props) {
  return (
    <>
      {props.params ? (
        <Tooltip title={props.params.value} aria-label="display tooltip">
          <span>{props.params.value}</span>
        </Tooltip>
      ) : (
        <Tooltip title={props.text} aria-label="display tooltip">
          {props.icon}
        </Tooltip>
      )}
    </>
  );
}
