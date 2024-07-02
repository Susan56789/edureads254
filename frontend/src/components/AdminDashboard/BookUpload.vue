<template>
    <div class="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
      <div class="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
        <div class="font-bold text-2xl mb-5 flex justify-center items-center">
          <img class="h-40" src="/assets/Logo2.png" alt="Edureads Logo">
        </div>
  
        <div class="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
          <form @submit.prevent="addBook" class="px-5 py-7">
            <label class="font-semibold text-sm text-gray-600 pb-1 block">Title</label>
            <input v-model="book.title" type="text" class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
  
            <label class="font-semibold text-sm text-gray-600 pb-1 block">Author</label>
            <input v-model="book.author" type="text" class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
  
            <label class="font-semibold text-sm text-gray-600 pb-1 block">Description</label>
            <textarea v-model="book.description" class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"></textarea>
  
            <label class="font-semibold text-sm text-gray-600 pb-1 block">PDF URL</label>
            <input v-model="book.pdfUrl" type="text" class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
  
            <label class="font-semibold text-sm text-gray-600 pb-1 block">Audio URL</label>
            <input v-model="book.audioUrl" type="text" class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
  
            <label class="font-semibold text-sm text-gray-600 pb-1 block">Image URL</label>
            <input v-model="book.imageUrl" type="text" class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
  
            <label class="font-semibold text-sm text-gray-600 pb-1 block">Genre</label>
            <input v-model="book.genre" type="text" class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
  
            <button type="submit" class="transition duration-200 bg-red-500 hover:bg-red-600 focus:bg-red-700 focus:shadow-sm focus:ring-4 focus:ring-red-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
              <span class="inline-block mr-2">Add Book</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { mapState } from 'vuex';
  
  export default {
    name: 'BookUpload',
    data() {
      return {
        book: {
          title: '',
          author: '',
          description: '',
          pdfUrl: '',
          audioUrl: '',
          imageUrl: '',
          genre: ''
        },
        loading: false,
        error: ''
      };
    },
    computed: {
      ...mapState(['authToken'])
    },
    methods: {
      async addBook() {
        this.loading = true;
        this.error = '';
  
        try {
          const response = await axios.post(
            '/api/books',
            this.book,
            {
              headers: {
                Authorization: `Bearer ${this.authToken}`
              }
            }
          );
  
          if (response.status === 201) {
            alert('Book added successfully!');
            this.$router.push('/adminpage/dashboard');
          } else {
            this.error = 'Failed to add the book';
          }
        } catch (error) {
          this.error = error.response ? error.response.data.message : 'An error occurred';
        } finally {
          this.loading = false;
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .error {
    color: red;
  }
  </style>
  