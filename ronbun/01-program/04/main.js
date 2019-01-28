window.addEventListener('load',()=>{

  //canvas要素を取得する
  let canvas = document.getElementById('graph0');
  let canvas1 = document.getElementById('graph1');

  //canvas要素の描画コントロールをoffscreenに委譲する
  let offscreenCanvas = canvas.transferControlToOffscreen();
  let offscreenCanvas1 = canvas1.transferControlToOffscreen();
  //workerを作成し，offscreenCanvasを渡す.
  let worker = new Worker('many-source.js');
  worker.postMessage({canvas:offscreenCanvas},[offscreenCanvas]);

  let worker1 = new Worker('many-source1.js');
  worker1.postMessage({canvas1:offscreenCanvas1},[offscreenCanvas1]);
});
