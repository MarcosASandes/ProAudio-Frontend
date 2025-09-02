export const generateEsterilizedQR = async (
  qrBase64,
  logoUrl,
  itemId,
  modelo,
  size = 200
) => {
  const margin = 20; //margen general
  const logoMargin = 10; //margen alrededor del logo
  const logoSize = size * 0.2; //logo más pequeño
  const textSpacing = 10; //espacio entre QR y texto
  const lineHeight = 18; //separación entre líneas

  //altura de la zona de texto y logo
  const extraHeight = logoSize + logoMargin * 2;

  //ancho y alto del canvas
  const canvasWidth = size + margin * 2;
  const canvasHeight = margin + size + extraHeight;

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  //fondo blanco
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  //dibuja QR
  const qrX = margin;
  const qrY = margin;
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 4;
  ctx.strokeRect(qrX - 2, qrY - 2, size + 4, size + 4);

  const qrImg = new Image();
  qrImg.src = `data:image/png;base64,${qrBase64}`;
  await qrImg.decode();
  ctx.drawImage(qrImg, qrX, qrY, size, size);

  //dibuja logo en la esquina inferior izquierda
  const logoX = margin;
  const logoY = qrY + size + textSpacing;
  const logoImg = new Image();
  logoImg.src = logoUrl;
  await logoImg.decode();
  ctx.drawImage(logoImg, logoX, logoY, logoSize, logoSize);

  //dibuja modelo + ID al lado del logo
  const textStartX = logoX + logoSize + logoMargin;
  const textStartY = logoY + logoSize / 2 - 5;

  //ajuste dinámico de tamaño de fuente
  let fontSize = 16;
  if (modelo.length > 20) fontSize = 12;
  if (modelo.length > 35) fontSize = 10;
  if (modelo.length > 45) fontSize = 8;

  if (modelo.length > 15 && modelo === modelo.toUpperCase()) {
    fontSize -= 4;
  }

  ctx.fillStyle = "#000";
  ctx.textAlign = "left";
  ctx.font = `bold ${fontSize}px Arial`;
  ctx.fillText(modelo, textStartX, textStartY);

  ctx.font = "14px Arial";
  ctx.fillText(`ID: ${itemId}`, textStartX, textStartY + lineHeight);

  return canvas;
};

//descargar el canvas como imagen PNG
export const downloadCanvasAsImage = (canvas, filename) => {
  const link = document.createElement("a");
  link.download = filename;
  link.href = canvas.toDataURL("image/png");
  link.click();
};
