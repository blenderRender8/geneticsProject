/*post generation
 this stuff is for after the thing generates everything, should not have null errors
 
 
 
*/
class Population {
    constructor(){
        this.pList = []; //list of dominant individuals
        this.hList = []; //list of heterozygous individuals
        this.qList = []; //list of reccesive individuals
    }
    addP = function(pClass){
        this.pList.push(pClass);
    }
    addH = function(hClass){
        this.hList.push(hClass);
    }
    addQ = function(qClass){
        this.qList.push(qClass);
    }
    clear = function(){
        const pList = []; //list of dominant individuals
        const hList = []; //list of heterozygous individuals
        const qList = []; //list of reccesive individuals
    }
};
const population = new Population();
population.addP(0);
function drawStuff(pSize, hSize, qSize){
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
        population.addP(pClass);
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
        population.addH(hClass);
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
        population.addQ(qClass);
        qClass.drawMe();
        startingY += ySpacing;
    }
}
function pushButton(){
    p = parseFloat(document.getElementById("p").value);
    q = parseFloat(document.getElementById("q").value);
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
        
        /*
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
            pList.push(pClass);
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
            hList.push(hClass);
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
            qList.push(qClass);
            qClass.drawMe();
            startingY += ySpacing;
        }
         */
        drawStuff(pSize, hSize, qSize);
        //console.log(pList);
        //console.log(hList);
        //console.log(qList);
        document.getElementById("pDisplay").innerHTML = "Ratio: " + (pSize / populationSize);
        document.getElementById("hDisplay").innerHTML = "Ratio: " + (hSize / populationSize);
        document.getElementById("qDisplay").innerHTML = "Ratio: " + (qSize / populationSize);
        ctx = display.canvas.getContext("2d");
        ctx.font = "24px Avenir Next";
        ctx.fillText("Predicted Population:", 4, 20);
        ctx.font = "20px serif";
        ctx.fillText("Homozygous Dominant: " + pSize + " individuals", 20, 48);
        ctx.fillText("Heterozygous: " + hSize + " individuals", 500, 48);
        ctx.fillText("Homozygous Recessive: " + qSize + " individuals", 900, 48);
        document.getElementById("startSimulation").disabled = false;
    } else {
        alert("Make sure your p and q values sum to 1, and that p < 1 and q < 1; As well as 10≤popSize≤10000");
        document.getElementById("startSimulation").disabled = true;
    }
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

function startSimulation(){
    p = parseFloat(document.getElementById("p").value);
    q = parseFloat(document.getElementById("q").value);
    populationSize = parseFloat(document.getElementById("popSize").value);
    totalAlleles = populationSize * 2;
    dominantAlleles = Math.round(totalAlleles * p);
    recessiveAlleles = Math.round(totalAlleles * q);
    population = [];
    var dominant = 0;
    var heterozygous = 0;
    var recessive = 0;
    const drawDom = [];
    const drawHet = [];
    const drawRec = [];
    //sampling w/ replacement
    for (let index = 0; index < populationSize; index++){
        allele1 = checkAllele(p);
        allele2 = checkAllele(p);
        sNum = allele1 + allele2;
        population.push(sNum); // 1+1 = 2 is dominant, 1+0 = 1 is heterozygous, 0+0 = 0 is recessive
        if (sNum == 0){
            recessive++;
            drawRec.push();
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

function checkAllele(decimal, returnValue){
    //returns 1 if dominant, 0 if recessive
    num = Math.random();
    if (num < decimal){
        return 1;
    }
    return 0;
}
