import express from  'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello from the Orchestrator!');
});

app.listen(port, () => {
  console.log(`Orchestrator listening at http://localhost:${port}`);
});