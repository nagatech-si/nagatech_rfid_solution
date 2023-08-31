export function removeKeys(obj: any, keyToRemove: string): any {
  if (Array.isArray(obj)) {
    return obj.map(item => removeKeys(item, keyToRemove));
  } else if (typeof obj === 'object' && obj !== null) {
    const newObj: any = {};
    for (const key in obj) {
      if (key !== keyToRemove) {
        newObj[key] = removeKeys(obj[key], keyToRemove);
      }
    }
    return newObj;
  }
  return obj;
}