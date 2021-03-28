import e from "express";
import _ from "lodash";
export const getRefNum = (refNum) => {
  let refSubString = refNum.substring(8);
  let incrementedNum = parseInt(refSubString) + 1;
  let autoRefNum = "";
  if (incrementedNum < 10) {
    autoRefNum = refNum.substring(0, 11) + incrementedNum;
  }
  if (incrementedNum > 9 && incrementedNum <= 99) {
    autoRefNum = refNum.substring(0, 10) + incrementedNum;
  }
  if (incrementedNum > 99 && incrementedNum <= 999) {
    autoRefNum = refNum.substring(0, 9) + incrementedNum;
  }
  if (incrementedNum > 999 && incrementedNum <= 9999) {
    autoRefNum = refNum.substring(0, 8) + incrementedNum;
  }
  return autoRefNum;
};

export const getAllStatus = (vendorRegistrationsList) => {
  const sectionNames = [
    "companyInfo",
    "bankInfo",
    "certificateInfo",
    "contactInfo",
    "ownerInfo",
    "productInfo",
    "taxInfo",
  ];
  let flag = true;
  sectionNames.forEach((item) => {
    let section = vendorRegistrationsList[item];

    if (section && section["status"] !== "approved") {
      flag = false;
    }
  });
  return flag;
};

export const checkIfEmpty = (vendorRegistrationsList, sectionName) => {
  let flag = true;
  if (sectionName === "contactInfo") {
    vendorRegistrationsList.contacts.forEach((contact) => {
      if (!_.isEmpty(contact.comments)) {
        flag = false;
      }
    });
  } else if (sectionName === "ownerInfo") {
    vendorRegistrationsList.owners.forEach((owner) => {
      if (!_.isEmpty(owner.comments)) {
        flag = false;
      }
    });
  } else {
    if (!_.isEmpty(vendorRegistrationsList.comments)) {
      flag = false;
    }
  }

  return flag;
};
