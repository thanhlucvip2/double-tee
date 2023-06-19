export class ResponsePagination<T> {
	pageIndex: number;
	pageSize: number;
	total: number;
	data: T[];
	constructor({
		pageIndex,
		pageSize,
		total,
		data,
	}: {
		pageIndex: number;
		pageSize: number;
		total: number;
		data: T[];
	}) {
		this.pageIndex = pageIndex;
		this.pageSize = pageSize;
		this.total = total;
		this.data = data;
	}
}
