"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LiquidGlassNavbar } from "@/components/liquid-glass-navbar"
import { Eye, EyeOff, Mail, Lock, TrendingUp, LoaderPinwheel } from "lucide-react"
import { useMutation } from "@tanstack/react-query"
import Cookies from 'js-cookie'
import { toast } from "sonner"
import axios from "axios";
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import { TwinklingStars } from "@/components/twinkling-stars"
import { loginUser } from "@/app/actions/auth"
import { is } from "date-fns/locale"
export function LoginForm() {
    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const cardRef = useRef<HTMLDivElement>(null);
    const router = useRouter()
    const { setToken } = useAuth()
    useEffect(() => {
        if (typeof window !== "undefined") {
            import("gsap").then(({ gsap }) => {
                gsap.fromTo(
                    cardRef.current,
                    { opacity: 0, y: 30, scale: 0.95 },
                    { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out" },
                )
            })
        }
    }, [])

    const { mutateAsync, isPending } = useMutation({
        mutationFn: async() => await loginUser({ email, password }),
        mutationKey: ['login Mutation'],
        onSuccess: (data:{msg:string; token:string; error:string}) => {
            
            if(data.error ==="" || data.error === undefined || data.error === null){
                toast.success(data.msg!);
                Cookies.set('user-token', data.token, { expires: 7 }); // Expires in 7 days
                setToken(data.token)
                router.push('/dashboard')
            }else{
                toast.error(data.error!);

            }
        },
        onError: (error) => {
            if (error instanceof Error) {
                console.log(error)
                toast.error(error.message, { style: { backgroundColor: 'pink', border: '2px solid black' } });
            } else {
                toast.error("An unexpected error occurred");
            }
        },
    })
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        // Handle login logic here
        await mutateAsync()
    }

    return (
        <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
            <LiquidGlassNavbar />
            <TwinklingStars />
            <div ref={cardRef} className="w-full max-w-md">
                <Card className="bg-card/80 backdrop-blur-md border-border shadow-2xl">
                    <CardHeader className="text-center pb-6">
                        <div className="flex justify-center mb-4">
                            <div className="p-3 rounded-full bg-primary/20">
                                <TrendingUp className="h-8 w-8 text-accent" />
                            </div>
                        </div>
                        <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
                        <CardDescription className="text-muted-foreground">
                            Sign in to access your sentiment dashboard
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-foreground">
                                    Email
                                </Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="pl-10 bg-input border-border text-foreground placeholder:text-muted-foreground focus:ring-accent focus:border-accent"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-foreground">
                                    Password
                                </Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="pl-10 pr-10 bg-input border-border text-foreground placeholder:text-muted-foreground focus:ring-accent focus:border-accent"
                                        required
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="absolute right-0 top-0 h-full px-3 text-muted-foreground hover:text-foreground"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </Button>
                                </div>
                            </div>
                            {isPending ?<Button type="submit" className="w-full gap-2 flex bg-primary hover:bg-primary/90 text-primary-foreground py-2.5"disabled>
                               <LoaderPinwheel className="animate-spin"/>
                                Signing In 
                            </Button>:<Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-2.5">
                                Sign In
                            </Button>}
                            
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-muted-foreground">
                                Don't have an account?{" "}
                                <Link href="/signup" className="text-accent hover:text-accent/80 font-medium">
                                    Sign up
                                </Link>
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
