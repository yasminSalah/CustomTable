export class FilterDataRequestBody {
    pageNumber?: number | null;
    limit?: number | null;
    searchText?: string | null;


constructor(pageNumber:number,limit:number,searchText:string)
    {
        this.pageNumber=pageNumber;
        this.limit=limit;
        this.searchText=searchText;
    }
}