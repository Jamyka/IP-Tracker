const LoaderPlugin = {
  install(app) {
    app.config.globalProperties.$loader = {
      show() {
        // Show the loader element
        const loaderElement = document.getElementById('loaderContainer');
        loaderElement.style.display = 'flex';
        loaderElement.classList.remove('fade-out');
        loaderElement.classList.add('fade-in');
      },
      hide() {
        // Hide the loader element
        const loaderElement = document.getElementById('loaderContainer');
        loaderElement.classList.remove('fade-in');
        loaderElement.classList.add('fade-out');
        loaderElement.style.display = 'none';
      }
    };
  }
};

export default LoaderPlugin;
