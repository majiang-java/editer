exports.formatdate = (strTime) =>{
	var date = new Date();
	date.setTime(strTime);
    return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
}

exports.contains = (arr, target) =>{
	let b = false;
	arr.forEach(entry => {
		//debugger;
		console.log(entry.modelname);
		if(entry.modelname === target){
			b = true;
			return true;
		}
	});
	return b;
}

exports.field_contains = (arr,target) =>{
	if(!arr) return false;
	let b = false;
	arr.forEach(entry => {
		//debugger;
		console.log(entry.field);
		if(entry.field === target){
			b = true;
			return true;
		}
	});
	return b;
}

exports.clone = function(obj){  
	debugger;
	// Handle the 3 simple types, and null or undefined
	  if (null == obj || "object" != typeof obj) return obj;
	 
	  // Handle Date
	  if (obj instanceof Date) {
	    var copy = new Date();
	    copy.setTime(obj.getTime());
	    return copy;
	  }
	 
	  // Handle Array
	  if (obj instanceof Array) {
	    var copy = [];
	    for (var i = 0,  len = obj.length; i < len; ++i) {
	      copy[i] = clone(obj[i]);
	    }
	    return copy;
	  }
	 
	  // Handle Object
	  if (obj instanceof Object) {
	    var copy = {};
	    for (var attr in obj) {
	      if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
	    }
	    return copy;
	  }
	 
	 // throw new Error("Unable to copy obj! Its type isn't supported.");
}  