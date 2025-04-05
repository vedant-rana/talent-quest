export interface ICommonRepository {
  getUrlPath(fileName: string): string;

  deleteFileFromServer(fileName?: string): void;
}
