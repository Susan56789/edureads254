<template>
    <footer class="bg-gray-900 text-white">
        <div class="max-w-2xl mx-auto px-4 py-8 sm:px-6 sm:py-10">
            <div class="text-center">
                <h3 class="text-2xl sm:text-3xl mb-3">Download EduReads254 App</h3>
                <p class="mb-6">Empowering Minds, One Book at a Time.</p>
                <div
                    class="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 my-6 sm:my-10">
                    <div class="flex items-center border w-full sm:w-auto rounded-lg px-4 py-2">
                        <img src="https://cdn-icons-png.flaticon.com/512/888/888857.png" class="w-6 sm:w-7 md:w-8">
                        <div class="text-left ml-3">
                            <p class='text-xs text-gray-200'>Download on</p>
                            <p class="text-sm md:text-base">Google Play Store</p>
                        </div>
                    </div>
                    <div class="flex items-center border w-full sm:w-auto rounded-lg px-4 py-2">
                        <img src="https://cdn-icons-png.flaticon.com/512/888/888841.png" class="w-6 sm:w-7 md:w-8">
                        <div class="text-left ml-3">
                            <p class='text-xs text-gray-200'>Download on</p>
                            <p class="text-sm md:text-base">Apple Store</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mt-12 sm:mt-20 flex flex-col sm:flex-row sm:justify-between items-center text-sm text-gray-400">
                <p class="mb-4 sm:mb-0">EduReads254 &copy; 2024</p>
                <div class="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0">
                    <a href="/about" class="px-2">About us</a>
                    <a href="/contact" class="px-2 sm:border-l hidden sm:inline">Contact us</a>
                    <a href="/faq" class="px-2 sm:border-l">FAQs</a>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
    name: 'FooterComponent'
}
</script>