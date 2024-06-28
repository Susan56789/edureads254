<template>
    <div class="about">
        <div class="container mx-auto p-4">
            <h1 class="text-4xl font-bold mb-4">About Us</h1>
            <p class="text-lg mb-4">
                Welcome to our online library. We provide a vast collection of books in PDF and audio formats.
            </p>
            <p class="text-lg mb-4">
                Our mission is to make reading accessible to everyone, everywhere. Whether you're at home, on the go, or
                in a remote location, you can enjoy our extensive library of titles across various genres and
                categories.
            </p>
            <p class="text-lg mb-4">
                Our team is dedicated to curating and delivering high-quality content. We believe in the power of
                knowledge and the importance of lifelong learning.
            </p>
            <h2 class="text-2xl font-bold mb-2">Our Team</h2>
            <ul class="list-disc list-inside mb-4">
                <li>John Doe - Founder & CEO</li>
                <li>Jane Smith - Chief Content Officer</li>
                <li>Emily Johnson - Head of Development</li>
                <li>Michael Brown - Marketing Director</li>
            </ul>
            <h2 class="text-2xl font-bold mb-2">Contact Us</h2>
            <p class="text-lg">
                Have any questions or feedback? Feel free to <router-link to="/contact"
                    class="text-orange-500 underline">contact us</router-link>.
            </p>
        </div>
    </div>
</template>

<script>

export default {
    name: 'AboutUs'
}
</script>

<style scoped>
.about {
    min-height: 100vh;
    background-color: #f9f9f9;
}
</style>