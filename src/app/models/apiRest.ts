export class ApiResponse<type>{
    msg:string = '';
    data:type[]=[];
    success:boolean = false;
    isFailed:boolean = false;
}