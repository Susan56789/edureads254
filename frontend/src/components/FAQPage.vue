<!-- src/views/Faq.vue -->
<template>
    <div class="faq">
        <div class="container mx-auto p-4">
            <h1 class="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h1>
            <div class="space-y-4">
                <div v-for="(item, index) in faqs" :key="index" class="bg-white p-4 rounded shadow">
                    <h2 class="text-xl font-bold mb-2">{{ item.question }}</h2>
                    <p class="text-base md:text-lg">{{ item.answer }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FAQPage',
    data() {
        return {
            faqs: [
                {
                    question: 'What is the return policy?',
                    answer: 'You can return any book within 30 days of purchase for a full refund.'
                },
                {
                    question: 'How do I access my purchased books?',
                    answer: 'Purchased books can be accessed from your account dashboard under the "My Books" section.'
                },
                {
                    question: 'What payment methods are accepted?',
                    answer: 'We accept Visa, MasterCard, PayPal, and several other major payment methods.'
                },
                // Add more FAQ items as needed
            ]
        };
    }
};
</script>

<style scoped>
.faq {
    min-height: 100vh;
    background-color: #f9f9f9;
}
</style>