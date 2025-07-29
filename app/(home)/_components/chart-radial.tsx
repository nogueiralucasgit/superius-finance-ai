"use client";

import { PizzaIcon, TrendingUp } from "lucide-react";
import { Pie, PieChart } from "recharts";
import { ChartConfig } from "@/app/_components/ui/chart";

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/app/_components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/_components/ui/chart";

export const description = "A pie chart with no separator";

const chartConfig = {
  deposit: {
    label: "Depósito",
    color: "var(--chart-1)",
  },
  gastos: {
    label: "Safari",
    color: "var(--chart-2)",
  },
  investment: {
    label: "Firefox",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

interface ChartPieProps {
  DEPOSIT: number;
  EXPENSE: number;
  INVESTMENT: number;
}

export function ChartPie({ DEPOSIT, EXPENSE, INVESTMENT }: ChartPieProps) {
  const chartData = [
    { name: "Depósito", value: DEPOSIT, fill: "hsl(var(--primary))" },
    { name: "Gastos", value: EXPENSE, fill: "hsl(var(--destructive))" },
    { name: "Investimentos", value: INVESTMENT, fill: "hsl(215, 20%, 65%)" },
  ];

  return (
    <Card className="flex flex-col">
      <CardHeader className="flex-row items-center gap-4">
        <PizzaIcon size={16} />
        <p className={"text-muted-foreground"}>Gastos por categoria</p>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie data={chartData} dataKey="value" nameKey="name" stroke="0" />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          <TrendingUp className="h-4 w-4" /> Gastos, Despesas e Investimentos
        </div>
        <div className="leading-none text-muted-foreground">
          Mostrando o total (%) levando como base o mês selecionado.
        </div>
      </CardFooter>
    </Card>
  );
}
