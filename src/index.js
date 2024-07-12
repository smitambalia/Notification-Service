const express = require("express");
const amqplib = require("amqplib");
const app = express();

const { ServerConfig } = require("./config");
const bodyParser = require("body-parser");
const port = ServerConfig.PORT;

const mailsender = require("./config/emailConfig");

const apiRouter = require("./routes");
// allow json / text as request parameters
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: true }));

async function connectQueue() {
  try {
    const queueName = "noti-queue";

    const connect = await amqplib.connect('amqp://127.0.0.1');

    const channel = await connect.createChannel();
    await channel.assertQueue(queueName);

    channel.consume(queueName, (data) => {
      console.log(`${Buffer.from(data.content)}`);
      channel.ack(data);
    });
  } catch (error) {
    console.log(error);
  }
}

app.use("/api", apiRouter);

app.listen(port, async () => {
  console.log(`Server is started on port ${port}`);

  await connectQueue();
});
