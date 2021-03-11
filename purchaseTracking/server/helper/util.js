export const getRefNum = (refNum) =>{
  let refSubString = refNum.substring(8);
  let incrementedNum = parseInt(refSubString)+1;
  let autoRefNum = '';
  if(incrementedNum<10){
    autoRefNum = refNum.substring(0,11) + incrementedNum;
  }
  if(incrementedNum>9 && incrementedNum<=99 ){
    autoRefNum = refNum.substring(0,10) + incrementedNum;
  }
  if(incrementedNum>99 && incrementedNum<=999 ){
    autoRefNum = refNum.substring(0,9) + incrementedNum;
  }
  if(incrementedNum>999 && incrementedNum<=9999 ){
    autoRefNum = refNum.substring(0,8) + incrementedNum;
  }
  return autoRefNum;
}