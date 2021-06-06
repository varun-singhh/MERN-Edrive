import express from 'express';
import bodyParser, { json, urlencoded } from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts.js';
import swaggerUi from 'swagger-ui-express';
import { readFile } from 'fs/promises';
const swaggerDocument = JSON.parse(
  await readFile(new URL('./swagger.json', import.meta.url))
);

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

app.use('/posts', postRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
const CONNECTION_URL =
  'mongodb+srv://varun-singhh:varun123@cluster0.nh6fr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;
mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server Running on Port ${PORT}`);
    })
  )
  .catch((err) => console.log(err));
mongoose.set('useFindAndModify', false);
