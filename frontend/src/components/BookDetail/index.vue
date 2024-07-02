<template>
    <div class="w-full flex flex-col">
        <div v-if="loading" class="flex items-center justify-center">
            <div class="w-16 h-16 border-4 border-orange-500 border-solid border-t-transparent rounded-full spin"></div>
        </div>
        <div v-if="error" class="text-red-500">{{ error }}</div>
        <div v-if="!loading && !error && book.length > 0"
            class="bg-white shadow-md rounded-lg w-full flex flex-col lg:flex-row">
            <router-link :to="`/book/${book._id}`" class="lg:w-1/2">
                <img class="rounded-t-lg lg:rounded-tr-none lg:rounded-l-lg p-8" :src="book.imageurl" :alt="book.title">
            </router-link>
            <div class="px-5 pb-5 lg:w-1/2 flex flex-col justify-between">
                <div>
                    <h3 class="text-gray-900 font-semibold text-xl tracking-tight">{{ book.title }}</h3>
                    <p class="text-gray-600 mt-2 mb-4">{{ book.author }}</p>
                    <p class="text-gray-700">{{ book.description }}</p>
                    <div class="flex items-center mt-2.5 mb-5">
                        <svg v-for="star in 5" :key="star" class="w-5 h-5" :class="starClass(star)" fill="currentColor"
                            viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span
                            class="bg-orange-100 text-orange-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded ml-3">{{
            book.rating }}</span>
                    </div>
                </div>
                <div class="flex items-center justify-between mt-5">
                    <span class="text-lg text-gray-900">{{ selectedFormat.toUpperCase() }}</span>
                    <span class="text-3xl font-bold text-gray-900">{{ selectedPrice }}</span>
                    <div>
                        <button v-if="book.pdfUrl" @click="selectOption('pdf')"
                            :class="{ 'bg-orange-800': selectedFormat === 'pdf' }"
                            class="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">PDF</button>
                        <button v-if="book.audioUrl" @click="selectOption('audio')"
                            :class="{ 'bg-orange-800': selectedFormat === 'audio' }"
                            class="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ml-2">Audio</button>
                    </div>
                </div>
                <div class="mt-5">
                    <button @click="addToCart"
                        class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Add
                        to Cart</button>
                </div>
            </div>
        </div>
        <div class="w-full mt-8">
            <h2 class="flex flex-row flex-nowrap items-center my-8">
                <span class="flex-grow block border-t border-black" aria-hidden="true" role="presentation"></span>
                <span
                    class="flex-none block mx-4   px-4 py-2.5 text-xs leading-none font-medium uppercase bg-black text-white">
                    YOU MAY ALSO LIKE ...
                </span>
                <span class="flex-grow block border-t border-black" aria-hidden="true" role="presentation"></span>
            </h2>

            <div v-if="loading" class="flex items-center justify-center">
                <div class="w-16 h-16 border-4 border-orange-500 border-solid border-t-transparent rounded-full spin">
                </div>
            </div>
            <div v-if="error" class="text-red-500">{{ error }}</div>
            <div v-if="!loading && !error && relatedBooks.length > 0">
                <div v-for="relatedBook in relatedBooks" :key="relatedBook._id"
                    class="bg-white shadow-md rounded-lg mb-5 flex">
                    <router-link :to="`/book/${relatedBook._id}`" class="flex w-full">
                        <img class="rounded-t-lg p-4 w-1/3" :src="relatedBook.imageurl" :alt="relatedBook.title">
                        <div class="px-5 py-4 w-2/3">
                            <h4 class="text-gray-900 font-semibold text-lg tracking-tight">{{ relatedBook.title }}</h4>
                            <p class="text-gray-600 mt-2">{{ relatedBook.author }}</p>
                            <p class="text-gray-700 mt-2">Type: {{ relatedBook.type }}</p>
                        </div>
                    </router-link>
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
            relatedBooks: [],
            selectedPrice: 100,
            loading: true,
            error: null,
            selectedFormat: 'pdf',
            apiUrls: ['http://localhost:5000', 'https://edureads254.onrender.com']
        };
    },
    async created() {
        await this.fetchBookDetails();
        await this.fetchRelatedBooks();
    },
    methods: {
        async fetchBookDetails() {
            for (const apiUrl of this.apiUrls) {
                try {
                    const response = await axios.get(`${apiUrl}/api/books/${this.id}`);
                    this.book = response.data;
                    return; // Exit loop if successful
                } catch (error) {
                    console.error(`Error fetching from ${apiUrl}:`, error);
                }
            }
            console.error('Error fetching book details from all sources.');
        },
        async fetchRelatedBooks() {
            for (const apiUrl of this.apiUrls) {
                try {
                    const response = await axios.get(`${apiUrl}/api/books/related/${this.id}`);
                    this.relatedBooks = response.data;
                    return; // Exit loop if successful
                } catch (error) {
                    console.error(`Error fetching from ${apiUrl}:`, error);
                }
            }
            console.error('Error fetching related books from all sources.');
        },
        selectOption(format) {
            this.selectedFormat = format;
            this.selectedPrice = format === 'pdf' ? 100 : 300;
        },
        addToCart() {
            alert(`${this.selectedFormat.toUpperCase()} added to cart`);
        },
        starClass(star) {
            return {
                'text-yellow-300': star <= Math.round(this.book.rating),
                'text-gray-300': star > Math.round(this.book.rating)
            };
        }
    }
};
</script>

<style scoped>
/* Add your scoped styles here */
</style>
