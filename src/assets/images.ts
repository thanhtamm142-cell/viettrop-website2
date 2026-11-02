/**
 * Asset exports using ES module imports for guaranteed Vite bundling
 * and GitHub Pages subfolder asset resolution.
 */
import heroTropicalFruits from './images/hero_vietnamese_tropical_fruits_1793612124306.jpg';
import productMango from './images/product_vietnamese_dried_mango_1793612125554.jpg';
import productJackfruit from './images/product_vietnamese_dried_jackfruit_1793612124816.jpg';
import productBanana from './images/product_vietnamese_dried_banana_1793612126636.jpg';
import productDiscoveryBundle from './images/pack_tropical_discovery_bundle_1793612127126.jpg';

export const IMAGES = {
  hero: heroTropicalFruits,
  mango: productMango,
  jackfruit: productJackfruit,
  banana: productBanana,
  discoveryBundle: productDiscoveryBundle,
};
