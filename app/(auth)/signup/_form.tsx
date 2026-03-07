"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { WaterflowBackground } from "@/components/waterflow-background"
import { LiquidGlassNavbar } from "@/components/liquid-glass-navbar"
import { Eye, EyeOff, Mail, Lock, User, TrendingUp, LoaderPinwheel } from "lucide-react"
import { TwinklingStars } from "@/components/twinkling-stars"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { signUpUser } from "@/app/actions/auth"

export const SignupForm: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    })
    const cardRef = useRef<HTMLDivElement>(null)

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
        mutationFn: async () => await signUpUser({ email: formData.email, password: formData.password, name: formData.name }),
        mutationKey: ['signUpMutation'],
        onSuccess: (data: { msg: string; error: string }) => {

            if (data.error === "" || data.error === undefined || data.error === null) {
                toast.success(data.msg!);
            } else {
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
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (formData.password !== formData.confirmPassword) {
            toast.warning("Passwords do not match")
            return
        }
        // Handle signup signup here
        mutateAsync()
    }

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    return (
        <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
            <LiquidGlassNavbar />
            <TwinklingStars />

            <div ref={cardRef} className="w-full max-w-md mt-10">
                <Card className="bg-card/80 backdrop-blur-md border-border shadow-2xl">
                    <CardHeader className="text-center pb-6">
                        <div className="flex justify-center mb-4">
                            <div className="p-3 rounded-full bg-primary/20">
                                <TrendingUp className="h-8 w-8 text-accent" />
                            </div>
                        </div>
                        <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
                        <CardDescription className="text-muted-foreground">
                            Join SentimentFlow and start tracking startup sentiment
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-foreground">
                                    Full Name
                                </Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="name"
                                        type="text"
                                        placeholder="Enter your full name"
                                        value={formData.name}
                                        onChange={(e) => handleInputChange("name", e.target.value)}
                                        className="pl-10 bg-input border-border text-foreground placeholder:text-muted-foreground focus:ring-accent focus:border-accent"
                                        required
                                    />
                                </div>
                            </div>

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
                                        value={formData.email}
                                        onChange={(e) => handleInputChange("email", e.target.value)}
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
                                        placeholder="Create a password"
                                        value={formData.password}
                                        onChange={(e) => handleInputChange("password", e.target.value)}
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

                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword" className="text-foreground">
                                    Confirm Password
                                </Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="confirmPassword"
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="Confirm your password"
                                        value={formData.confirmPassword}
                                        onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                                        className="pl-10 pr-10 bg-input border-border text-foreground placeholder:text-muted-foreground focus:ring-accent focus:border-accent"
                                        required
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="absolute right-0 top-0 h-full px-3 text-muted-foreground hover:text-foreground"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </Button>
                                </div>
                            </div>
                            {!isPending ? <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-2.5">
                                Create Account
                            </Button> : <Button type="button" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-2.5" disabled>
                                <div className="flex gap-2">
                                    <LoaderPinwheel className="animate-spin" />
                                    Creating Account
                                </div>

                            </Button>}
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-muted-foreground">
                                Already have an account?{" "}
                                <Link href="/login" className="text-accent hover:text-accent/80 font-medium">
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
