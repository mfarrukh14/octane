import React, { useState } from 'react';
import {
  FaHome, FaShoppingCart, FaBox, FaUsers, FaFileAlt, FaTag, FaChartBar, FaBullhorn,
  FaPercentage, FaStore, FaMapMarkerAlt, FaSearch, FaPlus
} from 'react-icons/fa';

const sidebarItems = [
  { id: 'home', label: 'Home', icon: FaHome },
  { id: 'orders', label: 'Orders', icon: FaShoppingCart },
  { id: 'products', label: 'Products', icon: FaBox },
  { id: 'customers', label: 'Customers', icon: FaUsers },
  { id: 'content', label: 'Content', icon: FaFileAlt },
  { id: 'metaobjects', label: 'Metaobjects', icon: FaTag },
  { id: 'finances', label: 'Finances', icon: FaChartBar },
  { id: 'analytics', label: 'Analytics', icon: FaChartBar },
  { id: 'marketing', label: 'Marketing', icon: FaBullhorn },
  { id: 'discounts', label: 'Discounts', icon: FaPercentage },
  { id: 'markets', label: 'Markets', icon: FaMapMarkerAlt },
];

const metaobjectTabs = [
  { id: 'active', label: 'Active', count: '652 entries' },
  { id: 'draft', label: 'Draft', count: '52 entries' },
  { id: 'storefront', label: 'Available on storefront', count: '726 entries' },
  { id: 'webpages', label: 'Web pages', count: '21 entries' },
];

const metaobjectDefinitions = [
  { name: 'Color / Pattern', type: 'color' },
  { name: 'Age group', type: 'age' },
];

export default function LaptopMockup() {
  const [activeSection, setActiveSection] = useState('metaobjects');
  const [activeTab, setActiveTab] = useState('active');

  const renderContent = () => {
    if (activeSection === 'home') {
      return (
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Dashboard Overview</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded border">
              <h3 className="font-medium text-sm">Total Sales</h3>
              <p className="text-lg font-bold text-green-600">$12,345</p>
            </div>
            <div className="bg-white p-3 rounded border">
              <h3 className="font-medium text-sm">Orders</h3>
              <p className="text-lg font-bold">234</p>
            </div>
          </div>
        </div>
      );
    }

    if (activeSection === 'orders') {
      return (
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Orders</h2>
          <div className="bg-white rounded border">
            <div className="p-3 border-b">
              <div className="flex justify-between items-center text-sm">
                <span>#1001</span>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded">Fulfilled</span>
              </div>
            </div>
            <div className="p-3 border-b">
              <div className="flex justify-between items-center text-sm">
                <span>#1002</span>
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Pending</span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (activeSection === 'products') {
      return (
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Products</h2>
          <div className="space-y-2">
            <div className="bg-white p-3 rounded border flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-200 rounded"></div>
              <div>
                <p className="font-medium text-sm">T-Shirt Blue</p>
                <p className="text-xs text-gray-500">$29.99</p>
              </div>
            </div>
            <div className="bg-white p-3 rounded border flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-200 rounded"></div>
              <div>
                <p className="font-medium text-sm">Jeans Dark</p>
                <p className="text-xs text-gray-500">$79.99</p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (activeSection === 'customers') {
      return (
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Customers</h2>
          <div className="space-y-2">
            <div className="bg-white p-3 rounded border">
              <p className="font-medium text-sm">John Doe</p>
              <p className="text-xs text-gray-500">john@example.com</p>
            </div>
            <div className="bg-white p-3 rounded border">
              <p className="font-medium text-sm">Jane Smith</p>
              <p className="text-xs text-gray-500">jane@example.com</p>
            </div>
          </div>
        </div>
      );
    }

    if (activeSection === 'analytics') {
      return (
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Analytics</h2>
          <div className="bg-white p-4 rounded border">
            <div className="h-20 bg-gradient-to-r from-blue-100 to-blue-200 rounded mb-3 flex items-end justify-around pb-2">
              <div className="w-2 h-8 bg-blue-500 rounded"></div>
              <div className="w-2 h-12 bg-blue-500 rounded"></div>
              <div className="w-2 h-6 bg-blue-500 rounded"></div>
              <div className="w-2 h-16 bg-blue-500 rounded"></div>
            </div>
            <p className="text-xs text-gray-600">Sales over time</p>
          </div>
        </div>
      );
    }

    return (
      <div className="flex-1 flex flex-col">
        <div className="px-4 py-3 border-b bg-white">
          <h1 className="text-lg font-semibold mb-2">Metaobjects</h1>
          <div className="flex space-x-4">
            {metaobjectTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-2 border-b-2 ${
                  activeTab === tab.id ? 'border-black' : 'border-transparent hover:border-gray-300'
                }`}
              >
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium">{tab.label}</span>
                  <span className="text-xs text-gray-500">{tab.count}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
        <div className="flex-1 bg-gray-50 p-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4 border">
              <div className="flex -space-x-1 mb-3">
                <div className="w-6 h-6 rounded-full bg-green-500 border-2 border-white"></div>
                <div className="w-6 h-6 rounded-full bg-blue-500 border-2 border-white"></div>
              </div>
              <p className="text-xs text-gray-600">652 entries</p>
            </div>
            <div className="bg-white rounded-lg p-4 border">
              <div className="flex -space-x-1 mb-3">
                <div className="w-6 h-6 rounded-full bg-red-500 border-2 border-white"></div>
                <div className="w-6 h-6 rounded-full bg-yellow-500 border-2 border-white"></div>
              </div>
              <p className="text-xs text-gray-600">52 entries</p>
            </div>
          </div>
          <div className="mt-6 bg-white rounded-lg border p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex space-x-2 text-sm">
                <span>All</span>
                <span>Added by Octane</span>
                <span className="bg-gray-100 px-2 py-1 rounded">Web pages</span>
              </div>
              <FaPlus className="w-3 h-3 text-gray-400" />
            </div>
            <div className="text-xs text-gray-500 mb-2">Definition name</div>
            {metaobjectDefinitions.map((def, idx) => (
              <div key={idx} className="flex items-center py-2 border-b last:border-b-0">
                <FaTag className="w-3 h-3 text-gray-400 mr-3" />
                <span className="text-sm">{def.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="relative w-[1000px] h-[700px] bg-black rounded-[30px] shadow-xl overflow-hidden border-[8px] border-black">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-5 bg-black rounded-b-xl z-20"></div>

        {/* Screen */}
        <div className="absolute inset-0 bg-white rounded-[18px] overflow-hidden flex flex-col">
          {/* Top Header */}
          <div className="bg-black text-white flex items-center justify-start space-x-26 px-4 py-2">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-green-600 rounded flex items-center justify-center">
                <FaStore className="w-3 h-3 text-white" />
              </div>
              <span className="font-bold text-sm">Octane</span>
            </div>
            <div className="relative">
              <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3" />
              <input
                type="text"
                placeholder="Search"
                className="pl-7 pr-3 py-1 text-xs border border-gray-500 rounded-lg bg-white/10 text-gray-300"
              />
            </div>
          </div>

          {/* Main Layout */}
          <div className="flex flex-1 overflow-hidden rounded-lg">
            {/* Sidebar */}
            <div className="w-48 bg-gray-50 border-r border-gray-200 flex flex-col">
              <nav className="p-2 space-y-1 flex-1 overflow-y-auto">
                {sidebarItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      className={`w-full cursor-pointer flex items-center space-x-2 px-2 py-1.5 text-xs rounded hover:bg-gray-100 ${
                        activeSection === item.id ? 'bg-gray-200 font-medium' : ''
                      }`}
                    >
                      <Icon className="w-3 h-3" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">{renderContent()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
