import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Redireciona mockado conforme regra para o dashboard
        router.push('/dashboard');
    };

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="bg-background">
            {/* Background Decorative Element (Subtle) - Adapted safely for React Native */}
            <View className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
                <View className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-primary-container/[0.05] rounded-full" />
                <View className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-on-tertiary-container/[0.05] rounded-full" />
            </View>

            <View className="flex-1 items-center justify-center p-md min-h-[800px]">
                <View className="w-full max-w-[440px]">
                    
                    {/* Logo Section */}
                    <View className="flex-col items-center mb-lg">
                        <View className="mb-sm">
                            <Text className="text-primary-container text-[48px] font-bold">🏢</Text>
                        </View>
                        <Text className="font-headline-lg text-headline-lg text-primary-container tracking-tighter text-center">CondoInspect</Text>
                        <Text className="font-label-md text-label-md text-on-surface-variant mt-xs text-center">Premium Property Management Portal</Text>
                    </View>

                    {/* Login Card */}
                    <View style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.04, shadowRadius: 20, elevation: 3 }} className="bg-surface-container-lowest rounded-xl p-md md:p-lg border border-outline-variant/30">
                        <View className="mb-md">
                            <Text className="font-headline-md text-headline-md text-on-surface mb-xs">Welcome back</Text>
                            <Text className="font-body-md text-body-md text-secondary">Enter your credentials to access your properties.</Text>
                        </View>

                        <View className="space-y-md">
                            {/* Email Input */}
                            <View className="space-y-xs">
                                <Text className="font-label-md text-label-md text-on-surface px-1 mb-1">Email Address</Text>
                                <View className="relative flex-row items-center bg-surface-container-low rounded-lg h-[50px] px-2 border-b border-transparent focus:border-primary-container">
                                    <Text className="text-outline text-[20px] mr-2">✉️</Text>
                                    <TextInput 
                                        className="flex-1 font-body-md text-on-surface outline-none" 
                                        placeholder="manager@condoinspect.com" 
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                        value={email}
                                        onChangeText={setEmail}
                                    />
                                </View>
                            </View>

                            {/* Password Input */}
                            <View className="space-y-xs mt-4">
                                <View className="flex-row justify-between items-center px-1 mb-1">
                                    <Text className="font-label-md text-label-md text-on-surface">Password</Text>
                                    <TouchableOpacity>
                                        <Text className="font-label-sm text-label-sm text-on-primary-container">Forgot Password?</Text>
                                    </TouchableOpacity>
                                </View>
                                <View className="relative flex-row items-center bg-surface-container-low rounded-lg h-[50px] px-2 border-b border-transparent focus:border-primary-container">
                                    <Text className="text-outline text-[20px] mr-2">🔒</Text>
                                    <TextInput 
                                        className="flex-1 font-body-md text-on-surface outline-none" 
                                        placeholder="••••••••" 
                                        secureTextEntry
                                        value={password}
                                        onChangeText={setPassword}
                                    />
                                    <TouchableOpacity className="ml-2">
                                        <Text className="text-[20px] text-outline">👁️</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {/* Login Button */}
                            <View className="pt-sm mt-6">
                                <TouchableOpacity onPress={handleLogin} className="w-full bg-primary-container h-[56px] rounded-full flex-row justify-center items-center">
                                    <Text className="text-white font-label-md text-headline-md mr-2">Sign In</Text>
                                    <Text className="text-white text-[20px]">➔</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View className="mt-lg flex-row justify-center items-center mt-6">
                            <View className="h-[1px] flex-1 bg-outline-variant/30" />
                            <Text className="font-label-sm text-label-sm text-outline mx-2">AUTHORIZED PERSONNEL ONLY</Text>
                            <View className="h-[1px] flex-1 bg-outline-variant/30" />
                        </View>

                    </View>

                    {/* Footer */}
                    <View className="mt-md text-center items-center mt-4 flex-row justify-center">
                        <Text className="font-label-sm text-label-sm text-secondary">Don't have an account? </Text>
                        <TouchableOpacity>
                            <Text className="text-primary-container font-semibold font-label-sm">Contact System Admin</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}
