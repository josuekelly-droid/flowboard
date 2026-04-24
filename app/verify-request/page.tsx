import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MailCheck } from "lucide-react"

export default function VerifyRequestPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 px-4 py-8">
      <Card className="w-full max-w-md shadow-lg text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <MailCheck className="h-12 sm:h-16 w-12 sm:w-16 text-primary" />
          </div>
          <CardTitle className="text-xl sm:text-2xl">Vérifiez vos emails</CardTitle>
          <CardDescription className="text-sm">
            Un lien magique a été envoyé à votre adresse email.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Cliquez sur le lien dans l&apos;email pour vous connecter.
            Si vous ne le recevez pas, vérifiez vos spams.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}