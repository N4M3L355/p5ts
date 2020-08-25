export {}

let { sum, modulo } = require("../library");



let sketch = (p5: any): void => {

  let fft: typeof p5.Vector[];
  p5.setup = (): void => {
    p5.randomSeed(0);
    p5.noiseSeed(0);
    p5.angleMode(p5.DEGREES);
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.colorMode(p5.HSB);

    let bgColor = p5.color("#f9f8f4");
    p5.background(bgColor);

    console.log(p5);
    fft = new p5.FFT();

    p5.fft();
    let waveform = fft.waveform();
    console.log(waveform);
    console.log(waveform);




  };

  p5.draw = (): void => {
    fft.analyze();

  };

  p5.windowResized = function() {
    //p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    //p5.background(0);
  };
}

require("p5");
require("p5/lib/addons/p5.sound");

(P5=>new P5(sketch))(p5);
