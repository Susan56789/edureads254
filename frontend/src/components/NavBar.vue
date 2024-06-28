<template>
    <nav class="bg-white w-full flex relative justify-between items-center mx-auto px-8 h-20">
        <!-- logo -->
        <div class="inline-flex">
            <a class="_o6689fn" href="/">
                <div class="hidden md:block">
                    <img src="/assets/Logo2.png" width="80" alt="EduReadsLogo" />
                </div>
                <div class="block md:hidden">
                    <img src="/assets/Logo2.png" width="80" alt="EduReadsLogo" />
                </div>
            </a>
        </div>
        <!-- end logo -->

        <!-- search bar -->
        <div class="flex-shrink flex-grow-0 justify-start px-2">
            <div class="inline-block">
                <div class="inline-flex items-center max-w-full">
                    <input v-model="searchQuery" @keyup.enter="performSearch" placeholder="Start your search"
                        class="flex items-center flex-grow-0 flex-shrink pl-2 relative w-60 border rounded-full px-1 py-1"
                        type="text" />
                    <div class="flex items-center justify-center relative h-8 w-8 rounded-full">
                        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
                            role="presentation" focusable="false"
                            style="display: block; fill: none; height: 12px; width: 12px; stroke: currentcolor; stroke-width: 5.33333; overflow: visible;">
                            <g fill="none">
                                <path
                                    d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9">
                                </path>
                            </g>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
        <!-- end search bar -->

        <!-- mobile menu button -->
        <div class="block sm:hidden">
            <button @click="toggleMobileMenu"
                class="flex items-center px-3 py-2 border rounded text-gray-700 border-gray-400 hover:text-gray-900 hover:border-gray-500">
                <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <title>Menu</title>
                    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                </svg>
            </button>
        </div>

        <!-- login -->
        <div class="flex-initial flex items-center">
            <div class="flex justify-end items-center relative">
                <div class="hidden sm:flex mr-4 items-center">
                    <a class="inline-block py-2 px-3 hover:bg-gray-200 rounded-full" href="/">
                        <div class="flex items-center relative cursor-pointer whitespace-nowrap">Home</div>
                    </a>
                    <a class="inline-block py-2 px-3 hover:bg-gray-200 rounded-full" href="/about">
                        <div class="flex items-center relative cursor-pointer whitespace-nowrap">About Us</div>
                    </a>
                    <a class="inline-block py-2 px-3 hover:bg-gray-200 rounded-full" href="/contact">
                        <div class="flex items-center relative cursor-pointer whitespace-nowrap">Contact Us</div>
                    </a>
                </div>
                <div class="block relative">
                    <a :href="userLoggedIn ? '/my-account' : '/login'"
                        class="inline-block py-2 px-3 hover:bg-gray-200 rounded-full">
                        <div class="flex items-center h-5">
                            <div class="block flex-grow-0 flex-shrink-0 h-10 w-12 pl-5">
                                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
                                    role="presentation" focusable="false"
                                    style="display: block; height: 100%; width: 100%; fill: currentcolor;">
                                    <path
                                        d="m16 .7c-8.437 0-15.3 6.863-15.3 15.3s6.863 15.3 15.3 15.3 15.3-6.863 15.3-15.3-6.863-15.3-15.3-15.3zm0 28c-4.021 0-7.605-1.884-9.933-4.81a12.425 12.425 0 0 1 6.451-4.4 6.507 6.507 0 0 1 -3.018-5.49c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5a6.513 6.513 0 0 1 -3.019 5.491 12.42 12.42 0 0 1 6.452 4.4c-2.328 2.925-5.912 4.809-9.933 4.809z">
                                    </path>
                                </svg>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
        <!-- end login -->

        <!-- mobile menu -->
        <div v-if="mobileMenuOpen" class="sm:hidden absolute top-20 left-0 right-0 bg-white shadow-lg">
            <a class="block py-2 px-4 hover:bg-gray-200" href="/">Home</a>
            <a class="block py-2 px-4 hover:bg-gray-200" href="/about">About Us</a>
            <a class="block py-2 px-4 hover:bg-gray-200" href="/contact">Contact Us</a>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'NavBar',
    data() {
        return {
            searchQuery: '',
            mobileMenuOpen: false,
            userLoggedIn: false,
        };
    },
    methods: {
        performSearch() {
            // Navigate to the search results page with the search query as a parameter
            this.$router.push({ name: 'SearchResult', query: { q: this.searchQuery } });
        },
        toggleMobileMenu() {
            this.mobileMenuOpen = !this.mobileMenuOpen;
        },
    },
};
</script>

<style scoped>
/* Custom styles for responsive design */
@media (max-width: 640px) {
    .hidden.sm\:block {
        display: none;
    }

    .block.sm\:hidden {
        display: block;
    }
}
</style>