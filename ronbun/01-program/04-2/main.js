
class Main {
  constructor() {
    this.i = 0; //soundの数
    this.j = 0; //間の大きさ

    this.canvas = document.getElementById('graph0');  //canvasの要素を取得
    this.canvas1 = document.getElementById('graph1');
    this.offscreenCanvas = this.canvas.transferControlToOffscreen();//canvas要素の描画コントロールをoffscreenに委譲する
    this.offscreenCanvas1 = this.canvas1.transferControlToOffscreen();
    this.worker = new Worker('many-source.js'); //workerを作成
    this.worker1 = new Worker('many-source1.js');
    //setInterval(() => {main(canvas,canvas1,i,j,offscreenCanvas,offscreenCanvas1);},30);

    this.worker.postMessage( { canvas:this.offscreenCanvas, sound:2, interval:16 }, [this.offscreenCanvas] );
    this.worker1.postMessage( { canvas:this.offscreenCanvas1, sound:2, interval:16 }, [this.offscreenCanvas1] );

    var nl = new nylon();
    nl.on( 'root', ( key, params ) => {
      this.worker.postMessage( { sound: params.root } );
      this.worker1.postMessage( { sound: params.root } );
    });
    nl.on( 'kyori', ( key, params ) => {
      this.worker.postMessage( { interval: params.kyori } );
      this.worker1.postMessage( { interval: params.kyori } );
    })
  }

}

var guisetup = () => {
  var nl = new nylon();
  document.querySelector('#root').addEventListener('change', (evt) => {
    console.log(evt.target.value);
    nl.emit( "root", { "root": evt.target.value});
    document.querySelector('#output1').value = evt.target.value;
  });
  document.querySelector('#kyori').addEventListener('change', (evt) => {
    console.log(evt);
    nl.emit( "kyori", { "kyori": evt.target.value});
    document.querySelector('#output2').value = evt.target.value;
  });
}
window.addEventListener("load",()=>{
  guisetup();
  x = new Main();
});
