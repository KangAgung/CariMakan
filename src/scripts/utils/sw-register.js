const swRegister = async () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
        .then(() => {
          console.log('Service worker registered.');
        }).catch(() => {
          console.log('Service Worker not registered');
        });
    });
  } else {
    console.log('Service Worker not Supported.');
  }
};

export default swRegister;
