/*post generation
 this stuff is for after the thing generates everything, should not have null errors

*/
class Population {
    constructor(){
        this.pList = 0; //list of dominant individuals
        this.hList = 0; //list of heterozygous individuals
        this.qList = 0; //list of reccesive individuals
        this.p = 0;
        this.q = 0;
    }
    addP = function(pClass){
        this.pList += pClass;
    }
    addH = function(hClass){
        this.hList += (hClass);
    }
    addQ = function(qClass){
        this.qList += (qClass);
    }
    clear = function(){
        this.pList = 0; //list of dominant individuals
        this.hList = 0; //list of heterozygous individuals
        this.qList = 0; //list of reccesive individuals
    }
    pSize = function(){
        return this.pList;
    }
    hSize = function(){
        return this.hList;
    }
    qSize = function(){
        return this.qList;
    }
    size = function(){
        return this.pSize() + this.hSize() + this.qSize();
    }
    kill = function(dP, hP, qP){
        
    }
    kill = function(l){
        var dP = l[0];
        var hP = l[1];
        var qP = l[2];
        kill(dP, hP, qP);
    }
    naturalSelection = function(l){
        console.log("L L L L L  L LL L L L  L: " + l);
        var dP = l[0];
        var hP = l[1];
        var qP = l[2];
        console.log("dfghufdijsfhids: " + [this.pSize(), this.hSize(), this.qSize()]);
        var pLeft = Math.round(this.pSize() * dP);
        var hLeft = Math.round(this.hSize() * hP);
        var qLeft = Math.round(this.qSize() * qP);
        this.clear();
        console.log("efgfdsdfgfdsdf: " + [pLeft, hLeft, qLeft]);
        console.log("但是我話你知: " + [this.pSize(), this.hSize(), this.qSize()]);
        return [pLeft, hLeft, qLeft];
    }
    ratio = function(){
        var p = Math.sqrt(this.pSize() / this.size());
        var q = 1 - p;
        console.log("ratios: " + p + " | " + q);
        return [p, q];
    }
    getMax = function(){
        var s = this.size();
        return Math.max(p**2 * s, 2*p*q*s, q**2 * s);
    }
    
    setP = function(p){
        this.p = p;
    }
    setQ = function(q){
        this.q = q;
    }
};
const population = new Population();

function drawStuff(pSize, hSize, qSize){
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    var ySpacing = 640 / 10;
    var startingY = 64;
    if (Math.round(pSize / 10) < 7){
        var xSpacing = 64;
    } else{
        var xSpacing = (384 * 10)/ pSize;
    }
    var startingX = 0;
    for (let i = 0; i < pSize; i++){
        if (i % 10 == 0 && i != 0){
            console.log("moving down");
            startingX += xSpacing;
            startingY = 64;
        }
        const pClass = {
            type: 1, //1 is dominant
            image : pImage,
            drawMe : function() {
                ctx = display.canvas.getContext("2d");
                ctx.drawImage(this.image, startingX, startingY);
            }
        };
        //pList.push(pClass);
        population.addP(1);
        pClass.drawMe();
        startingY += ySpacing;

    }
    var ySpacing = 640 / 10;
    var startingY = 64;
    var xSpacing = (384 * 10)/ hSize;
    var startingX = 448-16-8;
    for (let i = 0; i < hSize; i++){
        if (i % 10 == 0 && i != 0){
            console.log("moving down");
            startingX += xSpacing;
            startingY = 64;
        }
        const hClass = {
            type: 0, //0 is heterozygous
            image : hImage,
            drawMe : function() {
                ctx = display.canvas.getContext("2d");
                ctx.drawImage(this.image, startingX, startingY);
            }
        };
        //hList.push(hClass);
        population.addH(1);
        hClass.drawMe();
        startingY += ySpacing;
    }
    var ySpacing = 640 / 10;
    var startingY = 64;
    if (Math.round(qSize / 10) < 10){
        var xSpacing = 64;
    } else{
        var xSpacing = (384 * 10)/ qSize;
    }
    var startingX = 1280-64;
    for (let i = 0; i < qSize; i++){
        if (i % 10 == 0 && i != 0){
            console.log("moving down");
            startingX -= xSpacing;
            startingY = 64;
        }
        const qClass = {
            type: -1, //-1 is recessive
            image : qImage,
            drawMe : function() {
                ctx = display.canvas.getContext("2d");
                ctx.drawImage(this.image, startingX, startingY);
            }
        };
        //qList.push(qClass);
        population.addQ(1);
        qClass.drawMe();
        startingY += ySpacing;
    }
}

function naturalSelection() {
    selection = document.querySelector('#killSelection').value;
    console.log("\n" + selection);
    
    //work here editing dropdown stuffs i guess i mean 12 is a number under 13 therefore by the pythagorean theorem 5 should be outputed. since 5 is prime, prime numbers of prime, so 6 is coprime with 7 because 6 isn't prime and divisble by 7 and 7 is prime and not divisible by 6.
    
    //edit here
    const percentage = [(100-document.getElementById("killPercentageDominant").value)/100, (100-document.getElementById("killPercentageHetero").value)/100, (100-document.getElementById("killPercentageRecessive").value)/100];
    populationSize = document.getElementById("popSize").value;
    
    const sus = population.naturalSelection(percentage);
    
    
    /*
    homodominant = Math.round(populationSize * document.getElementById("hdDisplay").innerHTML/100);
    heterozygous = Math.round(populationSize * document.getElementById("heteroDisplay").innerHTML/100);
    homorecessive = Math.round(populationSize * document.getElementById("hrDisplay").innerHTML/100);
    console.log(document.getElementById("hdDisplay").innerHTML + " " + document.getElementById("heteroDisplay").innerHTML + " " + document.getElementById("hrDisplay").innerHTML);
    console.log(homodominant + " " + heterozygous + " " + homorecessive);
    
    if(selection == "homodominant") {
        console.log("homodominant");
        console.log("before: " + homodominant);
        homodominant *= percentage/100;
        homodominant = Math.floor(homodominant);
        console.log("after: " + homodominant);
    } else if(selection == "hetero") {
        console.log("heterozygous");
        console.log("before: " + heterozygous);
        heterozygous *= percentage/100;
        heterozygous = Math.floor(heterozygous);
        console.log("after: " + heterozygous);
    } else {
        console.log("homorecessive");
        console.log("before: " + homorecessive);
        homorecessive *= percentage/100;
        homorecessive = Math.floor(homorecessive);
        console.log("after: " + homorecessive);
    }
    console.log("before size: " + populationSize);
    console.log("populations: " + homodominant + " " + heterozygous + " " + homorecessive);
    populationSize = Math.floor(homodominant + heterozygous + homorecessive);
    console.log("after size: " + populationSize);
    */
    
    /*
    document.getElementById("hdDisplay").innerHTML = Math.round(homodominant * 10000 / populationSize ) / 100;
    document.getElementById("heteroDisplay").innerHTML = Math.round(heterozygous * 10000/populationSize) / 100;
    document.getElementById("hrDisplay").innerHTML = Math.round(homorecessive * 10000/populationSize) / 100;
    */
    console.log("sus: " + sus);
    drawStuff(sus[0], sus[1], sus[2]);
    ctx = display.canvas.getContext("2d");
    ctx.font = "24px Avenir Next";
    ctx.fillText("Population(After Natural Selection):", 4, 20);
    ctx.font = "20px Avenir Next";
    ctx.fillText("Homozygous Dominant: " + sus[0] + " individuals", 20, 48);
    ctx.fillText("Heterozygous: " + sus[1] + " individuals", 500, 48);
    ctx.fillText("Homozygous Recessive: " + sus[2] + " individuals", 900, 48);
    document.getElementById("popSize").value = population.size();
    document.getElementById("hdDisplay").innerHTML = (population.pSize() / population.size());
    document.getElementById("heteroDisplay").innerHTML = (population.hSize() / population.size());
    document.getElementById("hrDisplay").innerHTML = (population.qSize() / population.size());
    var ratio = population.ratio();
    document.getElementById("p").innerHTML = ratio[0];
    document.getElementById("q").innerHTML = ratio[1];
}

function getAllele(decimal) {
    //returns 1 if dominant, 0 if recessive
    num = Math.random();
    if (num < decimal){
        return 1;
    }
    return 0;
}
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
function startPrediction(){
    p = parseFloat(document.getElementById("p").innerHTML);
    q = parseFloat(document.getElementById("q").innerHTML);
    console.log(p + " " + q);
    console.log(p + q);
    populationSize = parseFloat(document.getElementById("popSize").value);
    if (p+q == 1 && populationSize >= 10 && populationSize <= 10000){ //fufills all requirements
        ctx = display.canvas.getContext("2d");
        ctx.clearRect(0, 0, display.canvas.width, display.canvas.height);
        //const pList = []; //list of dominant individuals
        //const hList = []; //list of heterozygous individuals
        //const qList = []; //list of reccesive individuals
        const factors = hwEquation(p, q);
        const pFactor = factors[0];
        const hFactor = factors[1]; //heterozygous
        const qFactor = factors[2];
        var pSize = Math.round(pFactor * populationSize);
        var hSize = Math.round(hFactor * populationSize);
        var qSize = Math.round(qFactor * populationSize);
        
        drawStuff(pSize, hSize, qSize);
        //document.getElementById("pDisplay").innerHTML = "Ratio: " + (pSize / populationSize);
        //document.getElementById("hDisplay").innerHTML = "Ratio: " + (hSize / populationSize);
        //document.getElementById("qDisplay").innerHTML = "Ratio: " + (qSize / populationSize);
        ctx = display.canvas.getContext("2d");
        ctx.font = "24px Avenir Next";
        ctx.fillText("Predicted Population:", 4, 20);
        ctx.font = "20px Avenir Next";
        ctx.fillText("Homozygous Dominant: " + pSize + " individuals", 20, 48);
        ctx.fillText("Heterozygous: " + hSize + " individuals", 500, 48);
        ctx.fillText("Homozygous Recessive: " + qSize + " individuals", 900, 48);
        document.getElementById("startSimulation").disabled = false;
    } else {
        alert("Make sure your p and q values sum to 1, and that p < 1 and q < 1; As well as 10≤popSize≤10000");
        document.getElementById("startSimulation").disabled = true;
    }
}

async function startSimulation(){
    p = parseFloat(document.getElementById("p").innerHTML);
    q = parseFloat(document.getElementById("q").innerHTML);
    generations = Math.round(document.getElementById("generations").value);
    if (generations == null){
        generations = 1;
    }
    population.setP(p);
    population.setQ(q);
    console.log("p and q are " + p + " " + q);
    populationSize = parseFloat(document.getElementById("popSize").value);
    if (p+q == 1 && populationSize >= 10 && populationSize <= 10000){
        wan = [];
        for (let amog = 0; amog < generations; amog++){
        //fufills all requirements
        totalAlleles = populationSize * 2;
        dominantAlleles = Math.round(totalAlleles * p);
        recessiveAlleles = Math.round(totalAlleles * q);
        population.clear();
        var dominant = 0;
        var heterozygous = 0;
        var recessive = 0;
        //sampling w/ replacement
        for (let index = 0; index < populationSize; index++){
            allele1 = getAllele(p);
            allele2 = getAllele(p);
            sNum = allele1 + allele2;
            if (sNum == 0){
                recessive++;
            } else if (sNum == 1){
                heterozygous++;
            } else if (sNum == 2){
                dominant++;
            }
        }
        console.log("startSimulation()");
        console.log(dominant);
        console.log(heterozygous);
        console.log(recessive);
        drawStuff(dominant, heterozygous, recessive);
        
        document.getElementById("hdDisplay").innerHTML = Math.round(dominant * 10000/populationSize) / 100;
        document.getElementById("heteroDisplay").innerHTML = Math.round(heterozygous * 10000/populationSize) / 100;
        document.getElementById("hrDisplay").innerHTML = Math.round(recessive * 10000/populationSize) / 100;
        ctx = display.canvas.getContext("2d");
        ctx.font = "24px Avenir Next";
        ctx.fillText("Population (Selection With Replacement):", 4, 20);
        ctx.font = "20px Avenir Next";
        ctx.fillText("Homozygous Dominant: " + dominant + " individuals", 20, 48);
        ctx.fillText("Heterozygous: " + heterozygous + " individuals", 500, 48);
        ctx.fillText("Homozygous Recessive: " + recessive + " individuals", 900, 48);
        //document.getElementById("startSimulation").disabled = false;
        wan.push(population);
        await delay(100);
        }
        de = [[], [], []];
        for (let a = 0; a < wan.length; a++){
            de[0].push(wan[a].pSize());
            de[1].push(wan[a].hSize());
            de[2].push(wan[a].qSize());
        }
        const xValues = [];
        for (let ininin = 1; ininin <= generations; ininin++){
            xValues.push(ininin);
        }
        try {
        chart.destroy();
        } catch (ReferenceError) {
        } finally {
        }
        var chartName = document.getElementById("dataChart").getContext('2d');
        chart = new Chart(chartName, {
          type: "line",
          data: {
            labels: xValues,
            datasets: [{
              data: de[0],
            label:"Homozygous Dominant",
              borderColor: "red",
              fill: false
            },{
              data: de[1],
            label:"Heterozygous",
              borderColor: "purple",
              fill: false
            },{
              data: de[2],
            label:"Homozygous Recessive",
              borderColor: "blue",
              fill: false
            }]
          },
          options: {
            legend: {display: false}
          },
        labels: ['# Generations', '']
        });
        chart.resize(1280, 720);
    } else{
            alert("Make sure your p and q values sum to 1, and that p < 1 and q < 1; As well as 10≤popSize≤10000");
    }
}

function startSimulationNoReplacement(){
    p = parseFloat(document.getElementById("p").innerHTML);
    q = parseFloat(document.getElementById("q").innerHTML);
    population.setP(p);
    population.setQ(q);
    console.log("p and q are " + p + " " + q);
    populationSize = parseFloat(document.getElementById("popSize").value);
    totalAlleles = populationSize * 2;
    dominantAlleles = Math.round(totalAlleles * p);
    recessiveAlleles = Math.round(totalAlleles * q);
    population.clear();
    var dominant = 0;
    var heterozygous = 0;
    var recessive = 0;
    //sampling w/o replacement
    for (let index = 0; index < populationSize; index++){
        allele1 = getAllele(p);
        allele2 = getAllele(p);
        if (allele1 == 0) { recessiveAlleles--; } else { dominantAlleles--; }
        if (allele2 == 0) { recessiveAlleles--; } else { dominantAlleles--; }
        totalAlleles -= 2;
        sNum = allele1 + allele2;
        if (sNum == 0){
            recessive++;
        } else if (sNum == 1){
            heterozygous++;
        } else if (sNum == 2){
            dominant++;
        }
        p = dominantAlleles/totalAlleles;
        q = 1 - p;
        population.setP(p);
        population.setQ(q);
    }
    console.log("startSimulationNoReplacement()");
    console.log(dominant);
    console.log(heterozygous);
    console.log(recessive);
    drawStuff(dominant, heterozygous, recessive);
    
    document.getElementById("hdDisplay").innerHTML = Math.round(dominant * 10000/populationSize) / 100;
    document.getElementById("heteroDisplay").innerHTML = Math.round(heterozygous * 10000/populationSize) / 100;
    document.getElementById("hrDisplay").innerHTML = Math.round(recessive * 10000/populationSize) / 100;
    ctx = display.canvas.getContext("2d");
    ctx.font = "24px Avenir Next";
    ctx.fillText("Population (Selection Without Replacement):", 4, 20);
    ctx.font = "20px Avenir Next";
    ctx.fillText("Homozygous Dominant: " + dominant + " individuals", 20, 48);
    ctx.fillText("Heterozygous: " + heterozygous + " individuals", 500, 48);
    ctx.fillText("Homozygous Recessive: " + recessive + " individuals", 900, 48);
    //document.getElementById("startSimulation").disabled = false;
}
function calculateNoReplacement(total, dom, het, rec, domdead, hetdead, recdead){
    dom *= (1 - domdead); //dominant individuals post thanos snap
    het *= (1 - hetdead); //heterozygous individuals post thanos snap
    rec *= (1 - recdead); //recessive individuals post thanos snap
    
    t = dom + het + rec; //total individuals post thanos snap
    
    p_2 = dom / t; //new p value after thanos snap squared
    p_2 = Math.sqrt(p_2); //new p value after thanos snap
    q_2 = 1 - p_2; //new q value after thanos snap
    return [p_2, q_2]; //final values after thanos snap
}
function hwEquation(p, q){
    return [p*p, 2*p*q, q*q];
}

function draw(text, x, y) {
    const ctx = display.canvas.getContext("2d");
    ctx.font = "48px serif";
    ctx.fillText(text, 10, 50);
}

function draw(text, fontSize, fontName, x, y) {
    const ctx = display.canvas.getContext("2d");
    ctx.font = fontSize+"px " + fontName;
    ctx.fillText(text, x, y);
}
                                                                
async function runGeneFlow(){
    generations = Math.round(document.getElementById("generations").value);
        
        try {
        chart.destroy();
        } catch (ReferenceError) {
        } finally {
        }

    if (generations == null || generations == 0){
        generations = 1;
    }
        const fin_dat = [[], [], [], [], [], []];
        data = []
        var del = 1000;
        
        if (generations > 10){
            del/=2;
        }
        if (generations > 20){
            del/=2;
        }
        if (generations > 30){
            del = 0;
        }
        for (let i = 0; i < generations; i++){
            await data.push(geneFlow());
            await delay(del);
        }
        console.log(data);
        for (let x = 0; x < data.length; x++){
            var p0 =data[x][0];
            var p1 = data[x][1];
            fin_dat[0].push(p0.pSize());
            fin_dat[1].push(p0.hSize());
            fin_dat[2].push(p0.qSize());
            fin_dat[3].push(p1.pSize());
            fin_dat[4].push(p1.hSize());
            fin_dat[5].push(p1.qSize());
        }
        const xValues = [];
        for (let j = 1; j <= generations; j++){
            xValues.push(j);
        }
        console.log(xValues + "    ldsjfdohisj");
        
        console.log(fin_dat + "    hello");
        
        var chartName = document.getElementById("dataChart").getContext('2d');
        console.log(fin_dat[0]);
        chart = new Chart(chartName, {
          type: "line",
          data: {
            labels: xValues,
            datasets: [{
              data: fin_dat[0],
            label:"Pop #1 Homozygous Dominant",
              borderColor: "red",
              fill: false
            },{
              data: fin_dat[1],
            label:"Pop #1 Heterozygous",
              borderColor: "purple",
              fill: false
            },{
              data: fin_dat[2],
            label:"Pop #1 Homozygous Recessive",
              borderColor: "blue",
              fill: false
            },{
            data: fin_dat[3],
            label:"Pop #2 Homozygous Dominant",
            borderColor: "yellow",
            fill: false
            },{
            data: fin_dat[4],
            label:"Pop #2 Heterozygous",
            borderColor: "orange",
            fill: false
            },{
            data: fin_dat[5],
            label:"Pop #2 Homozygous Recessive",
            borderColor: "green",
            fill: false
            }]
          },
          options: {
            legend: {display: false}
          },
        labels: ['# Generations', '']
        });
}
function geneFlow(){
    var population1 = new Population();
    var population2 = new Population();
    p = parseFloat(document.getElementById("p").innerHTML);
    q = parseFloat(document.getElementById("q").innerHTML);
    population2.setP(p);
    population2.setQ(q);
    population1.setP(p);
    population1.setQ(q);
    console.log("p and q are " + p + " " + q);
    populationSize = parseFloat(document.getElementById("popSize").value);
    totalAlleles = populationSize * 2;
    dominantAlleles = Math.round(totalAlleles * p);
    recessiveAlleles = Math.round(totalAlleles * q);
    //sampling w/ replacement
    var transferChance = 0.1;
    for (let index = 0; index < populationSize; index++){
        var n = Math.random();
        allele1 = getAllele(p);
        allele2 = getAllele(p);
        sNum = allele1 + allele2;
        if (n > transferChance){
            if (sNum == 0){
                population2.addQ(1);
            } else if (sNum == 1){
                population2.addH(1);
            } else if (sNum == 2){
                population2.addP(1);
            }
        } else{
            if (sNum == 0){
                population1.addQ(1);
            } else if (sNum == 1){
                population1.addH(1);
            } else if (sNum == 2){
                population1.addP(1);
            }
        }
        n = Math.random();
        allele1 = getAllele(p);
        allele2 = getAllele(p);
        sNum = allele1 + allele2;
        if (n > transferChance){
            if (sNum == 0){
                population1.addQ(1);
            } else if (sNum == 1){
                population1.addH(1);
            } else if (sNum == 2){
                population1.addP(1);
            }
        } else{
            if (sNum == 0){
                population2.addQ(1);
            } else if (sNum == 1){
                population2.addH(1);
            } else if (sNum == 2){
                population2.addP(1);
            }
        }
    }
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    //1st polish partition
    // set line stroke and line width
    context.strokeStyle = 'black';
    context.lineWidth = 5;

    // partitions poland
    context.beginPath();
    context.moveTo(1280/2, 0);
    context.lineTo(1280/2, 720);
    context.stroke();
    drawPopCircle(population2.pSize(), 150+5, 150+5, 0, population2);
    drawPopCircle(population2.hSize(), 150+5, 720-150-5, 1, population2);
    drawPopCircle(population2.qSize(), 640-150-5, 360, 4, population2);
        
    drawPopCircle(population1.pSize(), 1280-(150+5), 150+5, 2, population1);
    drawPopCircle(population1.hSize(), 1280-(150+5), 720-150-5, 3, population1);
    drawPopCircle(population1.qSize(), 640+150+5, 360, 5, population1);
    
    return [population2, population1];
}
function drawPopCircle(num, x, y, colorNum, pop) {
    //console.log(pop.getMax() + "|||||| : " + num);
    //0 is red, 1 is blue, 2 is yellow, 3 is green
    //4 and 5 are heterozygous, with purple 4 and orange 5
    /*
        Red and Yellow are dominant while Blue and Green are recessive
    */
    const ctx = display.canvas.getContext("2d");
    const color = ["Salmon", "RoyalBlue", "Gold", "Chartreuse", "DarkOrchid", "Orange"];
    ctx.beginPath();
    //console.log(num / pop.getMax());
    var r = Math.round(150 * (num / pop.getMax())); //radius
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fillStyle = color[colorNum];
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#003300';
    ctx.stroke();
    ctx.fillStyle = "white";
    ctx.font = "48px verdana";
    ctx.fillText(num, x-20-(num.toString().length*20), y);
}
$(function() { //sliders
    var rangePercent = $('[type="range"]').val();

    $('[type="range"]').on('change input', function() {
        rangePercent = Math.floor($('[type="range"]').val()*100);

        var dominant = rangePercent/100;
        var recessive = 1-dominant;

        var homodominant = dominant ** 2; // ** is exponent
        var heterozygous = 2 * dominant * recessive;
        var homorecessive = recessive ** 2;

        $('h4').html(rangePercent + "/" + (100-rangePercent) +'<span></span>');
        $('[type="range"], h4>span').css('filter', 'hue-rotate(' + (rangePercent) + 'deg)');
        $('h4').css({'transform': 'translateX(-50%) scale(' + (1+(rangePercent/150)) + ')', 'left': rangePercent+'%'});
    
        document.getElementById("hdDisplay").innerHTML = Math.round(homodominant * 10000) / 100;
        document.getElementById("heteroDisplay").innerHTML = Math.round(heterozygous * 10000) / 100;
        document.getElementById("hrDisplay").innerHTML = Math.round(homorecessive * 10000) / 100;
        document.getElementById("p").innerHTML = Math.round(dominant*100)/100;
        document.getElementById("q").innerHTML = Math.round(recessive*100)/100;
    });
});
