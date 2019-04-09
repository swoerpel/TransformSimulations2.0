import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/transform-simulations', { useNewUrlParser: true, useCreateIndex: true });

var Tour = mongoose.model('Tour', {
  name: { type: String, index: { unique: true } },
  points: [{ x: Number, y: Number }],
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// POST
app.post("/tour", async (request, response) => {
  try {
    const tour = new Tour(request.body);
    const result = await tour.save();
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

// GET all
app.get("/tour", async (request, response) => {
  try {
    const result = await Tour.find().exec();
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

// GET by id
app.get("/tour/:id", async (request, response) => {
  try {
    const tour = await Tour.findById(request.params.id).exec();
    response.send(tour);
  } catch (error) {
    response.status(500).send(error);
  }
});

// DELETE by id
app.delete("/tour/:id", async (request, response) => {
  try {
    const result = await Tour.deleteOne({ _id: request.params.id }).exec();
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.listen(3000, () =>
  console.log('Example app listening on port 3000!'),
);