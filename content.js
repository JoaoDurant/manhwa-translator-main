// content.js

// Função para detectar texto em uma imagem
async function detectText(image) {
    const worker = Tesseract.createWorker();
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    const { data: { text } } = await worker.recognize(image);
    await worker.terminate();
    return text;
  }
  
  // Função para remover texto e preencher o fundo
  function removeText(image) {
    // Carregar a imagem em um canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);
  
    // Exemplo simples: preencher uma área retangular (substitua por inpainting real)
    ctx.fillStyle = 'white';
    ctx.fillRect(50, 50, 200, 50); // Exemplo de coordenadas
  
    return canvas;
  }
  
  // Função para adicionar novo texto
  function addText(canvas, text) {
    const ctx = canvas.getContext('2d');
    ctx.font = '20px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText(text, 50, 80); // Exemplo de coordenadas
    return canvas;
  }
  
  // Função principal para processar a imagem
  async function processImage(image) {
    // Detectar texto
    const detectedText = await detectText(image);
    console.log('Texto detectado:', detectedText);
  
    // Remover texto
    const canvas = removeText(image);
  
    // Adicionar novo texto
    const newText = 'Novo texto traduzido'; // Substitua pela tradução real
    addText(canvas, newText);
  
    // Substituir a imagem original pela nova imagem
    const newImage = new Image();
    newImage.src = canvas.toDataURL();
    image.parentNode.replaceChild(newImage, image);
  }
  
  // Iniciar o processo quando a página carregar
  window.onload = () => {
    const images = document.querySelectorAll('img');
    images.forEach(image => {
      processImage(image);
    });
  };