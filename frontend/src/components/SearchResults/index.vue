<template>
    <div class="p-4">
        <h1 class="text-2xl font-bold mb-4">Search Results for "{{ $route.query.q }}"</h1>
        <div v-if="loading" class="flex justify-center">
            <svg class="animate-spin -ml-1 mr-3 h-10 w-10 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8v-8H4z"></path>
            </svg>
        </div>
        <div v-if="error" class="text-red-500">{{ error }}</div>
        <div v-if="filteredBooks.length" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div v-for="book in filteredBooks" :key="book._id" class="bg-white shadow-md rounded-lg">
                <router-link :to="`/book/${book._id}`">
                    <img class="rounded-t-lg p-4" :src="book.imageurl" :alt="book.title">
                    <div class="p-4">
                        <h2 class="text-xl font-bold">{{ book.title }}</h2>
                        <p class="text-gray-700">{{ book.author }}</p>
                    </div>
                </router-link>
            </div>
        </div>
        <div v-if="!filteredBooks.length && !loading" class="text-center text-gray-700">No results found.</div>
    </div>
</template>

<script>
export default {
    name: 'SearchResult',
    data() {
        return {
            books: [],
            loading: false,
            error: null,
            apiUrls: ['http://localhost:5000', 'https://edureads254.onrender.com']
        };
    },
    computed: {
        filteredBooks() {
            const query = this.$route.query.q.toLowerCase();
            return this.books.filter(book =>
                book.title.toLowerCase().includes(query) || book.author.toLowerCase().includes(query)
            );
        }
    },
    watch: {
        '$route.query.q': 'fetchSearchResults'
    },
    methods: {
        async fetchSearchResults() {
            this.loading = true;
            this.error = null;
            this.books = [];

            for (const apiUrl of this.apiUrls) {
                try {
                    const response = await fetch(`${apiUrl}/api/books?search=${this.$route.query.q}`);
                    if (!response.ok) throw new Error('Failed to fetch search results');
                    const result = await response.json();
                    this.books = result.filter(book =>
                        book.title.toLowerCase().includes(this.$route.query.q.toLowerCase()) ||
                        book.author.toLowerCase().includes(this.$route.query.q.toLowerCase())
                    );
                    if (this.books.length) break; // Stop on successful response with results
                } catch (err) {
                    this.error = err.message;
                } finally {
                    this.loading = false;
                }
            }

            if (!this.books.length && !this.error) {
                this.error = 'No books found';
            }
        }
    },
    mounted() {
        this.fetchSearchResults();
    }
};
</script>
