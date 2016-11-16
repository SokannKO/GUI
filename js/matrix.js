$().ready(function() {
		// validate signup form on keyup and submit
		
		$("#matrix_form").validate({
			rules: {
				col_start: {
					required: true,
					number: true
				},
				col_end: {
					required: true,
					number: true
				},
				row_start: {
					required: true,
					number: true
				},
				row_end: {
					required: true,
					number: true
				},
			},
			messages: {
				col_start: {
					required: "Please enter a col_start",
					number: "Please input NUMBER"
				},
				col_end: {
					required: "Please enter a col_end",
					number: "Please input NUMBER"
				},
				row_start: {
					required: "Please enter a row_start",
					number: "Please input NUMBER"
				},
				row_end: {
					required: "Please enter a row_end",
					number: "Please input NUMBER"
				}
			},
		// When the Process button is clicked
		submitHandler: function() {
			myFunction();	// call the myFunction()
			return false;
			}
		});

});


function myFunction() {
	
	<!-- Remove previous table -->
	
	var prev_tables = document.getElementById("setTable").innerHTML = "";
	
	<!-- Create new table -->
	var x = document.createElement("TABLE");
	x.setAttribute("id", "myTable");
	document.getElementById("setTable").appendChild(x);
	
	
	<!-- bring 4 input values -->
	var c1 = document.getElementById("col_start").value;
	var c2 = document.getElementById("col_end").value;
	var r1 = document.getElementById("row_start").value;
	var r2 = document.getElementById("row_end").value;
	
	
	<!-- exchange values -->
	var temp;
	if(r1>r2) {temp = r1;r1 = r2;r2 = temp;}
	if(c1>c2) {temp = c1;c1 = c2;c2 = temp;}
	
	
	var row_size = r2 - r1 + 2;	// set size of row
	var col_size = c2 - c1 + 2;	// set size of col
	
	var matrix = new Array(row_size);	// array for matrix
	var row = new Array(row_size);	// array for vertical axis
	var col = new Array(col_size);	// array for horizontal axis
	
	var table = document.getElementById("myTable");
	
	<!-- calculate and load data -->
	for (var i = 0; i < row_size; i++)
	{
		row[i] = table.insertRow(i);	// insert nth row
		matrix[i] = new Array(col_size);
		
		for (var j = 0; j < col_size; j++){
			if(i == 0 && j == 0){
				matrix[i][j] = " ";
			}
			else if(i == 0){
				matrix[i][j] = j+parseInt(c1)-1;
			}
			else if(j == 0){
				matrix[i][j] = i+parseInt(r1)-1;
			}
			
			else{
				matrix[i][j] = matrix[0][j]*matrix[i][0];	// calculate
			}
			// print
			col[j] = row[i].insertCell(j);
			col[j].innerHTML = matrix[i][j];
		}
	
	}
	
	<!-- cell style -->
	var y = document.getElementById("myTable").getElementsByTagName("tr");
	
	
	for (var i = 1; i < row_size; i++)
	{
		for (var j = 1; j < col_size; j++){
			if((i%2)+(j%2)==1){
				y[i].cells[j].style.backgroundColor = "white";
			}
		}
	}
	
	for (var i = 0; i < row_size; i++)
	{
		y[i].cells[0].style.backgroundColor = "black";
	}
	for (var j = 0; j < col_size; j++)
	{
		y[0].cells[j].style.backgroundColor = "black";
	}
}
	
