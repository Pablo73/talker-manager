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

module.exports = {
    getManager,
    getManagerId,
};