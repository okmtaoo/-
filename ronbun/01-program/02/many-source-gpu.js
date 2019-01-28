let theta = 0;
var i = 0;
console.time('timer1');
function calc() {
  let canvas = document.getElementById( 'graph0' );
  let gl = canvas.getContext( "webgl" );

  let lambda = 8.6; // 波長は8.6mm （音で言えば40kHz）
  let c_size = 512; // canvasのサイズ
  let w_number = 1; // フィールド内の波の数

  i++;

  gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
  gl.clear(gl.COLOR_BUFFER_BIT);

  let imageData = gl.createBuffer();
  gl.bindBuffer( gl.ARRAY_BUFFER, imageData );

  // バーテックス(頂点)シェーダー
  var vSource = [
    "precision mediump float;",
    "attribute vec2 vertex;",
    "attribute float theta_n;",
    "attribute float distance_n;",
    "varying float theta;",
    "varying float distance;",
    "void main(void) {",
    "gl_Position = vec4(vertex, 0.0, 1.0);",
    "theta = theta_n;",
    "distance = distance_n;",
    "}"
  ].join("\n");

  var vShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vShader, vSource);
  gl.compileShader(vShader);
  gl.getShaderParameter(vShader, gl.COMPILE_STATUS);

  // フグメントシェーダー
  var fSource = [
    "precision mediump float;",
    "varying float theta;",
    "varying float distance;",
    "void main(void) {",
    "const float PI = 3.1415926535897932384626433832795;",
    "const float lambda = 8.6;",
    "const float c_size = 512.0;",
    "const float w_number = 16.0;",
    "const float s_number = 2.0;",
    "const float interval = 16.0;",

    "const float k = 2.0 * PI / lambda;",
    "const float m_size = ( lambda * w_number ) / c_size;",
    "float sx = -interval * s_number/2.0 + interval/2.0;",
    "float amp = 0.0;",
    "for( int n=0; n<int(s_number); n++ ) {",
    "float px = c_size / 2.0 - gl_FragCoord.x - sx;",
    "float py = c_size / 2.0 - gl_FragCoord.y;",
    "float r = sqrt( ( px * m_size * px * m_size ) + ( py * m_size * py * m_size ) );",
    "amp += sin( -k * r + PI * 2.0 / 360.0 * theta );",
    "sx += interval;",
    "}",
    "amp /= 2.0;",
    "gl_FragColor = vec4( 0, (amp+1.0)/2.0, (amp+1.0)/2.0, 1.0 );",
    "}"
  ].join("\n");

  var fShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fShader, fSource);
  gl.compileShader(fShader);
  gl.getShaderParameter(fShader, gl.COMPILE_STATUS);


  // プログラムオブジェクトの生成
  var program = gl.createProgram();
  gl.attachShader(program, vShader);
  gl.attachShader(program, fShader);
  gl.linkProgram(program);
  gl.getProgramParameter(program, gl.LINK_STATUS);
  gl.useProgram(program);


  // シェーダー側の変数をjs側から設定する
  var vertex = gl.getAttribLocation(program, "vertex");
  gl.enableVertexAttribArray(vertex);
  gl.vertexAttribPointer(vertex, 2, gl.FLOAT, false, 0, 0);

  var theta_n = gl.getAttribLocation(program, "theta_n");
  gl.vertexAttrib1f( theta_n, theta );

  var distance_n = gl.getAttribLocation(program,"distance_n");
  gl.vertexAttrib1f( distance_n, 1 );

  // 4点の座標をセット
  var vertices = [
    -1.0, 1.0,
    1.0, 1.0,
    -1.0, -1.0,
    1.0,-1.0
  ];

  if(i%1000 == 0)
  {
    console.log( i );
    console.timeEnd('timer1');
    console.time('timer1');
  }

  // 描画する
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, vertices.length/2);

  theta += 4.5; // 1フレームで位相を4.5°進める
  setInterval( calc,0 );
}








function calc1() {
  let canvas = document.getElementById( 'graph1' );
  let gl = canvas.getContext( "webgl" );

  let lambda = 8.6; // 波長は8.6mm （音で言えば40kHz）
  let c_size = 512; // canvasのサイズ
  let w_number = 1; // フィールド内の波の数

  i++;

  gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
  gl.clear(gl.COLOR_BUFFER_BIT);

  let imageData = gl.createBuffer();
  gl.bindBuffer( gl.ARRAY_BUFFER, imageData );

  // バーテックス(頂点)シェーダー
  var vSource = [
    "precision mediump float;",
    "attribute vec2 vertex;",
    "attribute float theta_n;",
    "attribute float distance_n;",
    "varying float theta;",
    "varying float distance;",
    "void main(void) {",
    "gl_Position = vec4(vertex, 0.0, 1.0);",
    "theta = theta_n;",
    "distance = distance_n;",
    "}"
  ].join("\n");

  var vShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vShader, vSource);
  gl.compileShader(vShader);
  gl.getShaderParameter(vShader, gl.COMPILE_STATUS);

  // フグメントシェーダー
  var fSource = [
    "precision mediump float;",
    "varying float theta;",
    "varying float distance;",
    "void main(void) {",
    "const float PI = 3.1415926535897932384626433832795;",
    "const float lambda = 8.6;",
    "const float c_size = 512.0;",
    "const float w_number = 16.0;",
    "const float s_number = 2.0;",
    "const float interval = 16.0;",

    "const float k = 2.0 * PI / lambda;",
    "const float m_size = ( lambda * w_number ) / c_size;",
    "float sx = -interval * s_number/2.0 + interval/2.0;",
    "float amp = 0.0;",
    "for( int n=0; n<int(s_number); n++ ) {",
    "float px = c_size / 2.0 - gl_FragCoord.x - sx;",
    "float py = c_size / 2.0 - gl_FragCoord.y;",
    "float r = sqrt( ( px * m_size * px * m_size ) + ( py * m_size * py * m_size ) );",
    "amp += sin( -k * r + PI * 2.0 / 360.0 * theta );",
    "sx += interval;",
    "}",
    "amp /= 2.0;",
    "gl_FragColor = vec4( 0, (amp+1.0)/2.0, (amp+1.0)/2.0, 1.0 );",
    "}"
  ].join("\n");

  var fShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fShader, fSource);
  gl.compileShader(fShader);
  gl.getShaderParameter(fShader, gl.COMPILE_STATUS);


  // プログラムオブジェクトの生成
  var program = gl.createProgram();
  gl.attachShader(program, vShader);
  gl.attachShader(program, fShader);
  gl.linkProgram(program);
  gl.getProgramParameter(program, gl.LINK_STATUS);
  gl.useProgram(program);


  // シェーダー側の変数をjs側から設定する
  var vertex = gl.getAttribLocation(program, "vertex");
  gl.enableVertexAttribArray(vertex);
  gl.vertexAttribPointer(vertex, 2, gl.FLOAT, false, 0, 0);

  var theta_n = gl.getAttribLocation(program, "theta_n");
  gl.vertexAttrib1f( theta_n, theta );

  var distance_n = gl.getAttribLocation(program,"distance_n");
  gl.vertexAttrib1f( distance_n, 1 );

  // 4点の座標をセット
  var vertices = [
    -1.0, 1.0,
    1.0, 1.0,
    -1.0, -1.0,
    1.0,-1.0
  ];

  if(i%1000 == 0)
  {
    console.log( i );
    console.timeEnd('timer1');
    console.time('timer1');
  }

  // 描画する
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, vertices.length/2);

  theta += 4.5; // 1フレームで位相を4.5°進める
  requestAnimationFrame( calc1 );
}



window.addEventListener( 'load', function() {
  calc();
  calc1()
});
