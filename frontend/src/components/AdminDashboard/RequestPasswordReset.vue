<template>
    <div class="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
      <div class="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
        <div class="font-bold text-2xl mb-5 flex justify-center items-center">
          <img class="h-40" src="/assets/Logo2.png" alt="Edureads Logo">
        </div>
  
        <div class="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
          <form @submit.prevent="requestPasswordReset" class="px-5 py-7">
            <label class="font-semibold text-sm text-gray-600 pb-1 block">E-mail</label>
            <input v-model="email" type="text" class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
            <button type="submit"
              class="transition duration-200 bg-red-500 hover:bg-red-600 focus:bg-red-700 focus:shadow-sm focus:ring-4 focus:ring-red-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
              <span class="inline-block mr-2">Send Reset Code</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'RequestPasswordReset',
    data() {
      return {
        email: '',
      };
    },
    methods: {
      requestPasswordReset() {
        axios.post('/api/auth/request-password-reset', { email: this.email })
          .then((response) => {
            alert('Reset token sent to email');
          })
          .catch((error) => {
            console.error('Error requesting password reset:', error);
          });
      },
    },
  };
  </script>
  