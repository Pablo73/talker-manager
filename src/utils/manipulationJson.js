const fs = require('fs').promises;
const path = require('path');

const json = '../talker.json';

async function getManager() {
    try {
        const allManager = await fs.readFile(path.resolve(__dirname, json));
        const data = await JSON.parse(allManager);
        return data;
} catch (error) {
        console.error(`Erro na leitura do arquivo ${error}`);
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
        let stringAleatoria = '';
        const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 16; i += 1) {
            stringAleatoria += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
        }
        return stringAleatoria;
}

async function postManager(event) {
    const oldManagers = await getManager();
    const newManagers = { id: oldManagers.length + 1, ...event };
    const allManagers = JSON.stringify([
        ...oldManagers, newManagers,
    ], null, 2);

    try {
        await fs.writeFile(path.resolve(__dirname, json), allManagers);
        return newManagers;
} catch (error) {
        console.log(`Erro na leitura do arquivo ${error}`);
    }
}

async function putManager(id, updateMovie) {
    const allMAnager = await getManager();
        const updateManager = { id, ...updateMovie };

        const upDate = allMAnager.reduce((add, curr) => {
            if (+curr.id === +updateManager.id) {
                return [...add, updateManager];
            }
            return [...add, curr];
        }, []);
        const newJson = JSON.stringify(upDate, null, 2);

    try {
        await fs.writeFile(path.resolve(__dirname, json), newJson);
        return updateManager;
} catch (error) {
        console.log(`Erro na leitura do arquivo ${error}`);
    }
}

async function deleteManager(id) {
    const allMAnager = await getManager();
    const isManagerDelete = allMAnager.filter((movie) => +movie.id !== +id);
    const newJson = JSON.stringify(isManagerDelete, null, 2);
    try {
        await fs.writeFile(path.resolve(__dirname, json), newJson);
        return isManagerDelete;
} catch (error) {
        console.log(`Erro na leitura do arquivo ${error}`);
    }
}

async function searchTermManager(q, rate, date) {
    const allManager = await getManager();
   const filterSearch = allManager
   .filter((eleQ) => (q ? eleQ.name.indexOf(q) !== -1 : eleQ))
   .filter((eleRate) => (rate ? +eleRate.talk.rate === +rate : eleRate))
   .filter((eleDate) => (date ? eleDate.talk.watchedAt === date : eleDate));
   return filterSearch;
}

async function patchManager(id, value) {
    const allManager = await getManager();
    const patch = allManager.map((ele) => (+ele.id === +id ? value : ele));
    const allManagers = JSON.stringify(patch, null, 2); 
    try {
        await fs.writeFile(path.resolve(__dirname, json), allManagers);
} catch (error) {
        console.log(`Erro na leitura do arquivo ${error}`);
    }
}

module.exports = {
    getManager,
    getManagerId,
    generatingToken,
    postManager,
    putManager,
    deleteManager,
    searchTermManager,
    patchManager,
};