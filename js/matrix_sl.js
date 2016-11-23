/*
 Full name :	Seokhwan Ko
 Email :		seokhwan_ko@student.uml.edu
 File :			https://sokannko.github.io/GUI/js/matrix_sl.js
  
 Affiliation :	Department of Computer Science, University of Massachusetts Lowell
 Description :	Assignment #8; Using the jQuery UI Slider and Tab Widgets.
 				This assignment introduces you to the jQuery User Interface (UI) library.
 
 updated by Seokhwan Ko on November 22, 2016 at 09:57 PM
 
 Copyright (c) 2016 by Seokhwan Ko. All rights reserved.

*/

function auto_submit() {
  // If the form is valid
  if( $("form#matrix_form").valid() == true ) {
    // Then make it submit, which should update the tab in the process.
    $("form#matrix_form").submit();
  }
}

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
	var c1 = parseInt(document.getElementById("col_start").value);
	var c2 = parseInt(document.getElementById("col_end").value);
	var r1 = parseInt(document.getElementById("row_start").value);
	var r2 = parseInt(document.getElementById("row_end").value);
	
	
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
				matrix[i][j] = j+c1-1;
			}
			else if(j == 0){
				matrix[i][j] = i+r1-1;
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

$( function () {
	$( "#slider-range1" ).slider({
		range: true,
		min: 0,	// set min value
		max: 100,	// set max value
		values: [ 10, 15 ],	// set initial value
		slide: function( event, ui ) {
			$( "#col_start" ).val(ui.values[ 0 ]);
			$( "#col_end" ).val(ui.values[ 1 ]);
			auto_submit();
		}
	});
	$( "#col_start" ).val( $( "#slider-range1" ).slider( "values", 0 ));
	$( "#col_end" ).val( $( "#slider-range1" ).slider( "values", 1 ));
});
$( function () {	
	$( "#slider-range2" ).slider({
		range: true,
		min: 0,	// set min value
		max: 100,	// set max value
		values: [ 10, 15 ],	// set initial value
		slide: function( event, ui ) {
			$( "#row_start" ).val(ui.values[ 0 ]);
			$( "#row_end" ).val(ui.values[ 1 ]);
			auto_submit();
		}
	});
	$( "#row_start" ).val( $( "#slider-range2" ).slider( "values", 0 ));
	$( "#row_end" ).val( $( "#slider-range2" ).slider( "values", 1 ));
});

var tabIdx = 0;	// initialize tab index

// This part, I referred to jquery org webpage; https://jqueryui.com/tabs/
function add_tab() {
	var tabCount = $("#tabs li").length + 1;
	console.log("Current tab count is: " + tabCount);
	
	// set limitation of the tab count
	if(tabCount > 6) {
		alert("Cannot create tabs more than 6");
		return false;
	}
	
	$( "#tabs" ).tabs();	// initialize tabs.

	// Get the dimensions of the current table
	var t_col_start = (document.getElementById('col_start').value);
	var t_col_end = (document.getElementById('col_end').value);
	var t_row_start = (document.getElementById('row_start').value);
	var t_row_end = (document.getElementById('row_end').value);

	tabIdx++;

	// Create the title bar, this will be a string to send to .append()
	var tabTitle = "<li class='tab'><a href='#tab-" + tabIdx + "'>" + t_col_start +
              " , " + t_col_end + " <> " + t_row_start + " , " + t_row_end + "</a>" +
              "<span class='ui-icon ui-icon-close' role='presentation'>Remove Tab</span>" + "</li>";

	// Add new tabTitle.
	$( "div#tabs ul" ).append( tabTitle );
	// Add the current matrix table.
	$( "div#tabs" ).append('<div id="tab-' + tabIdx + '">' + $("#setTable").html() + '</div>');
	// Refresh the tabs
	$( "#tabs" ).tabs("refresh");
	// Make the new tab active
	$( "#tabs" ).tabs("option", "active", -1);
	// Add a remove button
	$( "#tabs" ).delegate( "span.ui-icon-close", "click", function() {
		var panel_Id = $( this ).closest( "li" ).remove().attr( "aria-controls" );
		$( "#" + panel_Id ).remove();
		
	});
}
	
