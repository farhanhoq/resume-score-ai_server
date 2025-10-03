const express = require('express');
const cors = require('cors')
const app = express();
const PORT = 4000;

require('./conn');
app.use(express.json());
app.use(cors({
  credentials: true,
  origin: 'http://localhost:5173'
}));

const userRouter = require('./Routes/user');
const resumeRouter = require('./Routes/resume');

app.use('/api/user', userRouter);
app.use('/api/resume', resumeRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});