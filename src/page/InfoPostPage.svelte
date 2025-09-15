<!-- src/pages/InfoPostPage.svelte -->
<script>
    export let params = {};
    export let data = null;
    
    // This component will receive the post data fetched by the router
  </script>
  
  {#if data}
    <article class="max-w-4xl mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-4">{data.title.rendered}</h1>
      <div class="text-gray-600 mb-4">
        Published on {new Date(data.date).toLocaleDateString()}
      </div>
      <div class="prose max-w-none" innerHTML={data.content.rendered}></div>
    </article>
  {:else}
    <div class="text-center py-16">
      <p class="text-gray-500">Post not found.</p>
    </div>
  {/if}