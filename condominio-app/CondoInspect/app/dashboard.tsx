import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';

export default function DashboardScreen() {
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-background">
            {/* TopAppBar */}
            <View className="w-full bg-white/95 border-b border-slate-100 flex-row justify-between items-center px-6 h-16" style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.04, shadowRadius: 20, elevation: 3, zIndex: 50 }}>
                <View className="flex-row items-center space-x-3 gap-3">
                    <View className="w-10 h-10 rounded-full overflow-hidden border-2 border-slate-50">
                        <Image 
                            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCapH8SjTL9xTWycACLIX21JwDBQ5VAw7q4IEOxtFbr_JLp6tdxiVzaVdPA_2qFt2wmgYol4RfbmarX2WEJev1deYLOOkuLhfnIbVzG1pZWtzwwdQrsJYQWOfJrl_3Iw8hkugQ-l_J9bPFV6oYmuI1Tex7oRBNECtTN2Qr7QaV6Gi7Xn-M7HYTUyvF7YHcM_QKgHODS_k_LKKIvXS1OuP-RPZESNXqwxAoZhl0azA7SsZ87Nzx0iLpBm0hf0Ys9KDATRugc4Y4oEz8V' }} 
                            className="w-full h-full"
                        />
                    </View>
                    <Text className="text-xl font-extrabold tracking-tighter text-[#001F3F]">CondoInspect</Text>
                </View>
                <TouchableOpacity className="p-2">
                    <Text className="text-[#001F3F] text-[24px]">🔔</Text>
                </TouchableOpacity>
            </View>

            <ScrollView className="flex-1 px-6 mx-auto w-full max-w-[1280px]" contentContainerStyle={{ paddingBottom: 100, paddingTop: 24 }}>
                {/* Greeting Section */}
                <View className="mb-lg">
                    <Text className="font-headline-xl text-[32px] font-bold text-primary mb-xs">Welcome, Marcus</Text>
                    <Text className="font-body-lg text-secondary">You have 3 inspections scheduled for today.</Text>
                </View>

                {/* KPI Cards Grid */}
                <View className="flex-col md:flex-row gap-gutter mb-lg space-y-4">
                    {/* Total Condos */}
                    <View className="bg-surface-container-lowest p-md rounded-xl" style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.04, shadowRadius: 20, elevation: 3 }}>
                        <View className="flex-row items-center justify-between mb-sm">
                            <Text className="text-primary-container text-[24px]">🏢</Text>
                            <View className="bg-tertiary-fixed/20 px-2 py-1 rounded">
                                <Text className="text-on-tertiary-container font-label-sm">+12%</Text>
                            </View>
                        </View>
                        <Text className="font-label-md text-secondary uppercase tracking-widest text-[10px]">Total Condos</Text>
                        <Text className="font-headline-lg text-[32px] font-bold text-primary">124</Text>
                    </View>

                    {/* Active Inspections */}
                    <View className="bg-surface-container-lowest p-md rounded-xl mt-4" style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.04, shadowRadius: 20, elevation: 3 }}>
                        <View className="flex-row items-center justify-between mb-sm">
                            <Text className="text-primary-container text-[24px]">📋</Text>
                            <View className="bg-secondary-container px-2 py-1 rounded">
                                <Text className="text-secondary font-label-sm">Active</Text>
                            </View>
                        </View>
                        <Text className="font-label-md text-secondary uppercase tracking-widest text-[10px]">Active Inspections</Text>
                        <Text className="font-headline-lg text-[32px] font-bold text-primary">18</Text>
                    </View>

                    {/* Open Tickets */}
                    <View className="bg-surface-container-lowest p-md rounded-xl mt-4" style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.04, shadowRadius: 20, elevation: 3 }}>
                        <View className="flex-row items-center justify-between mb-sm">
                            <Text className="text-error text-[24px]">⚠️</Text>
                            <View className="bg-error-container px-2 py-1 rounded">
                                <Text className="text-on-error-container font-label-sm">Urgent</Text>
                            </View>
                        </View>
                        <Text className="font-label-md text-secondary uppercase tracking-widest text-[10px]">Open Tickets</Text>
                        <Text className="font-headline-lg text-[32px] font-bold text-primary">07</Text>
                    </View>
                </View>

                {/* Main Action Button */}
                <View className="mb-lg">
                    <TouchableOpacity onPress={() => router.push('/scanner')} className="w-full bg-[#001F3F] py-5 px-8 rounded-[24px] flex-row items-center justify-center gap-3" style={{ shadowColor: '#001F3F', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.15, shadowRadius: 30, elevation: 5 }}>
                        <Text className="text-white text-[24px]">+</Text>
                        <Text className="text-white font-label-md text-lg">Start New Visit</Text>
                    </TouchableOpacity>
                </View>

                {/* Asymmetric Content Layout */}
                <View className="flex-col lg:flex-row gap-gutter items-start">
                    {/* Recent Tickets (Bento Left) */}
                    <View className="w-full bg-surface-container-lowest p-md rounded-xl" style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.04, shadowRadius: 20, elevation: 3 }}>
                        <View className="flex-row justify-between items-center mb-lg">
                            <Text className="font-headline-md font-bold text-primary text-[24px]">Recent Tickets</Text>
                            <TouchableOpacity>
                                <Text className="text-primary-container font-label-md">View All</Text>
                            </TouchableOpacity>
                        </View>
                        <View className="space-y-4">
                            {/* Ticket 1 */}
                            <TouchableOpacity className="flex-row items-center justify-between p-4 border border-slate-50 rounded-xl bg-white mb-2">
                                <View className="flex-row items-center gap-4">
                                    <View className="w-12 h-12 bg-primary-container/[0.05] rounded-full justify-center items-center mr-3">
                                        <Text className="text-primary-container">🔧</Text>
                                    </View>
                                    <View>
                                        <Text className="font-label-md text-primary font-bold">Pipe Leak - Unit 402</Text>
                                        <Text className="text-label-sm text-secondary">Skyline Residences • 2 hours ago</Text>
                                    </View>
                                </View>
                                <View className="px-3 py-1 bg-error-container/[0.3] border border-error/[0.1] rounded-full">
                                    <Text className="text-on-error-container text-[11px] font-bold uppercase tracking-tighter">High Priority</Text>
                                </View>
                            </TouchableOpacity>

                            {/* Ticket 2 */}
                            <TouchableOpacity className="flex-row items-center justify-between p-4 border border-slate-50 rounded-xl bg-white mb-2">
                                <View className="flex-row items-center gap-4">
                                    <View className="w-12 h-12 bg-primary-container/[0.05] rounded-full justify-center items-center mr-3">
                                        <Text className="text-primary-container">💡</Text>
                                    </View>
                                    <View>
                                        <Text className="font-label-md text-primary font-bold">Hallway Lighting - Floor 12</Text>
                                        <Text className="text-label-sm text-secondary">Lakeside Heights • 5 hours ago</Text>
                                    </View>
                                </View>
                                <View className="px-3 py-1 bg-secondary-container/[0.3] border border-secondary/[0.1] rounded-full">
                                    <Text className="text-secondary text-[11px] font-bold uppercase tracking-tighter">In Progress</Text>
                                </View>
                            </TouchableOpacity>

                            {/* Ticket 3 */}
                            <TouchableOpacity className="flex-row items-center justify-between p-4 border border-slate-50 rounded-xl bg-white mb-2">
                                <View className="flex-row items-center gap-4">
                                    <View className="w-12 h-12 bg-primary-container/[0.05] rounded-full justify-center items-center mr-3">
                                        <Text className="text-primary-container">🛡️</Text>
                                    </View>
                                    <View>
                                        <Text className="font-label-md text-primary font-bold">Access Card Failure - Gate 2</Text>
                                        <Text className="text-label-sm text-secondary">The Grande • Yesterday</Text>
                                    </View>
                                </View>
                                <View className="px-3 py-1 bg-tertiary-fixed/[0.1] border border-on-tertiary-container/[0.1] rounded-full">
                                    <Text className="text-on-tertiary-container text-[11px] font-bold uppercase tracking-tighter">Resolved</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Property Progress (Bento Right) */}
                    <View className="w-full mt-4 space-y-gutter flex-col">
                        {/* Inspection Progress Card */}
                        <View className="bg-[#001F3F] p-md rounded-xl mb-4" style={{ shadowColor: '#001F3F', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.1, shadowRadius: 30, elevation: 5 }}>
                            <Text className="font-label-md mb-md text-white/80 uppercase tracking-widest text-[10px] mb-4">Monthly Compliance</Text>
                            <View className="flex-row justify-between items-end mb-2">
                                <Text className="text-3xl font-bold text-white">84%</Text>
                                <Text className="text-label-sm text-white/70">12/15 Buildings</Text>
                            </View>
                            <View className="w-full h-1 bg-white/20 rounded-full overflow-hidden mb-sm mt-2">
                                <View className="bg-tertiary-fixed-dim h-full w-[84%]" />
                            </View>
                            <Text className="text-[11px] font-medium text-white/60 italic mt-2">3 buildings pending inspection</Text>
                        </View>

                        {/* Property Map Snapshot */}
                        <View className="relative h-48 rounded-xl overflow-hidden mt-4" style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.04, shadowRadius: 20, elevation: 3 }}>
                            <Image 
                                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA96E0sh7Vunf4UE2PmVbwwd8y6hm-Vlw0KVQnjnlxWsmtif-qLehtcG7CJrHJgNJHneym1CeW1aa8MMjDbHdVfWGWIr5_poldberw_vwDqXNUG02Y2KZKcIFdmYW2TUrr9uIZCaXTqRKIpSDP0MaXRU5ohjuM39V-i3glUTPU9FGI2aeEjVdtX4qg3XBq5_y0Ek6TFjWMsEg7xx1w8f0tNCNJoBm4HR_9S4Cd0B_QAlt__5jCP2176UYd1grhKOM4cFBVt8UbMqTCr' }}
                                className="w-full h-full absolute inset-0"
                            />
                            <View className="absolute inset-0 flex-col justify-end p-4 bg-black/40">
                                <View className="flex-row items-center gap-2">
                                    <Text className="text-white">📍</Text>
                                    <Text className="text-white font-label-md font-bold text-sm">Downtown Portfolio</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* BottomNavBar */}
            <View className="w-full flex-row justify-around items-center h-20 pb-4 px-4 bg-white border-t border-slate-100 absolute bottom-0 z-50">
                <TouchableOpacity onPress={() => router.push('/dashboard')} className="flex-col items-center justify-center bg-slate-50 rounded-xl px-3 py-1">
                    <Text className="text-[#001F3F] text-[24px]">🧭</Text>
                    <Text className="text-[#001F3F] font-bold text-[11px] font-medium tracking-wide">Dashboard</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('/management/condos')} className="flex-col items-center justify-center">
                    <Text className="text-slate-400 text-[24px]">🏢</Text>
                    <Text className="text-slate-400 text-[11px] font-medium tracking-wide">Properties</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('/scanner')} className="flex-col items-center justify-center">
                    <Text className="text-slate-400 text-[24px]">📸</Text>
                    <Text className="text-slate-400 text-[11px] font-medium tracking-wide">QR Scan</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('/reports')} className="flex-col items-center justify-center">
                    <Text className="text-slate-400 text-[24px]">📋</Text>
                    <Text className="text-slate-400 text-[11px] font-medium tracking-wide">Reports</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
