
import { Cabinet } from '../pages/Index';

// Pricing structure based on your HTML code
const pricing = {
  "MDF": { drawer: 120, pricePerSheet: 95, sheetWidth: 122, sheetHeight: 244 },
  "Melamine HD": { drawer: 120, pricePerSheet: 95, sheetWidth: 122, sheetHeight: 244 },
  "Melamine EG": { drawer: 130, pricePerSheet: 350, sheetWidth: 207, sheetHeight: 280 },
  "PVC": { drawer: 130, pricePerSheet: 105, sheetWidth: 122, sheetHeight: 244 }
};

const accessories = {
  drslider: 30,
  roundbar: 10,
  hinges: 8,
  handle: 6,
  aluframe: 65,
  wheelset: 40,
  labourPerHour: 36,
  shelfsupportUnitCost: 0.25,
  barholder: 15
};

const shelfStandardPrice = 25;

function calculateSheetCount(width: number, height: number, depth: number, addStandardDoors: boolean, material: string) {
  const efficiency = 0.7;
  const sidePanels = 2 * (height * depth);
  const topBottomPanels = 2 * (width * depth);
  const backPanel = width * height;
  const doorsPanel = addStandardDoors ? width * height : 0;
  const totalArea = sidePanels + topBottomPanels + backPanel + doorsPanel;

  const materialData = pricing[material as keyof typeof pricing];
  if (!materialData) return { sheets: 0 };

  const sheetWidth = materialData.sheetWidth;
  const sheetHeight = materialData.sheetHeight;
  const usableSheetArea = sheetWidth * sheetHeight * efficiency;

  const sheetsNeeded = Math.ceil(totalArea / usableSheetArea);

  return {
    sheets: sheetsNeeded
  };
}

export const calculateCabinetPrice = (cabinet: Cabinet): number => {
  if (!cabinet.material || !cabinet.width || !cabinet.height || !cabinet.depth) {
    return 0;
  }

  const material = cabinet.material;
  const doorType = cabinet.doorType;
  const withStandardDoors = doorType === "Normal Doors";
  const shelves = cabinet.shelves || 0;
  const drawers = cabinet.drawers || 0;
  const width = cabinet.width * 2.54; // Convert inches to cm
  const height = cabinet.height * 2.54;
  const depth = cabinet.depth * 2.54;
  const labourHours = cabinet.labourHours || 0;

  const result = calculateSheetCount(width, height, depth, withStandardDoors, material);
  
  const materialPrices = pricing[material as keyof typeof pricing];
  if (!materialPrices) return 0;

  let basePrice = result.sheets * materialPrices.pricePerSheet;
  let total = basePrice;

  // Glass door premium
  if (doorType === "Glass Doors") total += 200;

  // Drawers and shelves
  total += drawers * materialPrices.drawer;
  total += shelves * shelfStandardPrice;

  // Accessories
  total += (cabinet.drslider || 0) * accessories.drslider;
  total += (cabinet.roundbar || 0) * accessories.roundbar;
  total += (cabinet.hinges || 0) * accessories.hinges;
  total += (cabinet.handle || 0) * accessories.handle;
  total += (cabinet.aluframe || 0) * accessories.aluframe;
  total += (cabinet.wheelset || 0) * accessories.wheelset;
  total += labourHours * accessories.labourPerHour;

  // Hidden accessory costs
  total += shelves * 4 * accessories.shelfsupportUnitCost;
  total += drawers * accessories.barholder;

  return Math.round(total * 100) / 100;
};

export const calculateBasePrice = (cabinet: Cabinet): number => {
  if (!cabinet.material || !cabinet.width || !cabinet.height || !cabinet.depth) {
    return 0;
  }

  const material = cabinet.material;
  const doorType = cabinet.doorType;
  const withStandardDoors = doorType === "Normal Doors";
  const width = cabinet.width * 2.54; // Convert inches to cm
  const height = cabinet.height * 2.54;
  const depth = cabinet.depth * 2.54;

  const result = calculateSheetCount(width, height, depth, withStandardDoors, material);
  
  const materialPrices = pricing[material as keyof typeof pricing];
  if (!materialPrices) return 0;

  const basePrice = result.sheets * materialPrices.pricePerSheet;
  return Math.round(basePrice * 100) / 100;
};

export const getSheetCount = (cabinet: Cabinet): number => {
  if (!cabinet.material || !cabinet.width || !cabinet.height || !cabinet.depth) {
    return 0;
  }

  const material = cabinet.material;
  const doorType = cabinet.doorType;
  const withStandardDoors = doorType === "Normal Doors";
  const width = cabinet.width * 2.54; // Convert inches to cm
  const height = cabinet.height * 2.54;
  const depth = cabinet.depth * 2.54;

  const result = calculateSheetCount(width, height, depth, withStandardDoors, material);
  return result.sheets;
};
