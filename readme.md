# VK groups searcher


- Выгрузка в формате __xlsx__ и __txt__
- Поиск по нескольким запросам
- Кастомизация имени файлов

___
## Установка

Нужен [Node.js](https://nodejs.org/) v10+ версии для запуска.

1. Клонируем проект
```sh
git clone git@github.com:z3nnik/vk-groups-search.git
```

2. Переходим в проект и устанавливаем зависимости
```sh
npm i
```
___
## Настройка

1. Переходим в файл __Config.js__ в корне проекта
```js
    static access_token = '';
    static api_v = '5.200';
```
2. В __access_token__ вставляем токен с правами на __groups__

3. Переходим в файл __index.js__. Он имеет такую структуру:
```js
const Searcher = require("./helpers/Searcher");

new Searcher([ "API", "ВКонтакте" ], "SomeName").getGroups().then(console.log);
```

Где 
```js
[ "API", "ВКонтакте" ]
```
Это список __запросов__ для поиска

А
```js
"SomeName"
```
это название для файлов, в которых будет сохранена информация о группах.
(SomeName.txt и SomeName.xlsx)

___

Делаем 
```sh
node index.js
```

И радуемся жизни