const express = require('express');
const app = express();
const authApi = require('./APIs/authApi');
const adminApi = require('./APIs/adminApi');
const userApi = require('./APIs/userApi');
const authorApi = require('./APIs/authorApi');

app.use(express.json());

app.use('/auth-api', authApi);
app.use('/admin-api', adminApi);
app.use('/user-api', userApi);
app.use('/author-api', authorApi);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});