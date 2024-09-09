const express = require('express');
const path = require('path');
const sequelize = require('./config/db'); // a sequelize connection to the Database

//creating express server named app
const app = express();

//serve static files from the "frontend/public" directory
app.use(express.static(path.join(__dirname, '../frontend/public')));

// Setting the port using environment variable or default to 3000
const PORT = process.env.PORT || 3000;

// Space to import routes once they are created

// Express body parser (built-in)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());  // This handles JSON body parsing as well


// Sync Sequelize models with the database
sequelize.sync()
  .then(() => {
    console.log('Connected to the AWS RDS database successfully.');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
