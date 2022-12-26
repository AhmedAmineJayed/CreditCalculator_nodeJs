import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import sequelize from './seq-db.js'

import client from './routes/client.js'
import credit from './routes/credit.js'

const app = express()
const PORT = 5000

app.use(bodyParser.json())
app.use(cors())

app.use('/client', client)
app.use('/credit', credit)

app.listen(PORT, () => console.log(`Server Running on port: http://localhost:${PORT}`))

sequelize.authenticate().then(() => {
   console.log('Connection has been established successfully.');
}).catch((error) => {
   console.error('Unable to connect to the database: ', error);
});