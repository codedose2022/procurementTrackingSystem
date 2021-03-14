export const validateField = (fieldName, value) =>{
  let error = ''
  switch(fieldName) {
    case 'username':
      if(!value) {
        error = `Please enter ${fieldName}`;
      } else if (!value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
        error = "Invalid email address.";
      }
      return error;
    case 'password':
      if(!value) {
        error = `Please enter ${fieldName}`;
      }
      return error;
    default:
      break;
  }
}