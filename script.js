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
    pSize = function(){
        return pList.size();
    }
    hSize = function(){
        return hList.size();
    }
    qSize = function(){
        return qList.size();
    }
    kill = function(dP, hP, qP){
        
    }
};
const population = new Population();
population.addP(0);

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

function getAllele(decimal) {
    //returns 1 if dominant, 0 if recessive
    num = Math.random();
    console.log(num + " < " + decimal);
    if (num < decimal){
        console.log("return 1");
        return 1;
    }
    console.log("return 0");
    return 0;
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

function startSimulation(){
    p = parseFloat(document.getElementById("p").innerHTML);
    q = parseFloat(document.getElementById("q").innerHTML);
    console.log("p and q are " + p + " " + q);
    populationSize = parseFloat(document.getElementById("popSize").value);
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
    
    document.getElementById("hdDisplay").innerHTML = "Ratio: " + (dominant / populationSize);
    document.getElementById("heteroDisplay").innerHTML = "Ratio: " + (heterozygous / populationSize);
    document.getElementById("hrDisplay").innerHTML = "Ratio: " + (recessive / populationSize);
    ctx = display.canvas.getContext("2d");
    ctx.font = "24px Avenir Next";
    ctx.fillText("Population (Selection w/ Replacement):", 4, 20);
    ctx.font = "20px Avenir Next";
    ctx.fillText("Homozygous Dominant: " + dominant + " individuals", 20, 48);
    ctx.fillText("Heterozygous: " + heterozygous + " individuals", 500, 48);
    ctx.fillText("Homozygous Recessive: " + recessive + " individuals", 900, 48);
    //document.getElementById("startSimulation").disabled = false;
}

function startSimulationNoReplacement(){
    p = parseFloat(document.getElementById("p").innerHTML);
    q = parseFloat(document.getElementById("q").innerHTML);
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
    }
    console.log("startSimulationNoReplacement()");
    console.log(dominant);
    console.log(heterozygous);
    console.log(recessive);
    drawStuff(dominant, heterozygous, recessive);
    
    document.getElementById("hdDisplay").innerHTML = "Ratio: " + (dominant / populationSize);
    document.getElementById("heteroDisplay").innerHTML = "Ratio: " + (heterozygous / populationSize);
    document.getElementById("hrDisplay").innerHTML = "Ratio: " + (recessive / populationSize);
    ctx = display.canvas.getContext("2d");
    ctx.font = "24px Avenir Next";
    ctx.fillText("Population (Selection w/ Replacement):", 4, 20);
    ctx.font = "20px Avenir Next";
    ctx.fillText("Homozygous Dominant: " + dominant + " individuals", 20, 48);
    ctx.fillText("Heterozygous: " + heterozygous + " individuals", 500, 48);
    ctx.fillText("Homozygous Recessive: " + recessive + " individuals", 900, 48);
    //document.getElementById("startSimulation").disabled = false;
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

function thanosSnap(){
    
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
