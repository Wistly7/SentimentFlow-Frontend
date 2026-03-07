'use client'
import React, { createContext, useContext, useEffect, useState } from "react"
import Cookies from 'js-cookie'
import {
    useQuery
} from '@tanstack/react-query'
import { fetchUserData } from "@/app/actions/auth"
import { Loader } from "lucide-react"
import { useRouter } from "next/navigation"
import { TwinklingStars } from "@/components/twinkling-stars"
import { FairyLights } from "@/components/fairy-lights"

export interface UserDataProfile {
    name: string
    id: string
    email: string
    roleId:number
}
interface AuthData {
    token: string;
    userData: UserDataProfile | null
}
interface AuthContextData {
    authData: AuthData
    setToken: (token: string) => void
    setUserData: (userData: UserDataProfile) => void
    handleSignOut: () => void
}
const AuthContext = createContext<AuthContextData | undefined>(undefined)
export const AuthProvider: React.FC<{ children: React.ReactNode, initialUserData?: { userInfo: UserDataProfile } }> = ({ children, initialUserData }) => {
    const [authData, setAuthData] = useState<AuthData>({
        token: "",
        userData: null
    });
    const router = useRouter();
    const authToken = Cookies.get('user-token');
    const { data, isLoading, isSuccess, isError, isFetching } = useQuery({
        queryFn: () => fetchUserData(authToken!),
        queryKey: ["FetchUsersData", authToken],
        enabled: !!authToken,
        staleTime:Infinity,
        initialData: initialUserData
        
    })

    useEffect(() => {
        if (isSuccess && data) {
            setAuthData({ token: authToken!, userData: data.userInfo });
        }
        
    }, [isSuccess]);


    const setUserData = (userData: UserDataProfile) => {
        setAuthData((prev) => ({ ...prev, userData: userData }))
    }
    const setToken = (token: string) => {
        setAuthData((prev) => ({ ...prev, token: token }))
    }
    const handleSignOut = () => {
        Cookies.remove('user-token');
        setAuthData({ token: "", userData: null })
        router.push('/login')
    }
    return (
        <AuthContext.Provider value={{ setToken, setUserData, authData, handleSignOut }}>
            {isLoading && isFetching ?
                <div className="h-screen w-full flex justify-center items-center">
                    <TwinklingStars />
                    <FairyLights />
                    <Loader size={30} className="animate-spin text-purple-300"></Loader>
                </div>
                : (
                    children
                )
            }
        </AuthContext.Provider>
    )
}
export const useAuth = (): AuthContextData => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}   