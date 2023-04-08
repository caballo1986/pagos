"use strict";
import express from 'express';
import fetch from 'node-fetch';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import esm from 'esm';
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('¡Hola, mundo!')
})

app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto http://localhost:3000/')
})
const api_key = 'TU_API_KEY'; // Reemplaza con tu propia API Key

app.post('/card-debit-request', async (req, res) => {
  const { description, amount, month, year, card_adhesion_id } = req.body;
  const url = 'https://api.pagos360.com/card-debit-request';

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${api_key}`
      },
      body: JSON.stringify({
        card_debit_request: {
          description,
          amount,
          month,
          year,
          card_adhesion_id
        }
      })
    });

    const json = await response.json();
    res.status(response.status).json(json);
  } catch (err) {
    res.status(500).send(err.message);
  }
});