//TODO Expand the writing in the chapter class to further fit my vision.
// * Ideally, this class would be written in its own JavaScript file, but I don't know how using multiple files works, and I don't want to mess with that yet. For now, it will stay here at the top at the bottom of Storyteller. I will carefully move it to its own file when I feel more confident.
//Every Chapter will need the following fields: Text in paragraph form. This should probably be an array, to allow for a dynamic amount of paragraphs.
//Every Chapter (excluding the final chapter) will need the following string fields: a question, and around 3 unique choices (an array of button labels) for the user to respond for the question.
//All of these strings are required as input(from the main porgram, not the user) at construction.

//TODO in hindsight, a button or branch class would have made this entire project more flexible.


//There is some data which is simply not available at the construction of the chapters. Example, the user's custom name for the main character is set during the telling of chapter one.
//As such, every Chapter will need to be able to check the previous chapters for this data (assuming previous chaper exists). As such, every chapter should have a method to give said data to a requesting chapter.
//TODO every chapter needs the following Methods: retrievePassdown(), passdown() 
class Chapter {
    constructor(paragraphs, question, buttonLabels){
        this.paragraphs = paragraphs;
        this.question = question;
        this.buttonLabels = buttonLabels;
        
        //This is to avoid false positives that arise in updateStorybox() from leaving this array undefined.
        this.isMinigames = [];
        for (let i = 0; i < buttonLabels.length; i++)
        {
            this.isMinigames.push(false);
        }
    }

    // * This function acts as a supplement to the constructor. These fields are not required for a chapter to work.
    // ? In hindsight, this may have been better to write a child class of Chapter called ChapterWithMinigame. Most Chapters do not need the fields and behavior written here.
    //isMinigames must be an array of booleans equal in length to buttonLabels.
    //minigameExplanation is a string.
    //minigameButtons is an array of strings for labeling the buttons. The first string is the win condition.
    //badPath is a string. It is the path for minigame failure.
    // * It is recommended to use this function directly after construction of a chapter if a minigame is wanted.
    // ! For now, use this feature sparingly, as in the future I intend to replace it entirely and set up a child of Chapter for ChapterWithMinigame.
    setupMinigameFields(isMinigames,minigameExplanation,minigameButtons,badPath){
        this.isMinigames = isMinigames;
        this.minigameExplanation = minigameExplanation;
        this.minigameButtons = minigameButtons;
        this.badPath = badPath;
    }

    updateButtonFieldStyles(integer)
    {
        var buttonFieldStyle = document.getElementById('button-field').style;
        buttonFieldStyle.gridTemplateColumns = "repeat(" + integer + ", 1fr)";
    }

    //recursively shuffle an array
    //returns the shuffled array.
    shuffleArray(oldArray){

        if (oldArray.length > 1 && Array.isArray(oldArray))
        {
            //generate a random index number
            var randomIndex = Math.floor(Math.random() * oldArray.length);
            //set the index number to the new array
            var newArray = [oldArray[randomIndex]];

            //remove the shuffled value to avoid being repeated 
            for (let i = randomIndex; i + 1 < oldArray.length; i++)
            {
                oldArray[i] = oldArray[i+1]
            }
            oldArray.pop();

            newArray = newArray.concat(this.shuffleArray(oldArray));

            return newArray;
        }
        return oldArray;
    }

    //trigger minigame. If minigame is lost, trigger badPath. If minigame is won, trigger the original buttonPath
    //The first button in the button list should be the win condition.
    updateMiniGame(buttonPath){
        //This line writes replaces this chapter's question with the minigame prompt.
        document.getElementById("questionbox").innerHTML = "<p>" + this.minigameExplanation + "</p>"; 
        //This block generates deletes the old buttons and replaces them with minigame buttons
        var buttonField = document.getElementById("button-field");
        buttonField.innerHTML = "";


        var answerKey = new Map([
            [this.minigameButtons[0],"win"]
        ]); 
        for (let i = 1; i < this.minigameButtons.length; i++)
        {
            answerKey.set(this.minigameButtons[i],"lose");
        }

        this.minigameButtons = this.shuffleArray(this.minigameButtons);


        console.log(answerKey);
        for (let i = 0; i < this.minigameButtons.length; i++)
        {
            console.log(answerKey.get(this.minigameButtons[i]));
            console.log(this.minigameButtons[i]);
            if (answerKey.get(this.minigameButtons[i]) == "lose")
            {
                buttonField.innerHTML +=
                    "<div class= 'buttonbox'>" +
                        "<input type='button' onclick=\"updatePath('" + this.badPath + "')\" value = '" + this.minigameButtons[i] + "'/>" +
                    "</div>";
            }
            else
            {
                buttonField.innerHTML +=
                    "<div class= 'buttonbox'>" +
                        "<input type='button' onclick=\"updatePath('" + buttonPath + "')\" value = '" + this.minigameButtons[i] + "'/>" +
                    "</div>";
            }
        }
        this.updateButtonFieldStyles(this.minigameButtons.length);
    }

    //This method will be very messy. Most of the story script will probably run through here.
    //this method updates the storybox, questionbox, and buttonbox with this chapter's fields.
    updateStorybox(){

        //This block writes the story block.
        //? Maybe it would be more cool if this code kept the previous chapter's text and mereley appended to the story? All I would need to do is change the innerHTML = to +=
        var storyboxDiv = document.getElementById("storybox");
        storyboxDiv.innerHTML = "<h1>Chapter " + pathLog.length + "</h1>";    
        for (let i = 0; i < this.paragraphs.length; i++)
        {
            storyboxDiv.innerHTML += "<p>" + this.paragraphs[i] + "</p>";
        }

        //This line writes this chapter's question.
        document.getElementById("questionbox").innerHTML = "<p>" + this.question + "</p>"; 

        //This block generates new buttons.
        var buttonField = document.getElementById("button-field");
        buttonField.innerHTML = "";
        for (let i = 0; i < this.buttonLabels.length; i++)
        {
            var currentButtonLabel = this.buttonLabels[i]; 
            var buttonPath = "Path" + (i+1);

            if (this.isMinigames[i])
            {
                buttonField.innerHTML +=    
                    "<div class= 'buttonbox'>" +
                        "<input type='button' onclick=\"triggerMinigame('" + buttonPath + "')\" value = '" + currentButtonLabel + "'/>" +
                    "</div>";
            }
            else
            {
                buttonField.innerHTML +=
                    "<div class= 'buttonbox'>" +
                        "<input type='button' onclick=\"updatePath('" + buttonPath + "')\" value = '" + currentButtonLabel + "'/>" +
                    "</div>";
            }

            //set up the minigame in the relevant buttons.
            //The minigame map will not affect all buttons. Buttons that it does affect will need to be changed.
            //minigame = [affectedPathIndex, minigameExplanation, minigameButtons, newPaths]
        }
        this.updateButtonFieldStyles(this.buttonLabels.length);
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
//Because this data has a clear structure and a set amount of elements, it may be better to use maps for these inner layers instead of arrays.

// * Chapter initialization
//TODO There should be alternate variations to every chapter (aside from chapter 1).
//This variable, chapterTotal, may be temporaily changed for testing purposes. Remember to set it back to 18 after completing any tests.
let chapterTotal = 18;
for (let i = 0; i < chapterTotal; i++)
{
    storyPages.push(new Map([
        ["Path1",""]
    ]));
}

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
    ["He felt drawn to the book on air related superpowers, almost as if he was destined to read it.", "After practicing for a few years, he developed his own specialty. Now he can generate his own lightning!","One day, our protagonist realized that his dad is evil."],
    "What should he do?",
    ["Stop him"]));

storyPages[1].set("Path2", new Chapter(
    ["He reluctantly picked up the book on water powers. But he has absolutely no talent for superpowers. His older brothers both laugh at him.","One day, our protagonist's dad is evil."],
    "What should he do?",
    ["Stop him, somehow?"]));

storyPages[1].set("Path3", new Chapter(
    ["He picked up the book on earth. It was a bit dry, but he did like the parts about controlling various metals.", "After years of practice, he develops his own variation of superpowers, magnetism.","Protagonist's dad is evil."],
    "What should he do?",
    ["Stop him"]));

storyPages[1].set("Path4", new Chapter(
    ["He picked up the book on fire. The book claims that fire is the most powerful element, but when he tried to spar against his brothers, he was easily overpowered. Dumb book was all talk, but his father told him to stick with it.","After years of reluctant practice, he developed his own variation of the book's fire powers, lightning! This variation is much stronger. He can beat the younger of his two older brothers now, but his oldest brother is still the strongest.","Protagonist's dad is evil."],
    "What should he do?",
    ["Stop him"]));

storyPages[2].set("Path1", new Chapter(
    ["He fights desperately to stand up against his father's supervillain reign of terror. His oldest brother and some of their friends join our protagonist. Using a laser pistol developed by one of his father's minions, he managed to hit his father's leg, but ultimately, both sides have superpower, and the other side has a lot more experience.", "Our protagonist lost the battle, and in a panic, he and his allies are forced to flee."],
    "Where will he go?",
    ["Wander solo", "Follow brother", "Follow friend", "Stay in town"]));

storyPages[2].set("BadPath1", new Chapter(
    ["The protagonist was beaten badly by his father. He learned a valuable lesson about sticking to his strengths. Luckily, he is still just a kid, so his father only grounded him.", "Our protagonist hates being grounded. He wants to run away from home now."],
    "Where will he go?",
    ["Anywhere but here"]));

storyPages[3].set("Path1", new Chapter(
    ["Our protagonist takes a small plane and escapes south. Eventually he reaches a desert city, and just in time, because the plane ran our of fuel! This place should be far beyond his father's reach!","Almost immediately, however, he realizes his problems aren't over yet. He has no food, no shelter, and no money. He is a refugee in a strange land, and everyone views him with distrust.","He manages to salvage his plane into a makeshift home, and he uses his powers to repair the plane's air conditioner.", "But he is still starving and broke."],
    "How will he eat tonight?",
    ["Get a job"]));

storyPages[3].set("Path2", new Chapter(
    ["Our protagonist follows his brother to the southeast, to their mother's homeland. They reach an ancient city, and take shelter there. Their father tries to follow them, but by working together, the two boys manage to hide their trail.","Now, they are refugees in their mother's homeland. They are living in an alleyway on the outskirts of the city, and they have no money and no food."],
    "How will the boys eat tonight?",
    ["Get a job"]));

storyPages[3].set("Path3", new Chapter(
    ["Our protagonist follows a friend west. Together, they cross the sea. Just as they are about to reach land, however, a sea monster attacks them, and he is seperated from his friend.","After an epic battle against the sea monster, he eventually escapes its grasp and swims the rest of the way to the shore. He reaches a large city by the coast and starts to wander the streets. It's an enormous city, but not very friendly. He has no food, and now he is starving."],
    "How will he eat tonight?",
    ["Get a job"]));

storyPages[3].set("Path4", new Chapter(
    ["Out protagonist tries to hide in the ruins underneath the city. His father catches him, however. He is grounded for life."],
    "What will he do now?",
    ["Get a job(?)"]));

storyPages[4].set("Path1", new Chapter(
    ["He tries looking for a job, but no one will hire him."],
    "How should he spend his free time?",
    ["Work out"]));

storyPages[5].set("Path1", new Chapter(
    ["Our protagonist decides to work out in his free time. After many years of rigorous training, he grows up to be a strong young man.", "Now, riots are breaking out throughout the local kingdom. His father tries to make an ambitious bid to take over it. This time, our hero is ready. Together with his brother, they take down their father and his minions.", "However, the riots are still ongoing. A few weeks later, our protagonist sees a girl being attacked by rioters."],
    "Will he save her?",
    ["Save her"]));

storyPages[6].set("Path1", new Chapter(
    ["He saved the girl! She is impressed by his act of heroism. She's quite pretty too. Our protagonist likes how that turned out.", "The next day, while he is thinking about how it felt to be a hero, a supervillain suddenly attacks him!"],
    "How will he deal with this supervillain?",
    ["Fight back","Run away"]));

storyPages[7].set("Path1", new Chapter(
    ["He fights back against the supervillain, and wins easily. The local people begin to hail him as a hero. He's quite popular now!", "This popularity doesn't come without earning some grudges, though. The new mayor hates him, and says that people don't need vigilantes when the police force is perfectly capable of protecting the people."],
    "Our protagonist is considering making a name for himself as a full time superhero. Should he?",
    ["Live up to expectations"]));

storyPages[7].set("Path2", new Chapter(
    ["He runs away in fear. The end"],
    "",
    []));

storyPages[8].set("Path1", new Chapter(
    ["As a superhero, he is more famous than ever. He is especially popular with the ladies. A girl wants to date him."],
    "What should he do?",
    ["Accept"]));

storyPages[9].set("Path1", new Chapter(
    ["A gang wants him to look the other way. They are offering a hefty bribe."],
    "What does he do?",
    ["Capture them"]));

storyPages[10].set("Path1", new Chapter(
    ["A superhero is committing crime."],
    "What should our protagonist do?",
    ["Confront him"]));

storyPages[11].set("Path1", new Chapter(
    ["A girl wants to be his sidekick."],
    "Should he accept?",
    ["Work alone"]));

storyPages[12].set("Path1", new Chapter(
    ["A girl is flirting with him."],
    "What should he do?",
    ["Flirt back"]));

storyPages[13].set("Path1", new Chapter(
    ["A world domination organization invites him to a meeting."],
    "Does he accept?",
    ["No"]));

storyPages[14].set("Path1", new Chapter(
    ["The organization reveals that an alien invasion is approaching. They need to conquer his city as an asset to repel the invasion."],
    "",
    ["Save the earth his own way"]));

storyPages[15].set("Path1", new Chapter(
    ["The aliens invade. They want you to join them."],
    "What will you do?",
    ["Take down the leader", "Close the portal"]));

storyPages[16].set("Path1", new Chapter(
    ["..."],
    "",
    ["Proceed"]));

storyPages[17].set("Path1", new Chapter(
    ["The end!"],
    "",[]));

//sets a minigame for the scenario where the protagonist battles his dad in chapter 2
// ! This way of setting up minigames is terrible, messier than it needs to be, and ineficient. 
// ! I will be replacing this method later. At that time, this line MUST to be removed, as the method will no longer exist.
// Once a proper child class is created, the proper way will be to use that child class's constructor instead of a combination of the parent constructor plus this method.    
storyPages[1].get("Path1").setupMinigameFields([true],"He attempts to attack his dad. Choose his attack!",["Gun","Powers","Bombs"],"BadPath1");

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

function triggerMinigame(buttonPath)
{
    var pathNumber = pathLog[pathLog.length-1];
    storyPages[pathLog.length-1].get(pathNumber).updateMiniGame(buttonPath);
}

function updatePath(pathNumber)
{
    //Sends a message to the console log. This helps me with future troubleshooting if any buttons do not behave correctly. 
    console.log("Path " + pathNumber +  " selected.");

    pathLog.push(pathNumber);
    console.log("pathLog length: " + pathLog.length);

    //This error message should normally be triggered if the user escapes the story path. If the story path is closed correctly, it should never trigger.
    if (pathLog.length > chapterTotal)
    {
        alert("Warning. The number of choices you made has somehow exceeded the expected amount! The log shows you have now made " + pathLog.length + " choices!");
        //removes buttons
        document.getElementById("button-field").innerHTML = "";
    }
    else
    {
        console.log(storyPages[pathLog.length-1].get(pathNumber));
        //If the button held an invalid path, that selection gets removed here. Hopefully, this prevents the user from escaping the story path, even when the story path was written poorly.
        if (storyPages[pathLog.length-1].get(pathNumber) == undefined)
        {
            alert("Warning. This button does not work.");
            pathLog.pop();
        }
        else{
            // * The core of the code happens here. Everything else was just to filter out errors. 
            storyPages[pathLog.length-1].get(pathNumber).updateStorybox();
        }
    }
    
}