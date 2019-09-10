import DB from './db'
import Helper from './Helper';
import HocComponent from './HocComponent'
import Config from './Config';

const updateImmutableState = (state, action) => {
    if (Helper.checkActionValidator(action)) {
        if (action.dontStoreInDB) {
            return;
        }
        let objectsOfAction = Object.keys(action);
        let generateKey = Helper.getUUID(action.type);
        let finalObject = {
            actionType: action.type
        };
        objectsOfAction.map((key, index) => {
            if (key !== "type") {
                finalObject[key] = {
                    data: action[key]
                };
                action[key] = generateKey + ">>" + key;
            }
            if (index <= objectsOfAction.length - 1) {
                if (Object.keys(finalObject).length > 1) {
                    Helper.storeNewStateToDB(generateKey, finalObject);
                }
            }
        });
        return state;
    }
    return state;
};

export const customStore = (reducer) => (state, action) => {
    const nextState = updateImmutableState(state, action);
    return reducer(nextState, action);
};
export const runService = (store) => {
    DB
        .initDB()
        .then(() => {
            DB
                .collection(Config.collectionName)
                .each((item) => {
                    let objects = Object.keys(item);
                    let parameters = {};
                    objects.map((key, index) => {
                        if ((key !== "id") && (key !== "actionType")) {
                            parameters[key] = item.id + ">>" + key;
                        }
                        if (index === objects.length - 1) {
                            console.log("DISPATCH", {
                                type: item.actionType,
                                dontStoreInDB: true,
                                ...parameters
                            })
                            store.dispatch({
                                type: item.actionType,
                                dontStoreInDB: true,
                                ...parameters
                            })
                        }
                    })

                })
        });
}

export const TransformComponent = HocComponent;
