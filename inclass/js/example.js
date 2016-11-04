// ADD NEW ITEM TO END OF LIST
 
var node_end = document.createElement("LI");	// create new list element
var textnode_end = document.createTextNode("cream");   // create new node
node_end.appendChild(textnode_end);	// put the node
document.getElementById("page").appendChild(node_end);	// put the list


// ADD NEW ITEM START OF LIST


var node_start = document.createElement("LI");	// create new list element
var textnode_start = document.createTextNode("kale");	// create new node
node_start.appendChild(textnode_start);	// put the node
var list = document.getElementById("page");	// get list info
list.insertBefore(node_start, list.childNodes[4]);	// put it before specific list

 
// ADD A CLASS OF COOL TO ALL LIST ITEMS

var nx = document.getElementsByTagName("LI").length;	// get length of the list

for (var i = 0; i < nx; ++i) {
    var el = document.getElementsByTagName("LI")[i];	// check all the list
    el.setAttribute("class", "cool");	// set class which is cool
}

 
// ADD NUMBER OF ITEMS IN THE LIST TO THE HEADING

var oh = document.getElementsByTagName("H2").item(0);	// get h2 element

oh.innerHTML += '<span>' + nx + '</span>';	// add length info and style it
