import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { ICommonRepository } from "../interfaces/ICommonRepository.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const CommonRepository: ICommonRepository = {
  getUrlPath(fileName: string): string {
    return `uploads/logos/${fileName}`;
  },

  deleteFileFromServer(filePath?: string): void {
    if (filePath) {
      const serverFilePath = path.join(__dirname, "../..", filePath);

      fs.unlink(serverFilePath, (err) => {
        if (err) {
          console.error(`Error deleting file: ${filePath}`, err);
        } else {
          console.log(`File deleted: ${filePath}`);
        }
      });
    }
  },
};
