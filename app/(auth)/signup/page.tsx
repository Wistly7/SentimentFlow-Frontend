import type React from "react"
import { SignupForm } from "./_form"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { fetchUserData } from "@/app/actions/auth";
export default async function SignupPage() {
  const cookie = await cookies();
  const authToken = cookie.get('user-token');
  const userData = authToken && authToken.value && (await fetchUserData(authToken.value))
  if (authToken && userData) {
    redirect('/dashboard')
  }
  return (
    <SignupForm />
  )
}
