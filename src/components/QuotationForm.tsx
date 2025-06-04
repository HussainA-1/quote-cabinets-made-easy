import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, Plus } from 'lucide-react';
import { QuoteData, Cabinet } from '../pages/Index';
import { calculateCabinetPrice } from '../utils/PriceCalculator';

interface QuotationFormProps {
  onQuoteGenerated: (data: QuoteData) => void;
}

const QuotationForm: React.FC<QuotationFormProps> = ({ onQuoteGenerated }) => {
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [projectName, setProjectName] = useState('');
  const [cabinets, setCabinets] = useState<Cabinet[]>([
    {
      id: '1',
      type: '',
      width: 0,
      height: 0,
      depth: 0,
      material: '',
      finish: '',
      hardware: '',
      doorType: '',
      quantity: 1,
      unitPrice: 0,
      totalPrice: 0,
      shelves: 0,
      drawers: 0,
      drslider: 0,
      roundbar: 0,
      hinges: 0,
      handle: 0,
      aluframe: 0,
      wheelset: 0,
      labourHours: 0
    }
  ]);

  const cabinetTypes = [
    'Base Cabinet',
    'Wall Cabinet',
    'Tall Cabinet',
    'Corner Cabinet',
    'Island Cabinet'
  ];

  const materials = [
    'MDF',
    'Melamine HD',
    'Melamine EG',
    'PVC'
  ];

  const finishes = [
    'Natural',
    'Stained - Dark Walnut',
    'Stained - Medium Oak',
    'Painted - White',
    'Painted - Gray',
    'Painted - Black'
  ];

  const hardwareOptions = [
    'Standard Hinges',
    'Soft-Close Hinges',
    'Premium Soft-Close',
    'Handle - Brushed Nickel',
    'Handle - Oil Rubbed Bronze',
    'Handle - Chrome'
  ];

  const doorTypes = [
    'No Doors',
    'Normal Doors',
    'Sliding Doors',
    'Glass Doors'
  ];

  const updateCabinet = (index: number, field: keyof Cabinet, value: any) => {
    const updatedCabinets = [...cabinets];
    updatedCabinets[index] = { ...updatedCabinets[index], [field]: value };
    
    // Recalculate prices when relevant fields change
    if (['type', 'width', 'height', 'depth', 'material', 'finish', 'hardware', 'doorType', 'quantity', 'shelves', 'drawers', 'drslider', 'roundbar', 'hinges', 'handle', 'aluframe', 'wheelset', 'labourHours'].includes(field)) {
      const cabinet = updatedCabinets[index];
      const unitPrice = calculateCabinetPrice(cabinet);
      updatedCabinets[index].unitPrice = unitPrice;
      updatedCabinets[index].totalPrice = unitPrice * cabinet.quantity;
    }
    
    setCabinets(updatedCabinets);
  };

  const addCabinet = () => {
    const newCabinet: Cabinet = {
      id: Date.now().toString(),
      type: '',
      width: 0,
      height: 0,
      depth: 0,
      material: '',
      finish: '',
      hardware: '',
      doorType: '',
      quantity: 1,
      unitPrice: 0,
      totalPrice: 0,
      shelves: 0,
      drawers: 0,
      drslider: 0,
      roundbar: 0,
      hinges: 0,
      handle: 0,
      aluframe: 0,
      wheelset: 0,
      labourHours: 0
    };
    setCabinets([...cabinets, newCabinet]);
  };

  const removeCabinet = (index: number) => {
    if (cabinets.length > 1) {
      setCabinets(cabinets.filter((_, i) => i !== index));
    }
  };

  const calculateTotalPrice = () => {
    return cabinets.reduce((total, cabinet) => total + cabinet.totalPrice, 0);
  };

  const generateQuote = () => {
    const quoteData: QuoteData = {
      customerName,
      customerEmail,
      customerPhone,
      projectName,
      cabinets,
      totalPrice: calculateTotalPrice(),
      quoteNumber: `CPQ-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`,
      date: new Date().toLocaleDateString()
    };
    onQuoteGenerated(quoteData);
  };

  const isFormValid = customerName && customerEmail && projectName && 
    cabinets.every(cabinet => cabinet.type && cabinet.width && cabinet.height && cabinet.depth && cabinet.material);

  return (
    <div className="space-y-6">
      <Card className="shadow-lg border-0 bg-white">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
          <CardTitle className="text-xl">Customer Information</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="customerName">Customer Name *</Label>
              <Input
                id="customerName"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="mt-1"
                placeholder="Enter customer name"
              />
            </div>
            <div>
              <Label htmlFor="customerEmail">Email *</Label>
              <Input
                id="customerEmail"
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                className="mt-1"
                placeholder="customer@email.com"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="customerPhone">Phone</Label>
              <Input
                id="customerPhone"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="mt-1"
                placeholder="(555) 123-4567"
              />
            </div>
            <div>
              <Label htmlFor="projectName">Project Name *</Label>
              <Input
                id="projectName"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="mt-1"
                placeholder="Kitchen Renovation"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {cabinets.map((cabinet, index) => (
        <Card key={cabinet.id} className="shadow-lg border-0 bg-white">
          <CardHeader className="bg-gradient-to-r from-slate-600 to-slate-700 text-white rounded-t-lg">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">Cabinet #{index + 1}</CardTitle>
              {cabinets.length > 1 && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeCabinet(index)}
                  className="bg-red-500 hover:bg-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <Label>Cabinet Type *</Label>
                <Select onValueChange={(value) => updateCabinet(index, 'type', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select cabinet type" />
                  </SelectTrigger>
                  <SelectContent>
                    {cabinetTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Material *</Label>
                <Select onValueChange={(value) => updateCabinet(index, 'material', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select material" />
                  </SelectTrigger>
                  <SelectContent>
                    {materials.map((material) => (
                      <SelectItem key={material} value={material}>{material}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Door Type</Label>
                <Select onValueChange={(value) => updateCabinet(index, 'doorType', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select door type" />
                  </SelectTrigger>
                  <SelectContent>
                    {doorTypes.map((doorType) => (
                      <SelectItem key={doorType} value={doorType}>{doorType}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor={`quantity-${index}`}>Quantity</Label>
                <Input
                  id={`quantity-${index}`}
                  type="number"
                  value={cabinet.quantity}
                  onChange={(e) => updateCabinet(index, 'quantity', parseInt(e.target.value) || 1)}
                  className="mt-1"
                  min="1"
                />
              </div>
            </div>

            {/* Dimensions */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor={`width-${index}`}>Width (inches) *</Label>
                <Input
                  id={`width-${index}`}
                  type="number"
                  value={cabinet.width || ''}
                  onChange={(e) => updateCabinet(index, 'width', parseFloat(e.target.value) || 0)}
                  className="mt-1"
                  placeholder="24"
                />
              </div>
              <div>
                <Label htmlFor={`height-${index}`}>Height (inches) *</Label>
                <Input
                  id={`height-${index}`}
                  type="number"
                  value={cabinet.height || ''}
                  onChange={(e) => updateCabinet(index, 'height', parseFloat(e.target.value) || 0)}
                  className="mt-1"
                  placeholder="30"
                />
              </div>
              <div>
                <Label htmlFor={`depth-${index}`}>Depth (inches) *</Label>
                <Input
                  id={`depth-${index}`}
                  type="number"
                  value={cabinet.depth || ''}
                  onChange={(e) => updateCabinet(index, 'depth', parseFloat(e.target.value) || 0)}
                  className="mt-1"
                  placeholder="12"
                />
              </div>
            </div>

            {/* Components */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor={`shelves-${index}`}>Shelves</Label>
                <Input
                  id={`shelves-${index}`}
                  type="number"
                  value={cabinet.shelves || 0}
                  onChange={(e) => updateCabinet(index, 'shelves', parseInt(e.target.value) || 0)}
                  className="mt-1"
                  min="0"
                />
              </div>
              <div>
                <Label htmlFor={`drawers-${index}`}>Drawers</Label>
                <Input
                  id={`drawers-${index}`}
                  type="number"
                  value={cabinet.drawers || 0}
                  onChange={(e) => updateCabinet(index, 'drawers', parseInt(e.target.value) || 0)}
                  className="mt-1"
                  min="0"
                />
              </div>
              <div>
                <Label htmlFor={`hinges-${index}`}>Hinges</Label>
                <Input
                  id={`hinges-${index}`}
                  type="number"
                  value={cabinet.hinges || 0}
                  onChange={(e) => updateCabinet(index, 'hinges', parseInt(e.target.value) || 0)}
                  className="mt-1"
                  min="0"
                />
              </div>
              <div>
                <Label htmlFor={`handle-${index}`}>Handles</Label>
                <Input
                  id={`handle-${index}`}
                  type="number"
                  value={cabinet.handle || 0}
                  onChange={(e) => updateCabinet(index, 'handle', parseInt(e.target.value) || 0)}
                  className="mt-1"
                  min="0"
                />
              </div>
            </div>

            {/* Accessories */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor={`drslider-${index}`}>DrSlider 40cm</Label>
                <Input
                  id={`drslider-${index}`}
                  type="number"
                  value={cabinet.drslider || 0}
                  onChange={(e) => updateCabinet(index, 'drslider', parseInt(e.target.value) || 0)}
                  className="mt-1"
                  min="0"
                />
              </div>
              <div>
                <Label htmlFor={`roundbar-${index}`}>Round Bar (m)</Label>
                <Input
                  id={`roundbar-${index}`}
                  type="number"
                  value={cabinet.roundbar || 0}
                  onChange={(e) => updateCabinet(index, 'roundbar', parseInt(e.target.value) || 0)}
                  className="mt-1"
                  min="0"
                />
              </div>
              <div>
                <Label htmlFor={`aluframe-${index}`}>Aluminium Frame</Label>
                <Input
                  id={`aluframe-${index}`}
                  type="number"
                  value={cabinet.aluframe || 0}
                  onChange={(e) => updateCabinet(index, 'aluframe', parseInt(e.target.value) || 0)}
                  className="mt-1"
                  min="0"
                />
              </div>
              <div>
                <Label htmlFor={`wheelset-${index}`}>Wheelset</Label>
                <Input
                  id={`wheelset-${index}`}
                  type="number"
                  value={cabinet.wheelset || 0}
                  onChange={(e) => updateCabinet(index, 'wheelset', parseInt(e.target.value) || 0)}
                  className="mt-1"
                  min="0"
                />
              </div>
            </div>

            <div>
              <Label htmlFor={`labour-${index}`}>Labour Hours</Label>
              <Input
                id={`labour-${index}`}
                type="number"
                value={cabinet.labourHours || 0}
                onChange={(e) => updateCabinet(index, 'labourHours', parseInt(e.target.value) || 0)}
                className="mt-1"
                min="0"
              />
            </div>

            {cabinet.unitPrice > 0 && (
              <div className="bg-slate-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Unit Price:</span>
                  <span className="font-semibold">{cabinet.unitPrice.toFixed(2)} SAR</span>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-sm text-slate-600">Total Price:</span>
                  <span className="font-bold text-lg text-blue-600">{cabinet.totalPrice.toFixed(2)} SAR</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}

      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          onClick={addCabinet}
          variant="outline"
          className="flex items-center gap-2 border-blue-200 text-blue-600 hover:bg-blue-50"
        >
          <Plus className="h-4 w-4" />
          Add Another Cabinet
        </Button>
        
        <div className="flex-1"></div>
        
        <div className="bg-white p-4 rounded-lg shadow-lg border-2 border-blue-200">
          <div className="text-right">
            <p className="text-sm text-slate-600">Total Quote Amount</p>
            <p className="text-2xl font-bold text-blue-600">${calculateTotalPrice().toFixed(2)}</p>
          </div>
        </div>
      </div>

      <Button
        onClick={generateQuote}
        disabled={!isFormValid}
        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 text-lg font-semibold"
      >
        Generate Professional Quote
      </Button>
    </div>
  );
};

export default QuotationForm;
