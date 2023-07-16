//function to exclude a field from prisma model
export function excludeFields<T extends {}, K extends keyof T>(
  input: { fields: K[] },
  data: T
): T {
  let validKeys = input.fields;
  let dataCopy: T = { ...data };
  for (let key of validKeys) {
    delete dataCopy[key];
  }
  return dataCopy as T;
}
