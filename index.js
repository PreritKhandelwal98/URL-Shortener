const express = require('express');
const PORT = 8100;

const app = express();



app.listen(PORT, () => {
    console.log(`Server is running on the port ${PORT}`)
})