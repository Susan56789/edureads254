<template>
    <div class="container mx-auto px-4">
        <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 py-12">
            <h2 class="flex flex-row flex-nowrap items-center my-8">
                <span class="flex-grow block border-t border-black" aria-hidden="true" role="presentation"></span>
                <span
                    class="flex-none block mx-4 px-4 py-2.5 text-xs leading-none font-medium uppercase bg-black text-white">
                    CATEGORY: {{ genreName }}
                </span>
                <span class="flex-grow block border-t border-black" aria-hidden="true" role="presentation"></span>
            </h2>

            <div v-if="loading" class="flex items-center justify-center">
                <div class="w-16 h-16 border-4 border-orange-500 border-solid border-t-transparent rounded-full spin">
                </div>
            </div>
            <div v-if="error" class="text-red-500">{{ error }}</div>
            <div v-if="!loading && !error" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <BookCard v-for="book in books" :key="book._id" :book="book"
                    class="w-full bg-white rounded-lg p-12 flex flex-col justify-center items-center" />
            </div>
        </section>
    </div>
</template>

<script>
import axios from 'axios';
import BookCard from './BookCard/index.vue';

export default {
    name: 'GenrePage',
    components: {
        BookCard
    },
    props: {
        name: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            genreName: this.name,
            books: [],
            loading: true,
            error: null,
            apiUrls: ['http://localhost:5000/', 'https://edureads254.onrender.com/'],
        };
    },
    async created() {
        await this.fetchBooksByGenre();
    },
    watch: {
        '$route.params.name': 'fetchBooksByGenre'
    },
    methods: {
        async fetchBooksByGenre() {
            this.loading = true;
            this.error = null;
            this.books = [];
            this.genreName = this.$route.params.name;

            for (const apiUrl of this.apiUrls) {
                try {
                    const response = await axios.get(`${apiUrl}api/books?genre=${this.$route.params.name}`);
                    if (response.data.length > 0) {
                        this.books = response.data;
                        this.loading = false;
                        return;
                    }
                } catch (error) {
                    console.error(`Error fetching from ${apiUrl}:`, error);
                }
            }

            // Handle case where all APIs fail or no books found
            this.error = `Failed to fetch books for genre: ${this.$route.params.name}.`;
            this.loading = false;
        },
    },
};
</script>

<style scoped>
.spin {
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>