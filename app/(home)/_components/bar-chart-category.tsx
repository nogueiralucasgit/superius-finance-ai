"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/app/_components/ui/card";
import { BoxIcon } from "lucide-react";

export interface TotalExpensePerCategory {
  category: string;
  totalAmount: number;
  percentageOfTotal: number;
}

interface ChartBarMixedProps {
  totalExpensePerCategory: TotalExpensePerCategory[];
}

export function BarChartCategory({
  totalExpensePerCategory,
}: ChartBarMixedProps) {
  const chartData = totalExpensePerCategory.map(
    ({ category, totalAmount }) => ({
      category,
      totalAmount,
    }),
  );

  return (
    <Card>
      <CardHeader className="flex-row items-center gap-4">
        <BoxIcon size={18} />
        <p className={"text-muted-foreground"}>Gastos por categoria</p>
      </CardHeader>
      <CardContent className="flex items-center justify-start">
        <BarChart
          width={400}
          height={230}
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          layout="vertical"
        >
          <YAxis
            dataKey="category"
            type="category"
            axisLine={false}
            tickLine={false}
            tickMargin={10}
            width={120}
            tick={{ fontSize: 14, fill: "#666" }}
          />
          <XAxis type="number" hide />
          <Tooltip
            content={({ payload }) => {
              if (!payload || payload.length === 0) return null;
              const { value, payload: itemPayload } = payload[0];

              return (
                <div className="rounded-md bg-white p-2 text-sm text-gray-800 shadow">
                  <div className="font-semibold">{itemPayload.category}</div>
                  <div>
                    {value?.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </div>
                </div>
              );
            }}
          />

          <Bar
            dataKey="totalAmount"
            fill="hsl(var(--primary))"
            radius={[3, 3, 3, 3]}
            barSize={40}
          />
        </BarChart>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Resumo de despesas por categoria
        </div>
        <div className="leading-none text-muted-foreground">
          Total das despesas por categoria levando como base o mês selecionado.
        </div>
      </CardFooter>
    </Card>
  );
}
