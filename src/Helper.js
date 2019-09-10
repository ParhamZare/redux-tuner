import { Config } from './Config'
import DB from "./db";
const uuidv3 = require('uuid/v3');

const Helper = {
    checkActionValidator: (action) => {
        return ((!action.type.toString().startsWith("@@redux")) && Config.blackList.indexOf(action.type) < 0);
    },
    checkIsValidUUID: (str) => {
        const regex = /^[0-9A-F]{8}-[0-9A-F]{4}-[3][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
        return regex.exec(str) !== null;
    },
    getUUID: (key, type = uuidv3.DNS) => {
        return uuidv3(key, type)
    },
    storeNewStateToDB: (key, data) => {
        DB.write(Config.collectionName, {
            id: key,
            ...data
        })
    },
    getDataWithKeyFromDB: (key) => {
        return new Promise((resolve, reject) => {
            DB
                .get(Config.collectionName, key)
                .then((result) => {
                    resolve(result.data)
                })
                .catch((err) => { })
        })
    },
    getTransformedData: (state) => {
        return new Promise((resolve, reject) => {

            if (typeof state === "object") {
                let clonedObject = Object.assign({}, state);
                let items = Object.keys(state);
                items.map((key, index) => {
                    if (state[key] && typeof state[key] === 'string' && state[key].includes(">>")) {
                        let values = state[key].split(">>");
                        if (Helper.checkIsValidUUID(values[0])) {
                            Helper
                                .getDataWithKeyFromDB(values[0])
                                .then((result) => {
                                    clonedObject[values[1]] = result.data;
                                    if (index <= items.length - 1) {
                                        resolve(clonedObject);
                                    }
                                })
                        } else {
                            if (index <= items.length) {
                                resolve(clonedObject);
                            }
                        }
                    } else {
                        if (index <= items.length) {
                            resolve(clonedObject);
                        }
                    }
                });
            } else {
                resolve(state);
            }


        })
    }
}

export default Helper