import data from "$lib/cost.json";


export function levelToCrystal(level) {
    if (!(level > 0)) {
        return 0;
    }
    const maxLevel = Object.keys(data).length;
    if (level > maxLevel) {
    return maxLevel;
    }
    return data[level]["cumulative"];
}

export function crystalToLevel(crystal) {
    const maxLevel = Object.keys(data).length;
    for (let key of Object.keys(data)) {
    let record = data[key];
    if (record["cost"] === 0) {
        continue;
    }
    if (crystal < record["cumulative"]) {
        return key - 1;
    }
    }
    return maxLevel;
}
