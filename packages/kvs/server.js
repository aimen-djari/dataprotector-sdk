const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 4000;

app.use(cors());
app.use(bodyParser.json());

// In-memory KVS
const kvs = {};

// Get hosts by dataset address
app.get('/kvs/:address', (req, res) => {
  const address = req.params.address;
  const hosts = kvs[address];
  if (hosts) {
    res.json({ hosts });
  } else {
    res.status(404).json({ error: 'Dataset not found' });
  }
});

// Add a new host to the list for a dataset address
app.post('/kvs', (req, res) => {
  const { address, host } = req.body;

  // Validate the host object
  if (!host || !host.timestamp || !host.ip || !host.port) {
    return res.status(400).json({ error: 'Invalid host object' });
  }

  // Initialize the dataset if it doesn't exist
  if (!kvs[address]) {
    kvs[address] = [];
  }

  // Add the new host to the dataset
  kvs[address].push(host);
  console.log('Host added successfully:', address, host);
  res.status(200).json({ message: 'Host added' });
});

app.listen(port, () => {
  console.log(`KVS server running at http://localhost:${port}`);
});
