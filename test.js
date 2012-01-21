var _ = require("./underscore");
require("./underscore_search");

function _test(fn,testName){
    return function(){
	var input = arguments;
	return function(output){
	    return function(testText){
		var result = fn.apply(this,input);
		if(_.isEqual(result,output)){
		    console.log("Passed: " + testName + ": " + testText);
		}
		else{
		    console.log("Failed: " + testName + ": " + testText);
		    console.log("input");
		    console.log(input);
		    console.log("expected output:");
		    console.log(output);
		    console.log("returned:");
		    console.log(result);
		}
	    };
	};
    };
};

var search_eq = _test(_.search_Eq,"_.search_Eq");
var search_str = _test(_.search_Str,"_.search_Str");
var search_sub_str = _test(_.search_SubStr,"_.seach_SubStr");
var filterSearch_Eq = _test(_.filterSearch_Eq,"_.filterSearch_Eq");
var filterSearch_SubStr = _test(_.filterSearch_SubStr,"_.filterSearch_SubStr");

search_eq({},{})
(true)
("search for empty obj in empty obj");

search_eq({},{a:{}})
(true)
("search for empty obj in obj");

search_eq({a:1},{a:{a:1}})
(true)
("search for obj in complex obj");

search_eq(1,{a:{a:1}})
(true)
("search for number in complex obj");

search_eq("1",{a:{a:"1"}})
(true)
("search for string in complex obj");

search_eq({a:1},{})
(false)
("search for obj in empty obj");

search_eq({a:"1"},{a:{a:1}})
(false)
("search for obj in complex obj");

search_eq(1,{a:{a:"1"}})
(false)
("search for number in complex obj");

search_eq("1",{a:{a:1}})
(false)
("search for string in complex obj");

search_str("l",{a:{a:"L"}})
(true)
("search for string in complex obj of different case");

search_str("l",{a:{a:"Ll"}})
(false)
("search for string in complex obj of different case");

search_str("l","L")
(true)
("search for string in string");

search_sub_str("l","L")
(true)
("search for string in string");

search_sub_str("l","Ll")
(true)
("search for sub string in string");

search_sub_str("l",{a:{a:"Ll"}})
(true)
("search for sub string in obj");

filterSearch_Eq([{}],{})
([{}])
("search for empty obj in array with empty obj");

filterSearch_Eq([{},{}],{})
([{},{}])
("search for empty obj in array with empty objs");

filterSearch_Eq([{a:1},{a:2}],1)
([{a:1}])
("search for number in array with objs");

filterSearch_SubStr([{a:"11"},{a:2}],"1")
([{a:"11"}])
("search for sub str in array with objs");

console.log("tests finished");