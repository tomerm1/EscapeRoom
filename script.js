var btns = document.querySelectorAll(".real");
var pass = document.querySelector(".til h1");
walls = [document.querySelectorAll(".wall-end"),document.querySelectorAll(".corner__wall--extra-2"),document.querySelectorAll(".wall"),document.querySelectorAll(".corner__wall"),document.querySelectorAll(".corner__wall--extra-1")]
const dungeonSkins = [['url("src/wall-bricks-new.png")', "linear-gradient(to bottom, #383838 0%, #383838 50%, #707070 50%)", "#383838"], ['url("src/wall-bricks-new2.png")', "linear-gradient(to bottom, #79a3aa 0%, #79a3aa 50%, #487f88 50%)", "#79a3aa"],
['url("src/ab.jpg")',"linear-gradient(to bottom, #5c5151 0%, #5c5151 50%, #4b4949 50%)","#5c5151"],['url("src/ping.jpg")',"linear-gradient(to bottom, #fdcfd5 0%, #fdcfd5 50%, #fdcfd5 50%)","#fdcfd5"], ['url("src/des.jpg")',"linear-gradient(to bottom, #c4b2a0 0%, #c4b2a0 50%, #dfd0c1 50%)", "#c4b2a0"],['url("src/nur.jpg")',"linear-gradient(to bottom, #fabcaf 0%, #fabcaf 50%, #fcccb3 50%)","#fabcaf"]];


const numberOfDigits = 4;
var arrayOfOp = [];
var arrayOfGuess = [];
var arrayOfGuessBtn = [];
let randomNumber;
let canAction = false;
let trueCode;
let i;
let randomPac;
let roundCounter = 0;
function setUpGame()
{
  btns = document.querySelectorAll(".real");
  pass = document.querySelector(".til h1");
  arrayOfGuessBtn = [];
  arrayOfOp = [];
  arrayOfGuess = [];
  
  for(i = 1; i<= numberOfDigits; i++)
  {
    randomNumber = Math.floor(Math.random() * (9)) + 1;
    do
    {
      randomNumber = Math.floor(Math.random() * (9)) + 1;
    }while(arrayOfOp.includes(randomNumber))

    arrayOfOp.push(randomNumber);
    
  }
  console.log(arrayOfOp);
  pass.innerText = "";
  pass.style.color = "rgb(255, 255, 255)";
  btns.forEach((element) => {  
    element.querySelector(".n").classList.remove("p");
    element.querySelector(".n").classList.remove("r");

  })
  
  canAction = true;

  btns.forEach(element => {
    element.addEventListener("click", ()=>{
      if (canAction)
        writeNumber(element, element.innerText);

    })
  });

  walls = [document.querySelectorAll(".wall-end"),document.querySelectorAll(".corner__wall--extra-2"),document.querySelectorAll(".wall"),document.querySelectorAll(".corner__wall"),document.querySelectorAll(".corner__wall--extra-1")]

  randomPac = Math.floor(Math.random()*dungeonSkins.length);
  walls.forEach((wall) =>{
    wall.forEach((w)=>{
      w.style.background = dungeonSkins[randomPac][0];
    })
  })
  document.querySelector(".corner-right > .corner .corner__roof").style.background = dungeonSkins[randomPac][2];
  document.querySelector(".container").style.background = dungeonSkins[randomPac][1];

  roundCounter ++;
  document.querySelector(".noteped").innerHTML = "<h1>Round "+roundCounter+"</h1>"
  

}


var html, container, sections;

function init() {
  container = document.querySelector('.container');
  sections = document.querySelectorAll('.section');
  html = container.innerHTML;
  
  setTimeout(function(){
    container.classList.add('travel');
    container.querySelector(".section--" + (sections.length - 3)).addEventListener("transitionend", function() {
      reset();
    }, false);
    
  }, 50);
}

function reset() {
  container.classList.remove('travel');
  container.innerHTML = html;
  setUpGame();
}

  







function writeNumber(ele, number)
{

  
  
  if (!arrayOfGuess.includes(+number))
  {
    
    arrayOfGuessBtn.push(ele);
    arrayOfGuess.push(+number);
    
    pass.innerText += "*";

    if (arrayOfGuess.length === arrayOfOp.length)
    {
      
      trueCode = true;

      btns.forEach((nBtn)=>{
        nBtn.querySelector(".n").classList.remove("p");
      })

      arrayOfGuess.forEach((guess, ind) => {

        
        if (arrayOfOp[ind] === guess){
          arrayOfGuessBtn[ind].querySelector(".n").classList.add("r")
          arrayOfGuessBtn[ind].querySelector(".n").classList.add("p")
        }
        else if(arrayOfOp.includes(guess))
        {
          trueCode = false;
          arrayOfGuessBtn[ind].querySelector(".n").classList.add("r")
        }
        else
          trueCode = false;
        

      })

      


      
      
      arrayOfGuessBtn = [];
      arrayOfGuess = [];
      

      if (!trueCode)
      {

        pass.style.color = "rgb(255, 0, 0)";

        document.querySelector(".mainer").classList.add("apply-shake");
        canAction = false;
        setTimeout(function() {	  
          pass.style.color = "rgb(255, 255, 255)"
          document.querySelector(".mainer").classList.remove("apply-shake");
          pass.innerText = "";
          canAction = true;
        }, 800);  
      }
      else
      {
        pass.style.color = "rgb(0, 255, 0)";

        canAction = false;
        
        
        init();
        setTimeout(function() {	  
          document.querySelector(".noteped").style.transform = "translateY(-1100px)";
          setTimeout(function() {	  
            document.querySelector(".noteped").style.opacity = "0";
            
          }, 1300); 
        }, 1500); 
        

      }

    }
  }
}



setUpGame(); // looping the game :D























