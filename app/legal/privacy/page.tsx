export default function PrivacyPage() {
  return (
    <>
      <h1>Politique de Confidentialité</h1>
      <p>Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}</p>

      <h2>1. Collecte des données</h2>
      <p>
        FlowBoard collecte uniquement les données nécessaires au fonctionnement du service :
      </p>
      <ul>
        <li>Adresse email (pour l&apos;authentification)</li>
        <li>Nom d&apos;utilisateur (optionnel)</li>
        <li>Avatar (optionnel)</li>
        <li>Données de transactions financières</li>
        <li>Tâches et projets</li>
        <li>Fichiers uploadés</li>
      </ul>

      <h2>2. Utilisation des données</h2>
      <p>Vos données sont utilisées exclusivement pour :</p>
      <ul>
        <li>Fournir et améliorer le service FlowBoard</li>
        <li>Vous authentifier de manière sécurisée</li>
        <li>Vous permettre de gérer vos finances, tâches et fichiers</li>
      </ul>
      <p>
        Nous ne vendons JAMAIS vos données à des tiers. Nous ne faisons pas de
        publicité ciblée.
      </p>

      <h2>3. Stockage des données</h2>
      <p>
        Vos données sont stockées sur des serveurs sécurisés en Europe (via Supabase).
        Nous utilisons un chiffrement SSL/TLS pour toutes les communications.
      </p>

      <h2>4. Vos droits</h2>
      <p>
        Conformément au RGPD, vous disposez des droits suivants sur vos données :
      </p>
      <ul>
        <li>Droit d&apos;accès</li>
        <li>Droit de rectification</li>
        <li>Droit à l&apos;effacement (droit à l&apos;oubli)</li>
        <li>Droit à la portabilité</li>
        <li>Droit de limitation du traitement</li>
      </ul>
      <p>
        Pour exercer ces droits, contactez-nous à : privacy@flowboard.com
      </p>

      <h2>5. Cookies</h2>
      <p>
        FlowBoard utilise uniquement des cookies techniques essentiels au fonctionnement
        du service (cookie de session pour l&apos;authentification). Aucun cookie de
        tracking ou publicitaire n&apos;est utilisé.
      </p>

      <h2>6. Contact</h2>
      <p>
        Pour toute question concernant cette politique de confidentialité :
        privacy@flowboard.com
      </p>
    </>
  )
}