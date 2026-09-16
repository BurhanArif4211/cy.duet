<script>
  import { onMount } from 'svelte';
  import { router } from '../router.js';
  import { settings } from '../stores/settings.js';
  import { STATIC } from '../config.js';

  let mobileMenuOpen = false;
  let activeDropdown = null;

  function toggleDropdown(i) {
    activeDropdown = activeDropdown === i ? null : i;
  }
  function closeDropdowns() { activeDropdown = null; }

  const menuItems = [
    { text: 'Home',         href: '/home' },
    { text: 'About',        href: '/about' },
    { text: 'Faculty',      href: '/faculty' },
    { text: 'News',         href: '/news' },
    { text: 'Publications', href: '/publications' },
    { text: 'Contact',      href: '/contact' }
  ];

  function go(e, href) {
    e.preventDefault();
    mobileMenuOpen = false;
    closeDropdowns();
    router.navigate(href);
  }
</script>

<header>
  <!-- ── TOP WHITE BAR (scrolls away) ──────────────────────────── -->
  <div class="bg-white border-b border-purple-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-20 sm:h-24">
        <!-- Logo + text -->
        <a
          href="/home"
          on:click={(e) => go(e, '/home')}
          class="flex items-center gap-3 sm:gap-4 group"
        >
          <div class="relative w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-2xl border-2 border-purple-200 p-1.5 flex items-center justify-center shadow-sm group-hover:border-purple-500 transition-colors">
            <img src={STATIC.logoUrl} alt={STATIC.logoAlt} class="max-w-full max-h-full object-contain" />
          </div>
          <div class="flex flex-col">
            <span class="text-lg sm:text-2xl font-bold text-gray-900 leading-tight">
              {STATIC.departmentName}
            </span>
            <span class="text-[10px] sm:text-xs text-purple-600 font-medium italic leading-tight">
              {STATIC.tagline}
            </span>
          </div>
        </a>

        <!-- Right: contact + back to main site -->
        <div class="hidden md:flex items-center gap-6">
          <div class="hidden lg:flex flex-col text-right text-xs">
            {#if $settings.contact_email}
              <a href={`mailto:${$settings.contact_email}`} class="text-gray-600 hover:text-purple-700 transition-colors">
                {$settings.contact_email}
              </a>
            {/if}
            {#if $settings.contact_phone}
              <a href={`tel:${$settings.contact_phone.replace(/[^0-9+]/g,'')}`} class="text-gray-600 hover:text-purple-700 transition-colors">
                {$settings.contact_phone}
              </a>
            {/if}
          </div>
          <a
            href={STATIC.mainSiteUrl}
            target="_blank" rel="noopener noreferrer"
            class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            ← DUET Main Site
          </a>
        </div>
      </div>
    </div>
  </div>

  <!-- ── PURPLE STICKY NAV ─────────────────────────────────────── -->
  <nav class="sticky top-0 z-40 bg-[#4B338C] shadow-lg">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-14">
        <!-- Desktop links -->
        <div class="hidden md:flex items-center gap-1">
          {#each menuItems as item}
            <a
              href={item.href}
              on:click={(e) => go(e, item.href)}
              class="px-4 py-2 rounded-lg text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 transition-colors"
            >
              {item.text}
            </a>
          {/each}
        </div>

        <!-- Mobile branding (shown only on mobile since top bar is big) -->
        <div class="md:hidden flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-purple-300 animate-pulse"></span>
          <span class="text-white text-sm font-medium tracking-wide">Cyber Security · DUET</span>
        </div>

        <!-- Mobile hamburger -->
        <button
          class="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
          on:click={() => mobileMenuOpen = !mobileMenuOpen}
          aria-label="Toggle menu"
        >
          <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
            <path class={!mobileMenuOpen ? 'block' : 'hidden'} stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            <path class={mobileMenuOpen ? 'block' : 'hidden'} stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Glowing baseline -->
    <div class="h-px bg-gradient-to-r from-transparent via-purple-300/70 to-transparent"></div>

    <!-- Mobile drawer -->
    {#if mobileMenuOpen}
      <div class="md:hidden bg-[#3d2877] border-t border-purple-500/30">
        <div class="px-3 py-3 space-y-1">
          {#each menuItems as item}
            <a
              href={item.href}
              on:click={(e) => go(e, item.href)}
              class="block px-4 py-3 rounded-lg text-base font-medium text-white hover:bg-white/10 transition-colors"
            >
              {item.text}
            </a>
          {/each}
          <a
            href={STATIC.mainSiteUrl}
            target="_blank" rel="noopener noreferrer"
            class="block px-4 py-3 rounded-lg text-base font-medium text-white bg-purple-900/60 hover:bg-purple-900 transition-colors text-center mt-2"
          >
            ← DUET Main Site
          </a>
        </div>
      </div>
    {/if}
  </nav>
</header>
