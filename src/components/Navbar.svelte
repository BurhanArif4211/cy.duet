<script>
  import { router } from '../router.js';
  import { settings } from '../stores/settings.js';
  import { STATIC } from '../config.js';

  let mobileMenuOpen = false;

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
    router.navigate(href);
  }
</script>

<header>
  <!-- ═══════════ TOP WHITE BAR ═══════════ -->
  <div class="relative bg-white border-b border-purple-100 overflow-hidden">
    <!-- DUET watermark (faded into white) -->
    <img
      src={STATIC.universityLogoUrl}
      alt=""
      aria-hidden="true"
      class="pointer-events-none select-none absolute right-4 sm:right-10 top-1/2 -translate-y-1/2 h-20 sm:h-28 object-contain opacity-[0.5] mix-blend-multiply"
    />

    <!-- Purple corner glows -->
    <div class="pointer-events-none absolute -left-32 -top-32 w-80 h-80 rounded-full bg-purple-500/10 blur-3xl"></div>
    <div class="pointer-events-none absolute -right-32 -bottom-32 w-80 h-80 rounded-full bg-fuchsia-500/10 blur-3xl"></div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-20 sm:h-24 gap-4">

        <!-- Left: contact (desktop only) -->
        <div class="hidden lg:flex flex-col text-xs space-y-1 min-w-0 flex-shrink-0">
          {#if $settings.contact_email}
            <a
              href={`mailto:${$settings.contact_email}`}
              class="text-gray-600 hover:text-purple-700 transition-colors truncate max-w-[180px]"
            >
              {$settings.contact_email}
            </a>
          {/if}
          {#if $settings.contact_phone}
            <a
              href={`tel:${$settings.contact_phone.replace(/[^0-9+]/g, '')}`}
              class="text-gray-600 hover:text-purple-700 transition-colors"
            >
              {$settings.contact_phone}
            </a>
          {/if}
        </div>

        <!-- Left spacer on mobile -->
        <div class="lg:hidden w-8 flex-shrink-0"></div>

        <!-- Center: shield + name + tagline -->
        <a
          href="/home"
          on:click={(e) => go(e, '/home')}
          class="group flex items-center gap-3 sm:gap-4 justify-center flex-1 lg:flex-none min-w-0"
        >
          <!-- Shield with glow ring -->
          <div class="relative flex-shrink-0">
            <div class="absolute inset-0 rounded-2xl bg-gradient-to-tr from-purple-500 to-fuchsia-400 opacity-0 group-hover:opacity-50 blur-md transition-opacity duration-300"></div>
            <div class="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl border-2 border-purple-200 bg-white p-1.5 shadow-[0_0_0_4px_rgba(139,92,246,0.06)] group-hover:border-purple-500 group-hover:shadow-[0_0_0_6px_rgba(139,92,246,0.15)] transition-all duration-300">
              <img src={STATIC.logoUrl} alt={STATIC.logoAlt} class="w-full h-full object-contain" />
            </div>
          </div>

          <!-- Text stack -->
          <div class="flex flex-col min-w-0">
            <span class="text-lg sm:text-2xl font-bold text-gray-900 leading-tight group-hover:text-purple-800 transition-colors whitespace-nowrap">
              {STATIC.departmentName}
            </span>
            <span class="text-[10px] sm:text-xs text-purple-600 font-medium italic leading-tight whitespace-nowrap">
              {STATIC.tagline}
            </span>
          </div>
        </a>

        <!-- Right: main site CTA (desktop only) -->
        <div class="hidden lg:block flex-shrink-0">
          <a
            href={STATIC.mainSiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            class="group relative inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-purple-700 border border-purple-200 hover:border-purple-400 hover:text-purple-900 transition-colors overflow-hidden"
          >
            <span class="absolute inset-0 bg-gradient-to-r from-purple-100 to-fuchsia-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <svg class="relative w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span class="relative">DUET Main Site</span>
          </a>
        </div>

        <!-- Right spacer on mobile -->
        <div class="lg:hidden w-8 flex-shrink-0"></div>
      </div>
    </div>

    <!-- Bottom gradient hairline -->
    <div class="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-400/60 to-transparent"></div>
  </div>

  <!-- ═══════════ PURPLE STICKY NAV ═══════════ -->
  <nav class="sticky top-0 z-40 bg-[#4B338C] shadow-[0_4px_24px_-6px_rgba(75,51,140,0.6)] relative">
    <!-- Top hairline -->
    <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-200/60 to-transparent"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-14">

        <!-- Desktop links -->
        <div class="hidden md:flex items-center gap-0.5">
          {#each menuItems as item}
            <a
              href={item.href}
              on:click={(e) => go(e, item.href)}
              class="relative px-4 py-2 text-sm font-medium text-white/90 hover:text-white transition-colors group"
            >
              <span class="relative z-10">{item.text}</span>
              <!-- hover background pill -->
              <span class="absolute inset-0 rounded-md bg-white/0 group-hover:bg-white/10 transition-colors duration-200"></span>
              <!-- animated underline -->
              <span class="absolute left-3 right-3 bottom-1 h-[2px] bg-gradient-to-r from-purple-200 to-fuchsia-300 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
            </a>
          {/each}
        </div>

        <!-- Mobile brand -->
        <div class="md:hidden flex items-center gap-2">
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-300 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-purple-300"></span>
          </span>
          <span class="text-white text-sm font-medium tracking-wide">Cyber Security · DUET</span>
        </div>

        <!-- Mobile toggle -->
        <button
          class="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
          on:click={() => (mobileMenuOpen = !mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
            <path class={!mobileMenuOpen ? 'block' : 'hidden'} stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            <path class={mobileMenuOpen ? 'block' : 'hidden'} stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Bottom hairline -->
    <div class="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-200/60 to-transparent"></div>

    <!-- Mobile drawer -->
    {#if mobileMenuOpen}
      <div class="md:hidden bg-[#3d2877] border-t border-purple-500/30 relative overflow-hidden">
        <div class="pointer-events-none absolute -right-20 -top-20 w-48 h-48 rounded-full bg-fuchsia-500/20 blur-3xl"></div>

        <div class="relative px-3 py-3 space-y-1">
          {#each menuItems as item}
            <a
              href={item.href}
              on:click={(e) => go(e, item.href)}
              class="block px-4 py-3 rounded-lg text-base font-medium text-white/90 hover:text-white hover:bg-white/10 transition-colors"
            >
              {item.text}
            </a>
          {/each}

          <a
            href={STATIC.mainSiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            class="block px-4 py-3 rounded-lg text-base font-medium text-white bg-gradient-to-r from-purple-700 to-fuchsia-700 hover:from-purple-600 hover:to-fuchsia-600 transition-all text-center mt-2"
          >
            ← DUET Main Site
          </a>
        </div>
      </div>
    {/if}
  </nav>
</header>
