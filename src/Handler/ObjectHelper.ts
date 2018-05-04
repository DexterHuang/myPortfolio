
export class ObjectHelper {

    static equal(obj1: any, obj2: any) {
        const keys1 = Object.keys(obj1);
        const keys2 = Object.keys(obj2);
        if (keys1.length === keys2.length) {
            for (let i = 0; i < keys1.length; i++) {
                if (keys1[i] === keys2[i]) {
                    const key = keys1[i];
                    if (obj1[key] !== obj2[key]) {
                        return false;
                    }
                } else {
                    return false;
                }
            }
            return true;
        }
        return false;
    }
}