import React, { useState } from "react";
import { DataGrid, GridToolbar } from "@material-ui/data-grid";
import { Tooltip } from "@material-ui/core";
import Create from "@material-ui/icons/Create";
import Add from "@material-ui/icons/Add";
import Description from "@material-ui/icons/Description";
import { useSelector } from "react-redux";
import _ from "lodash";
import moment from "moment";
import ModalPop from "../Modal/ModalPop";
import Content from "./Contents";
import RenderCellItem from "./RenderCellItem";
import useStyles from "./masterTableStyles";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { formatListItem, isAdminOrPr } from "../../../Helpers/validationHelper";
import DisplayTooltip from "./DisplayTooltip";

const MasterTable = (props) => {
  const state = useSelector((state) => state);
  const serviceRequestList = _.get(state, "serviceRequest.serviceRequests", []);
  const [editModal, setEditModal] = useState(false);
  const [contentDetail, setContentDetail] = useState({});
  const classes = useStyles();
  const [snackbar, showSnackbar] = useState(false);
  const [successSnackbar, showSuccessSnackbar] = useState(
    props.successSnackbar ? true : false
  );

  const updateField = (
    serviceRequestId,
    detailsId,
    field,
    headerName,
    id,
    status,
    right
  ) => {
    setEditModal(true);
    if (id === "update") {
      setContentDetail({
        serviceRequestId,
        detailsId,
        field,
        headerName,
        isEditable: true,
        status,
      });
    } else {
      setContentDetail({
        serviceRequestId,
        detailsId,
        field,
        headerName,
        isEditable: false,
        status,
      });
    }
  };

  const columns = [
    { field: "id", headerName: "Sl No", width: 90, enableRowSpan: true },
    {
      field: "date",
      headerName: "Date",
      width: 110,
      valueFormatter: (params) => moment(params.value).format("MM/DD/YYYY"),
    },
    {
      field: "crRep",
      headerName: "CR Rep.",
      width: 120,
      renderCell: (params) => <DisplayTooltip params={params} />,
    },
    { field: "enqRefNo", headerName: "Enq Ref No.", width: 160 },
    {
      field: "type",
      headerName: "Type",
      width: 170,
      renderCell: (params) => <DisplayTooltip params={params} />,
    },

    {
      field: "status",
      headerName: "Status",
      width: 175,
      renderCell: (params) => (
        <>
          {params.value}
          {isAdminOrPr(props.user.userInfo.department) && (
            <RenderCellItem
              updateField={updateField}
              icon={
                <DisplayTooltip
                  text="Add status"
                  icon={<Create style={{ fontSize: "1rem" }} />}
                ></DisplayTooltip>
              }
              params={params}
              id="update"
              right="0"
            />
          )}
        </>
      ),
      cellClassName: "cellWithBtn",
    },
    {
      field: "comments",
      headerName: "Comments",
      width: 200,
      renderCell: (params) => (
        <>
          {params.value}
          {isAdminOrPr(props.user.userInfo.department) && (
            <RenderCellItem
              updateField={updateField}
              icon={
                <DisplayTooltip
                  text="Add comments"
                  icon={<Add style={{ fontSize: "1rem" }} />}
                ></DisplayTooltip>
              }
              params={params}
              id="update"
              right="0"
            />
          )}

          <RenderCellItem
            updateField={updateField}
            icon={
              <DisplayTooltip
                text="View comments"
                icon={<Description style={{ fontSize: "1rem" }} />}
              ></DisplayTooltip>
            }
            params={params}
            id="view"
            right="1.5rem"
          />
        </>
      ),
      cellClassName: "cellWithBtn",
    },
    {
      field: "reply",
      headerName: "Requester update",
      width: 200,
      renderCell: (params) => (
        <>
          {params.value}
          {!isAdminOrPr(props.user.userInfo.department) && (
            <RenderCellItem
              updateField={updateField}
              icon={
                <DisplayTooltip
                  text="Add comments"
                  icon={<Add style={{ fontSize: "1rem" }} />}
                ></DisplayTooltip>
              }
              params={params}
              id="update"
              right="0"
            />
          )}

          <RenderCellItem
            updateField={updateField}
            icon={
              <DisplayTooltip
                text="View comments"
                icon={<Description style={{ fontSize: "1rem" }} />}
              ></DisplayTooltip>
            }
            params={params}
            id="view"
            right="1.5rem"
          />
        </>
      ),
      cellClassName: "cellWithBtn",
    },
    {
      field: "poNumber",
      headerName: "P.O No.",
      width: 110,
      renderCell: (params) => (
        <>
          {params.value}

          {props.user.userInfo.department === "Admin" && (
            <RenderCellItem
              updateField={updateField}
              icon={
                <DisplayTooltip
                  text="Add P.O Number"
                  icon={<Add style={{ fontSize: "1rem" }} />}
                ></DisplayTooltip>
              }
              params={params}
              id="update"
              right="0"
            />
          )}
          {props.user.userInfo.department === "Procurement" &&
            params.value === "" && (
              <RenderCellItem
                updateField={updateField}
                icon={
                  <DisplayTooltip
                    text="Add P.O Number"
                    icon={<Add style={{ fontSize: "1rem" }} />}
                  ></DisplayTooltip>
                }
                params={params}
                id="update"
                right="0"
              />
            )}
        </>
      ),
      cellClassName: "cellWithBtn",
    },
    {
      field: "vendorName",
      headerName: "Vendor Name",
      width: 150,
      renderCell: (params) => (
        <>
          {params.value}
          {props.user.userInfo.department === "Admin" && (
            <RenderCellItem
              updateField={updateField}
              icon={
                <DisplayTooltip
                  text="Add vendor name"
                  icon={<Add style={{ fontSize: "1rem" }} />}
                ></DisplayTooltip>
              }
              params={params}
              id="update"
              right="0"
            />
          )}
          {props.user.userInfo.department === "Procurement" &&
            params.value === "" && (
              <RenderCellItem
                updateField={updateField}
                icon={
                  <DisplayTooltip
                    text="Add vendor name"
                    icon={<Add style={{ fontSize: "1rem" }} />}
                  ></DisplayTooltip>
                }
                params={params}
                id="update"
                right="0"
              />
            )}
        </>
      ),
      cellClassName: "cellWithBtn",
    },
    {
      field: "vendorNumber",
      headerName: "Vendor No.",
      width: 150,
      renderCell: (params) => (
        <>
          {params.value}
          {props.user.userInfo.department === "Admin" && (
            <RenderCellItem
              updateField={updateField}
              icon={
                <DisplayTooltip
                  text="Add vendor number"
                  icon={<Add style={{ fontSize: "1rem" }} />}
                ></DisplayTooltip>
              }
              params={params}
              id="update"
              right="0"
            />
          )}
          {props.user.userInfo.department === "Procurement" &&
            params.value === "" && (
              <RenderCellItem
                updateField={updateField}
                icon={
                  <DisplayTooltip
                    text="Add vendor number"
                    icon={<Add style={{ fontSize: "1rem" }} />}
                  ></DisplayTooltip>
                }
                params={params}
                id="update"
                right="0"
              />
            )}
        </>
      ),
      cellClassName: "cellWithBtn",
    },
  ];
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  let tableData = [];
  let count = 1;
  serviceRequestList.map((request) => {
    request.details.map((detail, detailIndex) => {
      let item = {
        id: count,
        date: request.createdAt,
        crRep: request.requestorName,
        enqRefNo:
          request.details.length > 1
            ? `${request.refNum}/${detailIndex + 1}`
            : request.refNum,
        type: detail.serviceCategory,
        status: detail.status,
        comments: formatListItem(detail.comments, "comments"),
        reply: formatListItem(detail.reply, "reply"),
        poNumber: detail.poNumber,
        vendorName: detail.vendorName,
        vendorNumber: detail.vendorNumber,
        requestId: request._id,
        detailId: detail._id,
      };
      tableData.push(item);
      count += 1;
    });
  });

  const handleClose = () => {
    setEditModal(false);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    showSnackbar(false);
    showSuccessSnackbar(false);
    props.history.push({ state: { showSnackbar: false } });
  };
  return (
    <div
      style={{ height: 725, width: "100%", marginTop: "1rem" }}
      className={classes.root}
    >
      {(snackbar || successSnackbar) && (
        <Snackbar
          open={true}
          onClose={handleCloseSnackbar}
          autoHideDuration={2000}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        >
          <Alert severity="success">Updated successfully</Alert>
        </Snackbar>
      )}
      <DataGrid
        rows={tableData}
        columns={columns}
        components={{
          Toolbar: GridToolbar,
        }}
        density="compact"
        disableSelectionOnClick
      />
      {editModal && (
        <ModalPop
          title={
            contentDetail.isEditable
              ? `Update ${contentDetail.headerName}`
              : contentDetail.headerName
          }
          isOpen={editModal}
          handleClose={handleClose}
          content={
            <Content
              contentDetail={contentDetail}
              serviceRequestList={serviceRequestList}
              token={props.user.token}
              userId={props.user.userInfo._id}
              handleClose={handleClose}
              showSnackbar={showSnackbar}
            />
          }
        />
      )}
    </div>
  );
};

export default MasterTable;
