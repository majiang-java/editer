exports.formatdate = (strTime) =>{
	debugger;
	var date = new Date();
	date.setTime(strTime);
    return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
}