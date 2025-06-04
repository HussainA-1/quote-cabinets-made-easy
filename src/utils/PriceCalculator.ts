
import { Cabinet } from '../pages/Index';

// Base pricing structure
const basePrices = {
  'Base Cabinet': 150,
  'Wall Cabinet': 120,
  'Tall Cabinet': 200,
  'Corner Cabinet': 180,
  'Island Cabinet': 250
};

const materialMultipliers = {
  'Solid Wood - Oak': 1.5,
  'Solid Wood - Maple': 1.7,
  'Solid Wood - Cherry': 2.0,
  'Plywood - Birch': 1.3,
  'MDF - Painted': 1.0,
  'Laminate': 0.8
};

const finishPricing = {
  'Natural': 0,
  'Stained - Dark Walnut': 25,
  'Stained - Medium Oak': 20,
  'Painted - White': 30,
  'Painted - Gray': 30,
  'Painted - Black': 35
};

const hardwarePricing = {
  'Standard Hinges': 15,
  'Soft-Close Hinges': 35,
  'Premium Soft-Close': 50,
  'Handle - Brushed Nickel': 25,
  'Handle - Oil Rubbed Bronze': 30,
  'Handle - Chrome': 20
};

export const calculateCabinetPrice = (cabinet: Cabinet): number => {
  if (!cabinet.type || !cabinet.width || !cabinet.height || !cabinet.depth || !cabinet.material) {
    return 0;
  }

  // Calculate base price
  const basePrice = basePrices[cabinet.type as keyof typeof basePrices] || 150;
  
  // Calculate size factor (based on square footage of front face)
  const sizeFactor = (cabinet.width * cabinet.height) / 576; // 576 = 24" x 24" standard
  
  // Apply material multiplier
  const materialMultiplier = materialMultipliers[cabinet.material as keyof typeof materialMultipliers] || 1.0;
  
  // Add finish cost
  const finishCost = finishPricing[cabinet.finish as keyof typeof finishPricing] || 0;
  
  // Add hardware cost
  const hardwareCost = hardwarePricing[cabinet.hardware as keyof typeof hardwarePricing] || 0;
  
  // Calculate final price
  const finalPrice = (basePrice * sizeFactor * materialMultiplier) + finishCost + hardwareCost;
  
  return Math.round(finalPrice * 100) / 100; // Round to 2 decimal places
};
