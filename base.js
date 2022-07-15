/* exported preload, setup, draw */
/* global memory, dropper, restart, rate, slider, activeScore, bestScore, fpsCounter */
/* global p4_inspirations, p4_initialize, p4_render, p4_mutate */

let bestDesign;
let currentDesign;
let currentScore;
let currentInspiration;
let currentCanvas;
let currentInspirationPixels;

function preload() {
  

  let allInspirations = sceneChanger();

  for (let i = 0; i < allInspirations.length; i++) {
    let insp = allInspirations[i];
    insp.image = loadImage(insp.assetUrl);
    let option = document.createElement("option");
    option.value = i;
    option.innerHTML = insp.name;
    scene.appendChild(option);
  }
  scene.onchange = e => inspirationChanged(allInspirations[e.target.value]);
  currentInspiration = allInspirations[0];

  confirmButton.onclick = () =>
    inspirationChanged(allInspirations[scene.value]);

    let allWeathers = weatherChanger();

    for (let i = 0; i < allWeathers.length; i++) {
      let insp = allWeathers[i];
    //   insp.image = loadImage(insp.assetUrl);
      let option = document.createElement("option");
      option.value = i;
      option.innerHTML = insp.name;
      weather.appendChild(option);
    }
    // time.onchange = e => timeChanged(allTimes[e.target.value]);
    // currentTime = allTimes[0];
  
    // confirmButton.onclick = () =>
    //   timeChanged(allTimes[time.value]);

    let allTimes = timeChanger();

    for (let i = 0; i < allTimes.length; i++) {
      let insp = allTimes[i];
    //   insp.image = loadImage(insp.assetUrl);
      let option = document.createElement("option");
      option.value = i;
      option.innerHTML = insp.name;
      time.appendChild(option);
    }
    // time.onchange = e => timeChanged(allTimes[e.target.value]);
    // currentTime = allTimes[0];
  
    // confirmButton.onclick = () =>
    //   timeChanged(allTimes[time.value]);


}

function inspirationChanged(nextInspiration) {
  currentInspiration = nextInspiration;
  currentDesign = undefined;
  memory.innerHTML = "";
  setup();
}
// function timeChanged(nextTime) {
//     currentTime = nextTime;
//     currentDesign = undefined;
//     memory.innerHTML = "";
//     setup();
//   }



function setup() {
  currentCanvas = createCanvas(width, height);
  currentCanvas.parent(document.getElementById("active"));
  currentScore = Number.NEGATIVE_INFINITY;
  currentDesign = p4_initialize(currentInspiration);
  bestDesign = currentDesign;
  image(currentInspiration.image, 0,0, width, height);
  loadPixels();
  currentInspirationPixels = pixels;
}

function evaluate() {
  loadPixels();

  let error = 0;
  let n = pixels.length;
  
  for (let i = 0; i < n; i++) {
    error += sq(pixels[i] - currentInspirationPixels[i]);
  }
  return 1/(1+error/n);
}



function memorialize() {
  let url = currentCanvas.canvas.toDataURL();

  let img = document.createElement("img");
  img.classList.add("memory");
  img.src = url;
  img.width = width;
  img.heigh = height;
  img.title = currentScore;

  document.getElementById("best").innerHTML = "";
  document.getElementById("best").appendChild(img.cloneNode());

  img.width = width / 2;
  img.height = height / 2;

  memory.insertBefore(img, memory.firstChild);

  if (memory.childNodes.length > memory.dataset.maxItems) {
    memory.removeChild(memory.lastChild);
  }
}

let mutationCount = 0;

function draw() {
  
  if(!currentDesign) {
    return;
  }
  randomSeed(mutationCount++);
  currentDesign = JSON.parse(JSON.stringify(bestDesign));
  rate.innerHTML = slider.value;
  p4_mutate(currentDesign, currentInspiration, slider.value/100.0);
  
  randomSeed(0);
  p4_render(currentDesign, currentInspiration);
  let nextScore = evaluate();
  activeScore.innerHTML = nextScore;
  if (nextScore > currentScore) {
    currentScore = nextScore;
    bestDesign = currentDesign;
    memorialize();
    bestScore.innerHTML = currentScore;
  }
  
  fpsCounter.innerHTML = Math.round(frameRate());
}