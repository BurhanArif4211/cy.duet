<!-- src/pages/PostPage.svelte -->
<script>
    import { RestURL } from './../main.js';

    import { onMount } from 'svelte';
    import { router } from '../router.js';
    import DOMPurify from 'dompurify';

    export let params = {};
    export let data = null;
    let feat_image_url;
    function get_featured_image_url(){
      if(data && data.featured_media){
        fetch(`${RestURL}/wp-json/wp/v2/media/${data.featured_media}`)
        .then(response => response.json())
        .then(mediaData => {
          feat_image_url = mediaData.source_url;
        })
        .catch(err => {
          console.error('Error fetching featured image:', err);
        });
      }

    }
    let relatedPosts = [];
    let categories=[];
    let author = null;
    let loading = true;
    let error = null;
    
    // Function to format date
    function formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    }
    
    // Fetch related posts and author information
    async function fetchAdditionalData() {
      if (!data) return;
      
      try {
        // Fetch related posts (same category, excluding current post)
        if (data.categories && data.categories.length > 0) {
          const categoryId = data.categories[0];
          const relatedResponse = await fetch(
            `${RestURL}/wp-json/wp/v2/posts&categories=${categoryId}&per_page=5&exclude=${data.id}`
          );
          if (relatedResponse.ok) {
            relatedPosts = await relatedResponse.json();
          }
        }
        // Fetch categories
        const categoriesResponse = await fetch(`${RestURL}/wp-json/wp/v2/categories&per_page=20`);
        if (!categoriesResponse.ok) throw new Error('Failed to fetch categories');
        categories = await categoriesResponse.json();


      } catch (err) {
        console.error('Error fetching additional data:', err);
      } finally {
        loading = false;
      }
    }
    
    onMount(() => {
    // If data was provided by the router, use it
    if (data) {
      fetchAdditionalData();
      get_featured_image_url();
      return;
    }
    
    // If no data was provided but we have an ID parameter, try to fetch
    if (params.id) {
      loading = true;
      
      // Determine if it's a numeric ID or slug
      const isNumericId = !isNaN(params.id);
      
      let apiUrl;
      if (isNumericId) {
        apiUrl = `${RestURL}/wp-json/wp/v2/posts/${params.id}`;
      } else {
        apiUrl = `${RestURL}/wp-json/wp/v2/posts&slug=${params.id}`;
      }
      
      fetch(apiUrl)
        .then(response => {
          if (!response.ok) {
            if (response.status === 404) {
              throw new Error('POST_NOT_FOUND');
            }
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(responseData => {
          // Handle array response for slug-based queries
          if (Array.isArray(responseData)) {
            if (responseData.length === 0) {
              throw new Error('POST_NOT_FOUND');
            }
            data = responseData[0];
          } else {
            data = responseData;
          }
          
          fetchAdditionalData();
        })
        .catch(err => {
          if (err.message === 'POST_NOT_FOUND') {
            // Redirect to 404 page
            router.navigate('/404', true, { message: 'The requested post was not found.' });
          } else {
            error = 'Failed to load post';
            loading = false;
          }
        });
    } else {
      error = 'No post specified';
      loading = false;
    }
  });
    
    // Function to handle internal links
    function handleContentClick(event) {
      if (event.target.tagName === 'A') {
        const href = event.target.getAttribute('href');
        if (href && href.startsWith('/')) {
          event.preventDefault();
          router.navigate(href);
        }
      }
    }
  </script>
  
  {#if loading}
    <div class="flex justify-center items-center min-h-screen">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600"></div>
    </div>
  {:else if error}
    <div class="max-w-4xl mx-auto px-4 py-16 text-center">
      <h1 class="text-2xl font-bold text-gray-900 mb-4">Error Loading Post</h1>
      <p class="text-gray-600 mb-8">{error}</p>
      <button on:click={() => router.navigate('/')} class="bg-cyan-600 text-white px-6 py-2 rounded-lg hover:bg-cyan-700">
        Return Home
      </button>
    </div>
  {:else if data}
    <div class="max-w-7xl mx-auto p-0 sm:px-4 py-8">
      <!-- Breadcrumb -->
      <nav class="text-sm text-white mb-8">
        <a href="/" on:click|preventDefault={() => router.navigate('/')} class="hover:text-cyan-100">Home</a>
        <span class="mx-2">/</span>
        <a href="/posts" on:click|preventDefault={() => router.navigate('/posts')} class="hover:text-cyan-100">Posts</a>
        <span class="mx-2">/</span>
        <span class="text-gray-200">{data.title.rendered?.slice(0,20)}...</span>
      </nav>
      
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Main Content -->
        <main class="w-full lg:w-2/3">
          <article class="bg-white rounded-lg shadow-sm overflow-hidden">
            <!-- Featured Image -->
            {#if feat_image_url}
              <div class="w-full h-64 md:h-96 bg-gray-200">
                <img 
                  src={feat_image_url}
                  alt={data.title.rendered}
                  class="w-full h-full object-contain"
                />
              </div>
            {/if}
            
            <!-- Article Header -->
            <div class="p-2 sm:p-6 md:p-8">
              <!-- svelte-ignore a11y_missing_content -->
              <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4" >{@html data.title.rendered}</h1>
              
              <div class="flex flex-wrap items-center text-sm text-gray-600 mb-6">
                
                <div class="mr-6 mb-2">
                  <svg class="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  {formatDate(data.date)}
                </div>
              </div>
              
              <!-- Article Content -->
              <!-- svelte-ignore a11y_click_events_have_key_events -->
              <!-- svelte-ignore a11y_no_static_element_interactions -->
              <div class="prose prose-lg max-w-none mt-8" on:click={handleContentClick}>{@html data.content.rendered}</div>
              
              <!-- Tags -->
              {#if data.tags && data.tags.length > 0}
                <div class="mt-8 pt-6 border-t border-gray-200">
                  <h3 class="text-sm font-semibold text-gray-700 mb-2">Tags:</h3>
                  <div class="flex flex-wrap gap-2">
                    {#each data.tags as tagId}
                      <span class="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        Tag {tagId}
                      </span>
                    {/each}
                  </div>
                </div>
              {/if}
              
              <!-- Social Sharing -->
              <div class="mt-8 pt-6 border-t border-gray-200">
                <h3 class="text-sm font-semibold text-gray-700 mb-4">Share this post:</h3>
                <div class="flex space-x-4">
                  <!-- svelte-ignore a11y_consider_explicit_label -->
                  <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(data.title.rendered)}&url=${encodeURIComponent(data.link)}`} 
                     target="_blank" 
                     class="text-blue-500 hover:text-blue-700">
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
                  <!-- svelte-ignore a11y_consider_explicit_label -->
                  <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(data.link)}`} 
                     target="_blank" 
                     class="text-blue-800 hover:text-blue-900">
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <!-- svelte-ignore a11y_consider_explicit_label -->
                  <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(data.link)}&title=${encodeURIComponent(data.title.rendered)}`} 
                     target="_blank" 
                     class="text-blue-700 hover:text-blue-900">
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </article>
          
          <!-- Comments Section (Placeholder) -->
          <div class="mt-8 bg-white rounded-lg shadow-sm p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Comments</h2>
            <p class="text-gray-600">Comments functionality can be implemented in a future update.</p>
          </div>
        </main>
        
        <!-- Sidebar -->
        <aside class="w-full lg:w-1/3">
          
          <!-- Related Posts -->
          {#if relatedPosts.length > 0}
            <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Related Posts</h3>
              <div class="space-y-4">
                {#each relatedPosts as post}
                  <div class="flex items-start">
                    <div>
                      <a 
                        href={`/posts/${post.slug}`} 
                        on:click|preventDefault={() => router.navigate(`/posts/${post.slug}`)}
                        class="font-medium text-gray-900 hover:text-cyan-600 line-clamp-2"
                      >
                        {post.title.rendered}
                      </a>
                      <p class="text-sm text-gray-600 mt-1">{formatDate(post.date)}</p>
                    </div>
                  </div>
                {/each}
              </div>
            </div>
          {/if}
          
            <!-- Categories Widget -->
            <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
            <ul class="space-y-2">
              {#if categories && categories.length > 0}
              {#each categories as cat}
                <li>
                <a 
                  href="/posts"
                  class="text-gray-700 hover:text-cyan-600 flex justify-between"
                >
                  <span>{cat.name}</span>
                  <span>({cat.count})</span>
                </a>
                </li>
              {/each}
              {:else}
              <li class="text-gray-500">No categories found.</li>
              {/if}
            </ul>
            </div>
          
          <!-- Newsletter Signup -->
          <div class="bg-cyan-50 rounded-lg shadow-sm p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Subscribe to our Newsletter</h3>
            <p class="text-gray-600 text-sm mb-4">Stay updated with the latest cyber security news and insights.</p>
            <form class="space-y-3">
              <input 
                type="email" 
                placeholder="Your email address" 
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent"
                required
              />
              <button 
                type="submit" 
                class="w-full bg-cyan-600 text-white py-2 px-4 rounded-lg hover:bg-cyan-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </aside>
      </div>
    </div>
  {/if}
  
  <style>
    
/* Reset Tailwind's preflight for WordPress content areas */
.prose :global {
  /* Headings */
  h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
    margin-top: 2em;
    margin-bottom: 1em;
    line-height: 1.3;
  }
  
  h1 { font-size: 2.25em; }
  h2 { font-size: 1.875em; }
  h3 { font-size: 1.5em; }
  h4 { font-size: 1.25em; }
  h5 { font-size: 1.125em; }
  h6 { font-size: 1em; }
  
  /* Paragraphs */
  p {
    margin-bottom: 1.5em;
    line-height: 1.7;
  }
  
  /* Links */
  a {
    color: #7c3aed;
    text-decoration: underline;
  }
  
  a:hover {
    color: #5b21b6;
  }
  
  /* Lists */
  ul, ol {
    margin-bottom: 1.5em;
    padding-left: 1.625em;

  }
  ul{
    list-style-type: disc;

}  
  li {
    margin-bottom: 0.5em;
  }
  
  /* Blockquotes */
  blockquote {
    border-left: 4px solid #7c3aed;
    padding-left: 1em;
    font-style: italic;
    margin: 1.5em 0;
    background-color: #faf5ff;
    padding: 1.5em;
    border-radius: 0.5rem;
  }
  
  /* Images */
  img {
    max-width: 100%;
    height: auto;
    border-radius: 0.5rem;
  }
  
  /* Code */
  code {
    background-color: #f3f4f6;
    padding: 0.125em 0.25em;
    border-radius: 0.25rem;
    font-family: monospace;
  }
  
  pre {
    background-color: #1f2937;
    color: white;
    padding: 1em;
    border-radius: 0.5rem;
    overflow-x: auto;
  }
  
  /* Tables */
  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 1.5em;
  }
  
  th, td {
    padding: 0.75em;
    border: 1px solid #e5e7eb;
  }
  
  th {
    background-color: #f9fafb;
    font-weight: 600;
  }
  
  /* WordPress-specific blocks */
  .wp-block-embed {
    margin: 1.5em 0;
  }
  
  .wp-block-image {
    margin: 1.5em 0;
  }
  
  .wp-block-gallery {
    display: flex;
    flex-wrap: wrap;
    gap: 1em;
    margin: 1.5em 0;
  }
  
  .wp-block-button {
    margin: 1.5em 0;
  }
  
  .wp-block-button__link {
    display: inline-block;
    background-color: #7c3aed;
    color: white;
    padding: 0.75em 1.5em;
    border-radius: 0.375rem;
    text-decoration: none;
    font-weight: 600;
  }
  
  .wp-block-button__link:hover {
    background-color: #5b21b6;
  }
}
    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  </style>