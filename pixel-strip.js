const canvas = document.getElementById("pixel-strip");
const ctx = canvas.getContext("2d");

const W = 180;  // low resolution = pixel look
const H = 12;

canvas.width = W;
canvas.height = H;

ctx.imageSmoothingEnabled = false;

// colour palette (match your site)
const colors = [
  [0, 0, 197],     // blue (#0000c5)
  [192, 192, 192], // grey (#c0c0c0)
  [0, 128, 0]      // green (#008000)
];

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function mix(c1, c2, t) {
  return [
    lerp(c1[0], c2[0], t),
    lerp(c1[1], c2[1], t),
    lerp(c1[2], c2[2], t)
  ];
}

function draw(time) {
  time *= 0.0004;

  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const nx = x / W;
      const wave = Math.sin(nx * 6 + time) * 0.5 + 0.5;

      const col = mix(colors[0], colors[1], wave);
      const col2 = mix(col, colors[2], Math.sin(time + y) * 0.5 + 0.5);

      ctx.fillStyle = `rgb(${col2[0]|0}, ${col2[1]|0}, ${col2[2]|0})`;
      ctx.fillRect(x, y, 1, 1);
    }
  }

  requestAnimationFrame(draw);
}

draw();
