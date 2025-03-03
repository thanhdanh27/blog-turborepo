export type SignUpFormState = {
    data:{
        name?:string;
        email?:string;
        password?:string;
    };
    errors?:{
        name?:string[];
        email?:string[];
        password?:string[];
    };
    message?:string
} | undefined ;

export type CreateCommentFormState = {
    data?:{
        content?:string;
        postId?:number;
    };
    errors?:{
        content?:string[];
    };
    message?:string;
    ok?: boolean;
    
} | undefined;

export type PostFormState = {
    data?:{
        postId?:number;
        title?:string;
        content?:string;
        tags?:string;
        thumbnail?:File | null
        published?:string,
        previousThumbnail?: string 
    },
    errors?:{
        title?:string[];
        content?:string[];
        tags?:string[];
        thumbnail?:string[];
        published?:string[];
    }
    message?:string;
    ok?: boolean ;
} | undefined