import fs from "fs/promises";

export async function createDirsIfNotExists(path: string) {
  try {
    await fs.access(path);
  } catch {
    fs.mkdir(path, { recursive: true });
  }
}

export async function saveToFile(path: string, data: any) {
  await fs.writeFile(path, JSON.stringify(data, null, 2));
}
