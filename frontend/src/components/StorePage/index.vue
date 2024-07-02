<template>
    <div class="max-w-2xl mx-auto">

        <h2 class="flex flex-row flex-nowrap items-center my-8">
            <span class="flex-grow block border-t border-black" aria-hidden="true" role="presentation"></span>
            <span
                class="flex-none block mx-4   px-4 py-2.5 text-xs leading-none font-medium uppercase bg-black text-white">
                EDUREADS254
            </span>
            <span class="flex-grow block border-t border-black" aria-hidden="true" role="presentation"></span>
        </h2>

        <div v-if="loading" class="flex items-center justify-center">
            <div class="w-16 h-16 border-4 border-orange-500 border-solid border-t-transparent rounded-full spin"></div>
        </div>
        <div v-if="error" class="text-red-500">{{ error }}</div>
        <div v-if="!loading && !error && paginatedBooks.length > 0"
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <BookCard v-for="book in paginatedBooks" :key="book._id" :book="book" />
        </div>
        <PaginationPage v-if="totalPages > 1" :totalPages="totalPages" :currentPage="currentPage"
            @paginate="handlePaginate" />
    </div>
</template>

<script>
import axios from 'axios';
import BookCard from '../BookCard/index.vue';
import PaginationPage from '../PaginationPage.vue';

export default {
    name: 'StorePage',
    components: {
        BookCard,
        PaginationPage
    },
    data() {
        return {
            books: [],
            paginatedBooks: [],
            loading: true,
            error: null,
            currentPage: 1,
            itemsPerPage: 10,
            apiUrls: ['http://localhost:5000/', 'https://edureads254.onrender.com/']
        };
    },
    computed: {
        totalPages() {
            return Math.ceil(this.books.length / this.itemsPerPage);
        }
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
                    const response = await axios.get(apiUrl + 'api/books'); // Adjust the endpoint as per your API structure
                    this.books = response.data;
                    this.updatePaginatedBooks();
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
        handlePaginate(page) {
            this.currentPage = page;
            this.updatePaginatedBooks();
        },
        updatePaginatedBooks() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            this.paginatedBooks = this.books.slice(start, end);
        }
    }
};
</script>

<style scoped>
/* Add your styles here */
</style>
