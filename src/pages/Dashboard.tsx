import React, { useState } from 'react';
import { 
  Shield, 
  AlertTriangle, 
  TrendingUp, 
  Calculator, 
  DollarSign, 
  Users, 
  Package, 
  Truck, 
  Clock 
} from 'lucide-react';
import FeatureCard from '../components/FeatureCard';
import Modal from '../components/Modal';
import PriceChart from '../components/PriceChart';
import { useFirestoreCollection } from '../hooks/useFirestore';
import { geminiService } from '../services/geminiApi';
import toast from 'react-hot-toast';

const Dashboard: React.FC = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<string>('');
  const [quantityForm, setQuantityForm] = useState({
    product: '',
    day1Sales: '',
    day2Sales: '',
    day3Sales: ''
  });

  // Firestore hooks
  const { data: vendors } = useFirestoreCollection('vendors');
  const { data: mandiPrices, addDocument: addMandiPrice } = useFirestoreCollection('mandiPrices');
  const { data: surplusPosts, addDocument: addSurplusPost } = useFirestoreCollection('surplusPosts');
  const { data: emergencyRequests, addDocument: addEmergencyRequest } = useFirestoreCollection('emergencyRequests');
  const { data: supplierQuotes } = useFirestoreCollection('supplierQuotes');
  const { data: logisticsGroups } = useFirestoreCollection('logisticsGroups');
  const { data: deliverySlots } = useFirestoreCollection('deliverySlots');

  // Current vendor (mock - in real app would come from auth)
  const currentVendor = vendors.length > 0 ? vendors.find(v => v.id === 'current-user') || vendors[0] : { 
    isVerified: false, 
    name: 'Demo Vendor',
    id: 'demo'
  };

  // Mock price data for chart
  const mockPriceData = [
    { date: '2025-01-20', price: 45 },
    { date: '2025-01-21', price: 48 },
    { date: '2025-01-22', price: 52 },
    { date: '2025-01-23', price: 49 },
    { date: '2025-01-24', price: 55 },
    { date: '2025-01-25', price: 58, predicted: true },
    { date: '2025-01-26', price: 62, predicted: true },
  ];

  const handlePricePredict = async () => {
    setAiLoading(true);
    try {
      const response = await geminiService.predictPrice('Tomatoes', mockPriceData);
      setAiResponse(response);
    } catch (error) {
      toast.error('Failed to get price prediction');
    } finally {
      setAiLoading(false);
    }
  };

  const handleQuantityOptimize = async (e: React.FormEvent) => {
    e.preventDefault();
    setAiLoading(true);
    try {
      const salesData = {
        day1: parseInt(quantityForm.day1Sales),
        day2: parseInt(quantityForm.day2Sales),
        day3: parseInt(quantityForm.day3Sales)
      };
      const response = await geminiService.optimizeQuantity(quantityForm.product, salesData);
      setAiResponse(response);
    } catch (error) {
      toast.error('Failed to get quantity recommendation');
    } finally {
      setAiLoading(false);
    }
  };

  const handleAddPrice = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    await addMandiPrice({
      product: formData.get('product'),
      price: parseFloat(formData.get('price') as string),
      location: formData.get('location'),
      contributor: currentVendor.name,
      photo: 'https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&w=400'
    });
    setActiveModal(null);
    toast.success('Price added successfully!');
  };

  const handleAddSurplus = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    await addSurplusPost({
      product: formData.get('product'),
      quantity: formData.get('quantity'),
      price: parseFloat(formData.get('price') as string),
      vendor: currentVendor.name,
      contact: formData.get('contact'),
      location: formData.get('location')
    });
    setActiveModal(null);
    toast.success('Surplus posted successfully!');
  };

  const handleEmergencyRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    await addEmergencyRequest({
      product: formData.get('product'),
      quantity: formData.get('quantity'),
      urgency: formData.get('urgency'),
      description: formData.get('description'),
      requester: currentVendor.name,
      contact: formData.get('contact')
    });
    setActiveModal(null);
    toast.success('Emergency request posted!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">FEAST Dashboard</h1>
          <p className="text-gray-600 mt-2">Your complete vendor management platform</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Vendor Tools Section */}
          <div className="lg:col-span-3 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b-2 border-emerald-500 pb-2">
              Vendor Tools
            </h2>
          </div>

          {/* VPT Verification Badge */}
          <FeatureCard
            title="VPT Verification"
            description="Your vendor verification status"
            icon={Shield}
            verified={true}
          >
            <div className="flex items-center space-x-3">
              {currentVendor.isVerified ? (
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-green-700 font-medium">Verified Vendor</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-yellow-700 font-medium">Pending Verification</span>
                </div>
              )}
            </div>
          </FeatureCard>

          {/* Emergency Board */}
          <FeatureCard
            title="Emergency Board"
            description="Urgent supply requests"
            icon={AlertTriangle}
            verified={true}
          >
            <div className="space-y-3">
              {emergencyRequests.slice(0, 2).map((request, index) => (
                <div key={index} className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-red-800">{request.product}</p>
                      <p className="text-sm text-red-600">Qty: {request.quantity}</p>
                    </div>
                    <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                      {request.urgency}
                    </span>
                  </div>
                </div>
              ))}
              <button
                onClick={() => setActiveModal('emergency')}
                className="w-full text-sm bg-red-100 text-red-700 py-2 rounded-lg hover:bg-red-200 transition-colors"
              >
                Post Emergency Request
              </button>
            </div>
          </FeatureCard>

          {/* AI Insights Section */}
          <div className="lg:col-span-3 mb-6 mt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b-2 border-emerald-500 pb-2">
              AI Insights
            </h2>
          </div>

          {/* AI Price Whisperer */}
          <FeatureCard
            title="AI Price Whisperer"
            description="AI-powered price predictions"
            icon={TrendingUp}
            verified={true}
            className="lg:col-span-2"
          >
            <div className="space-y-4">
              <PriceChart data={mockPriceData} />
              <div className="flex space-x-3">
                <button
                  onClick={handlePricePredict}
                  disabled={aiLoading}
                  className="flex-1 bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50"
                >
                  {aiLoading ? 'Analyzing...' : 'Get AI Prediction'}
                </button>
              </div>
              {aiResponse && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">{aiResponse}</p>
                </div>
              )}
            </div>
          </FeatureCard>

          {/* AI Quantity Optimizer */}
          <FeatureCard
            title="AI Quantity Optimizer"
            description="Optimize purchase quantities"
            icon={Calculator}
            verified={true}
          >
            <form onSubmit={handleQuantityOptimize} className="space-y-3">
              <input
                type="text"
                placeholder="Product name"
                value={quantityForm.product}
                onChange={(e) => setQuantityForm({...quantityForm, product: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                required
              />
              <div className="grid grid-cols-3 gap-2">
                <input
                  type="number"
                  placeholder="Day 1"
                  value={quantityForm.day1Sales}
                  onChange={(e) => setQuantityForm({...quantityForm, day1Sales: e.target.value})}
                  className="px-2 py-1 border border-gray-300 rounded text-sm"
                  required
                />
                <input
                  type="number"
                  placeholder="Day 2"
                  value={quantityForm.day2Sales}
                  onChange={(e) => setQuantityForm({...quantityForm, day2Sales: e.target.value})}
                  className="px-2 py-1 border border-gray-300 rounded text-sm"
                  required
                />
                <input
                  type="number"
                  placeholder="Day 3"
                  value={quantityForm.day3Sales}
                  onChange={(e) => setQuantityForm({...quantityForm, day3Sales: e.target.value})}
                  className="px-2 py-1 border border-gray-300 rounded text-sm"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={aiLoading}
                className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50"
              >
                {aiLoading ? 'Optimizing...' : 'Get AI Recommendation'}
              </button>
            </form>
            {aiResponse && (
              <div className="mt-3 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <p className="text-sm text-orange-800">{aiResponse}</p>
              </div>
            )}
          </FeatureCard>

          {/* Market Tools Section */}
          <div className="lg:col-span-3 mb-6 mt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b-2 border-emerald-500 pb-2">
              Market Tools
            </h2>
          </div>

          {/* Crowd-Verified Mandi Prices */}
          <FeatureCard
            title="Mandi Prices"
            description="Crowd-verified market prices"
            icon={DollarSign}
            verified={true}
            className="lg:col-span-2"
          >
            <div className="space-y-3">
              <div className="max-h-40 overflow-y-auto">
                {mandiPrices.slice(0, 3).map((price, index) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <div>
                      <p className="font-medium">{price.product}</p>
                      <p className="text-xs text-gray-500">{price.location}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-emerald-600">₹{price.price}/kg</p>
                      <p className="text-xs text-gray-500">by {price.contributor}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setActiveModal('addPrice')}
                className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Add New Price
              </button>
            </div>
          </FeatureCard>

          {/* Multi-Supplier Price Comparison */}
          <FeatureCard
            title="Supplier Quotes"
            description="Compare prices across suppliers"
            icon={Users}
            verified={true}
          >
            <div className="space-y-2">
              {supplierQuotes.slice(0, 3).map((quote, index) => (
                <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-sm">{quote.supplier}</span>
                  <span className={`text-sm font-medium ${quote.isLowest ? 'text-green-600' : 'text-gray-600'}`}>
                    ₹{quote.price}
                    {quote.isLowest && <span className="ml-1 text-xs">★</span>}
                  </span>
                </div>
              ))}
            </div>
          </FeatureCard>

          {/* Logistics Section */}
          <div className="lg:col-span-3 mb-6 mt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b-2 border-emerald-500 pb-2">
              Logistics
            </h2>
          </div>

          {/* Surplus Exchange */}
          <FeatureCard
            title="Surplus Exchange"
            description="Buy/sell surplus inventory"
            icon={Package}
            verified={currentVendor.isVerified}
          >
            <div className="space-y-3">
              {surplusPosts.slice(0, 2).map((post, index) => (
                <div key={index} className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-green-800">{post.product}</p>
                      <p className="text-sm text-green-600">{post.quantity} available</p>
                    </div>
                    <p className="text-sm font-bold text-green-700">₹{post.price}</p>
                  </div>
                </div>
              ))}
              <button
                onClick={() => setActiveModal('surplus')}
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Post Surplus
              </button>
            </div>
          </FeatureCard>

          {/* Smart Split Logistics */}
          <FeatureCard
            title="Split Logistics"
            description="Share delivery costs"
            icon={Truck}
            verified={currentVendor.isVerified}
          >
            <div className="space-y-2">
              {logisticsGroups.slice(0, 2).map((group, index) => (
                <div key={index} className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="font-medium text-blue-800">{group.route}</p>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-sm text-blue-600">{group.participants} vendors</span>
                    <span className="text-sm font-bold text-blue-700">₹{group.costPerVendor}</span>
                  </div>
                </div>
              ))}
            </div>
          </FeatureCard>

          {/* Delivery Slot Pooling */}
          <FeatureCard
            title="Delivery Slots"
            description="Join delivery pools"
            icon={Clock}
            verified={currentVendor.isVerified}
          >
            <div className="space-y-2">
              {deliverySlots.slice(0, 3).map((slot, index) => (
                <div key={index} className="flex justify-between items-center p-2 bg-purple-50 rounded">
                  <div>
                    <p className="text-sm font-medium">{slot.time}</p>
                    <p className="text-xs text-gray-500">{slot.joinedVendors}/{slot.maxVendors} joined</p>
                  </div>
                  <button className="text-xs bg-purple-600 text-white px-2 py-1 rounded hover:bg-purple-700">
                    Join
                  </button>
                </div>
              ))}
            </div>
          </FeatureCard>
        </div>
      </div>

      {/* Modals */}
      <Modal
        isOpen={activeModal === 'addPrice'}
        onClose={() => setActiveModal(null)}
        title="Add Mandi Price"
      >
        <form onSubmit={handleAddPrice} className="space-y-4">
          <input
            name="product"
            type="text"
            placeholder="Product name"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
            required
          />
          <input
            name="price"
            type="number"
            step="0.01"
            placeholder="Price per kg"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
            required
          />
          <input
            name="location"
            type="text"
            placeholder="Market location"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Add Price
          </button>
        </form>
      </Modal>

      <Modal
        isOpen={activeModal === 'surplus'}
        onClose={() => setActiveModal(null)}
        title="Post Surplus"
      >
        <form onSubmit={handleAddSurplus} className="space-y-4">
          <input
            name="product"
            type="text"
            placeholder="Product name"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
            required
          />
          <input
            name="quantity"
            type="text"
            placeholder="Available quantity"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
            required
          />
          <input
            name="price"
            type="number"
            step="0.01"
            placeholder="Price per unit"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
            required
          />
          <input
            name="contact"
            type="tel"
            placeholder="Contact number"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
            required
          />
          <input
            name="location"
            type="text"
            placeholder="Location"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Post Surplus
          </button>
        </form>
      </Modal>

      <Modal
        isOpen={activeModal === 'emergency'}
        onClose={() => setActiveModal(null)}
        title="Emergency Request"
      >
        <form onSubmit={handleEmergencyRequest} className="space-y-4">
          <input
            name="product"
            type="text"
            placeholder="Product needed"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
            required
          />
          <input
            name="quantity"
            type="text"
            placeholder="Required quantity"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
            required
          />
          <select
            name="urgency"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
            required
          >
            <option value="">Select urgency</option>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
          </select>
          <textarea
            name="description"
            placeholder="Additional details"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
          />
          <input
            name="contact"
            type="tel"
            placeholder="Contact number"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Post Emergency Request
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default Dashboard;