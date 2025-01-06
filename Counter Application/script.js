const inc = document.getElementById("increment")
const dec = document.getElementById("decrement")
const rst = document.getElementById("reset")
var cnt = document.getElementById("count")
console.log(cnt.innerHTML);

function increment(){
    cnt.innerHTML++;
    console.log(cnt.innerHTML);
}
function decrement(){
    cnt.innerHTML--;
    console.log(cnt.innerHTML);
}
function reset(){
    cnt.innerHTML='0';
    console.log(cnt.innerHTML);
}