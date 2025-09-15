<!-- Navbar.svelte -->
<script>
    import { onMount } from 'svelte';
    import { router } from '../router';
import { RestURL } from './../main.js';
    
    export let data;
    
    let isScrolled = false;
    let mobileMenuOpen = false;
    let activeDropdown = null;
    
    // Handle scroll to hide/show navbar
    onMount(() => {
        const handleScroll = () => {
            isScrolled = window.scrollY > 50;
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    });
    
    function toggleDropdown(index) {
        activeDropdown = activeDropdown === index ? null : index;
    }
    
    function closeDropdowns() {
        activeDropdown = null;
    } 
</script>

<nav class={`mt-[24px] fixed w-full z-50 transition-all duration-300 bg-cyan-500 sm:bg-[url('${RestURL}/wp/wp-content/uploads/2025/09/Tech_holo1.png')] bg-no-repeat bg-right ${isScrolled ? "bg-cyan-500 text-white shadow-md py-0.5 sm:py-2 " : " text-black py-4"}`}>
    <!-- <div class="relative">
        <a class= "absolute z-0 left-4 top-2 w-[115px] h-[40px] m-[24px] hidden  xl:block p-2 border-2 cursor-pointer rounded-2xl text-sm text-white text-center " href="https://duet.edu.pk">Back main site</a>
    </div> -->
    <div class="max-w-7xl mx-auto px-1 sm:px-6 lg:px-8">
               <div class="flex justify-between h-12 sm:h-20">
            <div class="flex items-center">
                <!-- Logo -->
                <!-- svelte-ignore a11y_no_static_element_interactions -->
                <!-- svelte-ignore a11y_click_events_have_key_events -->
                <div class=" cursor-pointer flex-shrink-0 sm:h-full flex items-center text-[#a2e6ff] bg-[linear-gradient(90deg,#a2e6ff,transparent)] rounded-xs rounded-l-2xl p-1 px-2">
                    <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
                    <img onclick={window.location='https://duet.edu.pk/'} alt={data.logo.alt} src={data.logo.src} class="w-15 flex items-center justify-center" />  
                     <div class="mx-1 sm:mx-4 h-9 w-px bg-white flex-shrink-0"></div>
                    <a href="/" class="text-2xl sm:text-4xl font-bold text-white">{data.logo.text}</a>
                </div>
                
                <!-- Desktop Navigation -->
                <div class="hidden md:ml-6 md:flex md:items-center md:space-x-1">
                    {#each data.menuItems as item, index}
                        <div class="relative">
                            {#if item.children}
                                <button 
                                    class={`px-3 py-2 rounded-md text-sm font-medium ${activeDropdown === index ? 'text-white bg-cyan-500' : 'text-white hover:bg-cyan-600'}`}
                                    onclick={() => toggleDropdown(index)}
                                    onblur={() => setTimeout(closeDropdowns, 150)}
                                >
                                    {item.text}
                                    <svg class="w-4 h-4 inline-block ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                    </svg>
                                </button>
                                
                                {#if activeDropdown === index}
                                    <div class="absolute z-10 left-0 mt-1 w-48 rounded-md shadow-lg bg-cyan-500 ring-1 ring-black ring-opacity-5">
                                        <div class="py-1">
                                            {#each item.children as child}
                                                <a href={child.href} class="block px-4 py-2 text-sm text-white hover:bg-cyan-600 ">
                                                    {child.text}
                                                </a>
                                            {/each}
                                        </div>
                                    </div>
                                {/if}
                            {:else}
                                <a href={item.href} class="px-3 py-2 rounded-md text-sm font-medium  text-white  hover:bg-cyan-600">
                                    {item.text}
                                </a>
                            {/if}
                        </div>
                    {/each}
                </div>
            </div>
            
            <!-- Mobile menu button -->
            <div class="md:hidden flex items-center">
                <!-- svelte-ignore a11y_consider_explicit_label -->
                <button 
                    class="inline-flex items-center justify-center p-2 rounded-md text-white bg-cyan-500 focus:outline-none"
                    onclick={() => mobileMenuOpen = !mobileMenuOpen}
                >
                    <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                        <path 
                            class={!mobileMenuOpen ? 'block' : 'hidden'} 
                            stroke-linecap="round" 
                            stroke-linejoin="round" 
                            stroke-width="2" 
                            d="M4 6h16M4 12h16M4 18h16" 
                        />
                        <path 
                            class={mobileMenuOpen ? 'block' : 'hidden'} 
                            stroke-linecap="round" 
                            stroke-linejoin="round" 
                            stroke-width="2" 
                            d="M6 18L18 6M6 6l12 12" 
                        />
                    </svg>
                </button>
            </div>
        </div>
    </div>
    
    <!-- Mobile menu -->
    {#if mobileMenuOpen}
        <div class={`md:hidden shadow-lg ${isScrolled ? 'bg-cyan-500 text-white shadow-md py-2 ' : ' py-2'}`}>
            <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {#each data.menuItems as item, index}
                    {#if item.children}
                        <div>
                            <button 
                                class="w-full text-left px-3 py-2 rounded-md text-base font-medium text-white hover:bg-cyan-500 flex justify-between items-center"
                                onclick={() => toggleDropdown(index)}
                            >
                                <span>{item.text}</span>
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </button>
                            
                            {#if activeDropdown === index}
                                <div class="pl-6 mt-1 space-y-1">
                                    {#each item.children as child}
                                        <a href={child.href} class="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-cyan-500">
                                            {child.text}
                                        </a>
                                    {/each}
                                </div>
                            {/if}
                        </div>
                    {:else}
                        <a href={item.href} class="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-cyan-500">
                            {item.text}
                        </a>
                    {/if}
                {/each}
            </div>
        </div>
    {/if}
</nav>