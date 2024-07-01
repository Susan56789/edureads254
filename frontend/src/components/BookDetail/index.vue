<template>
    <div class="max-w-2xl mx-auto">
        <div v-if="book" class="bg-white shadow-md rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700">
            <router-link :to="`/book/${book._id}`">
                <img class="rounded-t-lg p-8" :src="book.imageurl" :alt="book.title">
            </router-link>
            <div class="px-5 pb-5">
                <h3 class="text-gray-900 font-semibold text-xl tracking-tight dark:text-white">{{ book.title }}</h3>
                <p class="text-gray-600 mt-2 mb-4 dark:text-gray-300">{{ book.author }}</p>
                <p class="text-gray-700 dark:text-gray-400">{{ book.description }}</p>
                <div class="flex items-center mt-2.5 mb-5">
                    <svg v-for="star in 5" :key="star" class="w-5 h-5"
                        :class="{ 'text-yellow-300': star <= Math.round(book.rating), 'text-gray-300': star > Math.round(book.rating) }"
                        fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span
                        class="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">{{
            book.rating }}</span>
                </div>
                <div class="flex items-center justify-between">
                    <span class="text-3xl font-bold text-gray-900 dark:text-white">{{ selectedPrice
                        }}</span>
                    <div>
                        <button @click="addToCart('pdf')"
                            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add
                            PDF to Cart</button>
                        <button @click="addToCart('audio')"
                            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ml-2">Add
                            Audio to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'BookDetail',
    props: {
        id: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            book: null,
            selectedPrice: 100, // Default price for PDF
            apiUrls: 'http://localhost:5000'
        };
    },
    async created() {
        await this.fetchBookDetails();
    },
    methods: {
        async fetchBookDetails() {
            try {
                const response = await axios.get(`${this.apiUrls}/api/books/${this.id}`);
                this.book = response.data;
            } catch (error) {
                console.error('Error fetching book details:', error);
            }
        },

        addToCart(type) {
            if (type === 'pdf') {
                this.selectedPrice = 100;
                alert('PDF added to cart');
            } else if (type === 'audio') {
                this.selectedPrice = 300;
                alert('Audio added to cart');
            }
        }
    }
};
</script>

<style scoped>
/* Add your scoped styles here */
</style>
