import React, { useState } from "react";
import { DataGrid, GridToolbar } from "@material-ui/data-grid";
import { IconButton } from "@material-ui/core";
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

const MasterTable = (props) => {
  const state = useSelector((state) => state);
  const serviceRequestList = _.get(state, "serviceRequest.serviceRequests", []);
  const [editModal, setEditModal] = useState(false);
  const [contentDetail, setContentDetail] = useState({});
  const classes = useStyles();
  const [snackbar, showSnackbar] = useState(false);
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
    { field: "crRep", headerName: "CR Rep.", width: 120 },
    { field: "enqRefNo", headerName: "Enq Ref No.", width: 160 },
    { field: "type", headerName: "Type", width: 170 },
    {
      field: "status",
      headerName: "Status",
      width: 200,
      renderCell: (params) => (
        <>
        {params.value}
        <RenderCellItem
          updateField={updateField}
          icon={<Create style={{ fontSize: "1rem" }} />}
          params={params}
          id='update'
          right='0'
        />
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
          <RenderCellItem
            updateField={updateField}
            icon={<Add style={{ fontSize: "1rem" }} />}
            params={params}
            id='update'
            right='0'
          />
          <RenderCellItem
            updateField={updateField}
            icon={<Description style={{ fontSize: "1rem" }} />}
            params={params}
            id='view'
            right='1.5rem'
          />
        </>
      ),
      cellClassName: "cellWithBtn",
    },
    {
      field: "reply",
      headerName: "Requester update",
      width: 170,
      renderCell: (params) => (
        <>
            {params.value}
          <RenderCellItem
            updateField={updateField}
            icon={<Add style={{ fontSize: "1rem" }} />}
            params={params}
            id='update'
            right='0'
          />
          <RenderCellItem
            updateField={updateField}
            icon={<Description style={{ fontSize: "1rem" }} />}
            params={params}
            id='view'
            right='1.5rem'
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
        <RenderCellItem
          updateField={updateField}
          icon={<Add style={{ fontSize: "1rem" }} />}
          params={params}
          id='update'
          right='0'
        />
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
        <RenderCellItem
          updateField={updateField}
          icon={<Add style={{ fontSize: "1rem" }} />}
          params={params}
          id='update'
          right='0'
        />
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
        <RenderCellItem
          updateField={updateField}
          icon={<Add style={{ fontSize: "1rem" }} />}
          params={params}
          id='update'
          right='0'
        />
        </>
      ),
      cellClassName: "cellWithBtn",
    },
  ];
  function Alert(props) {
    return <MuiAlert elevation={6} variant='filled' {...props} />;
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
        comments: detail.comments.length ? detail.comments[detail.comments.length-1].comments : '',
        reply:detail.reply.length ? detail.reply[detail.reply.length-1].reply : '',
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
  };
  return (
    <div
      style={{ height: 725, width: "100%", marginTop: "1rem" }}
      className={classes.root}
    >
      {snackbar && (
        <Snackbar
          open={snackbar}
          onClose={handleCloseSnackbar}
          autoHideDuration={6000}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        >
          <Alert severity='success'>Updated successfully</Alert>
        </Snackbar>
      )}
      <DataGrid
        rows={tableData}
        columns={columns}
        components={{
          Toolbar: GridToolbar,
        }}
        density='compact'
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
