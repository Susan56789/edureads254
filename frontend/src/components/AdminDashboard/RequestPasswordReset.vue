<template>
  <div class="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
    <div class="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
      <div class="font-bold text-2xl mb-5 flex justify-center items-center">
        <img class="h-40" src="/assets/Logo2.png" alt="Edureads Logo" />
      </div>
      <div class="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
        <form @submit.prevent="requestPasswordReset" class="px-5 py-7">
          <label class="font-semibold text-sm text-gray-600 pb-1 block">E-mail</label>
          <input v-model="email" type="text" class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
          <button @click="requestPasswordReset"
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
      axios
        .post('https://edureads254.onrender.com/api/auth/request-password-reset', { email: this.email })
        .then((response) => {
          console.log(response);
          alert('Reset token sent to email');
          this.$router.push('/admin/reset');
        })
        .catch((error) => {
          console.error('Error requesting password reset:', error);
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
            console.error('Response headers:', error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            console.error('Request data:', error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error message:', error.message);
          }
          alert('Error requesting password reset. Please try again.');
        });
    }

  },
};
</script>
