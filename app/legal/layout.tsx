export default function LegalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="px-4 py-16 sm:py-20 lg:py-24">
      <div className="container mx-auto max-w-3xl prose prose-sm sm:prose-base lg:prose-lg prose-slate dark:prose-invert">
        {children}
      </div>
    </div>
  )
}