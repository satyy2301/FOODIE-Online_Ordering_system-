import React, { useEffect } from "react";
import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsFillBellFill,
} from "react-icons/bs";
import SalesCharts from "./sales";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import {  useSelector } from "react-redux/es/hooks/useSelector";
import { selectTotalCategories, selectTotalItems } from "../../product/ProductListSlice";
import { fetchAdminOrdersAsync, fetchAllOrdersAsync, selectAdminOrders, selectOrders, selectTotalOrders } from "../../order/orderSlice";
import { fetchAllUsersAsync, selectAllusers, selecttotalusers } from "../../user/userSlice";
import { useDispatch } from "react-redux";
import { fetchAllUsers } from "../../user/UserAPI";

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
  const today = new Date().toISOString().slice(0, 10);

  const hourlySalesData = orders
    .filter((order) => order.time.slice(0, 10) === today)
    .reduce((result, order) => {
      const hour = new Date(order.time).getHours();
      result[hour] = (result[hour] || 0) + order.totalAmount;
      return result;
    }, {});

  // Convert the object to an array of { hour, totalAmount } and sort it by hour
  return Object.entries(hourlySalesData)
    .map(([hour, totalAmount]) => ({ hour, totalAmount }))
    .sort((a, b) => a.hour - b.hour);
};
// Function to calculate daily sales
const calculateDailySales = (orders) => {
  const dailySalesData = orders.reduce((result, order) => {
    const day = order.time.slice(0, 10);
    result[day] = (result[day] || 0) + order.totalAmount;
    return result;
  }, {});

  return Object.entries(dailySalesData)
  .map(([day, totalAmount]) => ({ name: day, totalAmount }))
  .sort((a, b) => new Date(a.name) - new Date(b.name));
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
        <XAxis dataKey="hour" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey={dataKey} fill={color} />
      </BarChart>
    </ResponsiveContainer>
  );
};

function Dashboard() {
  const dispatch=useDispatch();
  const totalcategories=useSelector(selectTotalCategories)
  const totalProducts=useSelector(selectTotalItems)
  const totalorders=useSelector(selectTotalOrders)
  const totalusers=useSelector(selecttotalusers)
  const orders=useSelector(selectAdminOrders)
  let totalSales = 0;

  orders.forEach((order) => {
  totalSales += order.totalAmount;
});

  const monthlySalesData = calculateMonthlySales(orders);
  const hourlySalesData = calculateHourlySales(orders);
  const dailySalesData = calculateDailySales(orders);





  useEffect(() => {
    
         dispatch(fetchAllOrdersAsync()); 
         dispatch(fetchAllUsersAsync());
         dispatch(fetchAdminOrdersAsync())
      
     }, [dispatch,orders]);
    

  return (
    <main className="main-container">
      <div className="main-title">
      <img
              src="/businesses-dashboard-.svg"
              alt="Dashboard Icon"
              width="40"
              height="40"
              style={{ verticalAlign: "middle" }}
            /><h3>DASHBOARD</h3>
      </div>

      <div className="main-cards">
        <div className="card-admin">
          <div className="card-inner">
            <h3>PRODUCTS</h3>
            <BsFillArchiveFill className="general-icon ml-4" />
          </div>
          <h1>{totalProducts}</h1>
        </div>
        <div className="card-admin">
          <div className="card-inner">
            <h3>CATEGORIES</h3>
            <BsFillGrid3X3GapFill className="general-icon ml-4" />
          </div>
          <h1>{totalcategories}</h1>
        </div>
        <div className="card-admin">
          <div className="card-inner">
            <h3>CUSTOMERS</h3>
            <BsPeopleFill className="general-icon ml-4" />
          </div>
          <h1>{totalusers}</h1>
        </div>
        <div className="card-admin">
          <div className="card-inner">
            <h3>ORDERS</h3>
            <BsFillBellFill className="general-icon ml-4" />
          </div>
          <h1>{totalorders}</h1>
        </div>
      </div>

      <div className="charts">
        {/* <div className="salecard">
          $ {totalSales}
        </div> */}
        <div className="plot">
          <h2>Monthly Sale</h2>
           <LineChartComponent data={monthlySalesData} dataKey="totalAmount" color="#8884d8" /></div>
        <div className="plot">
        <h2>Hourly Sale</h2>
          <BarChartComponent data={hourlySalesData} dataKey="totalAmount" color="#82ca9d" /></div>
        <div className="plot">
        <h2>Daily Sale</h2>
           <LineChartComponent data={dailySalesData} dataKey="totalAmount" color="#8884d8" /></div>
      </div>

    </main>
  );
}

export default Dashboard;
