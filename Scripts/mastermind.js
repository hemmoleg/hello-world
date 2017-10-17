// Implmentation of Game MasterMind

document.addEventListener("DOMContentLoaded", dokumentGeladen, false);

function dokumentGeladen(e) {
    //alert("Event: " + e.type + " - jetzt kann Mastermind initialisiert werden.")
}

var code = [];
var code2 = [0,0,0,0,0,0,0];
var triesLeft = 0;
var currentRow;

window.onload = function () 
{   
    //newGame();
    ////////////////////
    //enable btnCheck only if all colors are set
    /////////////////////
    
    document.getElementById("check").addEventListener("click", checkInput);
    //document.getElementById("check").disabled = false;
    
    document.getElementById("new").addEventListener("click", newGame);
}

function newGame()
{
    reset();
    triesLeft = 10;
    generateNewCode();

    //document.getElementById("check").disabled = false;
    
    //show generated code and set values
    document.getElementById("pinGen1").classList = getClassByCode(code[0]);
    document.getElementById("pinGen2").classList = getClassByCode(code[1]);
    document.getElementById("pinGen3").classList = getClassByCode(code[2]);
    document.getElementById("pinGen4").classList = getClassByCode(code[3]);

    for(var i = 0; i < 4; i++)
    {
        code2[code[i]]++;        
        console.log(code2);
    }
    
    //enable first row
    for(var i = 0; i < 4; i++)
    {    
       var pin = document.getElementById("pin".concat(triesLeft).concat(i+1));
        pin.addEventListener("click", changeColorAndValue);
        pin.style.cursor = "pointer";
    }
    currentRow = document.getElementById("row".concat(triesLeft));
}

function nextTurn()
{
    for(var i = 0; i < 4; i++)
    {    
       var pin = document.getElementById("pin".concat(triesLeft).concat(i+1));
        pin.removeEventListener("click", changeColorAndValue);
        pin.style.cursor = "auto";
    }
    
    triesLeft--;
    currentRow = document.getElementById("row".concat(triesLeft));
    
    for(var i = 0; i < 4; i++)
    {    
       var pin = document.getElementById("pin".concat(triesLeft).concat(i+1));
        pin.addEventListener("click", changeColorAndValue);
        pin.style.cursor = "pointer";
    }  
}

function generateNewCode()
{
    for(var i = 0; i < 4; i++)
    {
        code[i] = Math.floor(Math.random() * 6) + 1;
    }
    console.log(code);
}

function changeColorAndValue(event)
{      
    pin = event.target;
    if(pin.getAttribute("data-code") != null)
    {
        var val = parseInt(pin.getAttribute("data-code")) + 1;
        if(val > 6)
            pin.setAttribute("data-code", 1);
        else    
            pin.setAttribute("data-code", val);            
    }
    else
    {
        pin.setAttribute("data-code", 1);
    }
    
    pin.classList = [getClassByCode(pin.getAttribute("data-code"))];

    checkInputForEnableBtnCheck();
}

function checkInputForEnableBtnCheck()
{
    for(var i = 0; i < 4; i++)
    {
        if(currentRow.children[i].getAttribute("data-code") == null)
            return;
    }
    document.getElementById("check").disabled = false;
}

function checkInput()
{   
    var input = [];
    var tempCode2 = code2;
    var blackPins = 0;
    var grayPins = 0;
    for(var i = 0; i < 4; i++)
    {
        input[i] = currentRow.children[i].getAttribute("data-code");
    }
    
    console.log("input " + input);
    
    for(var i = 0; i < 4; i++)
    {
        if(input[i] == code[i])
        {
            //black pin
            tempCode2[input[i]]--;
            blackPins++;
            continue;
        }
    }
    
    for(var i = 0; i < 4; i++)
    {
        if(tempCode2[input[i]] > 0)
            {
                //gray pin        
                tempCode2[input[i]]--;
                grayPins++;
            }
    }
    console.log("back pins: " + blackPins + " " + "gray pins: " + grayPins);
    
    //show result;
    var resultGrid = currentRow.children[4];
    for(var i = 0; i < 4; i++)
    {
        if(blackPins > 0)
        {
            resultGrid.children[i].classList = ["correctPosition"];
            blackPins--;
            continue;
        }
        if(grayPins > 0)
        {
            resultGrid.children[i].classList = ["correctColor"];
            grayPins--;    
        }
    }
    
    if(blackPins == 4)
    {
        gameWon();
        return;
    }
    
    //check next turn
    if(triesLeft > 1)
    {
        nextTurn();
    }
    else
    {
        document.getElementById("check").disabled = false;
    }
    
}

function reset()
{
    for(var i = 1; i <= 10; i++)
    {
        for(var j = 1; j <= 4; j++)
        {
            document.getElementById("pin".concat(i).concat(j)).classList = [];
            document.getElementById("pin".concat(i).concat(j)).removeEventListener("click", changeColorAndValue);
            document.getElementById("pin".concat(i).concat(j)).style.cursor = "auto";
            document.getElementById("result".concat(i).concat(j)).classList = [];
        }
    }
}

function gameWon()
{
    //game won -> disable current row
    for(var i = 0; i < 4; i++)
    {    
       var pin = document.getElementById("pin".concat(triesLeft).concat(i+1));
        pin.removeEventListener("click", changeColorAndValue);
        pin.style.cursor = "auto";
    }
    document.getElementById("check").disabled = true;
}

function getClassByCode(value)
{
    return "pinCode".concat(value);
}