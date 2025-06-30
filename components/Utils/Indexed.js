const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

export const OpenDB = () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("authGameUltra", 2);

        console.log("Abriendo la base de datos...", request);

        request.onupgradeneeded = function (event) {
            const db = event.target.result;

            console.log("onupgradeneeded ...");

            if (!db.objectStoreNames.contains("tokenStore")) {
                db.createObjectStore("tokenStore", { keyPath: "id" });
            }

            if (!db.objectStoreNames.contains("gameStore")) {
                db.createObjectStore("gameStore", { keyPath: "id" });
            }

            if (!db.objectStoreNames.contains("metodoPago")) {
                db.createObjectStore("metodoPago", { keyPath: "id" });
            }

            console.log("IndexedDB inicializado correctamente");
        };

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject("Error al abrir la base de datos");
    });

};

export const saveToken = async (token) => {
    try {
        const db = await OpenDB();
        const transaction = db.transaction("tokenStore", "readwrite");
        const store = transaction.objectStore("tokenStore");

        store.put({ id: "sessionToken", value: token });

        console.log("Token guardado en IndexedDB:", token);
    } catch (error) {
        console.error("Error al guardar el token:", error);
    }
};


export const getToken = async () => {
    try {
        const db = await OpenDB();
        const transaction = db.transaction("tokenStore", "readonly");
        const store = transaction.objectStore("tokenStore");

        const getRequest = store.get("sessionToken");

        return new Promise((resolve, reject) => {
            getRequest.onsuccess = () => {
                resolve(getRequest.result ? getRequest.result.value : null);
            };

            getRequest.onerror = () => {
                reject("Error al obtener el token desde IndexedDB");
            };
        });
    } catch (error) {
        console.error("Error al abrir la base de datos:", error);
        return null;
    }
};

export const addItem = async (item) => {
    try {
        console.log('item...', item);
        const db = await OpenDB();
        const transaction = db.transaction("gameStore", "readwrite");
        const store = transaction.objectStore("gameStore");
        store.put({ id: item._id, value: item });
    } catch (error) {
        console.error("Error al guardar el item en IndexedDB:", error);
    }
}

export const deleteItem = async (id) => {
    try {
        const db = await OpenDB();
        const transaction = db.transaction("gameStore", "readwrite");
        const store = transaction.objectStore("gameStore");
        store.delete(id);
    } catch (error) {
        console.error("Error al eliminar el item de IndexedDB:", error);
    }
}

export const getItem = async (id) => {
    try {
        const db = await OpenDB();
        const transaction = db.transaction("gameStore", "readonly");
        const store = transaction.objectStore("gameStore");
        const getRequest = store.get(id);

        return new Promise((resolve, reject) => {
            getRequest.onsuccess = () => {
                resolve(getRequest.result ? getRequest.result.value : null);
            };

            getRequest.onerror = () => {
                reject("Error al obtener el item desde IndexedDB");
            };
        });
    } catch (error) {
        console.error("Error al abrir la base de datos:", error);
        return null;
    }
};

export const devuelveMetodoDePago = async () => {
    const metodoPagoInicial = [
        { id: 'Binance', image: 'pay-binance.png', email: 'prueba@prueba.com' },
        { id: 'Paypal', image: 'pay-paypal.png', email: 'prueba@prueba.com' },
        { id: 'Zelle', image: 'pay-zelle.png', email: 'prueba@prueba.com' },
        { id: 'Zinli', image: 'pay-zinli.png', email: 'prueba@prueba.com' },
    ];

    try {
        const db = await OpenDB();
        const transaction = db.transaction("metodoPago", "readonly");
        const store = transaction.objectStore("metodoPago");
        const getRequest = store.getAll();

        return new Promise(async (resolve, reject) => {
            getRequest.onsuccess = async () => {
                if (getRequest.result && getRequest.result.length > 0) {
                    resolve(getRequest.result);
                } else {
                
                    const transactionInsert = db.transaction("metodoPago", "readwrite");
                    const storeInsert = transactionInsert.objectStore("metodoPago");

                    for (const metodo of metodoPagoInicial) {
                        storeInsert.put({ id: metodo.id, image: metodo.image, email: metodo.email });
                    }

                    await transactionInsert.done;

                    const getRequestAgain = store.getAll();

                    getRequestAgain.onsuccess = () => {
                        resolve(getRequestAgain.result ? getRequestAgain.result.value : null);
                    };

                    getRequestAgain.onerror = () => {
                        reject("Error al obtener el metodo de pago después de la inserción desde IndexedDB");
                    };
                }
            };

            getRequest.onerror = () => {
                reject("Error al obtener el metodo de pago inicial desde IndexedDB");
            };
        });
    } catch (error) {
        console.error("Error al abrir la base de datos:", error);
        return null;
    }
};

export const getAllGames = async () => {
    try {
        const db = await OpenDB();
        const transaction = db.transaction("gameStore", "readonly");
        const store = transaction.objectStore("gameStore");
        const getRequest = store.getAll();

        return new Promise(async (resolve, reject) => {
            getRequest.onsuccess = async () => {
                if (getRequest.result && getRequest.result.length > 0) {
                    resolve(getRequest.result);
                } else {
                    resolve(null);
                }
            };

            getRequest.onerror = () => {
                reject("Error al obtener el item desde IndexedDB");
            };
        });
    } catch (error) {
        console.error("Error al abrir la base de datos:", error);
        return null;
    }
};

export const countGames = async () => {
    try {
        const db = await OpenDB();
        const transaction = db.transaction("gameStore", "readonly");
        const store = transaction.objectStore("gameStore");
        const getRequest = store.count();

        return new Promise((resolve, reject) => {
            getRequest.onsuccess = () => {
                resolve(getRequest.result ? getRequest.result : 0);
            };

            getRequest.onerror = () => {
                reject("Error al obtener el item desde IndexedDB");
            };
        });
    } catch (error) {
        console.error("Error al abrir la base de datos:", error);
        return null;
    }
};

export const deleteAll = async () => {
    try {
        const db = await OpenDB();
        const transaction = db.transaction("gameStore", "readwrite");
        const store = transaction.objectStore("gameStore");
        store.clear();
    } catch (error) {
        console.error("Error al borrar todos los items de IndexedDB:", error);
    }
}