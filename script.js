
function sendEmail() {

    Email.send({
        Host : "smtp.elasticemail.com",
        Username : "sakshisj1607@gmail.com",
        Password : "sakshi16",
        To : 'sakshisj1607@gmail.com',
        From : document.getElementById("email").value,
        Subject : "New Contact Form Enquiry",
        Body : "Name: " + document.getElementById("name").value
        + "<br> Email: " + document.getElementById("email").value
        + "<br> Phone no: " + document.getElementById("phone").value
        + "<br> Message: " +  document.getElementById("message").value 
    }).then(
      message => alert("Message Sent Succesfully")
    );

}

//Captcha 

let sendButton = document.getElementById("send-button");
let userInput = document.getElementById("user-input");
let canvas = document.getElementById("canvas");
let reloadButton = document.getElementById("reload-button");
let text = "";

//Generate text
const textGenerator = () => {
    
    let generatedText = "";
    /* String.fromCharCode gives ASCII value from a given number */
    // total 9 letters hence a loop of 3

    for(let i = 0; i < 3; i++){

        // 65-90 numbers are capital letters
        generatedText += String.fromCharCode(randomNumber(65, 90));

        // 97-122 are small letters
        generatedText += String.fromCharCode(randomNumber(97, 122));

        // 48-57 are numbers from 0-9
        generatedText += String.fromCharCode(randomNumber(48, 57));

    }

    return generatedText;

};

// Generate random numbers
const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min ;

// Canvas part
function drawStringOnCanvas(string) {

    // the getContext() function returns the drawing context that has all the drawing properties and functions needed to draw on canvas
    let ctx = canvas.getContext("2d");

    // clear canvas
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // array of text color
    const textColors = ["rgb(0, 0, 0)", "rgb(130, 130, 130)"];

    // space between letters
    const letterSpace = 150 / string.length;

    // loop through string
    for(let i = 0; i < string.length; i++){

        // define initial space on X axis
        const xInitialSpace = 30;

        // set font for canvas element
        ctx.font = "20px Roboto Mono";

        // set text color 
        ctx.fillStyle = textColors[randomNumber(0, 1)];
        ctx.fillText(
            string[i], xInitialSpace + i * letterSpace, randomNumber(25, 40), 100
        );

    }

};

// Initial Function
const triggerFunction = () => {

    // clear Input
    userInput.value = "";
    text = textGenerator();

    // Randomize the text so that everytime the position of numbers and letters get changed
    text = [...text].sort(() => Math.random() - 0.5).join("");
    drawStringOnCanvas(text);

};

// call triggerFunction for reload button
reloadButton.addEventListener("click", triggerFunction);

// call triggerFunction when page loads
window.onload = () => triggerFunction();

// When user clicks on send 
sendButton.addEventListener("click", () => {

    // check if user input == generatedText
    if(userInput.value === text){
        sendEmail();
        alert("Success");
    }

    else{
        alert("Incorrect");
        triggerFunction();
    }

});
