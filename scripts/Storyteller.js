//TODO Expand the writing in this class to further fit my vision.
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

    //TODO implement a minigame check here.


    var storyboxDiv = document.getElementById("storybox");
    storyboxDiv.innerHTML = "<h1>Chapter " + pathLog.length + "</h1>";    

    for (let i = 0; i < this.paragraphs.length; i++)
    {
        storyboxDiv.innerHTML += "<p>" + this.paragraphs[i] + "</p>";
    }

    document.getElementById("questionbox").innerHTML = "<p>" + this.question + "</p>"; 

    var buttonField = document.getElementById("button-field");

    buttonField.innerHTML = "";

    for (let i = 0; i < this.buttonLabels.length; i++)
    {

        var currentButtonLabel = this.buttonLabels[i];
        //! At the moment, I am not entirely certain this part works exactly as intended. 
        var buttonPath = "Path" + (i+1);

        console.log(buttonPath);

        buttonField.innerHTML +=
            "<div class= 'buttonbox'>" +
                "<input type='button' onclick=\"updatePath('" + buttonPath + "')\" value = '" + currentButtonLabel + "'/>" +
            "</div>";

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
        ["Path1",""],
    ]));
}

//Because each chapter has consistent fields and also needs to be able to preform certain actions, they may work best with a class.

//TODO The following needs further development to complete the story.
//At the moment, this block of code fleshes out only the bare minimum story template for the purposes of testing.
story = "built-in story";
if (story == "built-in story")
{
storyPages[0].set("Path1", new Chapter(
    ["This is our protagonist. Let's call him Sparky. (Should we call him something else?) Anyway, his dad wants Sparky to learn superpowers. He has a big library of books on superpowers."],
    "Which book will he choose?",
    ["Air","Water","Earth","Fire"]));

storyPages[1].set("Path1", new Chapter(
    ["Protagonist's dad is evil."],
    "What should he do?",
    ["Stop him"]));

storyPages[2].set("Path1", new Chapter(
    ["The protagonist wants to leave home."],
    "Where will he go?",
    ["Anywhere"]));

storyPages[3].set("Path1", new Chapter(
    ["Protagonist is hungry."],
    "",
    ["Get a job"]))

storyPages[4].set("Path1", new Chapter(
    [""],
    "How should he spend his free time?",
    ["Work out"]))

storyPages[5].set("Path1", new Chapter(
    ["Riots are breaking out throughout the local kingdom. Protagonist sees a girl being attacked. "],
    "",
    ["Save her"]))

storyPages[6].set("Path1", new Chapter(
    ["A supervillain decides to attack him."],
    "",
    ["Run away"]))

storyPages[7].set("Path1", new Chapter(
    ["The people see him as a hero. The mayor hates him."],
    "",
    ["Live up to expectations"]))

storyPages[8].set("Path1", new Chapter(
    ["A girl wants to date him."],
    "What should he do?",
    ["Accept"]))

storyPages[9].set("Path1", new Chapter(
    ["A gang wants him to look the other way."],
    "What does he do?",
    ["Capture them"]))

storyPages[10].set("Path1", new Chapter(
    ["A superhero is committing crime."],
    "What should our protagonist do?",
    ["Confront him"]))

storyPages[11].set("Path1", new Chapter(
    ["A girl wants to be his sidekick."],
    "Should he accept?",
    ["Work alone"]))

storyPages[12].set("Path1", new Chapter(
    ["A girl is flirting with him."],
    "What should he do?",
    ["Flirt back"]))

storyPages[13].set("Path1", new Chapter(
    ["A world domination organization invites you to a meeting."],
    "Does he accept?",
    ["No"]))

storyPages[14].set("Path1", new Chapter(
    ["The organization reveals that an alien invasion is approaching. They need to conquer your city as an asset to repel the invasion."],
    "",
    ["Save the earth his own way"]))

storyPages[15].set("Path1", new Chapter(
    ["The aliens invade. They want you to join them."],
    "What will you do?",
    ["Take down the leader", "Close the portal"]))

storyPages[16].set("Path1", new Chapter(
    ["..."],
    "",
    ["Proceed"]))

storyPages[17].set("Path1", new Chapter(
    ["The end!"],
    "",[]))
}

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
    console.log("pathLog length: " + pathLog.length);
    if (pathLog.length > chapterTotal)
    {
        alert("Warning. The number of choices has exceeded the expected length! The log shows you have now made " + pathLog.length + " choices!");
        //removes buttons
        document.getElementById("button-field").innerHTML = "";
    }
    else{

    //change this. updateStorybox can be done by the Chapter, so it should be rewritten into a method of Chapter
    //TODO 

    console.log(storyPages[pathLog.length-1].get(pathNumber));
    storyPages[pathLog.length-1].get(pathNumber).updateStorybox();
    }
    
}

//This is recursion practice for myself. In terms of the project, this function is to simulate a battle minigame between the user and the npcs. 
//TODO replace psuedocode with actual code, then impliment
function rockPaperScissors(remainingTries)
{
    //Base case: If remaining tries is less than 0, return false.
    //get input from the user.
    //compare with the input from the character.
    //if the player wins, return true.
    //if player loses, return false.
    //if player ties, call rockPaperScissors(-1)
}