export interface CRUD {
  list: (limit: number, page: number) => any;
  create: (resource: any) => any;
  deleteById: (resourceId: any) => any;
  patchById: (resource: any) => any;
  readById: (resourceId: any) => any;
  updateById: (resource: any) => any;
}
