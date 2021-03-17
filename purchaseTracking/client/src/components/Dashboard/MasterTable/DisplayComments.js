import React from "react";
import { Grid, Typography } from "@material-ui/core";
import Report from "@material-ui/icons/Report";
import useStyle from "./masterTableStyles";
import moment from "moment";

export default function DisplayComments(props) {
  const classes = useStyle();
 
  const reqList = props.serviceRequestList.filter(
    (req) => req._id === props.contentDetail.serviceRequestId
  );
  const detail = reqList[0].details.filter(
    (item) => item._id === props.contentDetail.detailsId
  );
  const commentsList =
    props.decision === "comments" ? detail[0].comments : detail[0].reply;

  return (
    <>
      <Grid container>
        {commentsList.map((comment) => {
          return (
            <Grid item md={12} key={comment._id}>
              <Typography>
                {props.decision === "comments"
                  ? comment.comments
                  : comment.reply}
              </Typography>
              <Typography className={classes.smallText}>
              {`${moment(comment.postedAt).format("Do MMMM YYYY")}, ${moment(
                   comment.postedAt
                  ).format("h:mm a")}`}
               
              </Typography>
              <hr />
            </Grid>
          );
        })}
        {!commentsList.length && (
          <>
              <Report style={{color: '#c50000'}}/>&nbsp;
              <Typography>There is nothing here. Please check back later
          </Typography>
          </>
        )}
      </Grid>
    </>
  );
}
