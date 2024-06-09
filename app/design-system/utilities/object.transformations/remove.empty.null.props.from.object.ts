/* eslint-disable @typescript-eslint/no-unsafe-assignment -- This is an operation manipulates an object and remove empty props from it therefore this unsafe operation is required*/
/* eslint-disable @typescript-eslint/no-unsafe-member-access -- This is an operation manipulates an object and remove empty props from it therefore this unsafe operation is required */
/* eslint-disable @typescript-eslint/no-explicit-any -- This is an operation manipulates an object and remove empty props from it therefore this unsafe operation is required */
export const removeEmptyOrNullPropsFromObject = <T extends object>(
  obj: T
): T => {
  const newObj: any = {};
  Object.entries(obj).forEach(([k, v]) => {
    if (k !== '__typename') {
      if (v === Object(v) && !Array.isArray(v)) {
        newObj[k] = removeEmptyOrNullPropsFromObject(v);
      } else if (v === Object(v) && Array.isArray(v)) {
        const finalArr: any[] = [];
        v.forEach((item) => {
          finalArr.push(removeEmptyOrNullPropsFromObject(item));
        });
        newObj[k] = finalArr;
      } else if (v !== null || v !== undefined) {
        newObj[k] = (obj as any)[k];
      }
    }
  });

  return newObj as T;
};
