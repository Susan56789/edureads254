<template>
    <div class="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
      <div class="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
        <div class="font-bold text-2xl mb-5 flex justify-center items-center">
          <img class="h-40" src="/assets/Logo2.png" alt="Edureads Logo">
        </div>
  
        <div class="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
          <form @submit.prevent="resetPassword" class="px-5 py-7">
            <label class="font-semibold text-sm text-gray-600 pb-1 block">E-mail</label>
            <input v-model="credentials.email" type="text" class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
            <label class="font-semibold text-sm text-gray-600 pb-1 block">Reset Code</label>
            <input v-model="credentials.resetToken" type="text" class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
            <label class="font-semibold text-sm text-gray-600 pb-1 block">New Password</label>
            <input v-model="credentials.newPassword" type="password" class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
            <button type="submit"
              class="transition duration-200 bg-red-500 hover:bg-red-600 focus:bg-red-700 focus:shadow-sm focus:ring-4 focus:ring-red-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
              <span class="inline-block mr-2">Reset Password</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'ResetPassword',
    data() {
      return {
        credentials: {
          email: '',
          resetToken: '',
          newPassword: '',
        },
      };
    },
    methods: {
      resetPassword() {
        axios.post('/api/auth/reset-password', this.credentials)
          .then((response) => {
            alert('Password reset successful');
            console.log(response)
            this.$router.push('/admin/login');
          })
          .catch((error) => {
            console.error('Error resetting password:', error);
          });
      },
    },
  };
  </script>
  