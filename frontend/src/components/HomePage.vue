<template>
  <div class="container mx-auto px-4">
    <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 py-12">

      <h2 class="flex flex-row flex-nowrap items-center my-8">
        <span class="flex-grow block border-t border-black" aria-hidden="true" role="presentation"></span>
        <span class="flex-none block mx-4   px-4 py-2.5 text-xs leading-none font-medium uppercase bg-black text-white">
          NEW ARRIVALS
        </span>
        <span class="flex-grow block border-t border-black" aria-hidden="true" role="presentation"></span>
      </h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <BookCard v-for="book in books" :key="book._id" :book="book"
          class="w-full bg-white rounded-lg p-12 flex flex-col justify-center items-center" />
      </div>
    </section>
    <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 py-12">

      <h2 class="flex flex-row flex-nowrap items-center my-8">
        <span class="flex-grow block border-t border-black" aria-hidden="true" role="presentation"></span>
        <span class="flex-none block mx-4   px-4 py-2.5 text-xs leading-none font-medium uppercase bg-black text-white">
          TOP CATEGORIES
        </span>
        <span class="flex-grow block border-t border-black" aria-hidden="true" role="presentation"></span>
      </h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="category in categories" :key="category.id"
          class="w-full bg-white rounded-lg p-12 flex flex-col justify-center items-center">
          <div class="mb-8">
            <a href="#">
              <img :src="category.imageUrl" :alt="category.name" class="w-full h-auto" />
            </a>
          </div>
          <div class="p-6 flex-grow">
            <h4
              class="block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased text-center">
              {{ category.name }}
            </h4>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { categories } from '@/categories';
import BookCard from './BookCard/index.vue'
import axios from 'axios';

export default {
  name: 'HomePage',
  data() {
    return {
      categories: categories,
      books: [],
      apiUrls: ['http://localhost:5000/', 'https://edureads254.onrender.com/'],
      loading: true,
      error: null,
    }
  },
  components: {
    BookCard
  },
  async created() {
    await this.fetchBooks();
  },
  methods: {
    async fetchBooks() {
      this.loading = true;
      this.error = null;

      for (const apiUrl of this.apiUrls) {
        try {
          const response = await axios.get(apiUrl + 'api/books');
          this.books = response.data.slice(0, 6);
          this.loading = false;
          return; // Exit the loop if successful
        } catch (error) {
          console.error(`Error fetching from ${apiUrl}:`, error);
        }
      }

      // Handle case where all APIs fail
      this.error = 'Failed to fetch books from all available sources.';
      this.loading = false;
    },
  }
}
</script>

<style scoped>
/* Custom styles */
</style>