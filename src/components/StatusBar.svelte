<script>
  import { settings } from '../stores/settings.js';
  // No fetch here — settings are loaded globally in App.svelte
</script>

<div class="bg-black text-white text-xs py-1 px-4 flex items-center overflow-hidden">
  <div class="flex items-center space-x-4 flex-shrink-0">
    {#if $settings.contact_email}
      <a href={`mailto:${$settings.contact_email}`} class="hover:text-purple-300">
        {$settings.contact_email}
      </a>
    {/if}
    {#if $settings.contact_phone}
      <a href={`tel:${$settings.contact_phone.replace(/[^0-9+]/g,'')}`} class="hover:text-purple-300">
        {$settings.contact_phone}
      </a>
    {/if}
  </div>

  <div class="mx-4 h-3 w-px bg-gray-600 flex-shrink-0"></div>

  <div class="flex-1 overflow-hidden">
    <div class="animate-marquee whitespace-nowrap">
      {$settings.status_text ?? 'Welcome to the Department of Cyber Security'}
    </div>
  </div>
</div>

<style>
  @keyframes marquee { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }
  .animate-marquee { display: inline-block; padding-left: 100%; animation: marquee 25s linear infinite; }
</style>
