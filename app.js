var $start = document.querySelector('#block_content_button_start');
var $game = document.querySelector('#block_content_game');
var $time = document.querySelector('#time');
var $result = document.querySelector('#result');
var $timeHeader = document.querySelector('#time_header');
var $resultHeader = document.querySelector('#result_header');
var $gameTime = document.querySelector('#game-time');

var colors = ['#aa4b6b', '#3b8d99', '#1f4037', '#99f2c8', '#c31432', '#FF8C00', '#302b63', '#b21f1f', '#EF3B36', '#C33764', '#0082c8'];
var score = 0;
var isGameStarted = false;

$start.addEventListener('click', startGame);
$game.addEventListener('click', handleBoxClick);
$gameTime.addEventListener('input', setGameTime);

function show ($el){
    $el.classList.remove('hidden');
}

function hide ($el){
    $el.classList.add('hidden');
}

function startGame() {
    score = 0;
    setGameTime();
    $gameTime.setAttribute('disabled', 'true');
    isGameStarted = true;
    $game.style.backgroundColor = '#fff';
    hide($start);

    var interval = setInterval(function(){
        var time = parseFloat($time.textContent);
        if(time <= 0){
            clearInterval(interval);
            endGame();
        } else{
            $time.textContent = (time - 0.1).toFixed(1);
        }
    }, 100);

    renderBox();
}

function setGameScore() {
    $result.textContent = score.toString();
}

function setGameTime() {
    var time = +$gameTime.value;
    $time.textContent = time.toFixed(1);
    show($timeHeader);
    hide($resultHeader);
}

function endGame() {
    isGameStarted = false;
    setGameScore();
    $gameTime.removeAttribute('disabled');
    show($start);
    $game.innerHTML = '';
    $game.style.backgroundColor = '#ccc';
    hide($timeHeader);
    show($resultHeader);
}

function handleBoxClick(event) {
    if(!isGameStarted){
        return;
    }

    if(event.target.dataset.box){
        score++;
        renderBox();
    }
}

function renderBox() {
    $game.innerHTML = '';
    var box = document.createElement('div');
    var boxSize = getRandom(20, 90);
    var gameSize = $game.getBoundingClientRect();
    var maxTop = gameSize.height - boxSize;
    var maxLeft = gameSize.width - boxSize;
    var randomColorIndex = getRandom(0, colors.length);

    box.style.height = box.style.width = boxSize + 'px';
    box.style.position = 'absolute';
    box.style.backgroundColor = colors[randomColorIndex];
    box.style.top = getRandom(0, maxTop) + 'px';
    box.style.left = getRandom(0, maxLeft) + 'px';
    box.style.cursor = 'pointer';
    box.setAttribute('data-box', true);

    $game.insertAdjacentElement('afterbegin', box);
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max-min) + min);
}