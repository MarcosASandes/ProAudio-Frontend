/*VERSION CON LOGO PERO SIN ID Y MODEL */

/*export const generateEsterilizedQR = async (qrBase64, logoUrl, size = 200) => {
  const margin = 20;       // margen alrededor del QR
  const logoMargin = 15;   // margen alrededor del logo
  const logoSize = size * 0.3;

  // Ancho total: al menos el tamaño del QR + margen * 2
  const canvasWidth = size + margin * 2;

  // Alto total: QR + margen + logo + margen
  const canvasHeight = size + margin * 2 + logoSize + logoMargin * 2;

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  // Fondo blanco
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Posición QR: centrado horizontalmente, arriba con margen
  const qrX = margin;
  const qrY = margin;

  // Marco alrededor del QR
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 4;
  ctx.strokeRect(qrX - 2, qrY - 2, size + 4, size + 4);

  // Dibuja QR
  const qrImg = new Image();
  qrImg.src = `data:image/png;base64,${qrBase64}`;
  await qrImg.decode();
  ctx.drawImage(qrImg, qrX, qrY, size, size);

  // Posición logo: abajo a la izquierda, con margen (sin tocar bordes)
  const logoX = logoMargin;
  const logoY = canvasHeight - logoSize - logoMargin;

  // Dibuja logo
  const logoImg = new Image();
  logoImg.src = logoUrl;
  await logoImg.decode();
  ctx.drawImage(logoImg, logoX, logoY, logoSize, logoSize);

  return canvas;
};*/

/*------------------------------------------ */

/*export const generateEsterilizedQR = async (qrBase64, logoUrl, itemId, modelo, size = 200) => {
  const margin = 20;         // margen para QR
  const logoMargin = 15;     // margen para el logo
  const logoSize = size * 0.3;
  const textSpacing = 10;    // espacio entre textos

  // Estimamos altura para textos (modelo + ID)
  const textHeight = 40;

  // Ancho del canvas
  const canvasWidth = size + margin * 2;

  // Alto del canvas: QR + margen + texto + logo + márgenes
  const canvasHeight = margin + size + textSpacing + textHeight + logoMargin + logoSize + logoMargin;

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  // Fondo blanco
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Dibuja marco del QR
  const qrX = margin;
  const qrY = margin;
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 4;
  ctx.strokeRect(qrX - 2, qrY - 2, size + 4, size + 4);

  // Dibuja QR
  const qrImg = new Image();
  qrImg.src = `data:image/png;base64,${qrBase64}`;
  await qrImg.decode();
  ctx.drawImage(qrImg, qrX, qrY, size, size);

  // Texto: modelo (centrado debajo del QR)
  ctx.fillStyle = "#000";

  // Ajusta tamaño de fuente según longitud
  const baseFontSize = 16;
  let fontSize = baseFontSize;
  if (modelo.length > 20) fontSize = 12;
  if (modelo.length > 35) fontSize = 10;
  ctx.font = `bold ${fontSize}px Arial`;
  ctx.textAlign = "center";
  ctx.fillText(modelo, canvasWidth / 2, qrY + size + textSpacing + fontSize);

  // Texto: ID del ítem
  const idFontSize = 14;
  ctx.font = `${idFontSize}px Arial`;
  ctx.fillText(`ID: ${itemId}`, canvasWidth / 2, qrY + size + textSpacing + fontSize + idFontSize + 4);

  // Posición del logo: abajo izquierda
  const logoX = logoMargin;
  const logoY = canvasHeight - logoSize - logoMargin;

  const logoImg = new Image();
  logoImg.src = logoUrl;
  await logoImg.decode();
  ctx.drawImage(logoImg, logoX, logoY, logoSize, logoSize);

  return canvas;
};*/

/*-------------------------------- */

export const generateEsterilizedQR = async (qrBase64, logoUrl, itemId, modelo, size = 200) => {
  const margin = 20;           // margen general
  const logoMargin = 10;       // margen alrededor del logo
  const logoSize = size * 0.2; // logo más pequeño
  const textSpacing = 10;      // espacio entre QR y texto
  const lineHeight = 18;       // separación entre líneas

  // Altura de la zona de texto y logo (más compacta que antes)
  const extraHeight = logoSize + logoMargin * 2;

  // Ancho y alto del canvas
  const canvasWidth = size + margin * 2;
  const canvasHeight = margin + size + extraHeight;

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  // Fondo blanco
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // --- Dibuja QR ---
  const qrX = margin;
  const qrY = margin;
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 4;
  ctx.strokeRect(qrX - 2, qrY - 2, size + 4, size + 4);

  const qrImg = new Image();
  qrImg.src = `data:image/png;base64,${qrBase64}`;
  await qrImg.decode();
  ctx.drawImage(qrImg, qrX, qrY, size, size);

  // --- Dibuja logo en la esquina inferior izquierda ---
  const logoX = margin;
  const logoY = qrY + size + textSpacing;
  const logoImg = new Image();
  logoImg.src = logoUrl;
  await logoImg.decode();
  ctx.drawImage(logoImg, logoX, logoY, logoSize, logoSize);

  // --- Dibuja modelo + ID al lado del logo ---
  const textStartX = logoX + logoSize + logoMargin;
  const textStartY = logoY + logoSize / 2 - 5;

  // Ajuste dinámico de tamaño de fuente
  let fontSize = 16;
  if (modelo.length > 20) fontSize = 12;
  if (modelo.length > 35) fontSize = 10;
  if (modelo.length > 45) fontSize = 8;

  ctx.fillStyle = "#000";
  ctx.textAlign = "left";
  ctx.font = `bold ${fontSize}px Arial`;
  ctx.fillText(modelo, textStartX, textStartY);

  ctx.font = "14px Arial";
  ctx.fillText(`ID: ${itemId}`, textStartX, textStartY + lineHeight);

  return canvas;
};





// Descarga el canvas como imagen PNG
export const downloadCanvasAsImage = (canvas, filename) => {
  const link = document.createElement("a");
  link.download = filename;
  link.href = canvas.toDataURL("image/png");
  link.click();
};
