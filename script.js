let mediaRecorders = [];
let recordedBlobs = [];

function startRecording(button, index) {
  const cameraBox = button.closest(".camera-box");

  navigator.mediaDevices.getDisplayMedia({ video: true, audio: false })
    .then((stream) => {
      const mediaRecorder = new MediaRecorder(stream);
      recordedBlobs[index] = [];
      mediaRecorders[index] = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedBlobs[index].push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const superBuffer = new Blob(recordedBlobs[index], { type: 'video/webm' });
        const url = window.URL.createObjectURL(superBuffer);
        const a = document.createElement('a');
        a.href = url;
        a.download = `gravacao_camera_${index + 1}.webm`;
        a.click();
      };

      mediaRecorder.start();

      setTimeout(() => {
        mediaRecorder.stop();
      }, 10000); // grava por 10 segundos

      button.innerText = "Gravando...";
      button.disabled = true;
    });
}

// Alerta visual de movimento (simulado)
setInterval(() => {
  const alerts = document.querySelectorAll('.alert');
  alerts.forEach(alert => {
    if (Math.random() > 0.8) {
      alert.style.display = 'block';
      setTimeout(() => alert.style.display = 'none', 2000);
    }


    if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(() => console.log('Service Worker registrado'))
    .catch(error => console.log('Erro no SW:', error));
}
  });
}, 3000);

