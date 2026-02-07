function move(){
  let arenaRadius = 180; // half of arena width/height
  let flagW = 40;
  let flagH = 26;
  let r = arenaRadius - Math.max(flagW, flagH)/2 - 6; // 6 is border width
  let cx = arenaRadius;
  let cy = arenaRadius;

  nodes.forEach((el,i)=>{
    let a = Date.now()/(1000/speed) + i*2*Math.PI/nodes.length;
    el.style.left = cx + r*Math.cos(a) - flagW/2 + "px";
    el.style.top  = cy + r*Math.sin(a) - flagH/2 + "px";
  });
}
const battleBtn = document.getElementById("battleBtn");

let moveInt = null;
let outInt = null;
let running = false; // track battle state

battleBtn.onclick = () => {
  if(!running){
    // Start battle
    running = true;
    battleBtn.innerText = "Pause Battle";

    // Start moving flags
    moveInt = setInterval(move, 40);

    // Start eliminating flags
    outInt = setInterval(() => {
      if(active.length <= 1){
        clearInterval(outInt);
        clearInterval(moveInt);
        running = false;
        battleBtn.innerText = "Restart Battle";
        document.getElementById("winner").innerText =
          "🏆 Winner: " + active[0].name;
        return;
      }
      active.splice(Math.floor(Math.random()*active.length),1);
      draw();
    }, 1500);
  } else {
    // Pause battle
    running = false;
    battleBtn.innerText = "Resume Battle";
    clearInterval(moveInt);
    clearInterval(outInt);
  }
};

// Optional: Restart battle when all flags are gone
battleBtn.addEventListener("click", () => {
  if(active.length <= 1 && !running){
    active = [...countries];
    draw();
    document.getElementById("winner").innerText = "";
  }
});


