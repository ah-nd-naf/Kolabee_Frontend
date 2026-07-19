"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts";
import { 
  Users, 
  ShoppingCart, 
  CreditCard, 
  Activity, 
  ArrowUpRight,
  Filter
} from "lucide-react";
import { mockFunnelData } from "@/lib/mock-data";

export default function AnalyticsPage() {
  // 1. Live Ticking Counter State
  const [liveCheckout, setLiveCheckout] = useState(mockFunnelData.liveInCheckoutBase);

  // Simulate live traffic ticking up and down every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveCheckout((prev) => {
        const change = Math.floor(Math.random() * 5) - 2; // -2 to +2
        return Math.max(12, prev + change); // Floor it at 12 so it looks active
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const customEasing = [0.16, 1, 0.3, 1];

  // Calculate overall conversion rate
  const conversionRate = ((mockFunnelData.orderConfirmed / mockFunnelData.totalVisits) * 100).toFixed(2);

  // Gradient colors for the Funnel Bar Chart
  const getBarColor = (index: number) => {
    const colors = ["#164e63", "#0891b2", "#06b6d4", "#22d3ee", "#67e8f9"];
    return colors[index % colors.length];
  };

  return (
    <div className="flex flex-col gap-8 pb-10">
      
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: customEasing }}
        >
          <h1 className="font-heading text-3xl font-bold text-cyan-950">Link Analytics</h1>
          <p className="mt-1 text-sm text-stone-500">
            Real-time funnel conversion and attribution data.
          </p>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: customEasing }}
          className="flex items-center gap-3"
        >
          <button className="flex h-10 items-center justify-center gap-2 rounded-full border border-stone-200 bg-white px-4 text-sm font-medium text-stone-700 hover:bg-stone-50 transition-colors">
            <Filter className="h-4 w-4" />
            <span>Last 30 Days</span>
          </button>
        </motion.div>
      </div>

      {/* Top KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {/* Total Traffic */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: customEasing }}
          className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-stone-500">Total Visits</span>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-50 text-cyan-600">
              <Users className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-cyan-950">{mockFunnelData.totalVisits.toLocaleString()}</span>
            <span className="flex items-center text-sm font-medium text-green-600">
              <ArrowUpRight className="h-4 w-4" /> 12.5%
            </span>
          </div>
        </motion.div>

        {/* Conversion Rate */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: customEasing }}
          className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-stone-500">Avg. Conversion Rate</span>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-50 text-cyan-600">
              <ShoppingCart className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-cyan-950">{conversionRate}%</span>
            <span className="flex items-center text-sm font-medium text-green-600">
              <ArrowUpRight className="h-4 w-4" /> 2.1%
            </span>
          </div>
        </motion.div>

        {/* Live Checkout Counter (The ticking feature!) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: customEasing }}
          className="relative overflow-hidden rounded-2xl border border-cyan-200 bg-cyan-50 p-6 shadow-sm"
        >
          <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-cyan-100/50 blur-xl" />
          <div className="relative z-10 flex items-center justify-between">
            <span className="flex items-center gap-2 text-sm font-medium text-cyan-800">
              <motion.div 
                animate={{ opacity: [1, 0.3, 1] }} 
                transition={{ repeat: Infinity, duration: 2 }}
                className="h-2 w-2 rounded-full bg-red-500"
              />
              Live in Checkout
            </span>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-cyan-600 shadow-sm">
              <Activity className="h-5 w-5" />
            </div>
          </div>
          <div className="relative z-10 mt-4 flex items-baseline gap-2">
            {/* Animate the number change slightly */}
            <motion.span 
              key={liveCheckout}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold text-cyan-950"
            >
              {liveCheckout}
            </motion.span>
            <span className="text-sm font-medium text-cyan-700">users right now</span>
          </div>
        </motion.div>
      </div>

      {/* Main Funnel Chart */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4, ease: customEasing }}
        className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm"
      >
        <h3 className="font-heading text-lg font-semibold text-cyan-950 mb-6">Traffic Funnel</h3>
        
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={mockFunnelData.chartData}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
            >
              <XAxis type="number" hide />
              <YAxis 
                dataKey="stage" 
                type="category" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#57534e', fontWeight: 500 }}
              />
              <Tooltip 
                cursor={{ fill: '#f5f5f4' }}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="count" radius={[0, 8, 8, 0]} barSize={40}>
                {mockFunnelData.chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getBarColor(index)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

    </div>
  );
}