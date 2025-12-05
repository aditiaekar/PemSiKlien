import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function GPATrendChart({ data }) {
  return (
    <div className="h-[300px] w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorIpk" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#e5e7eb"
          />
          <XAxis
            dataKey="semester"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#6b7280", fontSize: 12 }}
            dy={10}
          />
          <YAxis
            domain={[0, 4]}
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#6b7280", fontSize: 12 }}
          />
          <Tooltip contentStyle={{ borderRadius: "8px", border: "none" }} />
          <Area
            type="monotone"
            dataKey="ipk"
            stroke="#10b981"
            fillOpacity={1}
            fill="url(#colorIpk)"
            strokeWidth={3}
            name="Rata-rata IPK"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
