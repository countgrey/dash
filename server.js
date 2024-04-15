const express = require('express');
const path = require('path'); // Import the path module for cleaner path handling

const app = express();

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname)));  // Absolute path for reliability

// Handle the root path ('/') by sending the 'index.html' file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));  // Specify full path to index.html
});

// Start the server and listen on port 3000 (or any desired port)
app.listen(3000, () => {
  console.log('Server listening on port 3000!');
});
