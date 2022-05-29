const Config = require("../Config");

const axios = require("axios");
const json2xls = require("json2xls");
const { stringify } = require("querystring");

const util = require("util");
const fs = require("fs");


class Searcher {
    constructor(queries = [], file_name = "default") {
        this.queries = queries;
        this.file_name = file_name;
    }

    api = async (method, parameters = {}) => {
        try {
            const { data } = await axios.post(`https://api.vk.com/method/${ method }`, stringify({
                access_token: Config.access_token, v: Config.api_v, ...parameters,
            }));
            return data;
        } catch (err) {
            throw (typeof err === "object" ? JSON.stringify(err) : err);
        }
    };

    sleep = (milliseconds = 0) => {
        return util.promisify(setTimeout)(milliseconds);
    };

    Error = (message = "Unknown error") => {
        throw new Error(util.inspect(message));
    };

    unique = (array = []) => {
        let seen = {};
        return array.filter(function (item) {
            let k = JSON.stringify(item);
            return seen.hasOwnProperty(k) ? false : (seen[k] = true);
        });
    };

    getGroups = async () => {
        if (!this.queries) this.Error("Не обнаружено поисковых запросов");
        let allGroups = [];
        let i = 1;
        for (const query of this.queries) {
            const { response, error } = await this.api("groups.search", {
                sort: 2, q: query, count: 1000, offset: 0
            });

            if (error) this.Error(error["error_msg"] || error);

            allGroups = [ ...allGroups, ...response.items ];

            console.log(`[${ i++ }/${ this.queries.length }] ${ query }`);

            await this.sleep(333);
        }

        allGroups = this.unique(allGroups);

        const allGroupsTxt = [];
        const allGroupsXls = [];

        for (const { id, is_closed, name } of allGroups) {
            allGroupsTxt.push(`https://vk.com/club${ id } -- ${ name }`);

            allGroupsXls.push({
                "Link": `https://vk.com/club${ id }`, "ID": id, "Name": name, "Closed?": !is_closed ? "Нет" : "Да",
            });
        }

        if (!fs.existsSync("./txt")) fs.mkdirSync("./txt");
        if (!fs.existsSync("./xls")) fs.mkdirSync("./xls");

        const xls = json2xls(allGroupsXls);
        const txt = allGroupsTxt.join("\n");

        fs.writeFileSync(`./txt/${ this.file_name }.txt`, txt);
        fs.writeFileSync(`./xls/${ this.file_name }.xlsx`, xls, "binary");

        return `Успешно получен список групп по запросам '${ String(this.queries) }'. Количество -- ${ allGroups.length }` + `\n Сформированы файлы ${ this.file_name }.txt и ${ this.file_name }.xlsx`;
    };
}

module.exports = Searcher;