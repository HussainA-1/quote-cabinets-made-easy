
import React from 'react';
import { QuoteData } from '../pages/Index';
import { getSheetCount } from '../utils/PriceCalculator';

interface FactoryExportProps {
  quoteData: QuoteData;
}

const FactoryExport: React.FC<FactoryExportProps> = ({ quoteData }) => {
  // Convert inches to centimeters
  const inchesToCm = (inches: number) => Math.round(inches * 2.54);
  
  // Convert inches to meters (for display)
  const inchesToM = (inches: number) => (inches * 0.0254).toFixed(2);

  return (
    <div className="bg-white p-8 max-w-full">
      <div className="mb-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Alasfour Furniture</h1>
            <h2 className="text-xl text-slate-700">Factory Production Order</h2>
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold">Order #{quoteData.quoteNumber}</p>
            <p className="text-slate-600">{quoteData.date}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <h3 className="font-semibold text-lg mb-3 text-slate-900">Customer Information:</h3>
            <div className="space-y-1 text-slate-700">
              <p><strong>Name:</strong> {quoteData.customerName}</p>
              <p><strong>Project:</strong> {quoteData.projectName}</p>
              <p><strong>Contact:</strong> {quoteData.customerEmail}</p>
              {quoteData.customerPhone && <p><strong>Phone:</strong> {quoteData.customerPhone}</p>}
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-3 text-slate-900">Production Summary:</h3>
            <div className="space-y-1 text-slate-700">
              <p><strong>Total Cabinets:</strong> {quoteData.cabinets.length}</p>
              <p><strong>Total Sheets Required:</strong> {quoteData.cabinets.reduce((sum, cabinet) => sum + getSheetCount(cabinet) * cabinet.quantity, 0)}</p>
              <p><strong>Production Date:</strong> {new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="font-semibold text-xl mb-4 text-slate-900">Production Specifications</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-slate-400">
            <thead>
              <tr className="bg-slate-100">
                <th className="border border-slate-400 p-3 text-left font-semibold">Item ID</th>
                <th className="border border-slate-400 p-3 text-left font-semibold">Cabinet Type</th>
                <th className="border border-slate-400 p-3 text-left font-semibold">Material</th>
                <th className="border border-slate-400 p-3 text-left font-semibold">Dimensions (cm)</th>
                <th className="border border-slate-400 p-3 text-left font-semibold">Dimensions (m)</th>
                <th className="border border-slate-400 p-3 text-left font-semibold">Door Type</th>
                <th className="border border-slate-400 p-3 text-center font-semibold">Sheets</th>
                <th className="border border-slate-400 p-3 text-center font-semibold">Qty</th>
                <th className="border border-slate-400 p-3 text-left font-semibold">Components</th>
              </tr>
            </thead>
            <tbody>
              {quoteData.cabinets.map((cabinet) => (
                <tr key={cabinet.id} className="hover:bg-slate-25">
                  <td className="border border-slate-400 p-3 font-mono text-sm">{cabinet.id}</td>
                  <td className="border border-slate-400 p-3">
                    <div className="font-medium">{cabinet.type}</div>
                  </td>
                  <td className="border border-slate-400 p-3">{cabinet.material}</td>
                  <td className="border border-slate-400 p-3">
                    <div className="text-sm space-y-1">
                      <p><strong>W:</strong> {inchesToCm(cabinet.width)}cm</p>
                      <p><strong>H:</strong> {inchesToCm(cabinet.height)}cm</p>
                      <p><strong>D:</strong> {inchesToCm(cabinet.depth)}cm</p>
                    </div>
                  </td>
                  <td className="border border-slate-400 p-3">
                    <div className="text-sm space-y-1">
                      <p><strong>W:</strong> {inchesToM(cabinet.width)}m</p>
                      <p><strong>H:</strong> {inchesToM(cabinet.height)}m</p>
                      <p><strong>D:</strong> {inchesToM(cabinet.depth)}m</p>
                    </div>
                  </td>
                  <td className="border border-slate-400 p-3">{cabinet.doorType || 'Standard'}</td>
                  <td className="border border-slate-400 p-3 text-center font-bold">{getSheetCount(cabinet)}</td>
                  <td className="border border-slate-400 p-3 text-center font-bold">{cabinet.quantity}</td>
                  <td className="border border-slate-400 p-3">
                    <div className="text-sm space-y-1">
                      {(cabinet.shelves || 0) > 0 && <p>• Shelves: {cabinet.shelves}</p>}
                      {(cabinet.drawers || 0) > 0 && <p>• Drawers: {cabinet.drawers}</p>}
                      {(cabinet.drslider || 0) > 0 && <p>• DrSlider: {cabinet.drslider}</p>}
                      {(cabinet.roundbar || 0) > 0 && <p>• Round Bar: {cabinet.roundbar}m</p>}
                      {(cabinet.hinges || 0) > 0 && <p>• Hinges: {cabinet.hinges}</p>}
                      {(cabinet.handle || 0) > 0 && <p>• Handles: {cabinet.handle}</p>}
                      {(cabinet.aluframe || 0) > 0 && <p>• Alu Frame: {cabinet.aluframe}</p>}
                      {(cabinet.wheelset || 0) > 0 && <p>• Wheelset: {cabinet.wheelset}</p>}
                      {(cabinet.labourHours || 0) > 0 && <p>• Labour: {cabinet.labourHours}h</p>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="border-t pt-6 mt-8">
        <h3 className="font-semibold text-lg mb-4 text-slate-900">Production Notes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-base mb-2">Material Summary:</h4>
            <div className="text-sm space-y-1">
              {Object.entries(
                quoteData.cabinets.reduce((acc, cabinet) => {
                  const material = cabinet.material;
                  const sheets = getSheetCount(cabinet) * cabinet.quantity;
                  acc[material] = (acc[material] || 0) + sheets;
                  return acc;
                }, {} as Record<string, number>)
              ).map(([material, sheets]) => (
                <p key={material}>• {material}: {sheets} sheets required</p>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-base mb-2">Special Instructions:</h4>
            <div className="text-sm space-y-1">
              <p>• All measurements provided in both centimeters and meters</p>
              <p>• Quality check required before assembly</p>
              <p>• Follow standard safety protocols</p>
              <p>• Contact production manager for any clarifications</p>
            </div>
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-slate-300">
          <p className="text-sm text-slate-600 text-center">
            This is a factory production document. For pricing information, refer to the sales quotation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FactoryExport;
