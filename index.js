const Searcher = require("./helpers/Searcher");

new Searcher([ "API", "ВКонтакте" ], "SomeName").getGroups().then(console.log);