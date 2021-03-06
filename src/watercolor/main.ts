export {};

let P5 = require("p5");
const { sum, modulo } = require("../library");

let main = (p5: any): void => {
  p5.setup = (): void => {
    p5.pixelDensity(2);
    p5.randomSeed(0);
    p5.noiseSeed(0);
    p5.angleMode(p5.DEGREES);
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.colorMode(p5.HSB);

    /*fill(234, 31, 81);noStroke();rect(50, 50, 250, 250);fill(255);textStyle(BOLD);textSize(140);text("p5*", 60, 250);*/
    let bgColor = p5.color("#f9f8f4");
    p5.background(bgColor);

    let blob = (center: any, fillColor: any) => {

      p5.fill(p5.color(fillColor.h, fillColor.s, fillColor.b, fillColor.a));
      p5.noStroke();
      let n = 8;
      let radius = p5.createVector(200, 0);
      let polygon = Array(n).fill(0).map(() => radius.rotate(360 / n).copy());
      //let polygon = [[-500,100], [500,100], [500,-100], [-500,-100]].map(([x,y]) => p5.createVector(x,y))
      let f = (coef: number = 1 / 2) => (d: any) => (p5.random() * d * coef);

      deformPolygon(polygon, f(7 / 8), 3);
      Array(64)
        .fill(0)
        .forEach(() => {
          let p = polygon.map((x) => x.copy());

          deformPolygon(p, f(1 / 2), 4);

          p5.fill(p5.color(fillColor.h + (p5.random() - 1 / 2) * 16, fillColor.s + (p5.random() - 1 / 2) * 32, fillColor.b + (p5.random() - 1 / 2) * 32, fillColor.a));
          p5.beginShape();
          p.forEach((v) => {
            let jitter = p5.createVector((p5.random() - 1 / 2) * 4, 0).rotate(p5.random() * 360);
            p5.vertex(...v.copy().add(center).add(jitter).array());
          });
          p5.endShape();
        });

    };


    const splitPolygonEdge = (
      polygon: any[],
      index: number,
      f: (n: number) => number
    ) => {
      let first = polygon[index];
      let second = polygon[modulo(index + 1, polygon.length)];
      let diff = first.copy().sub(second);
      let spread = p5.createVector(f(diff.mag()), 0).rotate(diff.heading()).rotate(p5.random(0 - (1 / 16) * 360, 180 + (1 / 16) * 360));

      let midpoint = first.copy().lerp(second, 0.5).add(spread);
      polygon.splice(index + 1, 0, midpoint);
    };
    let deformPolygon = (polygon: any[], f: (n: number) => number, n = 1) => {
      for (let i = 0; i < n; i++) {
        let l = polygon.length;
        polygon.forEach((_: any, i: number) =>
          splitPolygonEdge(polygon, l - i - 1, f)
        );
      }
    };
    blob(p5.createVector(p5.windowWidth / 4, p5.windowHeight / 2), { h: -15, s: 90, b: 90, a: 1 / 32 });
    blob(p5.createVector(p5.windowWidth / 4*2, p5.windowHeight / 2), { h: 20, s: 90, b: 90, a: 1 / 32 });
    blob(p5.createVector(p5.windowWidth / 4*3, p5.windowHeight / 2), { h: 40, s: 90, b: 90, a: 1 / 32 });

    p5.loadPixels();


    let memory = new Uint8ClampedArray(p5.pixels);
    let d = p5.pixelDensity();
    let type = ["r", "g", "b", "a"];

    let fx = (val: number, type: string, w: number, h: number): number => {
      if (type !== "a") return val;
      return val * (p5.noise(w / 64, h / 64) * 1 / 8 + 7 / 8);
    };
    for (let i = 0; i < memory.length; i++) {
      let w = (Math.floor(i / 4) % (p5.width * d)) / d;
      let h = Math.floor(i / 4 / (p5.width * d)) / d;
      memory[i] = fx(memory[i], type[i % 4], w, h);
    }
    p5.background(bgColor);

    let copyPixels = (from: Uint8ClampedArray, pixels: Uint8ClampedArray) =>
      from.forEach((x, i) => (pixels[i] = x));

    copyPixels(memory, p5.pixels);

    p5.updatePixels();


  };

  p5.draw = (): void => {
  };

  p5.windowResized = function() {
    //p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    //p5.background(0);
  };
}



new P5(main);