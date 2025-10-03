const express = require('express');
const app = express();
const PORT = 3000;

require('./conn');

const userRouter = require('./Routes/user');

app.use(express.json());
app.use('/api/user', userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});