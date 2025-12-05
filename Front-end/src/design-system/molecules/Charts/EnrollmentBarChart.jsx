import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function EnrollmentBarChart({ data }) {
  return (
    <div className="h-[300px] w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical">
          {" "}
          <CartesianGrid
            strokeDasharray="3 3"
            horizontal={false}
            stroke="#e5e7eb"
          />
          <XAxis type="number" hide />
          <YAxis
            dataKey="matkul"
            type="category"
            width={100}
            tick={{ fill: "#4b5563", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            cursor={{ fill: "#f3f4f6" }}
            contentStyle={{ borderRadius: "8px", border: "none" }}
          />
          <Bar
            dataKey="jumlah"
            fill="#6366f1"
            radius={[0, 4, 4, 0]}
            barSize={20}
            name="Mahasiswa"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
