<template>
    <footer class="site-footer">
        <div class="footer-inner">
            <div class="left">
                <router-link to="/">QuizMaster</router-link>
                <span>•</span>
                <router-link to="/themes">Temas</router-link>
                <span>•</span>
                <router-link to="/feed">Feed</router-link>
            </div>

            <div class="right">© {{ year }} QuizMaster</div>
        </div>
    </footer>
</template>

<script setup>
import { ref } from 'vue'
const year = ref(new Date().getFullYear())
</script>

<style scoped>
.site-footer {
    border-top: 1px solid #e6e6e6;
    padding: 1rem;
    background: #fff
}

.footer-inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem
}

.footer-inner a {
    color: #555;
    text-decoration: none;
    margin: 0 0.25rem
}

.right {
    color: #888;
    font-size: 0.9rem
}

@media (max-width:600px) {
    .footer-inner {
        flex-direction: column;
        align-items: flex-start
    }
}
</style>
