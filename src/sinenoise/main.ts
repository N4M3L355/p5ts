export {};
let { sum, modulo, noiseNormalizer } = require("../library");

module.exports = (p5: any): void => {
  p5.setup = (): void => {
    //p5.randomSeed(0);
    //p5.noiseSeed(0);
    p5.angleMode(p5.DEGREES);
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.colorMode(p5.HSB);

    let bgColor = p5.color("#f9f8f4");
    p5.background(bgColor);
    //p5.strokeWeight(2);
    p5.stroke(0,0,0,1);
    p5.noFill();

    let nnoise = (...args:number[]) => noiseNormalizer(p5.noise(...args))
    //let nnoise = p5.noise;

    Array(1).fill(0).map((_,j)=>{
      p5.beginShape();
      Array(1024).fill(0).map((x,i,{length}) => {
        let noise = p5.createVector(0,p5.map(Math.asin(p5.map(nnoise(j*57/17+1/length*i*8,1/length*i*8),0,1,-1,1)),-Math.PI/2, Math.PI/2, 0,1));
        let sine = p5.createVector(0,p5.map(Math.sin(1/length*i*2*Math.PI*4),-1,1,0,1));
        let start = p5.createVector(1/length*i*p5.width,0);

        p5.vertex(...start.add(noise.add(sine).mult(1/4).mult(p5.height)).array()); //TODO: TOTO JE UGH S TYM "..."
      })
      p5.endShape();
    })


  };

  p5.draw = (): void => {

  };

  p5.windowResized = function() {
    //p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    //p5.background(0);
  };
}


