/*
 Tyler J. Bainbridge
 tyler_bainbridge@student.uml.edu
 91.461 GUI Programming I
 Assignment:  Scrabble using JQuery UI
 December 4th, 2015

 Tyler Bainbridge, UMass Lowell Computer Science, tbainbr@cs.uml.edu
 Copyright (c) 2015 by Tyler J Bainbridge
 updated by TJB on December 4th, 2015 at 7:45 PM
 */

var lettersOnDeck = 0;
var images = "";
var tcount = 0;
var THISISTHETOTALSCORE = 0;
var word = new Array(8); //the board where you put the tiles. this is for tpaneling the word
var scores = [
    {"letter": "A", "value": 1, "amount": 9},
    {"letter": "B", "value": 3, "amount": 2},
    {"letter": "C", "value": 3, "amount": 2},
    {"letter": "D", "value": 2, "amount": 4},
    {"letter": "E", "value": 1, "amount": 12},
    {"letter": "F", "value": 4, "amount": 2},
    {"letter": "G", "value": 2, "amount": 3},
    {"letter": "H", "value": 4, "amount": 2},
    {"letter": "I", "value": 1, "amount": 9},
    {"letter": "J", "value": 8, "amount": 1},
    {"letter": "K", "value": 5, "amount": 1},
    {"letter": "L", "value": 1, "amount": 4},
    {"letter": "M", "value": 3, "amount": 2},
    {"letter": "N", "value": 1, "amount": 5},
    {"letter": "O", "value": 1, "amount": 8},
    {"letter": "P", "value": 3, "amount": 2},
    {"letter": "Q", "value": 10, "amount": 1},
    {"letter": "R", "value": 1, "amount": 6},
    {"letter": "S", "value": 1, "amount": 4},
    {"letter": "T", "value": 1, "amount": 6},
    {"letter": "U", "value": 1, "amount": 4},
    {"letter": "V", "value": 4, "amount": 2},
    {"letter": "W", "value": 4, "amount": 2},
    {"letter": "X", "value": 8, "amount": 1},
    {"letter": "Y", "value": 4, "amount": 2},
    {"letter": "Z", "value": 10, "amount": 1}
] //for scores


$(document).ready(function () {
    // printTable();
    SetupBoard(); //randomly setup the board
    DragnDrop(); //initializes the draggables and droppables

});

function NewTiles()
{
    if(document.getElementById('messages').innerHTML === "Your word is correct!!")
    {
        THISISTHETOTALSCORE += parseInt(document.getElementById('score').innerHTML);
        document.getElementById('totalscore').innerHTML = "Total score: " + THISISTHETOTALSCORE;
        restart();
    }else{
        alert("Please submit a valid word");
    }

}

function AddTiles(){
    if(document.getElementById('messages').innerHTML === "Your word is correct!!")
    {
        THISISTHETOTALSCORE += parseInt(document.getElementById('score').innerHTML);
        document.getElementById('totalscore').innerHTML = "Total score: " + THISISTHETOTALSCORE;
        SetupBoard();
    }else{
        alert("Please submit a valid word");
    }
}

/**
 * setup the board with tiles
 */
function SetupBoard() {
    var letter;
    var random;
    var lettersToAdd = 7 - lettersOnDeck;

    lockWord();
    //we want seven tiles so add seven
    for (var i = 0; i < lettersToAdd; i++) {
        random = Math.floor((Math.random() * 25));      //random number 1-25
        letter = scores[random].letter;                 //letter = the letter at the random spot in the scores array
        console.log(random);
        $("#panel").append(" <img id=\"" + letter + "\" class=\"panel_blocks\" src=\"images/scrabble/Scrabble_Tile_" + letter + ".jpg\">") //dynamically create images in the #panel div
        lettersOnDeck++;
    }

    console.log(images);

    DragnDrop(); //refresh the draggable code
}

/**
 * *
 * @param word to convert into score using the array values in scores
 */
function updateScore(word) {
    var totalScore = 0;
    var scoreToAdd = 0;
    var doubleword = 0;
    //look through the array
    for (var i = 0; i < word.length; i++) {
        //find the letter in the scores array
        for (var j = 0; j < scores.length; j++) {
            //if it's here
            if (word[i] != "" && (word[i] == scores[j].letter)) {
                //if i == 2 (double letter score) then double the value
                if (i == 2) {
                    scoreToAdd = scores[j].value * 2;
                    totalScore += scoreToAdd;
                }if (i == 5) {
                    doubleword++;
                    scoreToAdd = scores[j].value;
                    totalScore += scoreToAdd;
                }if(i!=2 && i != 5) //else, just add the score normally
                {
                    totalScore += scores[j].value;
                }
            }
        }
    }
    if(doubleword!=0)
    {
        totalScore = totalScore * 2;
    }
    //put it in the score div
    document.getElementById('score').innerHTML = "Current score: " + totalScore.toString();
}

/**
 * draggable and droppable stuff
 * @constructor
 */
function DragnDrop() {
    //allow the tiles to be dropped back on the panel
    $("#panel").droppable({accept: '.panel_blocks', out: Letters});

    /**
     * minuses leters from the deck
     * @param event
     * @param ui
     * @constructor
     */
    function Letters(event, ui) {
        lettersOnDeck--;
    }

    //panel blocks (the letters) are draggable and snap to board blocks in the inside, if it's not a valid droppable then revert
    $(".panel_blocks").draggable({snap: ".board_main", snapMode: "inner", revert: 'invalid'});

    //if they're being dragged , make that array slot blank
    function Drag(event, ui) {
        if (ui.draggable.attr("id") == word[$(this).attr("id")]) {
            //remove tile from board
            word[$(this).attr("id")] = ""; //make it blank
            //tcount++;
        }
        updateWord(word);
    }

    //you can drag the panel blocks onto the board(.board_main)
    $(".board_main").droppable({accept: '.panel_blocks', drop: Drop, out: Drag});

    //run this function when a tile is dropped
    function Drop(event, ui) {
        var letter = ui.draggable.prop('id');          //take the ID of the draggable(letter tile) and assign it to letter
        var element = $(this).attr("id");              //take the ID of the droppable(the board tile) and assign it to element
        var number = parseInt(element);                 //make sure it's an int and not a string
        //a tile is added, increment tcount
        tcount++;
        ////////////THIS CODE IS NOT WORKING ENTIRELY
        if (typeof word[number - 1] === 'undefined' && typeof word[number + 1] === 'undefined' && tcount < 1) {
            console.log();
            console.log("tcount is:" + tcount);
            ui.draggable.draggable({revert: true});
        } else {
            word[number] = letter;
            updateWord(word);
        }
    }
}

function NewGame()
{
    restart();
	document.getElementById('word').innerHTML = "----";
	document.getElementById('messages').innerHTML = "New game Start!!";
	document.getElementById('score').innerHTML = "Current score: 0";
    document.getElementById('totalscore').innerHTML = "Total score: 0";
}



/**
 * locks the word down on the board so you cant move them
 */
function lockWord() {
    var object = "";
    //go through the entire word
    for (var i = 0; i <= word.length; i++) {
        //if the word slot isnt a letter do nothing
        if (typeof word[i] === 'undefined') {

        } else { //if it's a letter find that ID and make it undraggable (locked)
            $("#" + word[i]).draggable('disable')
        }
    }

}

/**
 * get the word from the board
 * @param varDraggableId the table array
 */
function updateWord(varDraggableId) {
    var currentword = "";
    for (var i = 0; i < varDraggableId.length; i++) {
        if (typeof varDraggableId[i] === 'undefined') {

        } else {
            currentword += varDraggableId[i];
        }
    }
    if (currentword) {
        updateScore(word);
		document.getElementById('word').innerHTML = currentword;
    }
    submitWord();
}

/**
 * probably not going to use this
 */
function printTable() {
    var string = "";
    var blank = "class=\"board_main\" src=\"images/scrabble/blank.jpg\">";
    string = string + "<br>";
    string = string + "<table>"; //opening the table
    var tablecell = 0;
    for (var i = 0; i < 4; i++) {
        string = string + "<tr>";
        for (var j = 0; j < 4; j++) {
            tablecell++;
            string = string + "<th>";
            string = string + "<img id=\"" + tablecell + "\"" + blank;
            string = string + "</th>";
        }
        string = string + "</tr>";
    }
    string = string + "</table>";
    console.log(string);
    document.getElementById('board').innerHTML = string;
}
/**
 * refresh the hand and the board and the messages
 */
function restart()
{
    var letter;
    var random;
    var lettersToAdd  = 7;
    var string ="";

    lettersOnDeck = 7;

    for(var i =0; i<word.length;i++)
    {
        word[i]="";
    }

    //we want seven tiles so add seven
    for(var i = 0; i < 7; i++)
    {
        random = Math.floor((Math.random() * 25));      //random number 1-25
        letter = scores[random].letter;                 //letter = the letter at the random spot in the scores array
        console.log(random);
        string = string + (" <img id=\""+ letter + "\" class=\"panel_blocks\" src=\"images/scrabble/Scrabble_Tile_" + letter + ".jpg\">"); //dynamically create images in the #panel div
    }

    console.log(images);

    document.getElementById('panel').innerHTML = string;
    DragnDrop(); //refresh the draggable code

    document.getElementById('score').innerHTML = " ";
    document.getElementById('word').innerHTML = " ";
    document.getElementById('messages').innerHTML = " ";

}

// The dictionary lookup object
var dict = {};

// Do a jQuery Ajax request for the text dictionary
$.get( "dic/dictionary.txt", function( txt ) {
    // Get an array of all the words
    var words = txt.split( "\n" );

    // And add them as properties to the dictionary lookup
    // This will allow for fast lookups later
    for ( var i = 0; i < words.length; i++ ) {
        dict[ words[i] ] = true;

    }
});

/**
 * submmit the word
 */
function submitWord(){

    findWord();
    var submittedWord = $("#word").text();
    console.log("submitted word: " + submittedWord);
    submittedWord = submittedWord.toLowerCase();
	
    if ( dict[submittedWord] ) {
        console.log("This is in the dictionary: " + submittedWord);
        document.getElementById('messages').innerHTML = 'Your word is correct!!';

    }else{
        document.getElementById('messages').innerHTML = 'No no.. Your word is not in the dictionary.';
        console.log("This is not in the dictionary");
    }

}
/**
 * find the word in the dict
 * @param word to search for
 * @returns {*}
 */
function findWord( word ) {
    // See if it's in the dictionary
    if ( dict[ word ] ) {
        // If it is, return that word
        return word;
    }
    // Otherwise, it isn't in the dictionary.
    return "____";
}