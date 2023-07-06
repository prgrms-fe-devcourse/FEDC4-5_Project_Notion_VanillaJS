export function baseEncode(text) {
    return btoa(encodeURIComponent(text));
}

export function baseDecode(text) {
    return decodeURIComponent(atob(text));
}
