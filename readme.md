# VK groups searcher


- Выгрузка в формате `xlsx` и `txt`
- Поиск по нескольким запросам
- Кастомизация имени файлов

___
## Установка

Нужен [Node.js](https://nodejs.org/) v10+ версии для запуска.

1. Клонируем проект
```sh
git clone git@github.com:z3nnik/vk-groups-searcher.git
```

2. Переходим в проект и устанавливаем зависимости
```sh
npm i
```
___
## Настройка

1. Переходим в файл __Config.js__ в корне проекта
```js
static access_token = "***";
static api_v = "5.134";
```
2. В `access_token` вставляем токен с правами на **groups**

3. Переходим в файл `index.js`. Он имеет такую структуру:
```js
const Searcher = require("./helpers/Searcher");

new Searcher([ "API", "ВКонтакте" ], "SomeName").getGroups().then(console.log);
```

Список **запросов** для поиска:
```js
[ "API", "ВКонтакте" ]
```

Название для файлов, в которых будет сохранена информация о группах:
```js
"SomeName"
```
На выходе получится `SomeName.txt` и `SomeName.xlsx`

___

## Запуск
```sh
node index.js
```
