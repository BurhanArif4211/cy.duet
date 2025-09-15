<!-- src/pages/FacultyPage.svelte -->
<script>
    import { onMount } from 'svelte';
    import { RestURL } from './../main';
    
    let faculty = [];
    let facultyByType = {};
    let selectedCategory = 'all';
    let loading = true;
    let error = null;
    // Fetch faculty data
    async function fetchFaculty() {
      try {
        loading = true;
        const response = await fetch(`${RestURL}/wp-json/acf/v1/teachers/`);
        
        if (!response.ok) throw new Error('Failed to fetch faculty data');
        
        faculty = await response.json();
        
        // Organize faculty by type
        facultyByType = faculty.reduce((acc, teacher) => {
          // If type doesn't exist or is empty, use 'other'
          const type = teacher.type && teacher.type.trim() !== '' ? teacher.type : 'other';
          
          if (!acc[type]) {
            acc[type] = [];
          }
          
          acc[type].push(teacher);
          return acc;
        }, {});
        
        loading = false;
      } catch (err) {
        error = err.message;
        loading = false;
      }
    }
    
    // Get display name for category
    function getCategoryDisplayName(category) {
      const names = {
        'permanent': 'Permanent Faculty',
        'visiting': 'Visiting Faculty',
        'adjunct': 'Adjunct Faculty',
        'other': 'Other Faculty',
        'all': 'All Faculty'
      };
      
      return names[category.toLowerCase()] || category;
    }
    
    // Get faculty for the selected category
    function getFacultyForCategory() {
      if (selectedCategory === 'all') {
        return faculty;
      }
      return facultyByType[selectedCategory] || [];
    }
    
    onMount(() => {
      fetchFaculty();
    });
  </script>
  
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Page Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">Our Faculty</h1>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Meet the distinguished faculty members of the Department of Cyber Security who are dedicated to excellence in teaching and research.
        </p>
      </div>
      
      {#if loading}
        <!-- Loading State -->
        <div class="flex justify-center items-center min-h-[400px]">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      {:else if error}
        <!-- Error State -->
        <div class="bg-red-50 border border-red-200 rounded-lg p-6 text-center max-w-2xl mx-auto">
          <h2 class="text-xl font-semibold text-red-800 mb-2">Error Loading Faculty</h2>
          <p class="text-red-600 mb-4">{error}</p>
          <button 
            on:click={fetchFaculty}
            class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      {:else}
        <!-- Category Filter (only show if we have multiple types) -->
        {#if Object.keys(facultyByType).length > 1}
          <div class="flex justify-center mb-8">
            <div class="bg-white rounded-lg shadow-sm p-2 inline-flex flex-wrap justify-center">
              <!-- All Category -->
              <button
                class={`px-4 py-2 rounded-lg mx-1 my-1 transition-colors ${
                  selectedCategory === 'all' 
                    ? 'bg-purple-600 text-white' 
                    : 'text-gray-700 hover:bg-purple-100'
                }`}
                on:click={() => selectedCategory = 'all'}
              >
                All Faculty
              </button>
              
              <!-- Type Categories -->
              {#each Object.keys(facultyByType) as type}
                <button
                  class={`px-4 py-2 rounded-lg mx-1 my-1 transition-colors ${
                    selectedCategory === type 
                      ? 'bg-purple-600 text-white' 
                      : 'text-gray-700 hover:bg-purple-100'
                  }`}
                  on:click={() => selectedCategory = type}
                >
                  {getCategoryDisplayName(type)}
                  <span class="text-xs ml-1 opacity-75">
                    ({facultyByType[type].length})
                  </span>
                </button>
              {/each}
            </div>
          </div>
        {/if}
        
        <!-- Faculty Grid -->
        {#if getFacultyForCategory().length > 0}
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {#each getFacultyForCategory() as teacher}
              <div class="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div class="p-6 text-center">
                  <!-- Profile Image -->
                  <div class="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-purple-100 mb-4">
                    {#if teacher.profile_image}
                      <img 
                        src={teacher.profile_image} 
                        alt={teacher.name} 
                        class="w-full h-full object-cover"
                      />
                    {:else}
                      <div class="w-full h-full bg-purple-200 flex items-center justify-center">
                        <svg class="w-12 h-12 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                        </svg>
                      </div>
                    {/if}
                  </div>
                  
                  <!-- Name -->
                  <h3 class="text-xl font-semibold text-gray-800 mb-1">{teacher.name}</h3>
                  
                  <!-- Title -->
                  {#if teacher.title}
                    <p class="text-purple-600 font-medium mb-3">{teacher.title}</p>
                  {/if}
                  
                  <!-- Type Badge (if not showing all) -->
                  {#if selectedCategory !== 'all' && teacher.type}
                    <span class="inline-block bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full mb-3">
                      {teacher.type}
                    </span>
                  {/if}
                  
                  <!-- Email -->
                  {#if teacher.email}
                    <div class="mt-4">
                      <a 
                        href={`mailto:${teacher.email}`} 
                        class="text-gray-600 hover:text-purple-600 inline-flex items-center text-sm"
                      >
                        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                        </svg>
                        Contact
                      </a>
                    </div>
                  {/if}
                </div>
              </div>
            {/each}
          </div>
        {:else}
          <!-- No Faculty Message -->
          <div class="bg-white rounded-lg shadow-sm p-8 text-center">
            <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">No faculty found</h3>
            <p class="text-gray-600">
              {selectedCategory === 'all' 
                ? 'There are no faculty members available at the moment.' 
                : `There are no faculty members in the ${getCategoryDisplayName(selectedCategory)} category.`}
            </p>
          </div>
        {/if}
      {/if}
    </div>
  </div>