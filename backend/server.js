require('dotenv').config();

const app = require('./src/app');

const { sequelize } = require('./models');

const PORT = process.env.PORT || 5000;

(async () => {

    try {

        await sequelize.authenticate();

        console.log('Database Connected');

        app.listen(PORT, () => {

            console.log(`Server Running On Port ${PORT}`);

        });

    } catch (err) {

        console.log(err);

    }

})();