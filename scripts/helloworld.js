
//This is a Hello World function.
//Its purpose was to help me understand how to create an independant javascript file and experiment with referencing this file from my HTML file.
//  I used tutorialspoints to learn how to do this.
//See https://www.tutorialspoint.com/javascript/javascript_placement.htm
function sayHello()
{
    //the alert() function sends a popup notification. It causes the least disruption to the overall page.
    alert("Hello, World!")
    
    //document.write() writes to the document. This disrupts the entire webpage, so I should avoid using this function until I better understand it.
    //document.write("Hello, World!")
    
    //console.log() sends a message to the browser's console. The typical user would never see this. It is a debug tool, and can be found by right-clicking on a webpage, and choosing "Inspect".
    console.log("Hello, World! Congratulations on finding the console!")
}