import { defaultUserName } from '../constants/defaultValue.js';
import { baseDecode, baseEncode } from './baseEncode.js';

const storage = window.localStorage;
export const getItem = (key) => {
    try {
        const storedValue = storage.getItem(key);
        return storedValue
            ? baseDecode(JSON.parse(storedValue))
            : baseDecode(defaultUserName);
    } catch (e) {
        return baseDecode(defaultUserName);
    }
};

export const setItem = (key, value) => {
    storage.setItem(key, JSON.stringify(baseEncode(value)));
};
