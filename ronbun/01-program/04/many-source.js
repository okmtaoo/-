let theta = 0;
let i = 0;
onmessage = (evt)=>{
let offsc = evt.data.canvas;
let sound = 2;
let inter = 16;
let ctx = offsc.getContext('2d');
console.time('timer');
//setInterval(() => {calc(offsc, ctx, i, theta);},100);
function calc( ) {
let lambda = 8.6; // 波長は8.6mm （音で言えば40kHz）
let c_size = 512; // canvasのサイズ（単位：ピクセル）
let w_number = 16; // フィールド内の波の数
let s_number = sound; // 音源は2つ　parseIntで文字列を整数型にしている
let interval = inter; // 音源間隔（単位：ピクセル）

ctx.clearRect( 0,0,512,512);

let imageData = ctx.createImageData( 512,512 );
let pixelData = imageData.data;

let k = 2.0 * Math.PI / lambda;
let m_size = ( lambda * w_number ) / c_size;

i++;

for( let y=0; y<c_size; y++ ) {
  for( let x=0; x<=c_size*0.5; x++ ) {
    let sx = -interval * s_number/2.0 + interval/2.0;
    let amp = 0;
    for( let n=0; n<s_number; n++ ) {
      let px = c_size / 2.0 - x- sx ;
      let py = c_size / 2.0 - y;
      let r = Math.sqrt( ( px * m_size * px * m_size ) + ( py * m_size * py * m_size ) );
      amp -= Math.sin( - k * r + Math.PI * 2.0 / 360.0 * theta );
      sx += interval;
    }
    let wh = Math.floor( 127 + 126.0 * amp / s_number );
    if( wh<0 || 255<wh ) console.log( "？？？" );
    pixelData[ y * c_size * 4 + x * 4 + 0 ] = 0;  //R
    pixelData[ y * c_size * 4 + x * 4 + 1 ] = wh; //G
    pixelData[ y * c_size * 4 + x * 4 + 2 ] = wh; //B
    pixelData[ y * c_size * 4 + x * 4 + 3 ] = 255;    //a
  }
}
ctx.putImageData( imageData, 0, 0 );
if(i%1000 == 0)
{
  console.log( i );
  console.timeEnd('timer');
  console.time('timer');
}

theta += 4.5; // 1フレームで位相を4.5°進める
  //requestAnimationFrame(calc);
  setInterval( calc,0);
}
//requestAnimationFrame(calc);
setInterval( calc,0);
};
