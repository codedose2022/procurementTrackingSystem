export const validateField = (fieldName, value) => {
  let error = "";
  switch (fieldName) {
    case "username":
      if (!value) {
        error = `Please enter ${fieldName}`;
      } else if (!value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
        error = "Invalid email address.";
      }
      return error;
    case "password":
      if (!value) {
        error = `Please enter ${fieldName}`;
      }
      return error;
    default:
      break;
  }
};

export const formatListItem = (list, item) => {
  if (list.length) {
    for (var key of Object.keys(list[list.length - 1])) {
      if (key === item) {
        let text = list[list.length - 1][key];
        let formatedText = text.substring(0, 18);
        return `${formatedText}...`;
      }
    }
  } else {
    return "";
  }
};

export const isAdminOrPr =(department) =>{
  return ['Admin', 'Procurement'].includes(department);
}