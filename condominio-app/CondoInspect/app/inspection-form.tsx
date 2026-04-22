import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, SafeAreaView, TextInput } from 'react-native';
import { useRouter } from 'expo-router';

export default function InspectionFormScreen() {
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-surface pb-[100px]">
            {/* TopAppBar */}
            <View className="bg-white/95 border-b border-slate-100 flex-row justify-between items-center w-full px-6 h-16 absolute top-0 z-50">
                <View className="flex-row items-center gap-4">
                    <TouchableOpacity onPress={() => router.back()} className="active:scale-95 transition-transform duration-200">
                        <Text className="text-primary-container text-[24px]">🔙</Text>
                    </TouchableOpacity>
                    <View className="flex-col">
                        <Text className="text-xl font-bold tracking-tighter text-[#001F3F]">CondoInspect</Text>
                        <Text className="font-label-sm text-[10px] font-semibold uppercase opacity-50">Area ID: LOBBY-04-A</Text>
                    </View>
                </View>
                <View className="flex-row items-center gap-4">
                    <View className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant">
                        <Image source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBcae4cSGD4-b5OZkJM-fGg7fhQhZnnMxw-zzQx3ylDnc7BR1c6WCIYwfmo1ZQe-VL3xEfjfIh_JCH2PHfcnU6_EjYF_YARKpSAX8alkvNpGNrj8EIlvjyfR3jAfUvhQc0rgOv9qS9Zu_CxNKpDxrmACCLsCKImeVSqeGy5-nSKptAhMb2NNGO9yqRxXi_PxPvOJy54RYW_GjCuiOhI8UAKMD3lHbrh7NOZ9qpNbjkpmsRWMwsIxMPEcote0ZI_vs0cAWU_cokjArAl' }} className="w-full h-full" />
                    </View>
                </View>
            </View>

            <ScrollView className="flex-1 px-6 pt-20 mx-auto w-full max-w-[800px]" contentContainerStyle={{ paddingBottom: 150 }}>
                {/* Area Title Section */}
                <View className="mb-lg">
                    <Text className="font-headline-lg font-bold text-[32px] text-primary mb-xs">Main Lobby & Entrance</Text>
                    <Text className="font-body-md text-on-surface-variant">Perform a detailed inspection of all architectural elements and safety systems in the primary reception area.</Text>
                </View>

                {/* Progress Component */}
                <View className="bg-white rounded-xl p-md mb-lg border border-slate-100 shadow-sm" style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.04, shadowRadius: 20, elevation: 3 }}>
                    <View className="flex-row justify-between items-center mb-sm">
                        <Text className="font-label-md text-primary font-bold">Inspection Progress</Text>
                        <Text className="font-label-md text-on-tertiary-container font-bold text-[#119B50]">45% Completed</Text>
                    </View>
                    <View className="w-full h-1 bg-surface-container rounded-full overflow-hidden">
                        <View className="h-full bg-on-tertiary-container w-[45%] rounded-full bg-[#119B50]" />
                    </View>
                </View>

                {/* Inspection Checklist Items */}
                <View className="space-y-md flex-col gap-6">
                    
                    {/* Lighting Section */}
                    <View className="bg-white rounded-xl p-md border border-slate-100 shadow-sm" style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.04, shadowRadius: 20, elevation: 3 }}>
                        <View className="flex-col gap-4">
                            <Text className="font-headline-md text-[18px] font-bold text-primary mb-1">Ambient Lighting</Text>
                            <Text className="font-body-md text-label-sm text-on-surface-variant mb-4">Verify all recessed ceiling lights and decorative sconces are operational.</Text>
                            
                            {/* Toggle Controls */}
                            <View className="flex-row gap-2 w-full justify-between">
                                <TouchableOpacity className="flex-1 py-2 px-4 rounded-full border border-outline-variant items-center bg-[#119B50]">
                                    <Text className="font-label-md text-white font-bold">Pass</Text>
                                </TouchableOpacity>
                                <TouchableOpacity className="flex-1 py-2 px-4 rounded-full border border-error bg-error-container/20 items-center mx-2">
                                    <Text className="font-label-md text-error font-bold">Fail</Text>
                                </TouchableOpacity>
                                <TouchableOpacity className="flex-1 py-2 px-4 rounded-full border border-outline-variant items-center">
                                    <Text className="font-label-md text-on-surface-variant font-bold">N/A</Text>
                                </TouchableOpacity>
                            </View>
                            
                            {/* Expanded Photo Evidence for Failed Item (Mocking failure state) */}
                            <View className="mt-4 pt-4 border-t border-surface-container">
                                <Text className="font-label-md font-bold text-primary mb-sm">Photo Evidence (Required for Fail)</Text>
                                <View className="flex-row gap-sm mt-2">
                                    <View className="relative w-[100px] h-[100px] rounded-lg overflow-hidden mr-3">
                                        <Image source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCyqiVOzcUSUsqFSwFrYEL9pCY8fd3qc7nnoCWdzoOeIuk9QFtmOvhBRQLjGyz8WfLDgnDRf9vtybmQGSolmnw9aGsyBWzwXAnJEWpM5qf_k9DFLdHBRmfTyfAcPrNXGUbj9cvxKB5HjFnNrsitIPP37arx4UPMMz1qKnZJZBqNxGnqumFMKezeQPu5fNAkv8WwuJ2wNHp_D9Yh3-eyuY4HYlrOeunnl5UVsg_3y0pvlo4Ar0w76Y8TsDhmyPu0vR6EdAb4yddOOsTY' }} className="w-full h-full" />
                                        <TouchableOpacity className="absolute top-1 right-1 bg-primary/80 rounded-full p-1 bg-black/50">
                                            <Text className="text-white text-[10px]">✕</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity className="w-[100px] h-[100px] rounded-lg border-2 border-dashed border-outline-variant flex-col items-center justify-center bg-surface-container/20">
                                        <Text className="text-on-surface-variant text-[24px] mb-1">📸</Text>
                                        <Text className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest text-center">Add Photo</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* Cleaning Section */}
                    <View className="bg-white rounded-xl p-md border border-slate-100 shadow-sm mt-4" style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.04, shadowRadius: 20, elevation: 3 }}>
                        <View className="flex-col gap-4">
                            <Text className="font-headline-md text-[18px] font-bold text-primary mb-1">Surface Cleaning</Text>
                            <Text className="font-body-md text-label-sm text-on-surface-variant mb-4">Marble floors and glass entrance doors are polished and streak-free.</Text>
                            <View className="flex-row gap-2 w-full justify-between">
                                <TouchableOpacity className="flex-1 py-2 px-4 rounded-full bg-[#119B50] items-center">
                                    <Text className="font-label-md text-white font-bold">Pass</Text>
                                </TouchableOpacity>
                                <TouchableOpacity className="flex-1 py-2 px-4 rounded-full border border-outline-variant items-center mx-2">
                                    <Text className="font-label-md text-on-surface-variant font-bold">Fail</Text>
                                </TouchableOpacity>
                                <TouchableOpacity className="flex-1 py-2 px-4 rounded-full border border-outline-variant items-center">
                                    <Text className="font-label-md text-on-surface-variant font-bold">N/A</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    {/* Safety Section */}
                    <View className="bg-white rounded-xl p-md border border-slate-100 shadow-sm mt-4" style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.04, shadowRadius: 20, elevation: 3 }}>
                        <View className="flex-col gap-4">
                            <Text className="font-headline-md text-[18px] font-bold text-primary mb-1">Fire Safety Systems</Text>
                            <Text className="font-body-md text-label-sm text-on-surface-variant mb-4">Check extinguisher pressure gauge and exit sign illumination.</Text>
                            <View className="flex-row gap-2 w-full justify-between">
                                <TouchableOpacity className="flex-1 py-2 px-4 rounded-full border border-outline-variant items-center">
                                    <Text className="font-label-md text-on-surface-variant font-bold">Pass</Text>
                                </TouchableOpacity>
                                <TouchableOpacity className="flex-1 py-2 px-4 rounded-full border border-outline-variant items-center mx-2">
                                    <Text className="font-label-md text-on-surface-variant font-bold">Fail</Text>
                                </TouchableOpacity>
                                <TouchableOpacity className="flex-1 py-2 px-4 rounded-full border border-outline-variant items-center">
                                    <Text className="font-label-md text-on-surface-variant font-bold">N/A</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    {/* Notes Section */}
                    <View className="bg-white rounded-xl p-md border border-slate-100 shadow-sm mt-4" style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.04, shadowRadius: 20, elevation: 3 }}>
                        <Text className="font-headline-md text-[18px] font-bold text-primary mb-4">Additional Observations</Text>
                        <TextInput 
                            className="w-full bg-slate-50 rounded-xl border-none p-4 font-body-md text-secondary h-[100px]" 
                            placeholder="Enter any specific notes regarding this area's condition..." 
                            multiline
                            textAlignVertical="top"
                        />
                    </View>
                </View>
            </ScrollView>

            {/* Bottom Submission Bar */}
            <View className="absolute bottom-0 left-0 w-full bg-white border-t border-slate-100 px-6 py-4 flex-row items-center justify-between z-50">
                <View className="hidden md:flex">
                    <Text className="font-label-md font-bold text-on-surface-variant">Area Inspection Draft</Text>
                    <Text className="text-[10px] text-outline">Last saved 2 minutes ago</Text>
                </View>
                <View className="flex-row gap-4 w-full md:w-auto">
                    <TouchableOpacity className="flex-1 md:flex-none px-6 py-3 rounded-xl border border-outline-variant bg-white items-center justify-center mr-2 lg:mr-4">
                        <Text className="font-label-md font-bold text-primary">Save Draft</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => router.push('/dashboard')} className="flex-1 md:flex-none px-8 py-3 rounded-full bg-[#119B50] items-center justify-center">
                        <Text className="text-white font-label-md font-bold shadow-lg">Submit Inspection</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}
