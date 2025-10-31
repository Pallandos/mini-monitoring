import { app } from './monitoring';

// importe et LANCE monitoring.ts

const port = 80;
app.listen(port, () => {
  console.log(`Monitoring server is live on http://localhost:${port}`);
});