const fs = require('fs').promises;
const path = require('path');

async function getManager() {
    try {
        const allManager = await fs.readFile(path.resolve(__dirname, '../talker.json'));
        const data = await JSON.parse(allManager);
        return data;
} catch (error) {
        console.log(`Erro na leitura do arquivo ${error}`);
    }
}

async function getManagerId(id) {
    try {
        const allMAnager = await getManager();
        const capturingId = allMAnager.filter((ele) => +ele.id === +id);
        return capturingId;
} catch (error) {
        console.log(`Erro na leitura do arquivo ${error}`);
    }
}

async function generatingToken() {
    try {
        const token = Math.random().toString(11).substr(2);
        return token;
} catch (error) {
        console.log(`Erro na leitura do arquivo ${error}`);
    }
}

async function postManager(event) {
    const oldManagers = await getManager();
    const newManagers = { id: oldManagers.length + 1, ...event };
    const allManagers = JSON.stringify([
        ...oldManagers, newManagers,
    ], null, 2);

    try {
        await fs.writeFile(path.resolve(__dirname, '../talker.json'), allManagers);
        return newManagers;
} catch (error) {
        console.log(`Erro na leitura do arquivo ${error}`);
    }
}

module.exports = {
    getManager,
    getManagerId,
    generatingToken,
    postManager,
};