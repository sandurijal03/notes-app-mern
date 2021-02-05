import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

// importing routes
import userRouter from './apis/userRouter';
import notesRouter from './apis/notesRouter';

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(
  `${process.env.DB_URI}/${process.env.DB_NAME}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  (err) => {
    if (err) console.log(err.message);
    console.log('Database connected');
  },
);

app.use('/users', userRouter);
app.use('/api/notes', notesRouter);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log('server is running on PORT : ' + port));
