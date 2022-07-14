const express= require('express');
const app = express();
app.use(express.json());
const db = require('./models');

const ideaRouter = require('./routes/Ideas');
app.use("/ideas", ideaRouter);

db.sequelize.sync().then(()=>{
    app.listen(3001, ()=>{
        console.log("Server running");
    })
})
