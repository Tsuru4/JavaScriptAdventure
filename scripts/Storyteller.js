//Apparently, in javascript, there is no "main function". Variables declared outside of the scope of any functions are initialized as global variables.
//I'm not very certain on how this initializtion process works, but stackoverflow explains it a little. (See the link in the readme). 
var pathLog = []

//This function below is a Hello World function. It isn't necessary for the actual project.
//Its purpose was to help me understand how to create an independant javascript file and experiment with referencing this file from my HTML file.
//  I used tutorialspoints to learn how to do this.
//See https://www.tutorialspoint.com/javascript/javascript_placement.htm
function sayHello()
{
    //the alert() function sends a popup notification. It causes the least disruption to the overall page.
    alert("Hello, World!")
    
    //document.write() writes to the document. This disrupts the entire webpage, so I should avoid using this function until I better understand it.
    //for now, editing the innerHTML of an element seems to be less disruptive 
    document.getElementById("storybox").innerHTML ="<p>Hello, World!</p>"
    
    //console.log() sends a message to the browser's console. The typical user would never see this. It is a debug tool, and can be found by right-clicking on a webpage, and choosing "Inspect".
    console.log("Hello, World! Congratulations on finding the console!")
}

function updatePath(pathNumber)
{
    //For all three of the "path" functions, send a message to the console log. This helps me with future troubleshooting if any buttons do not behave correctly. 

    console.log("Path " + pathNumber +  " selected.")
    pathLog.push(pathNumber)
    console.log(pathLog.length)
    if (pathLog.length > 18)
    {
        alert("Warning. The number of choices have exceeded the expected length! The log shows you have now made " + pathLog.length + " choices!")
    }        
}

//This is recursion practice for myself. In terms of the project, this function is to simulate a battle minigame between the user and the npcs. 
function rockPaperScissors(remainingTries)
{
    //if remaining tries is less than 0, return false.
    //get input from the user.
    //compare with the input from the character.
    //if the player wins, return true.
    //if player loses, return false.
    //if player ties, call rockPaperScissors(-1)
}