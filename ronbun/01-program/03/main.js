class Main {
  constructor() {
    let canvas = document.getElementById('graph0');//canvas要素の取得
    let canvas1 = document.getElementById('graph1');
    this.theta = 0;
    this.worker1 = new Work( "worker1", canvas, 0 );
    this.worker2 = new Work( "worker2", canvas1, 256 );

    //let nl = new nylon();
    //nl.on( 'worker2', () => {
    setInterval( () => {this.bar()}, 0 );
    //})
  }

  bar() {
    this.worker1.execute( this.theta );
    this.worker2.execute( this.theta );
    this.theta += 4.5;
  }
}

class Work {
  constructor( name, canvas, left ) {
    this.name = name;
    this.left = left;
    this.worker = new Worker('worker.js');
    this.ctx = canvas.getContext('2d');

    this.image = this.ctx.getImageData( 0, 0, 512, 512 );
    //this.nl = new nylon();

    this.worker.addEventListener('message',(e) => {
      let imageData = e.data.image;
      let count1 = e.data.i;

      if (count1 %1000 == 0){
        console.log(count1);
        console.time('time1');
        console.timeEnd('time1');
      }
      this.ctx.clearRect(0,0,512,512);
      this.ctx.putImageData( imageData, 0, 0 );
      //this.nl.emit( this.name, null );
    },false);
  }

   execute( theta ) {
      this.worker.postMessage({image:this.image, theta:theta, left:this.left});
      //console.log(this.name);

  }
}

window.addEventListener('load',()=>{
  let hoge = new Main();
  hoge.bar();
  console.time('time1');
});
