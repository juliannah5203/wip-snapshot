
/* exported p4_inspirations, p4_initialize, p4_render, p4_helperate */

// https://cdn.britannica.com/45/5645-050-B9EC0205/head-treasure-flower-disk-flowers-inflorescence-ray.jpg
// https://www.gardendesign.com/pictures/images/675x529Max/site_3/asiatic-lily-cappuccino-lily-creative-commons_11653.jpg
// https://www.gardeningknowhow.com/wp-content/uploads/2019/11/red-rose-1024x678.jpg


  
function sceneChanger() {
    let inspiration = [];
  
    inspiration[0] = {
          name: "Yellowstone National Park",
          assetUrl: "./assets/yellowstone.png"
      };
    inspiration[1] = {
          name: "Yosemite National Park",
          assetUrl: "./assets/yosemite.png"
      };
    inspiration[2] = {
          name: "Grand Canyon National Park",
          assetUrl: "./assets/grandcanyon.png"
      };
      inspiration[3] = {
        name: "Lake Tahoe",
        assetUrl: "./assets/laketahoe.png"
    };
    inspiration[4] = {
        name: "Niagara Falls",
        assetUrl: "./assets/niagarafalls.png"
    };
   
  
      return inspiration;
  }
  function weatherChanger() {
    let weather = [];
  
    weather[0] = {
          name: "Sunny"
      };
    weather[1] = {
          name: "Rainy"
      };
    weather[2] = {
          name: "Cloudy"
      };
    weather[3] = {
        name: "Foggy"
    };
    weather[4] = {
        name: "Snowy"
    };
   
  
      return weather;
  }
  function timeChanger() {
    let time = [];
  
    time[0] = {
        name: "Dawn"
      };
    time[1] = {
        name: "Morning"
      };
    time[2] = {
        name: "Midday"
      };
    time[3] = {
        name: "Afternoon"
    };
    time[4] = {
        name: "Dusk"
    };
   
  
      return time;
  }
  function p4_initialize(inspiration) {
    
      let initial = {};
      resizeCanvas(inspiration.image.width/2, inspiration.image.height/2);
      if (inspiration.name == "daisy"){
        initial = {type: "daisy", opacity:{min: 0.1, max: 1}, intervals: 10};    
      }
    
      if (inspiration.name == "lily"){
        initial = {type: "lily", opacity:{min: 0.1, max: 1}, intervals: 10};    
      }
    
      if (inspiration.name == "rose"){
        initial = {type: "rose", opacity:{min: 0.1, max: 1}, intervals: 10};    
      }
  
      return initial;
  }
  
  function p4_render(design, inspiration) {
    push();
    background(0);
    noStroke();
    scale(0.5);
    let xStep = inspiration.image.width / design.intervals;
    let yStep = inspiration.image.height / design.intervals;
    let xCoor = 0;
    let yCoor = 0;
    for (let i = 0; i < design.intervals; i++){
      yCoor = 0;
      for (let j = 0; j < design.intervals; j++){
        
        for (let n = 0; n < random(5,20); n++){
          let pxColor = inspiration.image.get(xCoor+xStep, yCoor+yStep);
          pxColor[4] = random(design.opacity.min, design.opacity.max);
          fill(pxColor);
          square(random(xCoor, xCoor+xStep), random(yCoor, yCoor+yStep), random(7,12));
        }
        yCoor += yStep;
      }
      xCoor += xStep;
    }
    pop();

  }

  
  function opaController(param, mx, rate){
    param.max = rate*param.max;
    if(param.max < 0.3){
      param.max = 0.3 + random(min(rate*param.max,mx));
      param.min = 0.1;
    }
    return param;
  }
  function intController(mn, mx, rate){
    return random(rate*mn, rate*mx);
  }
  
  function p4_mutate(design, inspiration, rate) {

    design.opacity = opaController(design.opacity, 1, rate);
    design.intervals = intController(10, 50, rate);

    
  
  }
  
  