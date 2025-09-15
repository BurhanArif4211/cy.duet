// src/router.js
import { writable } from 'svelte/store';
import { RestURL } from './main.js';

// Route configuration - define all routes in one place
export const routes = {
  // Static routes
  '/home': {
    component: () => import('./page/HomePage.svelte'),
    name: 'Home'
  },
  '/posts': {
    component: () => import('./page/PostsPage.svelte'),
    name: 'Posts'
  },
  '/faculty': {
    component: () => import('./page/FacultyPage.svelte'),
    name: 'Faculty'
  },
  '/contact': {
    component: () => import('./page/ContactPage.svelte'),
    name: 'Contact'
  },
  
  // Dynamic routes with parameters
  '/posts/:id': {
    component: () => import('./page/PostPage.svelte'),
    name: 'Post',
    data: async (params) => {
      try {
        let postData = null;
        
        // Check if the parameter is a numeric ID or a slug
        const isNumericId = !isNaN(params.id);
        
        if (isNumericId) {
          // Fetch by ID
          const response = await fetch(`${RestURL}/wp-json/wp/v2/posts/${params.id}`);
          if (!response.ok) {
            if (response.status === 404) {
              throw new Error('POST_NOT_FOUND');
            }
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          postData = await response.json();
        } else {
          // Fetch by slug
          const response = await fetch(`${RestURL}/wp-json/wp/v2/posts&slug=${params.id}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const posts = await response.json();
          
          if (posts.length === 0) {
            throw new Error('POST_NOT_FOUND');
          }
          
          postData = posts[0];
        }
        
        return postData;
      } catch (error) {
        if (error.message === 'POST_NOT_FOUND') {
          // Rethrow with a specific error that we can handle in the router
          throw new Error('POST_NOT_FOUND');
        }
        console.error('Error fetching post:', error);
        throw error;
      }
    }
  },
  
  '/info/:slug': {
    component: () => import('./page/InfoPostPage.svelte'),
    name: 'InfoPost',
    data: async (params) => {
      try {
        // Fetch post by slug with category filter
        const response = await fetch(
          `${RestURL}/wp-json/wp/v2/posts?slug=${params.slug}&categories=info`
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const posts = await response.json();
        
        if (posts.length === 0) {
          throw new Error('POST_NOT_FOUND');
        }
        
        return posts[0];
      } catch (error) {
        if (error.message === 'POST_NOT_FOUND') {
          throw new Error('POST_NOT_FOUND');
        }
        console.error('Error fetching info post:', error);
        throw error;
      }
    }
  },
  
  // Fallback route
  '/404': {
    component: () => import('./page/NotFoundPage.svelte'),
    name: 'NotFound'
  }
};

// Path parser with support for dynamic parameters
function parsePath(pathname) {
  // Normalize path - remove trailing slash and handle root
  let path = pathname.replace(/\/$/, '') || '/';
  if (path === '/') path = '/home';
  
  // Check if path matches any defined route
  const routeKeys = Object.keys(routes);
  
  for (const routeKey of routeKeys) {
    // Check for exact matches (static routes)
    if (routeKey === path) {
      return { 
        route: routes[routeKey], 
        params: {} 
      };
    }
    
    // Check for dynamic routes with parameters
    if (routeKey.includes(':')) {
      const routeParts = routeKey.split('/');
      const pathParts = path.split('/');
      
      if (routeParts.length !== pathParts.length) continue;
      
      const params = {};
      let isMatch = true;
      
      for (let i = 0; i < routeParts.length; i++) {
        if (routeParts[i].startsWith(':')) {
          // This is a parameter - extract the value
          const paramName = routeParts[i].substring(1);
          params[paramName] = pathParts[i];
        } else if (routeParts[i] !== pathParts[i]) {
          isMatch = false;
          break;
        }
      }
      
      if (isMatch) {
        return { 
          route: routes[routeKey], 
          params 
        };
      }
    }
  }
  
  // No match found - return 404
  return { 
    route: routes['/404'], 
    params: {} 
  };
}

// Router store
function createRouter() {
  const { subscribe, set, update } = writable({
    currentRoute: null,
    component: null,
    params: {},
    routeData: null,
    loading: true
  });
  
// Update the navigate function in createRouter() to handle post not found errors
async function navigate(to, replace = false) {
  // Update store to loading state
  update(store => ({ ...store, loading: true }));
  
  const path = to.startsWith('/') ? to : `/${to}`;
  
  // Parse the path
  const { route, params } = parsePath(path);
  
  try {
    // Load the component
    const component = (await route.component()).default;
    
    // Fetch route data if data function exists
    let routeData = null;
    if (route.data) {
      routeData = await route.data(params);
    }
    
    // Update history
    if (replace) {
      history.replaceState({}, '', path);
    } else {
      history.pushState({}, '', path);
    }
    
    // Update store
    set({
      currentRoute: route,
      component,
      params,
      routeData,
      loading: false
    });
    window.scrollTo(0, 0);
  } catch (error) {
    console.error('Failed to load route:', error);
    
    // Handle post not found specifically
    if (error.message === 'POST_NOT_FOUND') {
      // Redirect to 404 page with post not found message
      const fallbackRoute = routes['/404'];
      const component = (await fallbackRoute.component()).default;
      
      set({
        currentRoute: fallbackRoute,
        component,
        params: { message: 'The requested post was not found.' },
        routeData: null,
        loading: false
      });
    } else {
      // Fallback to generic 404 for other errors
      const fallbackRoute = routes['/404'];
      const component = (await fallbackRoute.component()).default;
      
      set({
        currentRoute: fallbackRoute,
        component,
        params: {},
        routeData: null,
        loading: false
      });
    }
  }
}
  
  // Initialize router
  async function init() {
    await navigate(window.location.pathname, true);
    
    // Handle browser back/forward
    window.addEventListener('popstate', async () => {
      await navigate(window.location.pathname, true);
    });
  }
  
  return {
    subscribe,
    navigate,
    init
  };
}

export const router = createRouter();