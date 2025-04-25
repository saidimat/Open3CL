
const http = require('http');
const { simulateDPE } = require('./Open3CL-main/index.js');

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/dpe') {
    let body = '';
    req.on('data', chunk => (body += chunk));
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        const result = simulateDPE({
          surface: data.surface,
          chauffage: data.chauffage,
          isolation: data.isolation
        });
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(result));
      } catch (e) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Erreur de calcul DPE' }));
      }
    });
  } else {
    res.writeHead(404);
    res.end();
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Serveur DPE prêt sur le port ${PORT}`);
});
