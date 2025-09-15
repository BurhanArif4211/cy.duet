<!-- src/pages/PostsPage.svelte -->
<script>
    import { onMount } from 'svelte';
    import { router } from '../router.js';
    import { RestURL } from './../main.js';
    
    let categories = [];
    let postsByCategory = {};
    let selectedCategory = 'all';
    let loading = true;
    let error = null;
    let visiblePosts = 6; // Number of posts to show initially
    let loadMoreText = 'Load More Posts';
    
    // Format date function
    function formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    }
    
    // Fetch categories and posts
    async function fetchData() {
      try {
        loading = true;
        
        // Fetch categories
        const categoriesResponse = await fetch(`${RestURL}/wp-json/wp/v2/categories&per_page=20`);
        if (!categoriesResponse.ok) throw new Error('Failed to fetch categories');
        categories = await categoriesResponse.json();
        
        // Add "All" category option
        categories.unshift({ id: 'all', name: 'All Posts', slug: 'all' });
        
        // Fetch posts for each category
        const categoryPromises = categories
          .filter(cat => cat.id !== 'all')
          .map(async category => {
            const postsResponse = await fetch(
              `${RestURL}/wp-json/wp/v2/posts&categories=${category.id}&per_page=6&_embed`
            );
            
            if (postsResponse.ok) {
              const posts = await postsResponse.json();
              return { categoryId: category.id, posts };
            }
            return { categoryId: category.id, posts: [] };
          });
        
        // Wait for all category posts to load
        const categoryResults = await Promise.all(categoryPromises);
        
        // Organize posts by category
        postsByCategory = categoryResults.reduce((acc, result) => {
          acc[result.categoryId] = result.posts;
          return acc;
        }, {});
        
        // Also fetch some recent posts for the "All" view
        const allPostsResponse = await fetch(`${RestURL}/wp-json/wp/v2/posts&per_page=12&_embed`);
        if (allPostsResponse.ok) {
          postsByCategory.all = await allPostsResponse.json();
        }
        
        loading = false;
      } catch (err) {
        error = err.message;
        loading = false;
        
      }
    }
    // Load more posts
    function loadMorePosts() {
      if (selectedCategory === 'all') {
        visiblePosts += 6;
        // If we've reached the total, change button text
        if (visiblePosts >= postsByCategory.all.length) {
          loadMoreText = 'No More Posts';
        }
      }
    }
    
    // Get posts for the selected category
    function getPostsForCategory() {
      if (selectedCategory === 'all') {
        return postsByCategory.all ? postsByCategory.all.slice(0, visiblePosts) : [];
      }
      return postsByCategory[selectedCategory] || [];
    }
    
    onMount(() => {
      fetchData();
    });
  </script>
  
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Page Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">News & Updates</h1>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Stay updated with the latest news, research, and events from the Department of Cyber Security.
        </p>
      </div>
      
      {#if loading}
        <!-- Loading State -->
        <div class="flex flex-col md:flex-row gap-8">
          <!-- Category Filter Loading -->
          <div class="w-full md:w-1/4">
            <div class="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div class="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
              {#each Array(5) as _}
                <div class="h-4 bg-gray-200 rounded w-full mb-2"></div>
              {/each}
            </div>
          </div>
          
          <!-- Posts Loading -->
          <div class="w-full md:w-3/4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              {#each Array(6) as _}
                <div class="bg-white rounded-lg shadow-sm overflow-hidden">
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
          </div>
        </div>
      {:else if error}
        <!-- Error State -->
        <div class="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h2 class="text-xl font-semibold text-red-800 mb-2">Error Loading Posts</h2>
          <p class="text-red-600 mb-4">{error}</p>
          <button 
            on:click={fetchData}
            class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      {:else}
        <!-- Content -->
        <div class="flex flex-col md:flex-row gap-8">
          <!-- Category Filter -->
          <div class="w-full md:w-1/4">
            <div class="bg-white rounded-lg shadow-sm p-6 mb-6 sm:sticky top-24">
              <h2 class="text-lg font-semibold text-gray-900 mb-4">Categories</h2>
              <div class="space-y-2">
                {#each categories as category}
                  <button
                    class={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedCategory == category.id 
                        ? 'bg-cyan-100 text-cyan-800 font-medium' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    on:click={() => {
                      selectedCategory = category.id;
                      visiblePosts = 6;
                      loadMoreText = 'Load More Posts';
                    }}
                  >
                    {category.name}
                    {#if category.id !== 'all' && postsByCategory[category.id]}
                      <span class="text-gray-500 text-sm ml-1">
                        ({postsByCategory[category.id].length})
                      </span>
                    {/if}
                  </button>
                {/each}
              </div>
            </div>
            
            <!-- Newsletter Signup -->
            <div class="bg-cyan-50 rounded-lg shadow-sm p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-3">Stay Updated</h3>
              <p class="text-gray-600 text-sm mb-4">
                Subscribe to our newsletter for the latest updates and news.
              </p>
              <form class="space-y-3">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent text-sm"
                  required
                />
                <button 
                  type="submit" 
                  class="w-full bg-cyan-600 text-white py-2 px-4 rounded-lg hover:bg-cyan-700 transition-colors text-sm"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          
          <!-- Posts Grid -->
          <div class="w-full md:w-3/4">
            {#if getPostsForCategory().length > 0}
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {#each getPostsForCategory() as post}
                  <article class="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                    <!-- Featured Image - Hidden on mobile -->
                    {#if post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0]}
                      <div class="hidden md:block w-full h-48 overflow-hidden">
                        <img 
                          src={post._embedded['wp:featuredmedia'][0].source_url} 
                          alt={post.title.rendered} 
                          class="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                    {:else}
                      <div class="hidden md:flex w-full h-48 bg-cyan-100 items-center justify-center">
                        <svg class="w-12 h-12 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path>
                        </svg>
                      </div>
                    {/if}
                    
                    <div class="p-6">
                      <div class="flex items-center text-sm text-gray-500 mb-2">
                        <span>{formatDate(post.date)}</span>
                        {#if post.categories && post.categories.length > 0}
                          <span class="mx-2">•</span>
                          <span>
                            {#each categories as category}
                              {#if category.id !== 'all' && post.categories.includes(category.id)}
                                {category.name}
                              {/if}
                            {/each}
                          </span>
                        {/if}
                      </div>
                      
                      <h3 class="text-xl font-semibold text-gray-800 mb-2 line-clamp-2" >{@html post.title.rendered}</h3>
                      
                      {#if post.excerpt && post.excerpt.rendered}
                        <div class="text-gray-600 mb-4 line-clamp-3" >{@html post.excerpt.rendered} </div>
                      {/if}
                      
                      <a 
                        href={`/posts/${post.slug}`} 
                        on:click|preventDefault={() => router.navigate(`/posts/${post.slug}`)}
                        class="text-cyan-600 font-medium hover:text-cyan-800 inline-flex items-center"
                      >
                        Read more
                        <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                        </svg>
                      </a>
                    </div>
                  </article>
                {/each}
              </div>
              
              <!-- Load More Button (only for "All" view) -->
              {#if selectedCategory === 'all' && postsByCategory.all && visiblePosts < postsByCategory.all.length}
                <div class="text-center">
                  <button 
                    on:click={loadMorePosts}
                    class="bg-cyan-600 text-white px-6 py-3 rounded-lg hover:bg-cyan-700 transition-colors"
                  >
                    {loadMoreText}
                  </button>
                </div>
              {/if}
            {:else}
              <!-- No Posts Message -->
              <div class="bg-white rounded-lg shadow-sm p-8 text-center">
                <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <h3 class="text-xl font-semibold text-gray-900 mb-2">No posts found</h3>
                <p class="text-gray-600">
                  {selectedCategory === 'all' 
                    ? 'There are no posts available at the moment.' 
                    : 'There are no posts in this category yet.'}
                </p>
              </div>
            {/if}
          </div>
        </div>
      {/if}
    </div>
  </div>
  
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