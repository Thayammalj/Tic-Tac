const boxs=document.querySelectorAll('.box');
const sts=document.querySelector('#status');
const btnRestart=document.querySelector('#restart');
let x="<img src='./x.png'>";
let o="<img src='./o.png'>";

const win=[
[0,1,2],
[3,4,6],
[6,7,8],
[1,4,7],
[2,5,8],
[0,4,8],
[2,4,6]
];
let options=["","","","","","","","",""];
let currentPlayer=x;
let player="X";
let runnig=false;
init();

function init(){
boxs.forEach(box=>box.addEventListener('click',boxClick));
btnRestart.addEventListener('click',restartGame);
sts.textContent=`${player} Your Turn`;
runnig=true;
}

function boxClick(){
 const index=this.dataset.index;
 if(options[index]!=""|| !runnig){
    return;
 }
 updateBox(this,index);
 checkWinner();
}

function updateBox(box,index){
    options[index]=player;
    box.innerHTML=currentPlayer;
}
function restartGame(){

}
function changePlayer(){
     player=(player=='X')?"0":"X";
     currentPlayer=(currentPlayer==x)? o : x;
     sts.textContent=`${player} Your Turn`;
}

function checkWinner(){
    let isWon=false;
    for(let i=0;i<win.length;i++){
        const condition=win[i];//[0,1,2]
        const box1=options[condition[0]];
        const box2=options[condition[1]];
        const box3=options[condition[2]];
        if(box1=="" || box2=="" || box3==""){
            continue;
        }
        if (box1==box2 && box2==box3){
            isWon=true;
            boxs[condition[0]].classList.add('win');
            boxs[condition[1]].classList.add('win');
            boxs[condition[2]].classList.add('win');

        }
}
if(isWon){
    sts.textContent=`!${player} Won...`;
    runnig=false;
}
else if(!options.includes("")){
    sts.textContent=`Game Draw..!`;
    runnig=false;
}else{
    changePlayer();
}
}

function restartGame(){
     options=["","","","","","","","",""];
     currentPlayer=x;
     player="X";
 runnig=true;
 sts.textContent=`${player} Your Turn`;
 boxs.forEach(box=>{
  box.innerHTML="";
  box.classList.remove('win');
 });
}