import express from "express";
import fs from "fs";
import bodyParser from "body-parser";

const app = express();
const PORT = 9000;

// Используем bodyParser для обработки JSON-данных
app.use(bodyParser.json());

// Разрешаем CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Функция для записи данных в файл с правильным форматированием JSON
function appendToFile(filename, data) {
    fs.readFile(filename, 'utf8', (err, fileData) => {
        if (err) {
            console.error(err);
            return;
        }

        let jsonContent = [];
        try {
            jsonContent = JSON.parse(fileData);
        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
        }

        jsonContent.push(data);

        fs.writeFile(filename, JSON.stringify(jsonContent, null, 2), (writeErr) => {
            if (writeErr) {
                console.error(writeErr);
                return;
            }
            console.log(`Data added to ${filename} successfully.`);
        });
    });
}

// Обработчик POST запроса для добавления данных в data1.json
app.post('/api/add1', (req, res) => {
    const newData = req.body;
    appendToFile('D:\\projects\\worTEK\\crud-app\\client\\src\\components\\AddData\\data1.json', newData);
    res.status(200).json({ message: 'Данные успешно добавлены в data1.json' });
});

// Обработчик POST запроса для добавления данных в data2.json
app.post('/api/add2', (req, res) => {
    const newData = req.body;
    appendToFile('D:\\projects\\worTEK\\crud-app\\client\\src\\components\\AddData\\data2.json', newData);
    res.status(200).json({ message: 'Данные успешно добавлены в data2.json' });
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
