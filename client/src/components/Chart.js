import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
  } from "recharts";
  
function Chart({ data }) {

    const sumsByDate = {}

    data.forEach(transaction => {
    const { date, amount } = transaction
    
    if (sumsByDate[date]) {
        sumsByDate[date] += amount;
    } else {
        sumsByDate[date] = amount;
    }
    })

    const resultArray = Object.entries(sumsByDate).map(([date, amount]) => ({ date, amount })).sort((t1, t2) => (t1.date > t2.date) ? 1 : (t1.date < t2.date) ? -1 : 0)

    return (
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={resultArray}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis dataKey="amount"/>
          <Tooltip />
          <Legend />
          <Bar dataKey="date" fill="#FFBF00" />
          <Bar dataKey="amount" fill="#FF7E00" />
        </BarChart>
      </ResponsiveContainer>
    );
  }

export default Chart;