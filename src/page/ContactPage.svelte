<!-- src/pages/ContactPage.svelte -->
<script>
    import { onMount } from 'svelte';
    import { RestURL } from '../main';
    let contactData;
    let loading = true;
    let error = null;
    let formData = {
      name: '',
      email: '',
      subject: '',
      message: ''
    };
    let formSubmitted = false;
    let formSubmitting = false;
    
    // Fetch contact data from status-bar API
    async function fetchContactData() {
      try {
        const response = await fetch(`${RestURL}/wp-json/acf/v1/status-bar/`);
        if (!response.ok) throw new Error('Failed to fetch contact information');
        
        const data = await response.json();
        contactData = { ...contactData, ...data }; // Merge with defaults
        loading = false;
      } catch (err) {
        error = err.message;
        loading = false;
        // Continue with default data
      }
    }
    
    // Handle form submission
    async function handleSubmit(event) {
      event.preventDefault();
      formSubmitting = true;
      
      // Simulate form submission (replace with actual API call)
      setTimeout(() => {
        formSubmitted = true;
        formSubmitting = false;
        formData = { name: '', email: '', subject: '', message: '' };
        
        // Reset form after 5 seconds
        setTimeout(() => {
          formSubmitted = false;
        }, 5000);
      }, 1500);
    }
    
    // Handle input changes
    function handleInputChange(event) {
      const { name, value } = event.target;
      formData = { ...formData, [name]: value };
    }
    
    onMount(() => {
      fetchContactData();
    });
  </script>
  
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Page Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Get in touch with the Department of Cyber Security. We're here to answer your questions and help you get started.
        </p>
      </div>
      
      {#if loading}
        <!-- Loading State -->
        <div class="flex justify-center items-center min-h-[400px]">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600"></div>
        </div>
      {:else}
        <!-- Main Content -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <!-- Contact Information -->
          <div>
            <div class="bg-white rounded-lg shadow-sm p-8">
              <h2 class="text-2xl font-bold text-gray-900 mb-6">Get In Touch</h2>
              
              <!-- Contact Methods -->
              <div class="space-y-6">
                <!-- Email -->
                <div class="flex items-start">
                  <div class="bg-cyan-100 p-3 rounded-lg mr-4 flex-shrink-0">
                    <svg class="w-6 h-6 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-lg font-semibold text-gray-900 mb-2">Email Us</h3>
                    <a 
                      href={`mailto:${contactData.email}`} 
                      class="text-cyan-600 hover:text-cyan-800 text-lg font-medium"
                    >
                      {contactData.email}
                    </a>
                    <p class="text-gray-600 text-sm mt-1">We'll respond within 24 hours</p>
                  </div>
                </div>
                
                <!-- Phone -->
                <div class="flex items-start">
                  <div class="bg-cyan-100 p-3 rounded-lg mr-4 flex-shrink-0">
                    <svg class="w-6 h-6 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-lg font-semibold text-gray-900 mb-2">Call Us</h3>
                    <a 
                      href={`tel:${contactData.phone.replace(/[^0-9+]/g, '')}`} 
                      class="text-cyan-600 hover:text-cyan-800 text-lg font-medium"
                    >
                      {contactData.phone}
                    </a>
                    <p class="text-gray-600 text-sm mt-1">Mon-Fri from 8am to 5pm</p>
                  </div>
                </div>
                
                <!-- Location -->
                <div class="flex items-start">
                  <div class="bg-cyan-100 p-3 rounded-lg mr-4 flex-shrink-0">
                    <svg class="w-6 h-6 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-lg font-semibold text-gray-900 mb-2">Visit Us</h3>
                    <!-- TODO Update this to be dynamic-->
                    <p class="text-gray-400">Dawood University of Engineering & Technology, Block 17 Gulshan-e-Iqbal, Karachi, Sindh, Pakistan, (75300).</p>
                  </div>
                </div>
              </div>
              
              <!-- TODO Update this to be dynamic Office Hours --> 
              <div class="mt-8 pt-6 border-t border-gray-200">
                <h3 class="text-lg font-semibold text-gray-900 mb-4">Office Hours</h3>
                <div class="space-y-2">
                  <div class="flex justify-between">
                    <span class="text-gray-600">Monday - Friday</span>
                    <!-- TODO Update this to be dynamic-->
                    <span class="font-medium text-gray-900">8:00 AM - 5:00 PM</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Sunday</span>
                    <span class="font-medium text-gray-900">Closed</span>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Emergency Contact -->
            <div class="bg-red-50 border border-red-200 rounded-lg p-6 mt-6">
              <div class="flex items-start">
                <div class="bg-red-100 p-2 rounded-full mr-4 flex-shrink-0">
                  <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-red-800 mb-2">Emergency Contact</h3>
                  <p class="text-red-700 text-sm mb-2">
                    For urgent security incidents or critical issues outside office hours, please contact:
                  </p>
                    <!-- TODO Update this to be dynamic-->

                  <a href="#" class="text-red-800 font-medium hover:text-red-900">
                    +1 (555) EMERGENCY
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Contact Form -->
          <div>
            <div class="bg-white rounded-lg shadow-sm p-8">
              <h2 class="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              
              {#if formSubmitted}
                <!-- Success Message -->
                <div class="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                  <svg class="w-12 h-12 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <h3 class="text-lg font-semibold text-green-800 mb-2">Message Sent Successfully!</h3>
                  <p class="text-green-700">Thank you for contacting us. We'll get back to you shortly.</p>
                </div>
              {:else}
                <!-- Contact Form -->
                <form on:submit={handleSubmit} class="space-y-6">
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <!-- Name -->
                    <div>
                      <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        bind:value={formData.name}
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent transition-colors"
                        placeholder="Your full name"
                      />
                    </div>
                    
                    <!-- Email -->
                    <div>
                      <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        bind:value={formData.email}
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent transition-colors"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>
                  
                  <!-- Subject -->
                  <div>
                    <label for="subject" class="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      bind:value={formData.subject}
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent transition-colors"
                      placeholder="What is this regarding?"
                    />
                  </div>
                  
                  <!-- Message -->
                  <div>
                    <label for="message" class="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      required
                      bind:value={formData.message}
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent transition-colors resize-vertical"
                      placeholder="Please describe your inquiry in detail..."
                    ></textarea>
                  </div>
                  
                  <!-- Submit Button -->
                  <button
                    type="submit"
                    disabled={formSubmitting}
                    class="w-full bg-cyan-600 text-white py-3 px-6 rounded-lg hover:bg-cyan-700 disabled:bg-cyan-400 disabled:cursor-not-allowed transition-colors font-medium"
                  >
                    {#if formSubmitting}
                      <span class="flex items-center justify-center">
                        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    {:else}
                      Send Message
                    {/if}
                  </button>
                </form>
              {/if}
            </div>
            
            <!-- Additional Info -->
            <div class="bg-cyan-50 rounded-lg p-6 mt-6">
              <h3 class="text-lg font-semibold text-cyan-900 mb-3">Before You Contact</h3>
              <ul class="space-y-2 text-cyan-800 text-sm">
                <li class="flex items-start">
                  <svg class="w-4 h-4 text-cyan-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Check our FAQ page for common questions</span>
                </li>
                <li class="flex items-start">
                  <svg class="w-4 h-4 text-cyan-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Include relevant details for faster response</span>
                </li>
                <li class="flex items-start">
                  <svg class="w-4 h-4 text-cyan-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Response time: typically within 24 business hours</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      {/if}
    </div>
  </div>