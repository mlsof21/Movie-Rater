export interface CRUD {
  list: (limit: number, page: number) => any;
  create: (resource: any) => string;
  deleteById: (resourceId: any) => string;
  patchById: (resource: any) => string;
  readById: (resourceId: any) => any;
  updateById: (resource: any) => string;
}
