<script>
  import { settings } from '../stores/settings.js';
  import { STATIC } from '../config.js';
  import { router } from '../router.js';

  const year = new Date().getFullYear();

  function go(e, href) {
    e.preventDefault();
    router.navigate(href);
  }

  // Build social list from settings (skip empty)
  $: socials = [
    { key: 'facebook_url',  label: 'Facebook',  short: 'Fb' },
    { key: 'linkedin_url',  label: 'LinkedIn',  short: 'In' },
    { key: 'youtube_url',   label: 'YouTube',   short: 'Yt' },
    { key: 'instagram_url', label: 'Instagram', short: 'Ig' },
    { key: 'twitter_url',   label: 'Twitter/X', short: 'X' }
  ].filter(s => $settings[s.key]);
</script>

<footer class="bg-[#1a0f3d] text-white mt-0">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

      <!-- Column 1: Brand + about -->
      <div class="lg:col-span-1">
        <div class="flex items-center gap-3 mb-5">
          <div class="w-12 h-12 rounded-2xl bg-white p-1.5 flex items-center justify-center">
            <img src={STATIC.logoUrl} alt={STATIC.logoAlt} class="max-w-full max-h-full object-contain" />
          </div>
          <div>
            <div class="font-bold text-white leading-tight">Cyber Security</div>
            <div class="text-xs text-purple-300 italic">{STATIC.tagline}</div>
          </div>
        </div>
        <p class="text-sm text-purple-200/80 leading-relaxed">
          {STATIC.universityName}. Preparing the next generation of cyber defenders through rigorous education and cutting-edge research.
        </p>
      </div>

      <!-- Column 2: Quick links -->
      <div>
        <h4 class="text-sm font-semibold uppercase tracking-wider text-purple-300 mb-4">Explore</h4>
        <ul class="space-y-3 text-sm">
          <li><a href="/about"        on:click={(e) => go(e, '/about')}        class="text-purple-100/80 hover:text-white transition-colors">About the Department</a></li>
          <li><a href="/faculty"      on:click={(e) => go(e, '/faculty')}      class="text-purple-100/80 hover:text-white transition-colors">Faculty</a></li>
          <li><a href="/news"         on:click={(e) => go(e, '/news')}         class="text-purple-100/80 hover:text-white transition-colors">News & Updates</a></li>
          <li><a href="/publications" on:click={(e) => go(e, '/publications')} class="text-purple-100/80 hover:text-white transition-colors">Research & Publications</a></li>
          <li><a href="/contact"      on:click={(e) => go(e, '/contact')}      class="text-purple-100/80 hover:text-white transition-colors">Contact Us</a></li>
        </ul>
      </div>

      <!-- Column 3: Contact -->
      <div>
        <h4 class="text-sm font-semibold uppercase tracking-wider text-purple-300 mb-4">Get in Touch</h4>
        <ul class="space-y-3 text-sm">
          {#if $settings.contact_email}
            <li class="flex items-start gap-3">
              <svg class="w-4 h-4 mt-0.5 text-purple-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              <a href={`mailto:${$settings.contact_email}`} class="text-purple-100/80 hover:text-white transition-colors break-all">{$settings.contact_email}</a>
            </li>
          {/if}
          {#if $settings.contact_phone}
            <li class="flex items-start gap-3">
              <svg class="w-4 h-4 mt-0.5 text-purple-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
              <a href={`tel:${$settings.contact_phone.replace(/[^0-9+]/g,'')}`} class="text-purple-100/80 hover:text-white transition-colors">{$settings.contact_phone}</a>
            </li>
          {/if}
          {#if $settings.address}
            <li class="flex items-start gap-3">
              <svg class="w-4 h-4 mt-0.5 text-purple-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              <span class="text-purple-100/80 leading-relaxed">{$settings.address}</span>
            </li>
          {/if}
        </ul>
      </div>

      <!-- Column 4: Social -->
      <div>
        <h4 class="text-sm font-semibold uppercase tracking-wider text-purple-300 mb-4">Follow Us</h4>
        {#if socials.length === 0}
          <p class="text-sm text-purple-200/60">Social links coming soon.</p>
        {:else}
          <div class="flex flex-wrap gap-2">
            {#each socials as s}
              <a
                href={$settings[s.key]}
                target="_blank" rel="noopener noreferrer"
                aria-label={s.label}
                class="w-10 h-10 rounded-lg bg-purple-900/50 hover:bg-purple-600 border border-purple-700/50 flex items-center justify-center text-xs font-bold text-purple-100 transition-colors"
              >
                {s.short}
              </a>
            {/each}
          </div>
        {/if}

        <div class="mt-6">
          <h4 class="text-sm font-semibold uppercase tracking-wider text-purple-300 mb-3">Newsletter</h4>
          <form class="flex gap-2" on:submit|preventDefault={() => {}}>
            <input
              type="email" required placeholder="you@example.com"
              class="flex-1 min-w-0 px-3 py-2 bg-purple-900/40 border border-purple-700/50 rounded-lg text-sm text-white placeholder-purple-300/60 focus:outline-none focus:border-purple-400"
            />
            <button class="px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg text-sm font-medium transition-colors">
              Join
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>

  <!-- Bottom bar -->
  <div class="border-t border-purple-900/60">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-purple-300/70">
      <span>{$settings.footer_note ?? `Copyright © ${year} Department of Cyber Security, DUET Karachi`}</span>
      <span class="flex items-center gap-2">
        <span class="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
        systems operational
      </span>
    </div>
  </div>
</footer>
