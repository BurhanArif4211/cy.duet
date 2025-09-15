<!-- LatestPosts.svelte -->
<script>
  import { RestURL } from './../main.js';

  // Props: posts array (WP-style), optional limit, optional isLoading flag
  export let posts = [];
  export let limit = 3;
  export let isLoading = false;

  // Safe small helpers
  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      return new Date(dateString).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return '';
    }
  };

  const getCategorySlug = (post) => {
    // prefer explicit category slug from class_list if available
    const cls = post?.class_list;
    if (Array.isArray(cls)) {
      const found = cls.find(s => typeof s === 'string' && s.startsWith('category-'));
      if (found) return found.replace('category-', '') || 'posts';
    }
    // fallbacks
    if (post?.categories && post.categories.length > 0) return 'posts';
    return 'posts';
  };
  async function getPostImageUrl(featured_media){
    let response = await fetch(`${RestURL}/wp-json/wp/v2/media/${featured_media}`);
    let data = await response.json();
    // console.log(data.source_url);
    return data.source_url;
  }
  import { onMount } from 'svelte';

  let displayPosts = [];

  onMount(async () => {
    if (Array.isArray(posts)) {
      displayPosts = await Promise.all(
        posts.slice(0, Math.max(0, limit)).map(async (p) => ({
          id: p.id ?? p.slug,
          slug: p.slug,
          titleHtml: p.title?.rendered ?? '',
          excerptHtml: p.excerpt?.rendered ?? '',
          image: p.featured_media ? await getPostImageUrl(p.featured_media) : null,
          dateFormatted: formatDate(p.date),
          categorySlug: getCategorySlug(p)
        }))
      );
    }
  });
</script>

<section class="py-16 px-4 md:px-8 lg:px-16 bg-gray-100">
  <div class="max-w-7xl mx-auto">
    <h2 class="text-3xl font-bold text-gray-900 mb-8 text-center">Latest News &amp; Updates</h2>

    {#if isLoading}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {#each Array(limit) as _}
          <div class="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
            <div class="hidden md:block w-full h-48 bg-gray-200"></div>
            <div class="p-6">
              <div class="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
              <div class="h-6 bg-gray-200 rounded w-full mb-4"></div>
              <div class="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div class="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
        {/each}
      </div>
    {:else if displayPosts.length > 0}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {#each displayPosts as post (post.id)}
          <article class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            {#if post.image }
              <div class="hidden md:block w-full h-48 overflow-hidden">
                <img
                  src={post.image}
                  class="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            {:else}
              <div class="hidden md:flex w-full h-48 bg-cyan-100 items-center justify-center">
                <svg class="w-12 h-12 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
            {/if}

            <div class="p-6">
              <div class="flex items-center text-sm text-gray-500 mb-2">
                <span>{post.dateFormatted}</span>
                {#if post.categorySlug}
                  <span class="mx-2">•</span>
                  <span>{post.categorySlug}</span>
                {/if}
              </div>

              <h3 class="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">
                {@html post.titleHtml}
              </h3>

              {#if post.excerptHtml}
                <div class="text-gray-600 mb-4 line-clamp-3">
                  {@html post.excerptHtml}
                </div>
              {/if}
            <!--{`/${post.categorySlug === 'uncategorized' ? 'posts' : post.categorySlug}/${post.slug}`}-->
              <a href={`/posts/${post.slug}`}
              
                class="text-cyan-600 font-medium hover:text-cyan-800 inline-flex items-center">
                Read more
                <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </article>
        {/each}
      </div>

      <div class="text-center mt-10">
        <a href="/posts"
          class="inline-block bg-cyan-600 text-white px-6 py-3 rounded-lg hover:bg-cyan-700 transition-colors">
          View All News
        </a>
      </div>
    {:else}
      <div class="text-center py-8">
        <p class="text-gray-500">No posts available at the moment.</p>
      </div>
    {/if}
  </div>
</section>

<style>
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>

<!-- <script>
    export let posts = [];
    let postPageType = 'posts';
    // Format date function
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }
</script>

<section class="py-16 px-4 md:px-8 lg:px-16 bg-gray-50">
    <div class="max-w-7xl mx-auto">
        <h2 class="text-3xl font-bold text-gray-900 mb-8 text-center">Latest News & Updates</h2>
        
        {#if posts.length > 0}
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {#each posts as post}
                <div class="hidden">{postPageType = post.categories.filter(e => e !== 'Uncategorized')[0] || 'posts' }</div>
                    <article class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                            <div class="w-full h-48 bg-cyan-100 flex items-center justify-center">
                                <svg class="w-12 h-12 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path>
                                </svg>
                            </div>
                        <div class="p-6">
                            <div class="flex items-center text-sm text-gray-500 mb-2">
                                <span>{formatDate(post.date)}</span>
                                {#if post.categories && post.categories.length > 0}
                                    <span class="mx-2">•</span>
                                    <span>{post.categories[0]}</span>
                                {/if}
                            </div>
                            
                            <h3 class="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">{post.title}</h3>
                            
                            {#if post.excerpt}
                                <div class="text-gray-600 mb-4 line-clamp-3" innerHTML={post.excerpt}></div>
                            {/if}
                            
                            <a href={`/${postPageType}/${post.slug}`} class="text-cyan-600 font-medium hover:text-cyan-800 inline-flex items-center">
                                Read more
                                <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                </svg>
                            </a>
                        </div>
                    </article>
                {/each}
            </div>
            
            <div class="text-center mt-10">
                <a href="/posts" class="inline-block bg-cyan-600 text-white px-6 py-3 rounded-lg hover:bg-cyan-700 transition-colors">
                    View All News
                </a>
            </div>
        {:else}
            <div class="text-center py-8">
                <p class="text-gray-500">No posts available at the moment.</p>
            </div>
        {/if}
    </div>
</section>

<style>
    .line-clamp-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
    
    .line-clamp-3 {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
</style> -->