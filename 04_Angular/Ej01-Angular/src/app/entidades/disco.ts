
export class Vynilo{
    constructor(public id:number=null,
                public cantante:string=null,
                public year:string=null,
                public titulo:string=null,
                public grupo:string=null

        ){
            if(!id)
            this.id=Math.round(Math.random()*10000);

    }
}