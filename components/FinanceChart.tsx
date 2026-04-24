"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

interface FinanceChartProps {
  income: number
  expense: number
}

const COLORS = ["#22c55e", "#ef4444"]

export function FinanceChart({ income, expense }: FinanceChartProps) {
  const data = [
    { name: "Revenus", value: income },
    { name: "Dépenses", value: expense },
  ]

  if (income === 0 && expense === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Répartition</CardTitle>
          <CardDescription>Ajoutez des transactions pour voir le graphique</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center py-8">
          <p className="text-muted-foreground">Aucune donnée</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Répartition</CardTitle>
        <CardDescription>Revenus vs Dépenses</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${Number(value).toFixed(2)} €`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}