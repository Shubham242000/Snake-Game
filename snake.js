
const gamebox = document.getElementById("gamebox");
const resetBtn = document.getElementById("reset");
const score = document.getElementById("score")
const points = document.getElementById("points")

let currentPoints = []

let snake = [2,1,0];
let squares = [];
const width = 10;
let direction = 1
let apple=0;
let frog=0
let currentScore = 0;
let cookie=0;
let intervalTime = 1000


// localStorage.setItem("highestScore",JSON.stringify(highestScore))


for(let i = 1;i <= 100; i++){
    let div = document.createElement("div");
    div.classList.add("div")
    gamebox.append(div)
    squares.push(div)
}
// console.log(squares)

/* 
    🍪
    cookie increases speed of snake

*/




let timerid = setInterval(move,intervalTime);;

function generateGoodies(){
    squares[apple].classList.remove('apple');
    squares[cookie].classList.remove('cookie');
    squares[apple].innerHTML = "";
    squares[cookie].innerHTML = "";
    cookie = Math.floor(Math.random()*99) + 1;
    squares[cookie].innerHTML = "🍪";
    squares[cookie].classList.add('cookie');
    apple = Math.floor(Math.random()*99) + 1;
    squares[apple].classList.add('apple')
    squares[apple].innerHTML = "🍎";
    squares[frog].innerHTML = "";
    frog =  Math.floor(Math.random()*99) + 1;
    squares[frog].innerHTML = "🐸";
    squares[frog].classList.add('frog')
}


function renderGame(){
    intervalTime = 1000
    direction = 1
    clearInterval(timerid);
    timerid = setInterval(move,intervalTime)
    snake.forEach(element => {
        squares[element].classList.add("snake")
    });
   generateGoodies();
}

renderGame();


function resetGame(){
    for(let i=0;i<width*width;i++){
        squares[i].innerHTML = "";
        squares[i].classList.remove('head');
        squares[i].classList.remove('snake');
        squares[i].classList.remove('frog')
        squares[i].classList.remove('apple');
        squares[i].classList.remove('cookie');
    }
    points.innerHTML = "<h2>Your Scores :</h2>"
    // console.log(squares)
    currentPoints.push(currentScore);
    let str = ``;
    for(let i=0;i<currentPoints.length;i++){
        str += `<ul>
                    <li>${currentPoints[i]}</li>
                `
    }
    points.innerHTML += str;
    currentScore = 0;
    score.textContent = "Score : 0"
    snake = [2,1,0];
    renderGame();
}

resetBtn.addEventListener("click",resetGame);


function increaseLength(tail){
    // snake.unshift((snake[0] + direction));
    // squares[snake[1]].classList.remove("head")
    // squares[snake[1]].innerHTML = ""
    // squares[snake[0]].classList.add("snake")
    // squares[snake[0]].classList.add("head")
    // squares[snake[0]].innerHTML = "<h3>Head</h3>"
    squares[tail].classList.add('snake')
    snake.push(tail)
}

function move(){
    let tail = snake.pop();
    squares[tail].classList.remove('snake')

    if (
        (snake[0] + width >= width*width && direction === width) || //if snake has hit bottom
        (snake[0] % width === width-1 && direction === 1) || //if snake has hit right wall
        (snake[0] % width === 0 && direction === -1) || //if snake has hit left wall
        (snake[0] - width < 0 && direction === -width)  //if snake has hit top
        
    )
    {
        // clearInterval(timerid); 
        alert('You have hit the Wall!'); 
        resetGame();
        return;
    }


    if(snake[0] + direction === frog){
        alert("You ate the poisonous Frog!")
        resetGame();
        // clearInterval(timerid);
        return;
    }
    

    if(snake[0] + direction === cookie){
        currentScore += 30;
        score.textContent = "Score : " + currentScore;
        // snake.unshift((snake[0] + direction));
        // squares[snake[1]].classList.remove("head")
        // squares[snake[1]].innerHTML = ""
        // squares[snake[0]].classList.add("snake")
        // squares[snake[0]].classList.add("head")
        // squares[snake[0]].innerHTML = "<h3>Head</h3>"
        clearInterval(timerid)
        intervalTime *= 0.7;
        timerid = setInterval(move,intervalTime);
        generateGoodies();
        
    }


    if((snake[0] + direction) === apple){ 

        //updating the Score
        currentScore += 20;
        score.textContent = "Score : " + currentScore;

        increaseLength(tail);
        
        generateGoodies();
        
    }
    
    if(snake.includes(snake[0] + direction)) {
        alert("You just ate yourself!");
        // clearInterval(timerid)
        // clearInterval(timerid);
        resetGame();
        return;
    }
    snake.unshift((snake[0] + direction));
    squares[snake[1]].classList.remove("head")
    squares[snake[1]].innerHTML = ""
    squares[snake[0]].classList.add("snake")
    squares[snake[0]].classList.add("head")
    squares[snake[0]].innerHTML = "<h3>Head</h3>"
}


document.addEventListener('keydown',function(event){
    if(event.key == "ArrowRight") 
        direction = 1;
    else if(event.key == "ArrowLeft")
        direction = -1
    else if(event.key == "ArrowDown")
        direction = width;
    else if(event.key == "ArrowUp")
        direction = -width;
    move();
})

