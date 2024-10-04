// next.config.js
module.exports = {
  // Otras configuraciones...
  async rewrites() {
    return [
      // Reescribe las URLs para redirigir a las rutas correctas
      {
        source: "/old-route",
        destination: "/new-route",
      },
    ];
  },
  async redirects() {
    return [
      // Redirecciona rutas antiguas a nuevas rutas
      {
        source: "/old-page",
        destination: "/new-page",
        permanent: true,
      },
    ];
  },
  // Otras configuraciones opcionales...
};
