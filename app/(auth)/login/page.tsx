import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LoginForm } from "./_form";
import { fetchUserData } from "@/app/actions/auth";
export default async function LoginPage(){
  const cookie=await cookies();
  const authToken=cookie.get('user-token');
  const userData=authToken&& authToken.value && (await fetchUserData(authToken.value))
  if(authToken && userData){
    redirect('/dashboard')
  }
  return(
    <>
    
      <LoginForm/>
    
    </>
  )
}