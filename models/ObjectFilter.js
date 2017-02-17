/**
 * An analog of function arr.filter(callback[, thisArg]) for objects
 * This method creates an object filled with all 
 * object properties that pass a test (provided as a function).
 */
var objectFilter = function(obj, predicate) { 
    var result = {}, key;
	
    for (key in obj) {
        if (obj.hasOwnProperty(key) && predicate(obj[key])) {
            result[key] = obj[key];
        }
    }

    return result;
};
module.exports = objectFilter;