<template>
    <div class="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
        <div class="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
            <div class="font-bold text-2xl mb-5 flex justify-center items-center">
                <img class="h-40" src="/assets/Logo2.png" alt="Edureads Logo">
            </div>

            <div class="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
                <form @submit.prevent="login" class="px-5 py-7">
                    <label class="font-semibold text-sm text-gray-600 pb-1 block">E-mail</label>
                    <input v-model="credentials.email" type="text"
                        class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
                    <label class="font-semibold text-sm text-gray-600 pb-1 block">Password</label>
                    <input v-model="credentials.password" type="password"
                        class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
                    <button @click="login" type="button"
                        class="transition duration-200 bg-red-500 hover:bg-red-600 focus:bg-red-700 focus:shadow-sm focus:ring-4 focus:ring-red-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
                        <span class="inline-block mr-2">Login</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                            class="w-4 h-4 inline-block">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </button>
                </form>
                <div class="py-5">
                    <div class="grid grid-cols-2 gap-1">
                        <div class="text-center sm:text-left whitespace-nowrap">
                            <button @click="redirectToPasswordReset"
                                class="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor" class="w-4 h-4 inline-block align-text-top">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                                </svg>
                                <a href="/password-reset" class="inline-block ml-1">Forgot Password</a>
                            </button>
                        </div>
                        <div class="text-center sm:text-right whitespace-nowrap">
                            <button
                                class="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor" class="w-4 h-4 inline-block align-text-bottom">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                                <a href="#" class="inline-block ml-1">Help</a>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="py-5">
                <div class="grid grid-cols-2 gap-1">
                    <div class="text-center sm:text-left whitespace-nowrap">
                        <button
                            class="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-200 focus:outline-none focus:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor" class="w-4 h-4 inline-block align-text-top">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            <a href="/" class="inline-block ml-1">Back to Home</a>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import authService from '@/auth/authService';

export default {
    name: 'AdminLogin',
    data() {
        return {
            credentials: {
                email: '',
                password: '',
            },
            errorMessage: ''
        };
    },
    methods: {
        async login() {
            this.errorMessage = '';
            console.log('Sending login request with credentials:', this.credentials);
            try {
                // Add token to headers
                const token = 'your-token-here'; // Replace with actual token retrieval logic
                const response = await authService.login(this.credentials, token);
                console.log('Server Response:', response);
                if (response.success) {
                    this.$router.push('/adminpage/dashboard');
                } else {
                    this.errorMessage = 'Login failed: ' + response.message;
                }
            } catch (error) {
                this.errorMessage = 'Error during login: ' + error.message;
            }
        },
        redirectToPasswordReset() {
            this.$router.push('/password-reset');
        }
    }
};
</script>
