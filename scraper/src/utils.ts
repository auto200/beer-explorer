import fs from "fs/promises";

export async function createDirsIfNotExists(path: string) {
  try {
    await fs.access(path);
  } catch {
    fs.mkdir(path, { recursive: true });
  }
}

export async function parseToJSONAndSaveToFile(path: string, data: any) {
  await fs.writeFile(path, JSON.stringify(data, null, 2));
}

export async function readJSONFromFile(path: string) {
  const buffer = await fs.readFile(path);
  return JSON.parse(buffer.toString());
}
