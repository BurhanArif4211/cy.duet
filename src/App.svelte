<script>
  import { onMount } from 'svelte';
  import { router } from './router.js';
  import { loadSettings } from './stores/settings.js';
  import Loading from './components/Loading.svelte';
  import Navbar from './components/Navbar.svelte';
  import Footer from './components/Footer.svelte';

  let currentComponent = null;
  let routeParams = {};
  let routeData = null;
  let loading = true;
  let bootComplete = false;

  onMount(async () => {
    const minDelay = new Promise(r => setTimeout(r, 2400));
    await Promise.all([loadSettings(), minDelay]);
    bootComplete = true;

    router.init();
    router.subscribe(v => {
      currentComponent = v.component;
      routeParams = v.params;
      routeData = v.routeData;
      loading = v.loading;
    });
  });
</script>

<svelte:head>
  <title>Cyber Security — DUET</title>
  <meta name="description" content="Department of Cyber Security, Dawood University of Engineering & Technology" />
</svelte:head>

{#if !bootComplete}
  <Loading />
{/if}

<div
  class="min-h-screen flex flex-col bg-white text-gray-900 transition-opacity duration-500"
  class:opacity-0={!bootComplete}
  class:opacity-100={bootComplete}
  aria-hidden={!bootComplete}
>
  <Navbar />

  <main class="flex-grow">
    {#if loading || !bootComplete}
      <div class="flex justify-center items-center min-h-[60vh]">
        <div class="animate-spin rounded-full h-10 w-10 border-2 border-purple-600 border-t-transparent"></div>
      </div>
    {:else if currentComponent}
      <svelte:component this={currentComponent} params={routeParams} data={routeData} />
    {/if}
  </main>

  <Footer />
</div>
