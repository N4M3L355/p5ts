export {}

let { sum, modulo } = require("../library");

module.exports = (p5: any): void => {
  p5.setup = (): void => {
    p5.randomSeed(0);
    p5.noiseSeed(0);
    p5.angleMode(p5.DEGREES);
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.colorMode(p5.HSB);

    let bgColor = p5.color("#f9f8f4");
    p5.background(bgColor);



  };

  p5.draw = (): void => {

  };

  p5.windowResized = function() {
    //p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    //p5.background(0);
  };
}


