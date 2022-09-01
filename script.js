const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let gradient = ctx.createLinearGradient(0, 0 , canvas.width, canvas.height);
gradient.addColorStop(0, 'red');
gradient.addColorStop(0.2, '#0aff0a');
gradient.addColorStop(0.4, '#0aff0a');
gradient.addColorStop(0.6, '#0aff0a');
gradient.addColorStop(0.8, 'blue');
gradient.addColorStop(1, 'magenta');

class Symbol {
    constructor(x, y, fontSize, canvasHeight){
        this.characters = '  ぁ あ  ぃ い ぅ う ぇ え ぉ お か が き ぎ く ぐ け こ ご さ ざ し じ す ず せ ぜ そ ぞ た だ ち ぢ っ つ づ て べ へ ぷ ぶ ふ ぴ び ひ ぱ ば は の ね ぬ に な ど と で ぺ ほ ぼ ぽ ま み む め も ゃ や ゅ ゆ ょ よ ら り る れ ア ァ ゠ ゟ ゞ ゝ ゖ ゕ ゔ ん を ゑ ゐ わ ゎ ろ ィ イ ゥ ウ ェ エ ォ オ カ ガ キ ギ ク グ ケ ゲ コ ゴ サ ト デ テ ヅ ツ ッ ヂ チ ダ タ ゾ ソ ゼ セ ズ ス ジ ザ ド ナ ニ ヌ ネ ノ ハ バ パ ヒ ビ ピ フ ヘ ホ ヮ ロ レ ル リ ラ ヨ ョ ユ ュ ヤ ャ モ メ ム ミ ポ ワ ヰ ヱ ヲ ヴ ヵ ヷ ヸ ヹ ヺ ー ヿ ㍐ ㍿ 0 1 2 3 4 5 6 7 8 9 A B C D E F G H I K L M N O P Q R S T V X Y Z';
        this.x = x;
        this.y = y;
        this.fontSize = fontSize;
        this.text = '';
        this.canvasHeight = canvasHeight;
    }
    draw(context){
        this.text = this.characters.charAt(Math.floor(Math.random() * this.characters.length));
        context.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize);
        if (this.y * this.fontSize > this.canvasHeight && Math.random() > 0.98){
            this.y = 0;
        } else {
            this.y += 1;
        }
    }
}

class Effect {
    constructor(canvasWidth, canvasHeight){
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.fontSize = 25;
        this.columns = this.canvasWidth/this.fontSize;
        this.symbols = [];
        this.#initialize();
        console.log(this.symbols);
    }
    #initialize() {
        for (let i = 0; i < this.columns; i++){
            this.symbols[i] = new Symbol(i, 0, this.fontSize, this.canvasHeight);
        }
    }
    resize(width, height){
        this.canvasWidth = width;
        this.canvasHeight = height;
        this.columns = this.canvasWidth/this.fontSize;
        this.symbols = [];
        this.#initialize();
    }
}


const effect = new Effect(canvas.width, canvas.height);
let lastTime = 0;
const fps = 30;
const nextFrame = 1000/fps;
let timer = 0;
function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    if(timer > nextFrame){
   // fadeaway symbols by creating black rectangle
   ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
   ctx.textAlign = 'center';
   ctx.fillRect(0,0,canvas.width, canvas.height);
   ctx.fillStyle = gradient;
   // ------
   ctx.font = effect.fontSize + 'px monospace';
   effect.symbols.forEach(symbol => symbol.draw(ctx));
   timer = 0;
    } else {
        timer += deltaTime;
    }
    requestAnimationFrame(animate);
}

animate(0);
window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    effect.resize(canvas.width, canvas.height);
});


