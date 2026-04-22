import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, SafeAreaView, TextInput } from 'react-native';
import { useRouter } from 'expo-router';

export default function CondosScreen() {
    const router = useRouter();

    return (
        <SafeAreaView className="bg-background flex-1">
            {/* TopAppBar */}
            <View className="bg-white/95 border-b border-slate-100 flex-row justify-between items-center w-full px-6 h-16 z-50 absolute top-0" style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.04, shadowRadius: 20, elevation: 3 }}>
                <View className="flex-row items-center gap-4">
                    <View className="w-10 h-10 rounded-full overflow-hidden bg-secondary-container justify-center items-center">
                        <Image 
                            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDo2OPbgkO9wcQq3sNQEFR6PsfDvVuuGjVlYfEZKrvrxNyMalsJ3dKPl22QmBS90VAyedqJTCCap6iBCKMKv7Efs74xcYh4doQcV9TE5a2Rv9qItfNmcVsS22WhKMM-_AUgbjQB0x73i1bWh4MhNUvXIHiwx74WcYlaKW7T_x9WSVA16dhJGWYVX2Y73L4RSQDGp2fHLva-Q8xnI3mbXrH_IPV6isEs8yyaXoUrTCnefqMN1Jl8-44FzacuqUxDruehU-NgFZ6k4YeR' }}
                            className="w-full h-full"
                        />
                    </View>
                    <Text className="text-xl font-bold tracking-tighter text-[#001F3F] ml-3">CondoInspect</Text>
                </View>
                <TouchableOpacity>
                    <Text className="text-[#001F3F] text-[24px]">🔔</Text>
                </TouchableOpacity>
            </View>

            <ScrollView className="pt-24 px-6 mx-auto w-full max-w-[1440px]" contentContainerStyle={{ paddingBottom: 150 }}>
                {/* Search & Filter Section */}
                <View className="mb-lg">
                    <View className="flex-col md:flex-row gap-4 justify-between items-center space-y-4">
                        <View className="w-full md:max-w-md relative flex-row items-center">
                            <Text className="absolute left-4 z-10 text-slate-400">🔍</Text>
                            <TextInput 
                                className="w-full pl-12 pr-4 py-4 bg-slate-100 border-none rounded-xl font-body-md text-on-surface" 
                                placeholder="Search properties by name or address..." 
                                placeholderTextColor="#94a3b8"
                            />
                        </View>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row gap-2 mt-4 md:mt-0 w-full" contentContainerStyle={{ paddingRight: 20 }}>
                            <TouchableOpacity className="px-6 py-3 bg-white border border-slate-200 rounded-full mr-2">
                                <Text className="font-label-md text-on-surface text-center">Active</Text>
                            </TouchableOpacity>
                            <TouchableOpacity className="px-6 py-3 bg-white border border-slate-200 rounded-full mr-2">
                                <Text className="font-label-md text-on-surface text-center">Pending</Text>
                            </TouchableOpacity>
                            <TouchableOpacity className="px-6 py-3 bg-white border border-slate-200 rounded-full">
                                <Text className="font-label-md text-on-surface text-center">High Priority</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </View>

                {/* Bento Grid Property List */}
                <View className="flex-col md:flex-row flex-wrap gap-gutter space-y-6">
                    {/* Property Card 1 */}
                    <View className="bg-white rounded-xl overflow-hidden shadow-md w-full mb-4" style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.04, shadowRadius: 20, elevation: 3 }}>
                        <View className="relative h-48 w-full overflow-hidden">
                            <Image 
                                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAAIO843Y2ZnetlPIfxCvasbKyerz1HtfmTggIknHvl61Y8eGDCahRInc68Pk3Ytt7CMBj-BtxuHZyjXfbq8BbauWQzFJBu0VQ5ysR2C6k5nDcVmYlIAQ9D1hEEIQGZ474aEX01QYxNer3kO1pILl2l-cTk73PpOJ6KPOiFwvXAfS-CwIEGCQ2m2D8a5-Hs3sFgWMNcCkUjLqAl4MCtvO813PTGX61C6AVtr_KaLurxukuS3dUAVxqOcXNlDqNVR_Fam2SfP3oFdzYc' }}
                                className="w-full h-full absolute inset-0"
                            />
                            <View className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full border border-slate-100">
                                <Text className="text-xs font-bold text-[#001F3F] uppercase tracking-wider">92% Inspected</Text>
                            </View>
                        </View>
                        <View className="p-6">
                            <Text className="font-headline-md text-[#001F3F] font-bold text-[20px] mb-1">Azure Skyline Heights</Text>
                            <View className="flex-row items-center mb-4">
                                <Text className="text-slate-500 text-sm mr-1">📍</Text>
                                <Text className="font-body-md text-slate-500">742 Evergreen Terrace, Springfield</Text>
                            </View>
                            <View className="w-full bg-slate-100 h-1.5 rounded-full mb-6">
                                <View className="bg-[#119B50] h-full rounded-full w-[92%]" />
                            </View>
                            <View className="flex-row justify-between items-center">
                                <View className="flex-row -space-x-2">
                                     <View className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden ml-0">
                                        <Image source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBunPZdn66o_E266xYLVdJWsulQE4UEWJ0LFdcdT0NFRBlq9JMPycJ8hpJKRhgzchqgecp46OKl-cj2pM0kYpiQE6nGZLd08OATElyxXAhgi9_r2fYNNMP4q-PwYu_0QA7Prq5YlYVAsCXKow0GSeelx4NJuskclCOjM7lsdWXoMIRGk2Yb7SM-s8vBXRA7jj6o8QePWkUVe1kT4hMGoRPezn2M8LiJ8glU09CqwZmvlNShMY2o21Wwp0eFPGN6kim9c3n9yJmnVzfd' }} className="w-full h-full" />
                                    </View>
                                    <View className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden absolute left-5">
                                        <Image source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbE2YkTSvr5nrUD6CE6Kn5_x6eBzXLFb-bTQ1PGYmR7a7qPM1US9m5M2ZrOOYfI1natv9XU8JjAZRMlQ5k27n-SS5NFZpKARZ0jSqP8gmM4LkXLvCWZCC8CR2D-11lW5VxfA2_Q815BnTgZG4oozdi4T-1QKXxJb-6BxmoYrxityKQk5f95Hn9XB2gXwJOePoKeQsBFHXxd6kULGrOzJsiqHWoZnzBDS75jfJxXOFQ3WbTN19IJrKoGhEX9bGKytvBojNTZWd9wcwq' }} className="w-full h-full" />
                                    </View>
                                </View>
                                <TouchableOpacity onPress={() => router.push('/management/condos')} className="flex-row items-center gap-1">
                                    <Text className="text-[#001F3F] font-label-md">View Details ➔</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    {/* Property Card 2 */}
                    <View className="bg-white rounded-xl overflow-hidden shadow-md w-full mb-4" style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.04, shadowRadius: 20, elevation: 3 }}>
                        <View className="relative h-48 w-full overflow-hidden">
                            <Image 
                                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCaqRIh1v3AAlA52zjFGnWBqwGQxPoQi6Ns4VueJ0FUQn3lBYEEjgyveSXZJXlUrEiHnvDAs0p8M70arqzN0VwicnOjjyJTyBsj3U5CNOrb80FnLjSaHidKPU03eggt9ISheRzV_A-u89Bjuo_6pgJQhiM0qKnoR3fZU5YFM-we0zVTiSp6QdMT_ZyQA0BU8RGD2NRCmTpxWCTNghP72qVbyGi70eDuglVDzVmGhd6CWgDiIPm0yY66DDNVaAi2gqXkWoW0zn8f_BkS' }}
                                className="w-full h-full absolute inset-0"
                            />
                            <View className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full border border-slate-100">
                                <Text className="text-xs font-bold text-error uppercase tracking-wider">Needs Attention</Text>
                            </View>
                        </View>
                        <View className="p-6">
                            <Text className="font-headline-md text-[#001F3F] font-bold text-[20px] mb-1">The Obsidian Tower</Text>
                            <View className="flex-row items-center mb-4">
                                <Text className="text-slate-500 text-sm mr-1">📍</Text>
                                <Text className="font-body-md text-slate-500">1200 Financial Plaza, Downtown</Text>
                            </View>
                            <View className="w-full bg-slate-100 h-1.5 rounded-full mb-6">
                                <View className="bg-error h-full rounded-full w-[34%]" />
                            </View>
                            <View className="flex-row justify-between items-center">
                                <TouchableOpacity onPress={() => router.push('/management/condos')} className="flex-row items-center gap-1 w-full justify-end">
                                    <Text className="text-[#001F3F] font-label-md">View Details ➔</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* Floating Action Button */}
            <TouchableOpacity className="absolute bottom-24 right-8 w-14 h-14 bg-[#001F3F] rounded-full justify-center items-center z-50 shadow-lg" style={{ shadowColor: '#001F3F', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 30, elevation: 6 }}>
                <Text className="text-white text-3xl mb-1">+</Text>
            </TouchableOpacity>

            {/* BottomNavBar */}
            <View className="w-full flex-row justify-around items-center h-20 pb-4 px-4 bg-white border-t border-slate-100 absolute bottom-0 z-50">
                <TouchableOpacity onPress={() => router.push('/dashboard')} className="flex-col items-center justify-center">
                    <Text className="text-slate-400 text-[24px]">🧭</Text>
                    <Text className="text-slate-400 text-[11px] font-medium tracking-wide">Dashboard</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('/management/condos')} className="flex-col items-center justify-center bg-slate-50 rounded-xl px-3 py-1">
                    <Text className="text-[#001F3F] text-[24px]">🏢</Text>
                    <Text className="text-[#001F3F] font-bold text-[11px] font-medium tracking-wide">Properties</Text>
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
