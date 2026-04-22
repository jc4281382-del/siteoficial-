import React from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';

export default function ScannerScreen() {
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-black overflow-hidden h-full flex-col">
            {/* Top Navigation Anchor */}
            <View className="bg-white/95 border-b border-slate-100 flex-row justify-between items-center w-full px-6 h-16 absolute top-0 z-50">
                <View className="flex-row items-center gap-4">
                    <TouchableOpacity onPress={() => router.back()} className="flex-row items-center gap-1 active:scale-95 transition-transform">
                        <Text className="text-[#001F3F] text-[24px]">🔙</Text>
                        <Text className="font-label-md text-[#001F3F]">Back</Text>
                    </TouchableOpacity>
                </View>
                <Text className="text-xl font-bold tracking-tighter text-[#001F3F]">CondoInspect</Text>
                <View className="flex-row items-center gap-4">
                    <TouchableOpacity className="active:scale-95 transition-transform">
                        <Text className="text-[#001F3F] text-[24px]">🔦</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Main Viewfinder Canvas */}
            <View className="relative flex-1 items-center justify-center bg-black overflow-hidden mt-16">
                {/* Background Simulated Camera View */}
                <View className="absolute inset-0 z-0">
                    <Image 
                        source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAxUsDIfQ1y4ElHuc9VqgWDn-UsGztW_hx6BhifJiZuWJ_F662240gE8ToOYg9w6ZIjdJ_V9YbOEcu69BUOy1gKbBf_zZr709B1u11G2-okv8_Y2qs-Yj4ADQV0dUTl5t5kwKqs9prd1Ixk8ddtOVz9qZKiaFlli8K9UG5TeX5fi1wgxJLBEP1c9f2BM3lxy1nhYocCFd8-Op37-IZ47dFi9isjQ1jbIA851662S72-y3maNteCBli_1riS7C0TlwbH3ldciCgUOomv' }} 
                        className="w-full h-full opacity-50"
                        style={{ tintColor: 'gray' }}
                    />
                </View>

                {/* Scanning Overlay UI */}
                <View className="relative z-10 w-full h-full flex-col items-center justify-center">
                    {/* Instructions */}
                    <View className="absolute top-12 px-md text-center items-center w-full">
                        <Text className="font-headline-md font-bold text-white mb-2 text-center text-[24px]">Scan the Area QR Code to check-in</Text>
                        <Text className="text-white/60 font-body-md text-center">Align the QR code within the square to begin inspection</Text>
                    </View>

                    {/* Scanner Guide Frame */}
                    <View className="relative w-[280px] h-[280px]">
                        {/* Corner Borders */}
                        <View className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-tertiary-fixed-dim rounded-tl-xl" />
                        <View className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-tertiary-fixed-dim rounded-tr-xl" />
                        <View className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-tertiary-fixed-dim rounded-bl-xl" />
                        <View className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-tertiary-fixed-dim rounded-br-xl" />
                        
                        {/* Animated-like Scan Line */}
                        <View className="absolute top-1/2 left-0 right-0 h-[2px] bg-tertiary-fixed-dim opacity-80" />
                    </View>

                    {/* Action Controls */}
                    <View className="absolute bottom-[200px] flex-col items-center gap-6 w-full px-md">
                        {/* Status Badge */}
                        <TouchableOpacity onPress={() => router.push('/inspection-form')} className="bg-white/10 border border-white/20 rounded-full px-4 py-2 flex-row items-center gap-2 mb-4">
                            <View className="w-2 h-2 rounded-full bg-tertiary-fixed-dim" />
                            <Text className="text-white font-label-md tracking-wider">CAMERA READY (TAP MOCK)</Text>
                        </TouchableOpacity>

                        <View className="flex-row gap-4 w-full">
                            <TouchableOpacity className="flex-1 bg-white/10 border border-white/20 rounded-full py-4 px-6 flex-row items-center justify-center gap-2">
                                <Text className="text-white">⚡</Text>
                                <Text className="font-label-md text-white">Flash</Text>
                            </TouchableOpacity>
                            <TouchableOpacity className="flex-1 bg-white/10 border border-white/20 rounded-full py-4 px-6 flex-row items-center justify-center gap-2">
                                <Text className="text-white">🖼️</Text>
                                <Text className="font-label-md text-white">Upload</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>

            {/* Contextual Information Card (Floating Bento Style) */}
            <View className="absolute bottom-32 left-0 right-0 items-center z-20 w-full px-4">
                <View className="bg-white rounded-xl p-md flex-row items-center gap-4 border border-slate-100 shadow-md w-full max-w-md">
                    <View className="w-12 h-12 rounded-lg bg-surface-container-low flex-row items-center justify-center">
                        <Text className="text-primary-container text-[24px]">📍</Text>
                    </View>
                    <View className="flex-grow">
                        <Text className="text-on-surface-variant font-label-sm text-[12px]">CURRENT PROPERTY</Text>
                        <Text className="text-on-surface font-headline-md font-bold leading-tight text-[18px]">Grand Plaza Residences</Text>
                    </View>
                    <View className="items-end">
                        <View className="rounded-full bg-tertiary-fixed-dim/10 px-2 py-1 border border-tertiary-fixed-dim/20">
                            <Text className="text-xs font-medium text-on-tertiary-container">Active</Text>
                        </View>
                    </View>
                </View>
            </View>

            {/* BottomNavBar */}
            <View className="w-full flex-row justify-around items-center h-20 pb-4 px-4 bg-white border-t border-slate-100 absolute bottom-0 z-50">
                <TouchableOpacity onPress={() => router.push('/dashboard')} className="flex-col items-center justify-center">
                    <Text className="text-slate-400 text-[24px]">🧭</Text>
                    <Text className="text-slate-400 text-[11px] font-medium tracking-wide">Dashboard</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('/management/condos')} className="flex-col items-center justify-center">
                    <Text className="text-slate-400 text-[24px]">🏢</Text>
                    <Text className="text-slate-400 text-[11px] font-medium tracking-wide">Properties</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('/scanner')} className="flex-col items-center justify-center bg-slate-50 rounded-xl px-3 py-1">
                    <Text className="text-[#001F3F] text-[24px]">📸</Text>
                    <Text className="text-[#001F3F] font-bold text-[11px] font-medium tracking-wide">QR Scan</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('/reports')} className="flex-col items-center justify-center">
                    <Text className="text-slate-400 text-[24px]">📋</Text>
                    <Text className="text-slate-400 text-[11px] font-medium tracking-wide">Reports</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
