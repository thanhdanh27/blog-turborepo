"use server"

import { fetchGraphQL } from "@/lib/fetchGraphQl";
import { CREAT_USER_MUTATION, SIGN_IN_MUTATION } from "@/lib/gqlQueries";
import { createSession } from "@/lib/session";
import { SignUpFormState } from "@/lib/types/formState";
import { SignInFormSchema } from "@/lib/zodSchemas/signInFormSchema";
import { SignUpFormSchema } from "@/lib/zodSchemas/signUpFormSchema";
import {print} from "graphql"
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function signUp(state: SignUpFormState, formData: FormData): Promise<SignUpFormState>{
    const validateFields = SignUpFormSchema.safeParse(Object.fromEntries(formData.entries()))
    if(!validateFields.success)
        return {
            data:Object.fromEntries(formData.entries()),
            errors: validateFields.error.flatten().fieldErrors,
    };

    const data = await fetchGraphQL(print(CREAT_USER_MUTATION),{
        input:{
            ...validateFields.data
        }
    });

    if(data.errors) 
    return {
        data:Object.fromEntries(formData.entries()),
        message: "Something went wrong"
        }   

    redirect("/auth/signin")
    
}

export async function signIn(state:SignUpFormState, formData:FormData):Promise<SignUpFormState>{
    const validateFields = SignInFormSchema.safeParse(Object.fromEntries(formData.entries()))

    if(!validateFields.success) return {
        data:Object.fromEntries(formData.entries()),
        errors:validateFields.error.flatten().fieldErrors
    }

    const data = await fetchGraphQL(print(SIGN_IN_MUTATION),{
        input:{
            ...validateFields.data
        }
    })

    if(data.errors)
    {
        return{
            data:Object.fromEntries(formData.entries()),
            message: "Invalid email or password"
        }
    }
    await createSession({
        user:{
            id:data.signIn.id,
            name:data.signIn.name,
            avatar:data.signIn.avatar
        },
        accessToken:data.signIn.accessToken
    })
    revalidatePath("/")
    redirect("/")
}
