
let i = 0;
function calc(image, theta,left) {
  let lambda = 8.6; // 波長は8.6mm （音で言えば40kHz）
  let c_size = 512; // canvasのサイズ（単位：ピクセル）
  let w_number = 16; // フィールド内の波の数
  let s_number = 2; // 音源は2つ　parseIntで文字列を整数型にしている
  let interval = 16; // 音源間隔（単位：ピクセル）

  let k = 2.0 * Math.PI / lambda;
  let m_size = ( lambda * w_number ) / c_size;

  i++;
//console.log(theta);
  for( let y=0; y<c_size; y++ ) {
    for( let x=left; x<=left+c_size*0.5; x++ ) {
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
      image[ y * c_size * 4 + x * 4 + 0 ] = 0;  //R
      image[ y * c_size * 4 + x * 4 + 1 ] = wh; //G
      image[ y * c_size * 4 + x * 4 + 2 ] = wh; //B
      image[ y * c_size * 4 + x * 4 + 3 ] = 255;    //a
    }
  }
}
onmessage = (evt)=>{
  let image = evt.data.image;
  let theta = evt.data.theta;
  let left = evt.data.left;
  //setInterval(() => {calc(image.data, theta);},100);
  calc(image.data,theta,left);
  postMessage({image:image, i:i, theta:theta});
  //calc( image.data, theta );

  //theta += 4.5; // 1フレームで位相を4.5°進める

}
