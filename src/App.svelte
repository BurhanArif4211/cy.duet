<script>
  import { onMount } from 'svelte';
  import { router } from './router.js';
  import { loadSettings } from './stores/settings.js';
  import { loadIdentity, identity } from './stores/identity.js';
  import { loadContacts } from './stores/contact.js';
  import { loadNav } from './stores/nav.js';
  import Loading from './components/Loading.svelte';
  import Navbar from './components/Navbar.svelte';
  import Footer from './components/Footer.svelte';

  let currentComponent = null;
  let routeParams = {};
  let routeData = null;
  let loading = true;
  let loaded = false;

  onMount(async () => {
    const minDelay = new Promise(r => setTimeout(r, 2400));
    await Promise.all([
      loadSettings(),
      loadIdentity(),
      loadContacts(),
      loadNav(),
      minDelay
    ]);
    loaded = true;

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
  <title>{$identity.site_title || 'Cyber Security'} — {$identity.university_name || 'DUET'}</title>
  <meta name="description" content={$identity.meta_description || 'Cyber Security Department'} />
  {#if $identity.favicon_url}
    <link rel="icon" href={$identity.favicon_url} />
  {/if}
</svelte:head>

{#if !loaded}
  <Loading />
{/if}

<div
  class="min-h-screen flex flex-col bg-white text-gray-900 transition-opacity duration-500"
  class:opacity-0={!loaded}
  class:opacity-100={loaded}
  aria-hidden={!loaded}
>
  <Navbar />

  <main class="flex-grow">
    {#if loading || !loaded}
      <div class="flex justify-center items-center min-h-[60vh]">
        <div class="animate-spin rounded-full h-10 w-10 border-2 border-purple-600 border-t-transparent"></div>
      </div>
    {:else if currentComponent}
      <svelte:component this={currentComponent} params={routeParams} data={routeData} />
    {/if}
  </main>

  <Footer />
</div>
