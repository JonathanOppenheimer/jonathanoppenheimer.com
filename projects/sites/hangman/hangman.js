window.onload = function () 
{
    setDate();
}
var word = "";
var guess = "";
var letter_guess = "";
var bad_guesses = "";
var length = 0; 


function wordEnter() 
{
    word = document.getElementById("word_enter").value;
    var element = document.getElementById("word_input");
    element.style.display="none";
    var length = word.length;

    for(var i=0; i<length; i++)
    {
        guess = guess + "_";
    }
    document.getElementById("textbox").innerHTML = guess;
}

function letterGuess()
{
    letter_guess = document.getElementById("letter_enter").value;
    if(word.includes(letter_guess))
    {
        var list = guess.split("");
        for(var i=0; i<word.length; i++)
        {
            if(word.charAt(i) == letter_guess)
            {
                list[i] = letter_guess;      
            }
        }
        guess=list.join("");
    }
    else
    {
        bad_guesses = bad_guesses + letter_guess;
    }

    document.getElementById("textbox").innerHTML = guess;
    document.getElementById("letter_enter").value = "";
    document.getElementById("bad_guesses").innerHTML = bad_guesses;

    if(guess==word)
    {
        alert("You won!");
        window.stop();
    }
}
