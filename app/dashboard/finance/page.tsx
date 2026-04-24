
export const runtime = "nodejs"

import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle, TrendingUp, TrendingDown } from "lucide-react"
import Link from "next/link"
import { FinanceChart } from "@/components/FinanceChart"
import { TransactionFilters } from "@/components/TransactionFilters"
import { ExportPDFButton } from "@/components/ExportPDFButton"

export default async function FinancePage(props: {
  searchParams: Promise<{ search?: string; type?: string; category?: string }>
}) {
  const searchParams = await props.searchParams
  const session = await auth()
  
  if (!session?.user) {
    redirect("/login")
  }

  const { search, type, category } = searchParams

  const where: any = { userId: session.user.id }
  
  if (search) {
    where.OR = [
      { description: { contains: search } },
      { category: { contains: search } },
    ]
  }
  
  if (type && (type === "INCOME" || type === "EXPENSE")) {
    where.type = type
  }
  
  if (category) {
    where.category = category
  }

  const transactions = await prisma.transaction.findMany({
    where,
    orderBy: { date: "desc" },
  })

  const allTransactions = await prisma.transaction.findMany({
    where: { userId: session.user.id },
  })

  const totalIncome = allTransactions
    .filter((t) => t.type === "INCOME")
    .reduce((sum, t) => sum + t.amount, 0)

  const totalExpense = allTransactions
    .filter((t) => t.type === "EXPENSE")
    .reduce((sum, t) => sum + t.amount, 0)

  const balance = totalIncome - totalExpense

  return (
    <div className="space-y-6 lg:space-y-8">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold">Finances</h1>
          <p className="text-sm lg:text-base text-muted-foreground">
            Gérez vos revenus et dépenses
          </p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <ExportPDFButton
            transactions={transactions}
            totalIncome={totalIncome}
            totalExpense={totalExpense}
            balance={balance}
            userEmail={session.user.email || ""}
          />
          <Link href="/dashboard/finance/new">
            <Button size="sm" className="sm:h-10 sm:px-4">
              <PlusCircle className="mr-1 sm:mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Nouvelle transaction</span>
              <span className="sm:hidden">Ajouter</span>
            </Button>
          </Link>
        </div>
      </div>

      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Revenus</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500 shrink-0" />
          </CardHeader>
          <CardContent>
            <p className="text-xl lg:text-2xl font-bold text-green-600">
              {totalIncome.toFixed(2)} €
            </p>
            <p className="text-xs text-muted-foreground">Total des entrées</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Dépenses</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-500 shrink-0" />
          </CardHeader>
          <CardContent>
            <p className="text-xl lg:text-2xl font-bold text-red-600">
              {totalExpense.toFixed(2)} €
            </p>
            <p className="text-xs text-muted-foreground">Total des sorties</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Solde</CardTitle>
            <span className="text-xl">💰</span>
          </CardHeader>
          <CardContent>
            <p className={`text-xl lg:text-2xl font-bold ${balance >= 0 ? "text-green-600" : "text-red-600"}`}>
              {balance.toFixed(2)} €
            </p>
            <p className="text-xs text-muted-foreground">Ce mois-ci</p>
          </CardContent>
        </Card>
      </div>

      
      <FinanceChart income={totalIncome} expense={totalExpense} />

      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Transactions</CardTitle>
          <CardDescription>
            {transactions.length} transaction{transactions.length !== 1 ? "s" : ""} trouvée{transactions.length !== 1 ? "s" : ""}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <TransactionFilters />

          {transactions.length === 0 ? (
            <p className="text-center text-muted-foreground py-8 text-sm">
              Aucune transaction trouvée.
            </p>
          ) : (
            <div className="space-y-3">
              
              <div className="hidden sm:flex items-center justify-between text-xs font-medium text-muted-foreground pb-2 border-b">
                <span>Description</span>
                <span>Montant</span>
              </div>
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-3 last:border-0 gap-1 sm:gap-2"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-sm truncate">
                      {transaction.description || "Sans description"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(transaction.date).toLocaleDateString("fr-FR")} • {transaction.category}
                    </p>
                  </div>
                  <span
                    className={`font-semibold text-sm whitespace-nowrap ${
                      transaction.type === "INCOME" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {transaction.type === "INCOME" ? "+" : "-"}
                    {transaction.amount.toFixed(2)} €
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}