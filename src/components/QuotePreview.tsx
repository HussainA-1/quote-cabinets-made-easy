
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Download, Send } from 'lucide-react';
import { QuoteData } from '../pages/Index';

interface QuotePreviewProps {
  quoteData: QuoteData;
  onBack: () => void;
}

const QuotePreview: React.FC<QuotePreviewProps> = ({ quoteData, onBack }) => {
  const handlePrint = () => {
    window.print();
  };

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
        
        <div className="flex gap-2">
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
              <p className="text-blue-100 print:text-gray-600">Professional Cabinet Solutions</p>
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
            <h3 className="font-semibold text-lg mb-4 text-slate-900">Cabinet Specifications</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-slate-300">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="border border-slate-300 p-3 text-left font-medium">Item</th>
                    <th className="border border-slate-300 p-3 text-left font-medium">Specifications</th>
                    <th className="border border-slate-300 p-3 text-center font-medium">Qty</th>
                    <th className="border border-slate-300 p-3 text-right font-medium">Unit Price</th>
                    <th className="border border-slate-300 p-3 text-right font-medium">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {quoteData.cabinets.map((cabinet, index) => (
                    <tr key={cabinet.id} className="hover:bg-slate-25">
                      <td className="border border-slate-300 p-3">
                        <div className="font-medium">{cabinet.type}</div>
                        <div className="text-sm text-slate-600">{cabinet.material}</div>
                      </td>
                      <td className="border border-slate-300 p-3">
                        <div className="text-sm space-y-1">
                          <p><strong>Dimensions:</strong> {cabinet.width}"W × {cabinet.height}"H × {cabinet.depth}"D</p>
                          <p><strong>Finish:</strong> {cabinet.finish}</p>
                          {cabinet.hardware && <p><strong>Hardware:</strong> {cabinet.hardware}</p>}
                        </div>
                      </td>
                      <td className="border border-slate-300 p-3 text-center">{cabinet.quantity}</td>
                      <td className="border border-slate-300 p-3 text-right">${cabinet.unitPrice.toFixed(2)}</td>
                      <td className="border border-slate-300 p-3 text-right font-medium">${cabinet.totalPrice.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="border-t pt-6">
            <div className="flex justify-end">
              <div className="w-full max-w-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-600">Subtotal:</span>
                  <span className="font-medium">${quoteData.totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Tax (estimated):</span>
                  <span className="font-medium">${(quoteData.totalPrice * 0.08).toFixed(2)}</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Total:</span>
                    <span className="text-2xl font-bold text-blue-600">${(quoteData.totalPrice * 1.08).toFixed(2)}</span>
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
