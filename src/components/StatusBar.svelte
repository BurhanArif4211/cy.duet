<!-- StatusBar.svelte -->
<script>
    import { onMount } from 'svelte';
    import { RestURL } from './../main.js';

    let statusData = {
        email: 'info@cybersecurity.edu',
        phone: '+1 (555) 123-4567',
        status_text: 'Welcome to the Department of Cyber Security - Now accepting applications for Fall 2025! Welcome to the Department of Cyber Security - Now accepting applications for Fall 2025! Welcome to the Department of Cyber Security - Now accepting applications for Fall 2025!'
    };
    export let duration="30s";
    let loading = true;
    let error = null;
    
    onMount(async () => {
        try {
            const response = await fetch(`${RestURL}/wp-json/acf/v1/status-bar/`);
            if (!response.ok) throw new Error('Failed to fetch status data');
            const data = await response.json();
            statusData = data;
            loading = false;
        } catch (err) {
            error = err.message;
            loading = false;
            // Fallback to default data already set
        }
    });
</script>

<div class={`bg-gray-900 text-white text-xs py-1 px-4 flex items-center overflow-hidden`}>
    {#if loading}
        <div class="flex-1 text-center">Loading status information...</div>
    <!-- {:else if error}
        <div class="flex-1 text-center text-white-300">Status information temporarily unavailable</div> -->
    {:else}
        <!-- Contact Info -->
        <div class="flex items-center space-x-4 flex-shrink-0">
            <a href={`mailto:${statusData.email}`} class="hover:text-cyan-300  items-center hidden sm:flex">
                <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                {statusData.email}
            </a>
            <a href={`tel:${statusData.phone}`} class="hover:text-cyan-300 items-center hidden sm:flex">
                <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
                {statusData.phone}
            </a>
        </div>
        
        <!-- Separator -->
        <div class="mx-4 h-3 w-px bg-gray-700 flex-shrink-0"></div>
        
        <!-- Marquee Text -->
        <div class="flex-1 overflow-hidden">
            <div class="animate-marquee whitespace-nowrap" style={`--marquee-duration:${duration}`}>
                {statusData.status_text}
            </div>
        </div>
    {/if}
</div>

<style>

    @keyframes marquee {
        0% { transform: translateX(100%); }
        100% { transform: translateX(-100%); }
    }
    
    .animate-marquee {
        display: inline-block;
        padding-left: -100%;
        animation: marquee var(--marquee-duration) linear infinite;
    }
</style>