export function serializeData<T>(data: T): T {
  return JSON.parse(JSON.stringify(data));
}
