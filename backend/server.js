"use strict";
const express = require("express");
const fs = require("fs");
const cors =require("cors");
const app = express();

//разрешили запросы с других сайтов
app.use(cors());
//включили раскодирование входящих запросов из JSON
app.use(express.json());
app.get("/", (req, res) =>{ //get - получить данные (фронт говорит дай мне данные см axios запрос)
    fs.readFile(__dirname + "/notes.json", "utf-8", (err, data) =>{
       if (err) return res.send("Ошибка при загрузке данных");
       //заголовок ответа сервера который сообщает клиенту что пришли данные в JSON и еодировке utf-8
       res.setHeader("Content-type", "application/json;charset=utf-8");
       //отправили данные в формате jsom
        return res.send(data);
    });
});

//если с фронта будет запрос GET --- то бэк отправит запрос POST

app.post("/", (req, res) =>{ //post - отправить данные (фронт говорит - держи данные)
    //!!! - в продакшене такое использовать нельзяБ мы сохроняем данные не проверив их!
    let data = JSON.stringify(req.body);//то что пришло из фронат (массив заметок) - мы его переводим в JSON
    fs.writeFile(__dirname + "/notes.json", data, (err) =>{
        if (err) return res.json({status: "fail", message: "Не удалось сохранить данные"});
        return  res.json({status: "ok", message: "Заметки успешно сохранены"});
    });
    // console.log(req.body); //вывод только двнных с фронта
    // res.json({status: "ok", message: "Заметки успешно сохранены"});
});

app.listen(9000, () =>{ //    запускаем     http://localhost:9000/
    console.log("Сервер запущен!")
});

//npm i cors - установка (политика одного источника) / модуль для експресса что бы разрешить запросы