<!-- TeachersSection.svelte -->
<script>
    export let teachers = [];
</script>

<section class="py-16 px-4 md:px-8 lg:px-16 bg-white">
    <div class="max-w-7xl mx-auto">
        <h2 class="text-3xl font-bold text-black mb-8 text-center">Our Faculty</h2>
        
        {#if teachers.length > 0}
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {#each teachers as teacher}
                    <div class="bg-gray-50 rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                        <div class="hidden sm:block w-32 h-32 mx-auto rounded-full overflow-hidden  mb-4">
                            {#if teacher.profile_image}
                                <img src={teacher.profile_image} alt={teacher.name} class="w-full h-full object-cover" />
                            {:else}
                                <div class="w-full h-full bg-cyan-600 flex items-center justify-center">
                                    <svg class="w-12 h-12 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                    </svg>
                                </div>
                            {/if}
                        </div>
                        
                        <h3 class="text-xl font-semibold text-gray-800 mb-1">{teacher.name}</h3>
                        
                        {#if teacher.title}
                            <p class="text-cyan-900 font-medium mb-3">{teacher.title}</p>
                        {/if}
                        
                        {#if teacher.email}
                            <a href={`mailto:${teacher.email}`} class="text-black hover:text-cyan-500 inline-flex items-center text-sm">
                                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                </svg>
                                Email
                            </a>
                        {/if}
                    </div>
                {/each}
            </div>
        {:else}
            <div class="text-center py-8">
                <p class="text-gray-100">No faculty information available at the moment.</p>
            </div>
        {/if}
    </div>
</section>