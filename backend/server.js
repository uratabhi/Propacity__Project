const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./utils/database');



//Models
const User = require('./models/userModel');
const Folder = require('./models/folderModel');
const File = require('./models/fileModel');



// Routes
const userRouter = require('./routes/userRoutes');
const folderRouter = require('./routes/folderRoutes');
const fileRouter = require('./routes/fileRoutes');


const bodyParser = require('body-parser');



const app = express(); 
app.use(cors());
dotenv.config();
const PORT = process.env.PORT || 5000;



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());




app.use("/", userRouter);
app.use('/api', folderRouter);
app.use(fileRouter);


sequelize.sync().then(() => {
  console.log('Database synchronized');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => {
  console.error('Unable to synchronize the database:', err);
});