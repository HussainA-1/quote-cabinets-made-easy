import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Download, Send, Eye } from 'lucide-react';
import { QuoteData } from '../pages/Index';

interface QuotePreviewProps {
  quoteData: QuoteData;
  onBack: () => void;
}

const QuotePreview: React.FC<QuotePreviewProps> = ({ quoteData, onBack }) => {
  const [viewMode, setViewMode] = useState<'sales' | 'factory'>('sales');

  const handlePrint = () => {
    window.print();
  };

  // Convert inches to centimeters
  const inchesToCm = (inches: number) => Math.round(inches * 2.54);
  
  // Convert inches to meters (for display)
  const inchesToM = (inches: number) => (inches * 0.0254).toFixed(2);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <Button
          onClick={onBack}
          variant="outline"
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Form
        </Button>
        
        <div className="flex gap-2 items-center">
          <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
            <Button
              onClick={() => setViewMode('sales')}
              variant={viewMode === 'sales' ? 'default' : 'ghost'}
              size="sm"
              className="flex items-center gap-2"
            >
              <Eye className="h-4 w-4" />
              Sales View
            </Button>
            <Button
              onClick={() => setViewMode('factory')}
              variant={viewMode === 'factory' ? 'default' : 'ghost'}
              size="sm"
              className="flex items-center gap-2"
            >
              <Eye className="h-4 w-4" />
              Factory View
            </Button>
          </div>
          
          <Button
            onClick={handlePrint}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Print/Save PDF
          </Button>
          <Button className="flex items-center gap-2 bg-green-600 hover:bg-green-700">
            <Send className="h-4 w-4" />
            Send to Customer
          </Button>
        </div>
      </div>

      <Card className="shadow-2xl border-0 bg-white print:shadow-none">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white print:bg-white print:text-black">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl mb-2">Cabinet Pro</CardTitle>
              <p className="text-blue-100 print:text-gray-600">
                {viewMode === 'sales' ? 'Sales Quotation' : 'Factory Production Sheet'}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm">Quote Number</p>
              <p className="font-bold text-lg">{quoteData.quoteNumber}</p>
              <p className="text-sm mt-2">{quoteData.date}</p>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-lg mb-3 text-slate-900">Bill To:</h3>
              <div className="space-y-1 text-slate-700">
                <p className="font-medium">{quoteData.customerName}</p>
                <p>{quoteData.customerEmail}</p>
                {quoteData.customerPhone && <p>{quoteData.customerPhone}</p>}
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-3 text-slate-900">Project Details:</h3>
              <div className="space-y-1 text-slate-700">
                <p><span className="font-medium">Project:</span> {quoteData.projectName}</p>
                <p><span className="font-medium">Total Cabinets:</span> {quoteData.cabinets.length}</p>
                <p><span className="font-medium">Valid Until:</span> {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="font-semibold text-lg mb-4 text-slate-900">
              {viewMode === 'sales' ? 'Cabinet Specifications' : 'Production Specifications'}
            </h3>
            <div className="overflow-x-auto">
              {viewMode === 'sales' ? (
                // Sales View - Simple table with dimensions, hardware, and final price
                <table className="w-full border-collapse border border-slate-300">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="border border-slate-300 p-3 text-left font-medium">Item</th>
                      <th className="border border-slate-300 p-3 text-left font-medium">Dimensions</th>
                      <th className="border border-slate-300 p-3 text-left font-medium">Hardware</th>
                      <th className="border border-slate-300 p-3 text-center font-medium">Qty</th>
                      <th className="border border-slate-300 p-3 text-right font-medium">Total Price (SAR)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {quoteData.cabinets.map((cabinet) => (
                      <tr key={cabinet.id} className="hover:bg-slate-25">
                        <td className="border border-slate-300 p-3">
                          <div className="font-medium">{cabinet.type}</div>
                          <div className="text-sm text-slate-600">{cabinet.material}</div>
                          <div className="text-sm text-slate-600">{cabinet.finish}</div>
                        </td>
                        <td className="border border-slate-300 p-3">
                          <div className="text-sm">
                            {inchesToCm(cabinet.width)}cm W × {inchesToCm(cabinet.height)}cm H × {inchesToCm(cabinet.depth)}cm D
                          </div>
                        </td>
                        <td className="border border-slate-300 p-3">
                          <div className="text-sm">{cabinet.hardware || 'Standard'}</div>
                        </td>
                        <td className="border border-slate-300 p-3 text-center">{cabinet.quantity}</td>
                        <td className="border border-slate-300 p-3 text-right font-medium">
                          {cabinet.totalPrice.toFixed(2)} SAR
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                // Factory View - Detailed table with base price and metric units
                <table className="w-full border-collapse border border-slate-300">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="border border-slate-300 p-3 text-left font-medium">Item</th>
                      <th className="border border-slate-300 p-3 text-left font-medium">Dimensions (m)</th>
                      <th className="border border-slate-300 p-3 text-left font-medium">Material & Finish</th>
                      <th className="border border-slate-300 p-3 text-center font-medium">Qty</th>
                      <th className="border border-slate-300 p-3 text-right font-medium">Base Price (SAR)</th>
                      <th className="border border-slate-300 p-3 text-right font-medium">Total (SAR)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {quoteData.cabinets.map((cabinet) => (
                      <tr key={cabinet.id} className="hover:bg-slate-25">
                        <td className="border border-slate-300 p-3">
                          <div className="font-medium">{cabinet.type}</div>
                          <div className="text-sm text-slate-600">ID: {cabinet.id}</div>
                        </td>
                        <td className="border border-slate-300 p-3">
                          <div className="text-sm space-y-1">
                            <p><strong>W:</strong> {inchesToM(cabinet.width)}m ({inchesToCm(cabinet.width)}cm)</p>
                            <p><strong>H:</strong> {inchesToM(cabinet.height)}m ({inchesToCm(cabinet.height)}cm)</p>
                            <p><strong>D:</strong> {inchesToM(cabinet.depth)}m ({inchesToCm(cabinet.depth)}cm)</p>
                          </div>
                        </td>
                        <td className="border border-slate-300 p-3">
                          <div className="text-sm space-y-1">
                            <p><strong>Material:</strong> {cabinet.material}</p>
                            <p><strong>Finish:</strong> {cabinet.finish}</p>
                            <p><strong>Hardware:</strong> {cabinet.hardware || 'Standard'}</p>
                          </div>
                        </td>
                        <td className="border border-slate-300 p-3 text-center">{cabinet.quantity}</td>
                        <td className="border border-slate-300 p-3 text-right">{cabinet.unitPrice.toFixed(2)} SAR</td>
                        <td className="border border-slate-300 p-3 text-right font-medium">
                          {cabinet.totalPrice.toFixed(2)} SAR
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          <div className="border-t pt-6">
            <div className="flex justify-end">
              <div className="w-full max-w-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-600">Subtotal:</span>
                  <span className="font-medium">{quoteData.totalPrice.toFixed(2)} SAR</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">VAT (15%):</span>
                  <span className="font-medium">{(quoteData.totalPrice * 0.15).toFixed(2)} SAR</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Total:</span>
                    <span className="text-2xl font-bold text-blue-600">
                      {(quoteData.totalPrice * 1.15).toFixed(2)} SAR
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t pt-6 bg-slate-50 -mx-8 px-8 py-6 mt-8">
            <h3 className="font-semibold text-lg mb-3 text-slate-900">Terms & Conditions</h3>
            <div className="text-sm text-slate-700 space-y-2">
              <p>• Quote valid for 30 days from date of issue</p>
              <p>• 50% deposit required to begin production</p>
              <p>• Installation available for additional fee</p>
              <p>• All cabinets come with 5-year manufacturer warranty</p>
              <p>• Custom sizing may affect pricing and delivery time</p>
              {viewMode === 'factory' && (
                <>
                  <p>• All measurements in metric system for production</p>
                  <p>• Base prices exclude assembly and finishing labor</p>
                </>
              )}
            </div>
            
            <div className="mt-6 pt-4 border-t border-slate-300">
              <p className="text-sm text-slate-600">
                Thank you for choosing Cabinet Pro! For questions about this quote, please contact us at 
                <span className="font-medium"> info@cabinetpro.com</span> or <span className="font-medium">(555) 123-4567</span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuotePreview;
