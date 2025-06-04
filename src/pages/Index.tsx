import React, { useState } from 'react';
import QuotationForm from '../components/QuotationForm';
import QuotePreview from '../components/QuotePreview';

export interface QuoteData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  projectName: string;
  cabinets: Cabinet[];
  totalPrice: number;
  quoteNumber: string;
  date: string;
}

export interface Cabinet {
  id: string;
  type: string;
  width: number;
  height: number;
  depth: number;
  material: string;
  finish: string;
  hardware: string;
  doorType: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  shelves?: number;
  drawers?: number;
  drslider?: number;
  roundbar?: number;
  hinges?: number;
  handle?: number;
  aluframe?: number;
  wheelset?: number;
  labourHours?: number;
}

const Index = () => {
  const [quoteData, setQuoteData] = useState<QuoteData | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const handleQuoteGenerated = (data: QuoteData) => {
    setQuoteData(data);
    setShowPreview(true);
  };

  const handleBackToForm = () => {
    setShowPreview(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Cabinet Pro</h1>
              <p className="text-slate-600 mt-1">Professional Cabinet Quotation System</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-500">Quote #{new Date().getFullYear()}-{String(Date.now()).slice(-6)}</p>
              <p className="text-sm text-slate-500">{new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!showPreview ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <QuotationForm onQuoteGenerated={handleQuoteGenerated} />
            </div>
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Why Choose Cabinet Pro?</h3>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    Professional-grade materials
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    Custom sizing available
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    Expert installation service
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    5-year warranty included
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <QuotePreview quoteData={quoteData!} onBack={handleBackToForm} />
        )}
      </main>
    </div>
  );
};

export default Index;
