const express =     require('express');
const mongoose =   require('mongoose');
const app =         express();
const env =         require('dotenv');
const requestLogger = require('./middleware/requestLogger');
const responseLogger = require('./middleware/responseLogger');
const errorHandler = require('./middleware/errorHandler');    
env.config();    
const cors =        require('cors');
const bodyParser =   require('body-parser');
const port =         process.env.PORT || 8000;
const userRoutes =   require('./routes/user');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(responseLogger);
app.get('/', (req, res) => {
    res.status(200).json({message : 'Hello from server!',});
});
app.use('/user', userRoutes);
app.use(errorHandler)
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log('Connected to MongoDB');
        })
        .catch((err) => {
            console.error('MongoDB connection error:', err);
        });
});