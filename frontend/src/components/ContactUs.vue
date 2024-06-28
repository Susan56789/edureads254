<template>
    <div class="contact">
        <div class="container mx-auto p-4">
            <h1 class="text-3xl md:text-4xl font-bold mb-4">Contact Us</h1>
            <p class="text-base md:text-lg mb-4">
                If you have any questions or feedback, please feel free to reach out to us.
            </p>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                    <h2 class="text-2xl font-bold mb-2">Our Location</h2>
                    <div class="w-full h-64 md:h-80 lg:h-96 mb-4">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d8171118.189439439!2d37.908383!3d0.1545604!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c38cf8bdaa9e709%3A0xa50e7ed071cd774!2sQuirkWeb%20Studios%20%7C%20Web%20Design%20Kenya%7C%20Graphic%20Design%7C%20SEO%7C%20Social%20Media%20Management%20Kenya!5e0!3m2!1sen!2ske!4v1719574435031!5m2!1sen!2ske"
                            width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"
                            referrerpolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                </div>
                <div>
                    <h2 class="text-2xl font-bold mb-2">Send Us a Message</h2>
                    <form @submit.prevent="submitForm">
                        <div class="mb-4">
                            <label class="block text-lg mb-1" for="name">Name</label>
                            <input type="text" id="name" v-model="name"
                                class="w-full p-2 border border-gray-300 rounded" required />
                        </div>
                        <div class="mb-4">
                            <label class="block text-lg mb-1" for="email">Email</label>
                            <input type="email" id="email" v-model="email"
                                class="w-full p-2 border border-gray-300 rounded" required />
                        </div>
                        <div class="mb-4">
                            <label class="block text-lg mb-1" for="message">Message</label>
                            <textarea id="message" v-model="message" class="w-full p-2 border border-gray-300 rounded"
                                rows="4" required></textarea>
                        </div>
                        <button type="submit" class="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ContactUs',
    data() {
        return {
            name: '',
            email: '',
            message: '',
        };
    },
    methods: {
        submitForm() {
            alert('Form submitted');
            // Handle form submission logic here
        },
    },
};
</script>

<style scoped>
.contact {
    min-height: 100vh;
    background-color: #f9f9f9;
}
</style>