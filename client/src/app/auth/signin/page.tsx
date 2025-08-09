'use client'

import React, { useState } from 'react'
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi'
import { FaGithub } from 'react-icons/fa'

const SigninPage = () => {
    const [formData, setFormData] = useState({
        emailOrUsername: '',
        password: ''
    })
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        // TODO: Implement signin logic
        console.log('Signin data:', formData)

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false)
        }, 2000)
    }

    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center mb-4">
                        <FaGithub className="text-4xl text-white mr-2" />
                        <h1 className="text-3xl font-bold text-white">GitHall</h1>
                    </div>
                    <p className="text-white">Welcome back! Sign in to your account</p>
                </div>

                {/* Signin Form */}
                <div className="bg-black border border-white rounded-lg p-8 shadow-lg">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email or Username */}
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiMail className="h-5 w-5 text-white" />
                            </div>
                            <input
                                type="text"
                                name="emailOrUsername"
                                value={formData.emailOrUsername}
                                onChange={handleInputChange}
                                placeholder="Email or Username"
                                required
                                className="w-full pl-10 pr-4 py-3 bg-black border border-white rounded-lg text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-200"
                            />
                        </div>

                        {/* Password */}
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiLock className="h-5 w-5 text-white" />
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="Password"
                                required
                                className="w-full pl-10 pr-12 py-3 bg-black border border-white rounded-lg text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-200"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            >
                                {showPassword ? (
                                    <FiEyeOff className="h-5 w-5 text-white hover:text-gray-300 transition-colors" />
                                ) : (
                                    <FiEye className="h-5 w-5 text-white hover:text-gray-300 transition-colors" />
                                )}
                            </button>
                        </div>

                        {/* Forgot Password */}
                        <div className="text-right">
                            <a href="/auth/forgot-password" className="text-white hover:text-gray-300 text-sm transition-colors underline">
                                Forgot your password?
                            </a>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-white hover:bg-gray-200 text-black font-medium py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mr-2"></div>
                                    Signing In...
                                </div>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="mt-6 text-center">
                        <p className="text-white">
                            Don't have an account?{' '}
                            <a href="/auth/signup" className="text-white hover:text-gray-300 font-medium transition-colors underline">
                                Sign up
                            </a>
                        </p>
                    </div>
                </div>

                {/* Terms */}
                <div className="mt-6 text-center text-sm text-white">
                    By signing in, you agree to our{' '}
                    <a href="/terms" className="text-white hover:text-gray-300 transition-colors underline">
                        Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="/privacy" className="text-white hover:text-gray-300 transition-colors underline">
                        Privacy Policy
                    </a>
                </div>
            </div>
        </div>
    )
}

export default SigninPage