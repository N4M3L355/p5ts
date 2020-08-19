export {}

let { sum, modulo, noiseNormalizer, sinCycle } = require("../library");

module.exports = (p5: any): void => {
  let points: typeof p5.Vector[];
  let noise = (...args:number[]) => noiseNormalizer(p5.noise(...args))
  p5.setup = (): void => {
    let seed:number = 203833//Math.floor(Math.random()*(2**20));
    console.log(seed);
    p5.randomSeed(seed);
    p5.noiseSeed(seed);
    p5.noiseDetail(4,0.5);
    p5.angleMode(p5.DEGREES);
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.colorMode(p5.HSB);
    p5.stroke(0,0,0,0.2);

    let bgColor = p5.color("#f9f8f4");
    p5.background(bgColor);

    points = [{
      point:p5.createVector(p5.width / 2, p5.height / 2),
      frameCount: 0
    }];


  };
  let pointLimit = 256;
  p5.draw = (): void => {
    points.map(({ point }) => {
      let jitter = p5.createVector(p5.map(p5.random(),1/2,1,0,1),p5.map(p5.random(),1/2,1,0,1/2));
      p5.point(point.copy().add(jitter));
    });
    points.forEach(({point,frameCount},index) => {
      let vec = p5.createVector(1);
      let [x,y] = point.array();
      x = x/p5.width;
      x = (sinCycle(x)+sinCycle(x,1/4))/2;
      x = x*p5.width;
      y = y/p5.height;
      y = (sinCycle(y)+sinCycle(y,1/4))/2;
      y = y*p5.height;
      let z = (sinCycle(index/pointLimit)+sinCycle(index/pointLimit,1/4))/2/4;
      vec.rotate(
        p5.map(noise(frameCount*p5.frameCount/65536,x/512,y/512),0,1,0,360*3));
      point.add(vec).add(p5.width,p5.height).rem(p5.width,p5.height);

    });
    if(p5.frameCount%30===0){
      points.push({frameCount: p5.frameCount,point:points[0].point.copy()})
    }
  };

  p5.windowResized = function() {
    //p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    //p5.background(0);
  };
};
