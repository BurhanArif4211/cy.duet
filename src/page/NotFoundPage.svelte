<script>
  import { router } from '../router.js';
  export let params = {};
</script>

<div class="min-h-[70vh] flex items-center justify-center px-4 py-20">
  <div class="text-center max-w-md">
    <div class="font-mono text-7xl font-bold text-purple-600 mb-4">404</div>
    <h1 class="text-2xl font-bold text-gray-900 mb-3">
      {params.message ? 'Post Not Found' : 'Page Not Found'}
    </h1>
    <p class="text-gray-600 mb-8">
      {params.message ?? "The page you're looking for doesn't exist."}
    </p>
    <button
      on:click={() => router.navigate('/home')}
      class="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
    >
      Return Home
    </button>
  </div>
</div>
