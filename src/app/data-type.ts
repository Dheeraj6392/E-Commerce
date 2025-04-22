export interface SignUp{
    name : string,
    password : string,
    email : string
}

export interface login{
   email : string;
    password : string;
}
export interface product{
    name : string ,
    price : number,
    color : string,
    category : string ,
    description : string ,
    image : string ,
    id : number
}


export interface cart{
    name:string,
    price:number,
    category:string,
    color:string,
    image:string,
    description:string,
    id:number| undefined,
    quantity:undefined | number,
    productId:number,
    userId:number
  }