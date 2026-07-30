const express = require('express');
const cors = require('cors');

const authRoutes = require('./modules/auth/auth.routes');
const userRoutes = require('./modules/users/user.routes');
const academyRoutes = require('./modules/academies/academy.routes');
const courseRoutes = require('./modules/courses/course.routes');


const notFound = require('./middlewares/notFound');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Online School API'
    });
});

// ===== API Routes =====
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/academies', academyRoutes);
app.use('/api/courses',courseRoutes);


// ===== 404 =====
app.use(notFound);

// ===== Error Handler =====
app.use(errorHandler);

module.exports = app;