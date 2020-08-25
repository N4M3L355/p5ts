let x = require("./src/meniny.json");
let d = new Date();
console.log(`meniny má ${x[d.getMonth()][d.getDate()]}`)

let t = setInterval(() => {
  if(document.getElementById("meniny")){
    document.getElementById("meniny").innerHTML = `meniny má ${x[d.getMonth()][d.getDate()]}`;
    clearInterval(t);
  }
},20) ;