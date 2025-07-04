import React, { useState } from 'react';
import {
  FaChartBar,
  FaBullhorn,
  FaPercentage,
  FaExclamationTriangle,
} from 'react-icons/fa';
import {SlArrowUp} from 'react-icons/sl';

import { HouseSimpleIcon, PackageIcon, ReceiptIcon, StarIcon, TagIcon, TruckIcon } from '@phosphor-icons/react';

const sidebarItems = [
  { id: 'home', label: 'Home', icon: HouseSimpleIcon },
  { id: 'analytics', label: 'Analytics', icon: FaChartBar },
  { id: 'customers', label: 'Customer Feedback', icon: StarIcon },
  { id: 'ledgers', label: 'Ledgers', icon: ReceiptIcon },
  { id: 'orders', label: 'Order Management', icon: PackageIcon },
  { id: 'customermanagement', label: 'Customer Management', icon: PackageIcon },
    { id: 'products', label: 'Product Management', icon: TagIcon },
  { id: 'logistics', label: 'Logistics', icon: TruckIcon },
  { id: 'marketing', label: 'Marketing', icon: FaBullhorn },
  { id: 'discounts', label: 'Discounts', icon: FaPercentage },
];

const alerts = [
  {
    title: 'Variants Out Of Stock !!!',
    severity: 'Critical',
    time: '15 Jun, 2025 06:00 AM',
    message:
      '11 of your active variants are out of stock, which means customers are unable to purchase them. To ensure you don’t miss out on sales, please restock your inventory at the earliest.',
  },
  {
    title: 'Variants Out Of Stock !!!',
    severity: 'Critical',
    time: '14 Jun, 2025 06:01 AM',
    message:
      '953 of your active variants are out of stock, which means customers are unable to purchase them. To ensure you don’t miss out on sales, please restock your inventory at the earliest.',
  },
  {
    title: 'Variants Out Of Stock !!!',
    severity: 'Critical',
    time: '13 Jun, 2025 06:01 AM',
    message:
      '530 of your active variants are out of stock, which means customers are unable to purchase them. To ensure you don’t miss out on sales, please restock your inventory at the earliest.',
  },
];

export default function LaptopMockup() {
  const [activeSection, setActiveSection] = useState('home');
  const [openDropdowns, setOpenDropdowns] = useState({
    products: true,
    logistics: true
  });

  const toggleDropdown = (dropdown) => {
    setOpenDropdowns(prev => ({
      ...prev,
      [dropdown]: !prev[dropdown]
    }));
  };
  const renderHome = () => (
    <div className="p-4 space-y-4">
      {/* Out of stock banner */}
      <div className="flex items-center bg-red-100 border-l-4 border-red-600 text-red-800 p-3 rounded text-xs">
        <FaExclamationTriangle className="w-3 h-3 mr-2" />
        <span className="font-medium">
          Out of stock — Restock your out of stock variants as soon as possible to prevent revenue loss.
        </span>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white p-3 rounded-lg shadow-sm">
          <div className="text-gray-500 text-xs">Total revenue loss</div>
          <div className="mt-1 text-lg font-bold">PKR 3,565,603</div>
        </div>
        <div className="bg-white p-3 rounded-lg shadow-sm">
          <div className="text-gray-500 text-xs">Out of stock products</div>
          <div className="mt-1 text-lg font-bold">22</div>
        </div>
      </div>

      {/* Alerts list */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="px-3 py-2 border-b flex justify-between items-center">
          <div className="text-sm font-semibold">Alerts</div>
          <button className="text-xs text-blue-600 hover:underline">View all</button>
        </div>
        <div className="divide-y">
          {alerts.map((a, i) => (
            <div key={i} className="px-3 py-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-medium">{a.title}</span>
                <span className="text-red-700 bg-red-100 px-1.5 py-0.5 rounded text-[10px]">
                  {a.severity}
                </span>
              </div>
              <div className="text-gray-500 text-[10px] mt-1">{a.time}</div>
              <div className="text-gray-700 text-xs mt-1">{a.message}</div>
              <button className="mt-1 text-blue-600 text-[10px] hover:underline">
                Restock Now!
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );  const renderAnalytics = () => (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-bold text-gray-900">Analytics</h1>
        <div className="flex space-x-2">
          <select className="border border-gray-300 rounded px-2 py-1 text-xs">
            <option>Last month</option>
            <option>Last week</option>
            <option>Last year</option>
          </select>
          <select className="border border-gray-300 rounded px-2 py-1 text-xs">
            <option>All locations</option>
            <option>Online Store</option>
            <option>Physical Store</option>
          </select>
        </div>
      </div>

      {/* Performance note */}
      <div className="text-xs text-gray-600">
        These metrics were updated at 11:46 PM on June 24th, 2025.
      </div>

      {/* Metrics cards */}
      <div className="grid grid-cols-4 gap-2">
        <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-300">
          <div className="text-gray-500 text-xs mb-1">Sales (Today)</div>
          <div className="text-lg font-bold text-gray-700">PKR 443,330</div>
          <div className="text-green-600 text-xs mt-1">↗ +20.1% vs yesterday</div>
        </div>
        <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-300">
          <div className="text-gray-500 text-xs mb-1">Items sold</div>
          <div className="text-lg font-bold text-gray-700">33</div>
          <div className="text-green-600 text-xs mt-1">↗ +6.25% vs yesterday</div>
        </div>
        <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-300">
          <div className="text-gray-500 text-xs mb-1">Out of stock products</div>
          <div className="text-lg font-bold text-gray-900">22</div>
        </div>
        <div className="bg-white p-3 rounded-lg shadow-sm border">
          <div className="text-gray-500 text-xs mb-1">Avg. product rating</div>
          <div className="text-lg font-bold text-gray-900">4.2/5</div>
          <div className="flex mt-1">
            {[1,2,3,4].map(i => (
              <span key={i} className="text-yellow-400 text-xs">★</span>
            ))}
            <span className="text-gray-300 text-xs">★</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-6">
          <button className="border-b-2 border-green-500 text-green-600 py-2 px-1 text-xs font-medium">
            Sales
          </button>
          <button className="border-transparent text-gray-500 hover:text-gray-700 py-2 px-1 text-xs font-medium">
            Operational
          </button>
          <button className="border-transparent text-gray-500 hover:text-gray-700 py-2 px-1 text-xs font-medium">
            Customer insights
          </button>
        </nav>
      </div>

      {/* Sales chart section */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-300">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm font-semibold text-gray-900">Sales</h3>
          <button className="text-blue-600 text-xs hover:underline">Report</button>
        </div>
        
        <div className="grid grid-cols-2 gap-6 mb-4">
          <div>
            <div className="text-gray-500 text-xs">Net sales</div>
            <div className="text-lg font-bold text-gray-900">PKR 443,330</div>
          </div>
          <div>
            <div className="text-gray-500 text-xs">Orders</div>
            <div className="text-lg font-bold text-gray-900">33</div>
          </div>
        </div>

        {/* Simple chart representation */}
        <div className="h-24 bg-gray-50 rounded-lg flex items-end justify-center space-x-1 p-2">
          <div className="w-6 bg-blue-200 rounded-t" style={{height: '20%'}}></div>
          <div className="w-6 bg-blue-300 rounded-t" style={{height: '40%'}}></div>
          <div className="w-6 bg-blue-400 rounded-t" style={{height: '60%'}}></div>
          <div className="w-6 bg-blue-500 rounded-t" style={{height: '80%'}}></div>
          <div className="w-6 bg-blue-600 rounded-t" style={{height: '100%'}}></div>
          <div className="w-6 bg-blue-500 rounded-t" style={{height: '70%'}}></div>
          <div className="w-6 bg-blue-400 rounded-t" style={{height: '50%'}}></div>
        </div>
        
        <div className="flex justify-center mt-2 space-x-3 text-[10px] text-gray-500">
          <span>Jun 18</span>
          <span>Jun 19</span>
          <span>Jun 20</span>
          <span>Jun 21</span>
          <span>Jun 22</span>
          <span>Jun 23</span>
          <span>Jun 24</span>
        </div>
      </div>
    </div>
  );
  const renderCustomerFeedback = () => (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-lg font-bold text-gray-900">Customer Feedback</h1>
          <p className="text-xs text-gray-600">All your customer feedback insights summarized for easy access</p>
        </div>
        <div className="flex space-x-2">
          <select className="border border-gray-300 rounded px-2 py-1 text-xs">
            <option>Select Vendor</option>
            <option>All Vendors</option>
          </select>
          <select className="border border-gray-300 rounded px-2 py-1 text-xs">
            <option>Select Brand</option>
            <option>All Brands</option>
          </select>
          <button className="bg-gray-100 border border-gray-300 rounded px-2 py-1 text-xs">
            All Time Data
          </button>
        </div>
      </div>

      {/* Breakdown Chart */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-300">
        <h3 className="text-sm font-semibold text-gray-900 mb-2">Breakdown of the Issues Reported</h3>
        <p className="text-xs text-gray-600 mb-4">View the breakdown of issues customers have raised on your products</p>        {/* Chart */}
        <div className="h-40 flex items-end justify-between space-x-1 mb-4 bg-gray-50 rounded p-4">
          <div className="flex flex-col items-center flex-1">
            <div className="w-full bg-red-400 rounded-t mb-2" style={{height: '120px'}}></div>
            <span className="text-[10px] text-gray-600 text-center">Early<br/>Delivery</span>
          </div>
          <div className="flex flex-col items-center flex-1">
            <div className="w-full bg-red-300 rounded-t mb-2" style={{height: '80px'}}></div>
            <span className="text-[10px] text-gray-600 text-center">Wrong<br/>Quantity</span>
          </div>
          <div className="flex flex-col items-center flex-1">
            <div className="w-full bg-red-300 rounded-t mb-2" style={{height: '70px'}}></div>
            <span className="text-[10px] text-gray-600 text-center">Damage In<br/>Storage</span>
          </div>
          <div className="flex flex-col items-center flex-1">
            <div className="w-full bg-red-200 rounded-t mb-2" style={{height: '55px'}}></div>
            <span className="text-[10px] text-gray-600 text-center">Size Chart</span>
          </div>
          <div className="flex flex-col items-center flex-1">
            <div className="w-full bg-red-200 rounded-t mb-2" style={{height: '45px'}}></div>
            <span className="text-[10px] text-gray-600 text-center">Color<br/>Difference</span>
          </div>
          <div className="flex flex-col items-center flex-1">
            <div className="w-full bg-red-100 rounded-t mb-2" style={{height: '30px'}}></div>
            <span className="text-[10px] text-gray-600 text-center">Damaged<br/>Product</span>
          </div>
          <div className="flex flex-col items-center flex-1">
            <div className="w-full bg-red-100 rounded-t mb-2" style={{height: '20px'}}></div>
            <span className="text-[10px] text-gray-600 text-center">Insufficient<br/>Description</span>
          </div>
          <div className="flex flex-col items-center flex-1">
            <div className="w-full bg-blue-400 rounded-t mb-2" style={{height: '15px'}}></div>
            <span className="text-[10px] text-gray-600 text-center">Insufficient<br/>Product<br/>Photos</span>
          </div>
        </div>
        
        {/* Y-axis labels */}
        <div className="text-[10px] text-gray-500 mb-2">Product Issues</div>
      </div>

      {/* Product Feedback Table */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-4 py-3 border-b flex justify-between items-center">
          <h3 className="text-sm font-semibold text-gray-900">Product Feedback (1506)</h3>
          <div className="flex space-x-2">
            <button className="text-xs text-blue-600 hover:underline">Active</button>
            <button className="text-xs text-gray-500 hover:text-gray-700">Inactive</button>
            <button className="text-xs text-gray-500 hover:text-gray-700">Export</button>
          </div>
        </div>
        
        {/* Search and filters */}
        <div className="px-4 py-3 border-b">
          <div className="flex space-x-2">
            <input 
              type="text" 
              placeholder="Search by product name or ID"
              className="flex-1 border border-gray-300 rounded px-2 py-1 text-xs"
            />
            <select className="border border-gray-300 rounded px-2 py-1 text-xs">
              <option>Select Issue</option>
            </select>
            <select className="border border-gray-300 rounded px-2 py-1 text-xs">
              <option>Select Status</option>
            </select>
          </div>
        </div>
        
        {/* Table content placeholder */}
        <div className="p-4">
          <div className="text-xs text-gray-500 text-center py-8">
            Product feedback data would be displayed here in a table format
          </div>
        </div>
      </div>    </div>
  );

  const renderLedgers = () => (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-lg font-bold text-gray-900">Ledgers</h1>
          <p className="text-xs text-gray-600">View and manage your business ledgers and financial cycles</p>
        </div>
        <div className="flex space-x-2">
          <select className="border border-gray-300 rounded px-2 py-1 text-xs">
            <option>Select Period</option>
            <option>This Month</option>
            <option>Last Month</option>
            <option>This Quarter</option>
          </select>
          <button className="bg-blue-500 text-white rounded px-3 py-1 text-xs hover:bg-blue-600">
            Export
          </button>
        </div>
      </div>

      {/* Ledger Cycle Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-300 p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-semibold text-gray-900">Ledger Cycle - July 2024</h3>
          <span className="text-xs text-gray-500">Last updated: 2 hours ago</span>
        </div>

        {/* Cycle Dates */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="text-center">
            <div className="text-xs text-gray-500 mb-1">Cycle Start</div>
            <div className="text-sm font-medium">01 July 2024</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-500 mb-1">Last Statement</div>
            <div className="text-sm font-medium">15 July 2024</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-500 mb-1">Next Statement</div>
            <div className="text-sm font-medium">31 July 2024</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-500 mb-1">Cycle End</div>
            <div className="text-sm font-medium">31 July 2024</div>
          </div>
        </div>

        {/* Payable Items */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Payable Items</h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded text-xs">
              <span>Vendor Payments</span>
              <span className="font-medium">₹2,45,680</span>
            </div>
            <div className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded text-xs">
              <span>Logistics Charges</span>
              <span className="font-medium">₹18,450</span>
            </div>
            <div className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded text-xs">
              <span>Platform Fees</span>
              <span className="font-medium">₹12,340</span>
            </div>
            <div className="flex justify-between items-center py-2 px-3 bg-red-50 rounded text-xs text-red-600">
              <span>Penalty Charges</span>
              <span className="font-medium">₹2,150</span>
            </div>
          </div>
        </div>

        {/* Adjustments */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Adjustments</h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center py-2 px-3 bg-green-50 rounded text-xs text-green-600">
              <span>Return Refunds</span>
              <span className="font-medium">+₹8,920</span>
            </div>
            <div className="flex justify-between items-center py-2 px-3 bg-green-50 rounded text-xs text-green-600">
              <span>Promotional Credits</span>
              <span className="font-medium">+₹5,680</span>
            </div>
            <div className="flex justify-between items-center py-2 px-3 bg-red-50 rounded text-xs text-red-600">
              <span>Quality Issues</span>
              <span className="font-medium">-₹3,240</span>
            </div>
          </div>
        </div>

        {/* Total */}
        <div className="border-t pt-3">
          <div className="flex justify-between items-center text-sm font-semibold">
            <span>Net Payable Amount</span>
            <span className="text-blue-600">₹2,67,260</span>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-4 py-3 border-b flex justify-between items-center">
          <h3 className="text-sm font-semibold text-gray-900">Recent Transactions</h3>
          <button className="text-xs text-blue-600 hover:underline">View All</button>
        </div>
        
        <div className="divide-y divide-gray-100">
          <div className="px-4 py-3 flex justify-between items-center">
            <div>
              <div className="text-xs font-medium">Payment to Vendor ABC Corp</div>
              <div className="text-[10px] text-gray-500">15 July 2024, 2:30 PM</div>
            </div>
            <span className="text-xs text-red-600 font-medium">-PKR45,680</span>
          </div>
          <div className="px-4 py-3 flex justify-between items-center">
            <div>
              <div className="text-xs font-medium">Return Credit Adjustment</div>
              <div className="text-[10px] text-gray-500">14 July 2024, 11:15 AM</div>
            </div>
            <span className="text-xs text-green-600 font-medium">+PKR2,450</span>
          </div>
          <div className="px-4 py-3 flex justify-between items-center">
            <div>
              <div className="text-xs font-medium">Logistics Payment</div>
              <div className="text-[10px] text-gray-500">13 July 2024, 9:45 AM</div>
            </div>
            <span className="text-xs text-red-600 font-medium">-PKR8,920</span>
          </div>
        </div>
      </div>
    </div>
  );
  const renderOrders = () => (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-lg font-bold text-gray-900">Order Management</h1>
          <p className="text-xs text-gray-600">Manage all your orders efficiently</p>
        </div>
        <div className="flex space-x-2">
          <button className="bg-blue-500 text-white rounded px-3 py-1 text-xs hover:bg-blue-600">
            Export
          </button>
        </div>
      </div>

      {/* Status Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-300">
        <div className="flex border-b border-gray-200 text-xs">
          <button className="px-4 py-3 text-blue-600 border-b-2 border-blue-600 font-medium">
            Pending • 8
          </button>
          <button className="px-4 py-3 text-gray-500 hover:text-gray-700">
            Charged • 5
          </button>
          <button className="px-4 py-3 text-gray-500 hover:text-gray-700 flex items-center">
            <span className="w-2 h-2 bg-orange-400 rounded-full mr-2"></span>
            LAAM Processing • 6
          </button>
          <button className="px-4 py-3 text-gray-500 hover:text-gray-700 flex items-center">
            <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
            Allocated • 28
          </button>
          <button className="px-4 py-3 text-gray-500 hover:text-gray-700">
            In Transit • 102
          </button>
          <button className="px-4 py-3 text-gray-500 hover:text-gray-700">
            Refunds • 1563
          </button>
          <button className="px-4 py-3 text-gray-500 hover:text-gray-700">
            Delivered
          </button>
          <button className="px-4 py-3 text-gray-500 hover:text-gray-700">
            Priority
          </button>
          <button className="px-4 py-3 text-gray-500 hover:text-gray-700">
            Vendors • 35
          </button>
          <button className="px-4 py-3 text-gray-500 hover:text-gray-700">
            Days Pending • 35
          </button>
          <button className="px-4 py-3 text-gray-500 hover:text-gray-700 flex items-center">
            <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
            Select Date
          </button>
          <button className="px-4 py-3 text-gray-500 hover:text-gray-700">
            ⚙
          </button>
          <button className="px-4 py-3 text-gray-500 hover:text-gray-700">
            ☰
          </button>
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-12 gap-2 px-4 py-3 bg-gray-50 border-b border-gray-300 text-xs font-medium text-gray-700">
          <div className="col-span-1">
            <input type="checkbox" className="w-3 h-3" />
          </div>
          <div className="col-span-1">Order Number ↕</div>
          <div className="col-span-1">Brand ↕</div>
          <div className="col-span-2">Product ↕</div>
          <div className="col-span-1">Days pending ↕</div>
          <div className="col-span-1">Seller delivery date ↕</div>
          <div className="col-span-1">Payment Method</div>
          <div className="col-span-1">Cancellation table ↕</div>
          <div className="col-span-2">Amount</div>
        </div>

        {/* Table Rows */}
        <div className="divide-y divide-gray-100">
          {/* Row 1 */}
          <div className="grid grid-cols-12 gap-2 px-4 py-3 text-xs items-center">
            <div className="col-span-1">
              <input type="checkbox" className="w-3 h-3" />
            </div>
            <div className="col-span-1">
              <div className="text-blue-600 font-medium">#504168</div>
              <div className="text-gray-500">PKR # 005984505</div>
            </div>
            <div className="col-span-1">-</div>
            <div className="col-span-2">
              <div className="text-gray-900">6 Days</div>
            </div>
            <div className="col-span-1">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-[10px]">29/6/2025</span>
            </div>
            <div className="col-span-1">
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-[10px]">Cash/Debit card</span>
            </div>
            <div className="col-span-1">-</div>
            <div className="col-span-2">PKR 32.8</div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-12 gap-2 px-4 py-3 text-xs items-center">
            <div className="col-span-1">
              <input type="checkbox" className="w-3 h-3" />
            </div>
            <div className="col-span-1">
              <div className="text-blue-600 font-medium">#504168</div>
              <div className="text-gray-500">PKR # 005984505</div>
            </div>
            <div className="col-span-1">-</div>
            <div className="col-span-2">
              <div className="text-orange-600">5 Days Delayed</div>
            </div>
            <div className="col-span-1">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-[10px]">15/6/2025</span>
            </div>
            <div className="col-span-1">
              <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-[10px]">Cash on delivery OCSD</span>
            </div>
            <div className="col-span-1">-</div>
            <div className="col-span-2">PKR 29.0</div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-12 gap-2 px-4 py-3 text-xs items-center">
            <div className="col-span-1">
              <input type="checkbox" className="w-3 h-3" />
            </div>
            <div className="col-span-1">
              <div className="text-blue-600 font-medium">#504169</div>
              <div className="text-gray-500">PKR # 005984505</div>
            </div>
            <div className="col-span-1">-</div>
            <div className="col-span-2">
              <div className="text-orange-600">7 Days Delayed</div>
            </div>
            <div className="col-span-1">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-[10px]">18/6/2025</span>
            </div>
            <div className="col-span-1">
              <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-[10px]">Cash on delivery OCSD</span>
            </div>
            <div className="col-span-1">-</div>
            <div className="col-span-2">PKR 33.0</div>
          </div>

          {/* Row 4 */}
          <div className="grid grid-cols-12 gap-2 px-4 py-3 text-xs items-center">
            <div className="col-span-1">
              <input type="checkbox" className="w-3 h-3" />
            </div>
            <div className="col-span-1">
              <div className="text-blue-600 font-medium">#502155</div>
              <div className="text-gray-500">PKR # 005984505</div>
            </div>
            <div className="col-span-1">-</div>
            <div className="col-span-2">
              <div className="text-orange-600">30 Days Delayed</div>
            </div>
            <div className="col-span-1">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-[10px]">25/5/2025</span>
            </div>
            <div className="col-span-1">
              <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-[10px]">Cash on delivery OCSD</span>
            </div>
            <div className="col-span-1">-</div>
            <div className="col-span-2">PKR 44.98</div>
          </div>

          {/* Row 5 */}
          <div className="grid grid-cols-12 gap-2 px-4 py-3 text-xs items-center">
            <div className="col-span-1">
              <input type="checkbox" className="w-3 h-3" />
            </div>
            <div className="col-span-1">
              <div className="text-blue-600 font-medium">#504169</div>
              <div className="text-gray-500">PKR # 005984505</div>
            </div>
            <div className="col-span-1">-</div>
            <div className="col-span-2">
              <div className="text-gray-900">6 Days</div>
            </div>
            <div className="col-span-1">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-[10px]">29/6/2025</span>
            </div>
            <div className="col-span-1">
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-[10px]">Cash/Debit card</span>
            </div>
            <div className="col-span-1">-</div>
            <div className="col-span-2">PKR 32.9</div>
          </div>

          {/* Row 6 */}
          <div className="grid grid-cols-12 gap-2 px-4 py-3 text-xs items-center">
            <div className="col-span-1">
              <input type="checkbox" className="w-3 h-3" />
            </div>
            <div className="col-span-1">
              <div className="text-blue-600 font-medium">#504169</div>
              <div className="text-gray-500">PKR # 005984505</div>
            </div>
            <div className="col-span-1">-</div>
            <div className="col-span-2">
              <div className="text-orange-600">6 Days Delayed</div>
            </div>
            <div className="col-span-1">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-[10px]">18/6/2025</span>
            </div>
            <div className="col-span-1">
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-[10px]">Cash/Debit card</span>
            </div>
            <div className="col-span-1">-</div>
            <div className="col-span-2">PKR 32.8</div>
          </div>
        </div>

        {/* Pagination */}
        <div className="px-4 py-3 border-t border-gray-200 flex justify-between items-center text-xs">
          <div className="text-gray-500">
            Page 1 of 1 • Show 30 items ▼
          </div>
          <div className="flex items-center space-x-2">
            <button className="text-blue-600 hover:underline">◄ Previous</button>
            <span className="text-gray-500">|</span>
            <button className="text-blue-600 hover:underline">Next ►</button>
          </div>
        </div>
      </div>
    </div>
  );
  const renderCustomerManagement = () => (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-lg font-bold text-gray-900">Customer Management</h1>
          <p className="text-xs text-gray-600">Manage your customer database and relationships</p>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-300 p-4">
        <div className="flex space-x-3 items-center">
          <div className="flex-1 relative">
            <input 
              type="text" 
              placeholder="Search..."
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm pl-8"
            />
            <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <select className="border border-gray-300 rounded px-3 py-2 text-sm">
            <option>Orders</option>
            <option>Recent Orders</option>
            <option>All Orders</option>
          </select>
        </div>
      </div>

      {/* Customer Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-300 overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-5 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-300 text-sm font-medium text-gray-700">
          <div>Customer name</div>
          <div>Customer email</div>
          <div>Phone no</div>
          <div>Country</div>
          <div className="flex items-center">
            Total orders
            <svg className="w-3 h-3 ml-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
            </svg>
          </div>
        </div>

        {/* Table Body - Empty State */}
        <div className="p-12 text-center">
          <div className="text-gray-400 text-sm">
            No customers found. Start by adding your first customer.
          </div>
          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded text-sm hover:bg-blue-600">
            Add Customer
          </button>
        </div>
      </div>
    </div>
  );

  const renderProducts = () => (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-lg font-bold text-gray-900">Products</h1>
          <p className="text-xs text-gray-600">Manage your product inventory and catalog</p>
        </div>
      </div>

      {/* Out of Stock Alert */}
      <div className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-orange-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3 flex-1">
            <h3 className="text-sm font-medium text-orange-800">Out of stock alert</h3>
            <div className="mt-1 text-sm text-orange-700">
              You have 522 active variants (194 products) out of stock.{' '}
              <button className="underline text-orange-800 hover:text-orange-900">
                Please restock these products urgently.
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-300">
        {/* Status Tabs and Search */}
        <div className="flex justify-between items-center p-4 border-b border-gray-300">
          <div className="flex space-x-6">
            <button className="text-sm font-medium text-gray-900 border-b-2 border-blue-500 pb-2">
              Active <span className="text-gray-500">306</span>
            </button>
            <button className="text-sm text-gray-500 hover:text-gray-700 pb-2">
              Inactive <span className="text-gray-400">1,062</span>
            </button>
            <button className="text-sm text-gray-500 hover:text-gray-700 pb-2">
              All <span className="text-gray-400">1,368</span>
            </button>
          </div>
          <div className="flex space-x-3 items-center">
            <div className="relative">
              <input 
                type="text" 
                placeholder=""
                className="border border-gray-300 rounded px-3 py-2 text-sm w-48"
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            <select className="border border-gray-300 rounded px-3 py-2 text-sm">
              <option>Category</option>
              <option>Electronics</option>
              <option>Clothing</option>
              <option>Books</option>
            </select>
          </div>
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-gray-50 border-b border-gray-300 text-sm font-medium text-gray-700">
          <div className="col-span-1">
            <input type="checkbox" className="w-4 h-4" />
          </div>
          <div className="col-span-3 flex items-center">
            Product Title
            <svg className="w-3 h-3 ml-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
            </svg>
          </div>
          <div className="col-span-2 flex items-center">
            Status
            <svg className="w-3 h-3 ml-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
            </svg>
          </div>
          <div className="col-span-3 flex items-center">
            Onhand Inventory
            <svg className="w-3 h-3 ml-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
            </svg>
          </div>
          <div className="col-span-3 flex items-center">
            Virtual Inventory
            <svg className="w-3 h-3 ml-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
            </svg>
          </div>
        </div>

        {/* Table Rows */}
        <div className="divide-y divide-gray-100">          {/* Row 1 */}
          <div className="grid grid-cols-12 gap-4 px-4 py-3 text-sm items-center">
            <div className="col-span-1">
              <input type="checkbox" className="w-4 h-4" />
            </div>
            <div className="col-span-3 flex items-center space-x-3">
              <img 
                src="/images/section6images/CA1.PNG" 
                alt="Product" 
                className="w-10 h-10 rounded object-cover bg-gray-200"
              />
            </div>
            <div className="col-span-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Active
              </span>
            </div>
            <div className="col-span-3 text-gray-900">68</div>
            <div className="col-span-3 text-gray-900">0</div>
          </div>          {/* Row 2 */}
          <div className="grid grid-cols-12 gap-4 px-4 py-3 text-sm items-center">
            <div className="col-span-1">
              <input type="checkbox" className="w-4 h-4" />
            </div>
            <div className="col-span-3 flex items-center space-x-3">
              <img 
                src="/images/section6images/CA1.PNG" 
                alt="Product" 
                className="w-10 h-10 rounded object-cover bg-gray-200"
              />
            </div>
            <div className="col-span-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Active
              </span>
            </div>
            <div className="col-span-3 text-gray-900">27</div>
            <div className="col-span-3 text-gray-900">2</div>
          </div>          {/* Row 3 */}
          <div className="grid grid-cols-12 gap-4 px-4 py-3 text-sm items-center">
            <div className="col-span-1">
              <input type="checkbox" className="w-4 h-4" />
            </div>
            <div className="col-span-3 flex items-center space-x-3">
              <img 
                src="/images/section6images/CA1.PNG" 
                alt="Product" 
                className="w-10 h-10 rounded object-cover bg-gray-200"
              />
            </div>
            <div className="col-span-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Active
              </span>
            </div>
            <div className="col-span-3 text-gray-900">1</div>
            <div className="col-span-3 text-gray-900">0</div>
          </div>          {/* Row 4 */}
          <div className="grid grid-cols-12 gap-4 px-4 py-3 text-sm items-center">
            <div className="col-span-1">
              <input type="checkbox" className="w-4 h-4" />
            </div>
            <div className="col-span-3 flex items-center space-x-3">
              <img 
                src="/images/section6images/CA1.PNG" 
                alt="Product" 
                className="w-10 h-10 rounded object-cover bg-gray-200"
              />
            </div>
            <div className="col-span-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Active
              </span>
            </div>
            <div className="col-span-3 text-gray-900">139</div>
            <div className="col-span-3 text-gray-900">0</div>
          </div>          {/* Row 5 */}
          <div className="grid grid-cols-12 gap-4 px-4 py-3 text-sm items-center">
            <div className="col-span-1">
              <input type="checkbox" className="w-4 h-4" />
            </div>
            <div className="col-span-3 flex items-center space-x-3">
              <img 
                src="/images/section6images/CA1.PNG" 
                alt="Product" 
                className="w-10 h-10 rounded object-cover bg-gray-200"
              />
            </div>
            <div className="col-span-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Active
              </span>
            </div>
            <div className="col-span-3 text-gray-900">1</div>
            <div className="col-span-3 text-gray-900">15</div>
          </div>          {/* Row 6 */}
          <div className="grid grid-cols-12 gap-4 px-4 py-3 text-sm items-center">
            <div className="col-span-1">
              <input type="checkbox" className="w-4 h-4" />
            </div>
            <div className="col-span-3 flex items-center space-x-3">
              <img 
                src="/images/section6images/CA1.PNG" 
                alt="Product" 
                className="w-10 h-10 rounded object-cover bg-gray-200"
              />
            </div>
            <div className="col-span-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Active
              </span>
            </div>
            <div className="col-span-3 text-gray-900">17</div>
            <div className="col-span-3 text-gray-900">0</div>
          </div>
        </div>
      </div>
    </div>
  );
  const renderLogistics = () => (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-lg font-bold text-gray-900">Logistics</h1>
          <p className="text-xs text-gray-600">Manage your shipping and logistics operations</p>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-300">
        {/* Search Bar */}
        <div className="p-4 border-b border-gray-300">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search city, request, PO, tracking ID"
              className="w-full border border-gray-300 rounded px-4 py-2 text-sm pl-10"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-7 gap-4 px-4 py-3 bg-gray-50 border-b border-gray-300 text-sm font-medium text-gray-700">
          <div>Request ID</div>
          <div>Created At</div>
          <div>Received Items</div>
          <div>Pickup Date</div>
          <div>Request Status</div>
          <div>PO ID</div>
          <div>Warehouse</div>
        </div>

        {/* Empty State */}
        <div className="p-16 text-center">
          <div className="text-gray-400 text-sm mb-4">
            <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            No data to display
          </div>
          <p className="text-gray-500 text-xs">
            Create your first logistics request to see data here
          </p>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return renderHome();
      case 'analytics':
        return renderAnalytics();
      case 'customers':
        return renderCustomerFeedback();
      case 'ledgers':
        return renderLedgers();
      case 'orders':
        return renderOrders();
      case 'customermanagement':
        return renderCustomerManagement();
      case 'products':
        return renderProducts();
      case 'logistics':
        return renderLogistics();
      // … you can leave your other sections (products, etc.) untouched …
      default:
        return <div className="p-4">Content for {activeSection}</div>;
    }
  };

  return (
    <div className="flex justify-center p-8 bg-transparent" style={{ fontFamily: 'Inter, Arial, sans-serif' }}>
      <div className="relative w-[1000px] h-[700px] bg-black rounded-[30px] shadow-xl overflow-hidden border-[8px] border-black">
        {/* MacBook notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-5 bg-black rounded-b-xl z-10" />

        {/* Screen */}
        <div className="absolute inset-0 bg-white rounded-[18px] overflow-hidden flex flex-col">

          {/* Main layout */}
          <div className="flex flex-1 overflow-hidden">            {/* Sidebar */}
            <nav className="w-40 bg-white border-r border-gray-200 flex flex-col text-xs">
              {/* Monitor your performance section */}
              <div className="p-2">
                <h2 className="text-[9px] font-medium text-gray-500 uppercase tracking-tight">
                  Monitor your performance
                </h2>
              </div>
              {sidebarItems.slice(0, 4).map((item) => {
                const Icon = item.icon;
                const active = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`flex items-center cursor-pointer space-x-1 px-2 py-1.5 text-[10px] ${
                      active
                        ? 'bg-black text-white font-medium rounded-md mx-1'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Icon className={`w-2.5 h-2.5 ${active ? 'text-white font-medium' : 'text-gray-400'}`} />
                    <span className="truncate">{item.label}</span>
                    {item.id === 'analytics' && (
                      <span className="ml-auto bg-green-100 text-green-800 text-[8px] px-1 py-0.5 rounded-full font-medium">
                        NEW
                      </span>
                    )}
                  </button>
                );
              })}
              
              {/* Manage your business section */}
              <div className="mt-2 p-2">
                <h3 className="text-[9px] font-medium text-gray-500 uppercase tracking-tight">
                  Manage your business
                </h3>
              </div>              {sidebarItems.slice(4, 8).map((item) => {
                const Icon = item.icon;
                const active = activeSection === item.id;
                
                // Special handling for Product Management
                if (item.id === 'products') {
                  return (
                    <div key={item.id}>
                      <button
                        onClick={() => {
                          setActiveSection(item.id);
                          toggleDropdown('products');
                        }}
                        className={`flex items-center cursor-pointer space-x-1 px-2 py-1.5 text-[10px] w-full ${
                          active
                            ? 'bg-black text-white font-medium rounded-md mx-1'
                            : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        <Icon className={`w-2.5 h-2.5 ${active ? 'text-white font-semibold' : 'text-gray-400'}`} />
                        <span className="truncate">{item.label}</span>
                        <span className={`ml-auto text-xs transition-transform duration-200 ${
                          openDropdowns.products ? '' : 'rotate-180'
                        } ${active ? 'text-white' : 'text-gray-400'}`}>
                          <SlArrowUp />
                        </span>
                      </button>
                      {/* Collapsible dropdown for Product Management */}
                      {openDropdowns.products && (
                        <div className="bg-gray-50">
                          <div className="px-6 py-1 text-[9px] text-gray-600 hover:text-gray-900 cursor-pointer">
                            Drops
                          </div>
                          <div className="px-6 py-1 text-[9px] text-gray-600 hover:text-gray-900 cursor-pointer">
                            Size Charts
                          </div>
                          <div className="px-6 py-1 text-[9px] text-gray-600 hover:text-gray-900 cursor-pointer">
                            Review Funnel
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }
                
                // Special handling for Logistics
                if (item.id === 'logistics') {
                  return (
                    <div key={item.id}>
                      <button
                        onClick={() => {
                          setActiveSection(item.id);
                          toggleDropdown('logistics');
                        }}
                        className={`flex items-center cursor-pointer space-x-1 px-2 py-1.5 text-[10px] w-full ${
                          active
                            ? 'bg-black text-white font-medium rounded-md mx-1'
                            : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        <Icon className={`w-2.5 h-2.5 ${active ? 'text-white font-medium' : 'text-gray-400'}`} />
                        <span className="truncate">{item.label}</span>
                        <span className={`ml-auto text-xs transition-transform duration-200 ${
                          openDropdowns.logistics ? '' : 'rotate-180'
                        } ${active ? 'text-white' : 'text-gray-400'}`}>
                          <SlArrowUp />
                        </span>
                      </button>
                      {/* Collapsible dropdown for Logistics */}
                      {openDropdowns.logistics && (
                        <div className="bg-gray-50">
                          <div className="px-6 py-1 text-[9px] text-gray-600 hover:text-gray-900 cursor-pointer">
                            Warehouses
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }
                
                // Regular items
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`flex items-center cursor-pointer space-x-1 px-2 py-1.5 text-[10px] ${
                      active
                        ? 'bg-black text-white font-medium rounded-md mx-1'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Icon className={`w-2.5 h-2.5 ${active ? 'text-white font-medium' : 'text-gray-400'}`} />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Content area */}
            <div className="flex-1 overflow-y-auto bg-gray-100">{renderContent()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
