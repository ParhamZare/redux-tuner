import Dexie from 'dexie';
import Config from '../Config'
const db = new Dexie(Config.databaseName);
//TODO add realm

export const initDB = () => {
    return new Promise((resolve, reject) => {
        if (!db.isOpen()) {
            try {
                db
                    .version(1)
                    .stores({ "redux-db": `id,data` });
                resolve(true)
            } catch (e) {
                reject(e);
            }
        } else {
            console.warn("Can`t update database schema when database is open")
        }
    });
};

export const write = (collectionName, data) => {
    console.log("DEXIE", collectionName, data)
    return new Promise((resolve, reject) => {
        db.transaction("rw", db[collectionName], async () => {
            if ((await db[collectionName].where({ id: data.id }).count()) === 0) {
                db[collectionName].add(data);
                console.log("stored data", data, collectionName)
                resolve("stored")
            } else {
                db[collectionName]
                    .update(data.id, {
                        ...data
                    })
                    .then((response) => {
                        console.log(response);
                        resolve("updated")
                    });
            }
        }).catch((e) => {
            console.log("err", e)
            reject(e.stack || e)
        })
    });

};
export const get = (collectionName, id) => {
    return new Promise((resolve, reject) => {
        db[collectionName]
            .get(id, function (info) {
                resolve(info);
            });
    });

};
export const collection = (collectionName) => {

    return db[collectionName];

};

const DB = {
    initDB,
    write,
    collection,
    get
};
export default DB;
