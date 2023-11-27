import React from 'react';
import { useSelector } from 'react-redux';
import { ResponsiveContainer, LineChart, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, Bar } from 'recharts';
import { selectAdminOrders } from '../../order/orderSlice';

// Function to calculate monthly sales
const calculateMonthlySales = (orders) => {
  const monthlySalesData = orders.reduce((result, order) => {
    const month = order.time.slice(0, 7);
    result[month] = (result[month] || 0) + order.totalAmount;
    return result;
  }, {});

  return Object.entries(monthlySalesData).map(([month, totalAmount]) => ({ name: month, totalAmount }));
};

// Function to calculate hourly sales
const calculateHourlySales = (orders) => {
  const hourlySalesData = orders.reduce((result, order) => {
    const hour = new Date(order.time).getHours();
    result[hour] = (result[hour] || 0) + order.totalAmount;
    return result;
  }, {});

  return Object.entries(hourlySalesData).map(([hour, totalAmount]) => ({ hour, totalAmount }));
};

// Function to calculate daily sales
const calculateDailySales = (orders) => {
  const dailySalesData = orders.reduce((result, order) => {
    const day = order.time.slice(0, 10);
    result[day] = (result[day] || 0) + order.totalAmount;
    return result;
  }, {});

  return Object.entries(dailySalesData).map(([day, totalAmount]) => ({ name: day, totalAmount }));
};

// Component to display LineChart
const LineChartComponent = ({ data, dataKey, color }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey={dataKey} stroke={color} activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

// Component to display BarChart
const BarChartComponent = ({ data, dataKey, color }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey={dataKey} fill={color} />
      </BarChart>
    </ResponsiveContainer>
  );
};

// Example usage within a component
const SalesCharts = () => {
  const orders = useSelector(selectAdminOrders); // Replace with your actual selector

  const monthlySalesData = calculateMonthlySales(orders);
  const hourlySalesData = calculateHourlySales(orders);
  const dailySalesData = calculateDailySales(orders);

  return (
    <div>
      <h2>Monthly Sales</h2>
      <LineChartComponent data={monthlySalesData} dataKey="totalAmount" color="#8884d8" />

      <h2>Hourly Sales</h2>
      <BarChartComponent data={hourlySalesData} dataKey="totalAmount" color="#82ca9d" />

      <h2>Daily Sales</h2>
      <LineChartComponent data={dailySalesData} dataKey="totalAmount" color="#8884d8" />
    </div>
  );
};

export default SalesCharts;
