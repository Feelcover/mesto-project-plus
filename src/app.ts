const { MongoClient } = require("mongodb");

const url = "";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const client = new MongoClient(url, options);

client.connect(function (err: any) {
  if (err) {
    console.log("Ошибка подключения к базе данных:", err);
    return;
  }
  console.log("Успешное подключение к базе данных");

});
