const CON = require('./connection/connect');
const PROMPTS = require('./prompts/prompts');

function init() {
    CON;
    PROMPTS();
}

init()