"use client"

import { Button } from "@/components/ui/button"
import { Download, Loader2 } from "lucide-react"
import { useState } from "react"

interface Transaction {
  id: string
  amount: number
  type: string
  category: string
  description: string | null
  date: Date
}

interface ExportPDFButtonProps {
  transactions: Transaction[]
  totalIncome: number
  totalExpense: number
  balance: number
  userEmail: string
}

export function ExportPDFButton({
  transactions,
  totalIncome,
  totalExpense,
  balance,
  userEmail,
}: ExportPDFButtonProps) {
  const [loading, setLoading] = useState(false)

  async function exportPDF() {
    setLoading(true)

    const { jsPDF } = await import("jspdf")
    const { default: autoTable } = await import("jspdf-autotable")

    const doc = new jsPDF()

    // En-tête
    doc.setFontSize(22)
    doc.setTextColor(15, 23, 42)
    doc.text("FlowBoard - Rapport Financier", 20, 20)

    doc.setFontSize(11)
    doc.setTextColor(100, 116, 139)
    doc.text(`Généré le ${new Date().toLocaleDateString("fr-FR")}`, 20, 30)
    doc.text(`Utilisateur : ${userEmail}`, 20, 37)

    // Résumé
    doc.setFontSize(14)
    doc.setTextColor(15, 23, 42)
    doc.text("Résumé", 20, 50)

    doc.setFontSize(11)
    doc.setTextColor(34, 197, 94)
    doc.text(`Revenus : +${totalIncome.toFixed(2)} €`, 20, 60)

    doc.setTextColor(239, 68, 68)
    doc.text(`Dépenses : -${totalExpense.toFixed(2)} €`, 80, 60)

    doc.setTextColor(balance >= 0 ? 34 : 239, balance >= 0 ? 197 : 68, balance >= 0 ? 94 : 68)
    doc.text(`Solde : ${balance >= 0 ? "+" : ""}${balance.toFixed(2)} €`, 140, 60)

    // Tableau des transactions
    const tableData = transactions.map((t) => [
      new Date(t.date).toLocaleDateString("fr-FR"),
      t.description || "Sans description",
      t.category,
      t.type === "INCOME" ? "Revenu" : "Dépense",
      `${t.type === "INCOME" ? "+" : "-"}${t.amount.toFixed(2)} €`,
    ])

    autoTable(doc, {
      startY: 70,
      head: [["Date", "Description", "Catégorie", "Type", "Montant"]],
      body: tableData,
      headStyles: {
        fillColor: [15, 23, 42],
        textColor: [255, 255, 255],
        fontStyle: "bold",
      },
      alternateRowStyles: {
        fillColor: [248, 250, 252],
      },
      styles: {
        fontSize: 10,
        cellPadding: 4,
      },
    })

    // Pied de page
    const pageCount = doc.getNumberOfPages()
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i)
      doc.setFontSize(8)
      doc.setTextColor(148, 163, 184)
      doc.text(
        `FlowBoard - Page ${i} / ${pageCount}`,
        doc.internal.pageSize.width / 2,
        doc.internal.pageSize.height - 10,
        { align: "center" }
      )
    }

    doc.save(`FlowBoard_Rapport_${new Date().toISOString().split("T")[0]}.pdf`)
    setLoading(false)
  }

  return (
    <Button onClick={exportPDF} disabled={loading} variant="outline">
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Génération...
        </>
      ) : (
        <>
          <Download className="mr-2 h-4 w-4" />
          Exporter en PDF
        </>
      )}
    </Button>
  )
}