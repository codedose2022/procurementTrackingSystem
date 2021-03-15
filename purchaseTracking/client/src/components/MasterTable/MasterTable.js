import React from 'react';
import { useSelector } from "react-redux";
import _ from 'lodash';


export default function MasterTable(props) {
  const state = useSelector((state) => state);
  const serviceRequestList = _.get(state, "serviceRequest", "");
  console.log(serviceRequestList)
  return (
    <div>
      
    </div>
  )
}
