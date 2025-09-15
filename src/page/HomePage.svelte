<script>
    import { onMount } from "svelte";
    import HeroCarousel from "../components/HeroCarousel.svelte";
    import MultiTypeWriter from "../components/typo/MultiTypeWriter.svelte";
    import Typewritter from "../components/typo/Typewritter.svelte";
    import HodSection from "../sections/HodSection.svelte";
    import LatestPosts from "../sections/LatestPosts.svelte";
    import Teachers from "../sections/Teachers.svelte";
    import AlternatingTypewritter from "../components/typo/AlternatingTypewritter.svelte";
    import { RestURL } from './../main.js';

    // State for fetched data
    let carouselData = [];
    let hodInfo = {};
    let teachers = [];
    let loading = true;
    let error = null;
    let posts =[];
    // Fetch data from API endpoints
    async function fetchData() {
        try {
            // Fetch carousel data
            const carouselResponse = await fetch(`${RestURL}/wp-json/acf/v1/hero-carousel`);
            if (!carouselResponse.ok) throw new Error('Failed to fetch carousel data');
            carouselData = await carouselResponse.json();
            
            // Fetch HOD info
            const hodResponse = await fetch(`${RestURL}/wp-json/acf/v1/hod_info`);
            if (!hodResponse.ok) throw new Error('Failed to fetch HOD info');
            hodInfo = await hodResponse.json();
            
            // Fetch teachers data
            const teachersResponse = await fetch(`${RestURL}/wp-json/acf/v1/teachers`);
            if (!teachersResponse.ok) throw new Error('Failed to fetch teachers data');
            teachers = await teachersResponse.json();
            teachers=teachers.slice(0,4); // Limit to 4 teachers

            // Fetch teachers data
            const postsResponse = await fetch(`${RestURL}/wp-json/wp/v2/posts?per_page=4`);
            if (!postsResponse.ok) throw new Error('Failed to fetch teachers data');
            posts = await postsResponse.json();
            
            loading = false;
        } catch (err) {
            error = err.message;
            loading = false;
        }
    }
    
    onMount(() => {
        fetchData();
    });
</script>

{#if loading}
<div class="flex justify-center items-center h-64">
    <div class="animate-spin rounded-full h-24 w-24 border-b-2 border-cyan-600"></div>
</div>
{:else if error}
<div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative m-4" role="alert">
    <strong class="font-bold">Error: </strong>
    <span class="block sm:inline">{error}</span>
</div>
{:else}
<HeroCarousel slides={carouselData}/>

<HodSection info={hodInfo} />

<div class="pb-25 text-left w-full  bg-cyan-900">
    <AlternatingTypewritter texts={["Welcome_","What Are You here For?_","Cyber Security Is Intresting_"]} font="text-[2rem] md:text-[3rem] text-white"/>
    <!-- <Typewritter text="Cyber Security_" font="text-left text-[2rem] md:text-[3rem] text-green-500"/> -->
    </div>

<Teachers teachers={teachers}/>

<div class="mr-7 text-right">
<MultiTypeWriter lines={[
    "Secure <",
    "Contain <",
    "Protect <",
]}  font="text-right text-white text-[1.7rem] md:text-[2.2rem]"/>
</div>

<LatestPosts posts={posts}/> 

{/if}