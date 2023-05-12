export class ResponsePagination<T> {
  pageIndex: number;
  pageSize: number;
  total: number;
  items: T[];
  constructor({
    pageIndex,
    pageSize,
    total,
    items,
  }: {
    pageIndex: number;
    pageSize: number;
    total: number;
    items: T[];
  }) {
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;
    this.total = total;
    this.items = items;
  }
}
