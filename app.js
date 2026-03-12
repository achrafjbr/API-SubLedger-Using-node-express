const express = require('express');
const connectDb = require('./src/config/db');
const { PREFIX_ROUTE_PATH } = require('./src/utils/constants')
require('dotenv').config();

const app = express();

app.use(express.json());

//Connection establishement
connectDb();


//Routes...
app.use(`${PREFIX_ROUTE_PATH}/auth`, require('./src/routes/authenticationRouter')
.authenticationRouter)
app.use(`${PREFIX_ROUTE_PATH}/subscription`, require('./src/routes/subscriptionsRouter')
.subscriptionRouter);
app.use(`${PREFIX_ROUTE_PATH}/users`, require('./src/routes/userRouter').userRouter);


// Server.
app.listen(process.env.PORT || 3000, (err) => {
  if (!err) console.log("Server Starting...");
});