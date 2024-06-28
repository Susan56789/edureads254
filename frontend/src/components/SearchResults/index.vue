<template>
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-2xl font-bold mb-4">Search Results for "{{ query }}"</h1>
        <div v-if="loading" class="text-center">Loading...</div>
        <div v-else>
            <div v-if="results.length > 0">
                <ul>
                    <li v-for="result in results" :key="result.id" class="mb-4 p-4 border rounded">
                        <h2 class="text-xl font-semibold">{{ result.title }}</h2>
                        <p>{{ result.description }}</p>
                    </li>
                </ul>
            </div>
            <div v-else class="text-center">No results found.</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SearchResult',
    data() {
        return {
            query: '',
            results: [],
            loading: false,
        };
    },
    created() {
        this.query = this.$route.query.q || '';
        if (this.query) {
            this.performSearch();
        }
    },
    methods: {
        async performSearch() {
            this.loading = true;
            try {
                // Replace this with your actual search logic
                const response = await fetch(`https://api.example.com/search?q=${this.query}`);
                const data = await response.json();
                this.results = data.results;
            } catch (error) {
                console.error('Error fetching search results:', error);
            } finally {
                this.loading = false;
            }
        },
    },
    watch: {
        '$route.query.q'(newQuery) {
            this.query = newQuery;
            this.performSearch();
        },
    },
};
</script>

<style scoped>
/* Add your custom styles here */
</style>