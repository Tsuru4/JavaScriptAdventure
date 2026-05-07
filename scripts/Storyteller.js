

//TODO Write this class with all the expected behaviors and properties of a chapter in my choose your own adventure.
// * Ideally, this class would be written in its own JavaScript file, but I don't know how using multiple files works, and I don't want to mess with that yet. For now, it will stay here at the top at the bottom of Storyteller. I will carefully move it to its own file when I feel more confident.
//Every Chapter will need the following fields: Text in paragraph form. This should probably be an array, to allow for a dynamic amount of paragraphs.
//Every Chapter (excluding the final chapter) will need the following string fields: a question, and around 3 unique choices (an array of button labels) for the user to respond for the question.
//All of these strings are required as input(from the main porgram, not the user) at construction.

//There is some data which is simply not available at the construction of the chapters. Example, the user's custom name for the main character is set during the telling of chapter one.
//As such, every Chapter will need to be able to check the previous chapters for this data (assuming previous chaper exists). As such, every chapter should have a method to give said data to a requesting chapter.
//So every chapter needs the following Methods: retrievePassdown(), passdown() 
class Chapter {
    constructor(paragraphs, question, buttonLabels){
        this.paragraphs = paragraphs;
        this.question = question;
        this.buttonLabels = buttonLabels;
    }

    //This method will be very messy. Most of the story script will probably run through here.
    updateStorybox(){

    //! Note: Some of the player's choices will trigger minigames. The storybox should only be updated AFTER the minigame has been resolved!

    var storyboxDiv = document.getElementById("storybox");
    storyboxDiv.innerHTML = "<h1>Chapter " + pathLog.length + "</h1>";
    
    for (let i = 0; i < this.paragraphs.length; i++)
    {
        storyboxDiv.innerHTML += "<p>" + this.paragraphs[i] + "</p>";
    }
    }
}


//Apparently, in javascript, there is no "main function". Variables declared outside of the scope of any functions are initialized as global variables.
//I'm not very certain on how this initializtion process works, but stackoverflow explains it a little. (See the link in the readme). 

//pathlog is used to remember the user's cumulative choices.
var pathLog = [];

//storyPages is an array used to store all of my information on the story. It is organized by chapter, and as such, each index represents a chapter.
//! Javascript is NOT typesafe! Exercise caution here and in the following declarations!
var storyPages = [];






//Each chapter will need alternatives for the user to choose from.
//Each chapter should follow this structure: storyPages[0] = [Chapter's Common Dictionary, "Path 1 specific dictionary", "Path 2 dict", "Path 3 dict"]
//The common dictionary at index 0 will be reserved for information which is chapter specifc yet will be static regardless of the path choice, such as the prompt string. It might not be used, but it is better to store information here.
//Because this data has a clear structure and a set amount of elements, it may be better to use maps for these inner layers instead of arrays.

// * Chapter initialization
//TODO There should be 18 chapters total.
//This variable, chapterTotal, may be temporaily changed for testing purposes. Remember to set it back to 18 after completing any tests.
let chapterTotal = 18;
for (let i = 0; i < chapterTotal; i++)
{
    storyPages.push(new Map([
        ["Common",""],
        ["Path One",""],
        ["Path Two",""],
        ["Path Three",""]
    ]));
}

//Because each chapter has consistent fields and also needs to be able to preform certain actions, they may work best with a class.

//! The following is still needs testing
storyPages[0].set("Path One", new Chapter(
    ["This is our protagonist. Let's call him Sparky. (Should we call him something else?) Anyway, his dad wants Sparky to learn superpowers. He has a big library of books on superpowers."],
    "Which book will he choose?",["Path One[Air]","Path Two[Water]","Path Three[Earth]","Path Four?[Fire]"]));

//This function below is a Hello World function. It isn't necessary for the actual project.
//Its purpose was to help me understand how to create an independant javascript file and experiment with referencing this file from my HTML file.
//  I used tutorialspoints to learn how to do this.
//See https://www.tutorialspoint.com/javascript/javascript_placement.htm
function sayHello()
{
    //the alert() function sends a popup notification. It causes the least disruption to the overall page.
    alert("Hello, World!");
    
    //document.write() writes to the document. This disrupts the entire webpage, so I should avoid using this function until I better understand it.
    //for now, editing the innerHTML of an element seems to be less disruptive 
    document.getElementById("storybox").innerHTML +="<p>Hello, World!</p>";
    
    //console.log() sends a message to the browser's console. The typical user would never see this. It is a debug tool, and can be found by right-clicking on a webpage, and choosing "Inspect".
    console.log("Hello, World! Congratulations on finding the console!");
}

function updatePath(pathNumber)
{
    //Sends a message to the console log. This helps me with future troubleshooting if any buttons do not behave correctly. 

    console.log("Path " + pathNumber +  " selected.");
    pathLog.push(pathNumber);
    console.log(pathLog.length);
    if (pathLog.length > 18)
    {
        alert("Warning. The number of choices has exceeded the expected length! The log shows you have now made " + pathLog.length + " choices!");
    }
    
    //change this. updateStorybox can be done by the Chapter, so it should be rewritten into a method of Chapter
    //TODO 
    //! this should call pathLog.length but I am using pathLog.length -1 as a temporary placeholder for testing purposes
    console.log(storyPages[0]);
    console.log(storyPages[1]);
    console.log(storyPages[0].get("Path One"));
    console.log(storyPages[1].get("Path One"));
    console.log(pathNumber)
    console.log(storyPages[pathLog.length-1].get(pathNumber));
    storyPages[pathLog.length-1].get(pathNumber).updateStorybox();
    
    

}




//This is recursion practice for myself. In terms of the project, this function is to simulate a battle minigame between the user and the npcs. 
function rockPaperScissors(remainingTries)
{
    //Base case: If remaining tries is less than 0, return false.
    //get input from the user.
    //compare with the input from the character.
    //if the player wins, return true.
    //if player loses, return false.
    //if player ties, call rockPaperScissors(-1)
}

