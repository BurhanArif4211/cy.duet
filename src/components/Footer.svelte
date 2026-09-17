<script>
  import { identity } from '../stores/identity.js';
  import { contactsBySection, contactHref, findContact, isSocial, SOCIAL_LABELS } from '../stores/contact.js';
  import { settings } from '../stores/settings.js';
  import { router } from '../router.js';

  const year = new Date().getFullYear();

  $: primary = $contactsBySection.primary ?? [];
  $: email    = findContact(primary, 'email');
  $: phone    = findContact(primary, 'phone');
  $: address  = findContact(primary, 'address');
  $: socials  = primary.filter(isSocial).sort(
    (a, b) => SOCIAL_LABELS.indexOf(a.label.toLowerCase()) - SOCIAL_LABELS.indexOf(b.label.toLowerCase())
  );

  $: mainSiteUrl = $settings.university_url ?? 'https://duet.edu.pk';

  function go(e, href) {
    e.preventDefault();
    router.navigate(href);
  }

  function socialShort(label) {
    const l = label.toLowerCase();
    return { facebook: 'Fb', instagram: 'Ig', linkedin: 'In', twitter: 'X', x: 'X', youtube: 'Yt', whatsapp: 'Wa' }[l] ?? l[0].toUpperCase();
  }
</script>

<footer class="bg-[#1a0f3d] text-white mt-0">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

      <!-- Brand -->
      <div class="lg:col-span-1">
        <div class="flex items-center gap-3 mb-5">
          {#if $identity.site_logo_url}
            <div class="w-12 h-12 rounded-2xl bg-white p-1.5 flex items-center justify-center">
              <img src={$identity.site_logo_url} alt={$identity.site_title} class="max-w-full max-h-full object-contain" />
            </div>
          {/if}
          <div class="min-w-0">
            <div class="font-bold text-white leading-tight truncate">{$identity.site_title}</div>
            {#if $identity.site_tagline}
              <div class="text-xs text-purple-300 italic truncate">{$identity.site_tagline}</div>
            {/if}
          </div>
        </div>
        {#if $identity.university_name}
          <p class="text-sm text-purple-200/80 leading-relaxed">
            {$identity.university_name}
          </p>
        {/if}
      </div>

      <!-- Explore -->
      <div>
        <h4 class="text-sm font-semibold uppercase tracking-wider text-purple-300 mb-4">Explore</h4>
        <ul class="space-y-3 text-sm">
          <li><a href="/about"        on:click={(e) => go(e, '/about')}        class="text-purple-100/80 hover:text-white transition-colors">About</a></li>
          <li><a href="/faculty"      on:click={(e) => go(e, '/faculty')}      class="text-purple-100/80 hover:text-white transition-colors">Faculty</a></li>
          <li><a href="/news"         on:click={(e) => go(e, '/news')}         class="text-purple-100/80 hover:text-white transition-colors">News & Updates</a></li>
          <li><a href="/publications" on:click={(e) => go(e, '/publications')} class="text-purple-100/80 hover:text-white transition-colors">Publications</a></li>
          <li><a href="/contact"      on:click={(e) => go(e, '/contact')}      class="text-purple-100/80 hover:text-white transition-colors">Contact</a></li>
        </ul>
      </div>

      <!-- Contact -->
      <div>
        <h4 class="text-sm font-semibold uppercase tracking-wider text-purple-300 mb-4">Get in Touch</h4>
        <ul class="space-y-3 text-sm">
          {#if email}
            <li class="flex items-start gap-3">
              <svg class="w-4 h-4 mt-0.5 text-purple-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              <a href={contactHref(email)} class="text-purple-100/80 hover:text-white transition-colors break-all">{email.value}</a>
            </li>
          {/if}
          {#if phone}
            <li class="flex items-start gap-3">
              <svg class="w-4 h-4 mt-0.5 text-purple-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
              <a href={contactHref(phone)} class="text-purple-100/80 hover:text-white transition-colors">{phone.value}</a>
            </li>
          {/if}
          {#if address}
            <li class="flex items-start gap-3">
              <svg class="w-4 h-4 mt-0.5 text-purple-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              <span class="text-purple-100/80 leading-relaxed">{address.value}</span>
            </li>
          {/if}
        </ul>
      </div>

      <!-- Social -->
      <div>
        <h4 class="text-sm font-semibold uppercase tracking-wider text-purple-300 mb-4">Follow Us</h4>
        {#if socials.length === 0}
          <p class="text-sm text-purple-200/60">Social links coming soon.</p>
        {:else}
          <div class="flex flex-wrap gap-2">
            {#each socials as s}
              <a href={contactHref(s)} target="_blank" rel="noopener noreferrer"
                 aria-label={s.label}
                 class="w-10 h-10 rounded-lg bg-purple-900/50 hover:bg-purple-600 border border-purple-700/50 flex items-center justify-center text-xs font-bold text-purple-100 transition-colors">
                {socialShort(s.label)}
              </a>
            {/each}
          </div>
        {/if}
      </div>
    </div>
  </div>

  <div class="border-t border-purple-900/60">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-purple-300/70">
      <span>{$settings.footer_note ?? `Copyright © ${year} ${$identity.site_title}. All rights reserved.`}</span>
      <a href={mainSiteUrl} target="_blank" rel="noopener noreferrer" class="hover:text-purple-100 transition-colors">
        {$identity.university_name || 'University'}
      </a>
    </div>
  </div>
</footer>
