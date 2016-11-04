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
	

	<!-- check input values -->
	var message1;
    message1 = document.getElementById("message1");
    message1.innerHTML = "";

    try {
        if(c1 == "")  throw "empty";
        if(isNaN(c1)) throw "not a number";
        c1 = Number(c1);
    }
    catch(err) {
        message1.innerHTML = "Input is " + err;
    }
	
	var message2;
    message2 = document.getElementById("message2");
    message2.innerHTML = "";

    try {
        if(c2 == "")  throw "empty";
        if(isNaN(c2)) throw "not a number";
        c2 = Number(c2);
    }
    catch(err) {
        message2.innerHTML = "Input is " + err;
    }
	
	var message3;
    message3 = document.getElementById("message3");
    message3.innerHTML = "";

    try {
        if(r1 == "")  throw "empty";
        if(isNaN(r1)) throw "not a number";
        r1 = Number(r1);
    }
    catch(err) {
        message3.innerHTML = "Input is " + err;
    }
	
	var message4;
    message4 = document.getElementById("message4");
    message4.innerHTML = "";

    try {
        if(r2 == "")  throw "empty";
        if(isNaN(r2)) throw "not a number";
        r2 = Number(r2);
    }
    catch(err) {
        message4.innerHTML = "Input is " + err;
    }

	
	
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

