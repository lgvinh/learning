export interface BaseInterface {
  createAndSave(Entity: any): Promise<any>;
  getPagination(limit?: number, skip?: number, keyword?: string): Promise<any>;
  getById(id: number): Promise<any>;
}
