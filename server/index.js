const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Test Server
app.get('/', (req, res) => {
  res.send('Welcome to TerraCanvas!');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

app.use((err, req, res, next) => {
  res.status(500).send('Something broke!');
});

// 서버 시작 부분을 주석 처리합니다.
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

module.exports = app; // app 객체를 내보냅니다.
