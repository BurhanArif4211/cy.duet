<!-- src/pages/NotFoundPage.svelte -->
<script>
  import { router } from '../router.js';
  
  export let params = {};
  
  function goHome() {
    router.navigate('/home');
  }
</script>

<div class="max-w-md mx-auto px-4 py-16 text-center">
  <h1 class="text-2xl font-bold text-gray-900 mb-4">
    {params.message ? 'Post Not Found' : 'Page Not Found'}
  </h1>
  <p class="text-gray-600 mb-8">
    {params.message || "The page you're looking for doesn't exist."}
  </p>
  <button on:click={goHome} class="bg-cyan-600 text-white px-6 py-2 rounded-lg hover:bg-cyan-700">
    Go Home
  </button>
</div>