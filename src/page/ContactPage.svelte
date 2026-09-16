<script>
  import { settings } from '../stores/settings.js';

  let form = { name: '', email: '', subject: '', message: '' };
  let submitting = false;
  let submitted = false;

  async function handleSubmit(e) {
    e.preventDefault();
    submitting = true;
    // Simulated send — plug in your backend endpoint later
    await new Promise(r => setTimeout(r, 1200));
    submitting = false;
    submitted = true;
    form = { name: '', email: '', subject: '', message: '' };
    setTimeout(() => submitted = false, 6000);
  }
</script>

<section class="bg-gradient-to-br from-[#4B338C] to-purple-900 text-white py-20 px-4">
  <div class="max-w-4xl mx-auto text-center">
    <div class="text-xs uppercase tracking-[0.3em] text-purple-300 mb-4">Get in touch</div>
    <h1 class="text-4xl md:text-5xl font-bold mb-3">Contact Us</h1>
    <p class="text-lg text-purple-200">We'd love to hear from you.</p>
  </div>
</section>

<div class="bg-gray-50 py-14 px-4 sm:px-6 lg:px-8">
  <div class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">

    <!-- Left: Contact info cards -->
    <div class="lg:col-span-2 space-y-4">
      {#if $settings.contact_email}
        <a href={`mailto:${$settings.contact_email}`} class="flex items-start gap-4 bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
          <div class="w-11 h-11 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
            <svg class="w-5 h-5 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
          </div>
          <div class="min-w-0">
            <div class="text-xs uppercase tracking-wider text-gray-500 mb-1">Email</div>
            <div class="text-gray-900 font-medium break-all">{$settings.contact_email}</div>
          </div>
        </a>
      {/if}

      {#if $settings.contact_phone}
        <a href={`tel:${$settings.contact_phone.replace(/[^0-9+]/g,'')}`} class="flex items-start gap-4 bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
          <div class="w-11 h-11 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
            <svg class="w-5 h-5 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
          </div>
          <div>
            <div class="text-xs uppercase tracking-wider text-gray-500 mb-1">Phone</div>
            <div class="text-gray-900 font-medium">{$settings.contact_phone}</div>
            {#if $settings.contact_phone_alt}
              <div class="text-sm text-gray-600">{$settings.contact_phone_alt}</div>
            {/if}
          </div>
        </a>
      {/if}

      {#if $settings.address}
        <div class="flex items-start gap-4 bg-white rounded-xl p-5 shadow-sm">
          <div class="w-11 h-11 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
            <svg class="w-5 h-5 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
          </div>
          <div>
            <div class="text-xs uppercase tracking-wider text-gray-500 mb-1">Address</div>
            <div class="text-gray-900 font-medium leading-relaxed">{$settings.address}</div>
          </div>
        </div>
      {/if}

      {#if $settings.office_hours}
        <div class="flex items-start gap-4 bg-white rounded-xl p-5 shadow-sm">
          <div class="w-11 h-11 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
            <svg class="w-5 h-5 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          </div>
          <div>
            <div class="text-xs uppercase tracking-wider text-gray-500 mb-1">Office Hours</div>
            <div class="text-gray-900 font-medium whitespace-pre-line">{$settings.office_hours}</div>
          </div>
        </div>
      {/if}

      {#if $settings.whatsapp_url}
        <a href={$settings.whatsapp_url} target="_blank" rel="noopener noreferrer"
           class="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-500 text-white font-medium rounded-xl p-4 transition-colors">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.52 3.48A11.94 11.94 0 0012 0C5.373 0 0 5.373 0 12c0 2.117.553 4.104 1.518 5.83L0 24l6.335-1.502A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12 0-3.204-1.248-6.11-3.48-8.52zM12 22a9.94 9.94 0 01-5.06-1.372l-.363-.216-3.76.892.9-3.67-.236-.38A9.94 9.94 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10zm5.32-7.382c-.29-.145-1.717-.848-1.983-.944-.266-.096-.46-.145-.653.145-.193.29-.75.944-.92 1.14-.17.193-.34.217-.63.072-.29-.145-1.224-.452-2.33-1.44-.86-.768-1.44-1.717-1.61-2.007-.17-.29-.018-.446.127-.59.13-.13.29-.338.434-.507.144-.169.192-.29.29-.484.096-.193.048-.363-.024-.507-.072-.145-.653-1.576-.896-2.156-.235-.567-.475-.49-.653-.5l-.555-.01a1.07 1.07 0 00-.774.363c-.266.29-1.014.99-1.014 2.415 0 1.424 1.038 2.8 1.183 2.99.144.193 2.043 3.118 4.947 4.372.691.298 1.23.476 1.65.61.694.22 1.325.19 1.823.115.557-.083 1.716-.702 1.958-1.379.242-.676.242-1.256.17-1.378-.073-.121-.267-.194-.557-.339z"/></svg>
          Chat on WhatsApp
        </a>
      {/if}
    </div>

    <!-- Right: Form -->
    <div class="lg:col-span-3 bg-white rounded-2xl shadow-sm p-6 sm:p-8">
      <h2 class="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>

      {#if submitted}
        <div class="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
          <svg class="w-12 h-12 text-green-500 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <h3 class="font-semibold text-green-800 mb-1">Message sent!</h3>
          <p class="text-sm text-green-700">We'll get back to you within 24 business hours.</p>
        </div>
      {:else}
        <form on:submit={handleSubmit} class="space-y-5">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <label class="block">
              <span class="text-sm font-medium text-gray-700 mb-1.5 block">Full Name *</span>
              <input bind:value={form.name} required type="text"
                     class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                     placeholder="Your name" />
            </label>
            <label class="block">
              <span class="text-sm font-medium text-gray-700 mb-1.5 block">Email *</span>
              <input bind:value={form.email} required type="email"
                     class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                     placeholder="you@example.com" />
            </label>
          </div>
          <label class="block">
            <span class="text-sm font-medium text-gray-700 mb-1.5 block">Subject *</span>
            <input bind:value={form.subject} required type="text"
                   class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                   placeholder="What is this about?" />
          </label>
          <label class="block">
            <span class="text-sm font-medium text-gray-700 mb-1.5 block">Message *</span>
            <textarea bind:value={form.message} required rows="5"
                      class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition resize-y"
                      placeholder="Tell us more…"></textarea>
          </label>
          <button type="submit" disabled={submitting}
                  class="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors">
            {submitting ? 'Sending…' : 'Send Message'}
          </button>
        </form>
      {/if}
    </div>
  </div>
</div>
