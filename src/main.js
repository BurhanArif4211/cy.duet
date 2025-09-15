import { mount } from 'svelte'
import './app.css'
import App from './App.svelte'

console.log(` _______                                                                
  |       \\                                                               
  | $$$$$$$\\  ______                                                      
  | $$__/ $$ /      \\                                                     
  | $$    $$|  $$$$$$\\                                                    
  | $$$$$$$\\| $$    $$                                                    
  | $$__/ $$| $$$$$$$$                                                    
  | $$    $$ \\$$     \\                                                    
   \\$$$$$$$   \\$$$$$$$                                                    
   _______                       __  __              __      __           
  |       \\                     |  \\|  \\            |  \\    |  \\          
  | $$$$$$$\\  ______    ______  | $$ \\$$  _______  _| $$_    \\$$  _______ 
  | $$__| $$ /      \\  |      \\ | $$|  \\ /       \\|   $$ \\  |  \\ /       \\
  | $$    $$|  $$$$$$\\  \\$$$$$$\\| $$| $$|  $$$$$$$ \\$$$$$$  | $$|  $$$$$$$
  | $$$$$$$\\| $$    $$ /      $$| $$| $$ \\$$    \\   | $$ __ | $$| $$      
  | $$  | $$| $$$$$$$$|  $$$$$$$| $$| $$ _\\$$$$$$\\  | $$|  \\| $$| $$_____ 
  | $$  | $$ \\$$     \\ \\$$    $$| $$| $$|       $$   \\$$  $$| $$ \\$$     \\
   \\$$   \\$$  \\$$$$$$$  \\$$$$$$$ \\$$ \\$$ \\$$$$$$$     \\$$$$  \\$$  \\$$$$$$$`);
console.log('Designed and Developed by Burhan Arif \n (https://burhanarif.vercel.app)\n (https://linkedin.com/in/that-burhan)');

//detect if a development environment is running in vite and set the remote url to https://plum-ibex-526372.hostingersite.com/ else it should be ""
export const RestURL =
  // prefer explicit VITE_REST_URL if provided (can be empty string)
  (typeof import.meta.env.VITE_REST_URL !== 'undefined'
    ? import.meta.env.VITE_REST_URL
    : // otherwise fall back: dev -> remote example, prod -> empty string
      (import.meta.env.MODE === 'development' ? 'https://plum-ibex-526372.hostingersite.com' : ''));

const app = mount(App, {
  target: document.getElementById('app'),
})

export default app
