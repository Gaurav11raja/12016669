const express = require('express');
const axios = require('axios');

const app = express();
const port = 8008;

app.get('/numbers', async (req, res) => {
  const { url: urls } = req.query;

  if (!urls) {
    return res.status(400).json({ error: 'Missing query parameter "url"' });
  }

  const urlList = Array.isArray(urls) ? urls : [urls];

  const results = [];

  try {
    for (const url of urlList) {
      const response = await axios.get(url);
      results.push(response.data);
    }

    return res.json(results);
  } catch (error) {
    return res.status(500).json({ error: 'Error fetching data from URLs' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
