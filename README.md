# 🚀 FlowBoard - Hub de Productivité pour Freelances

![FlowBoard](/public/og-image.png)

**FlowBoard** est une application SaaS tout-en-un qui centralise la gestion des finances, des tâches et des fichiers pour les freelances et créatifs. Plus besoin de jongler entre Excel, Trello et Google Drive : tout est réuni dans une interface moderne, rapide et responsive.

---

## ✨ Fonctionnalités

### 🔐 Authentification
- Connexion par **Magic Link** (email sans mot de passe)
- Sessions sécurisées avec NextAuth
- Profil utilisateur personnalisable (nom, avatar)

### 💰 Module Finances
- Ajout, modification et suppression de transactions
- Catégorisation des revenus et dépenses
- **Filtres et recherche** avancés
- **Graphique en donut** (Recharts) pour visualiser la répartition
- **Export PDF** des rapports financiers (jsPDF)

### ✅ Module Tâches (Kanban)
- Tableau **Kanban** à 3 colonnes : À faire, En cours, Terminé
- **Drag & Drop** fluide entre les colonnes
- Priorités : Basse, Moyenne, Haute
- Dates d'échéance
- Ajout et suppression en temps réel

### 📁 Module Fichiers
- **Upload par glisser-déposer** (react-dropzone)
- Prévisualisation d'images intégrée
- Téléchargement des fichiers
- Stockage sécurisé côté serveur

### 🌓 Expérience Utilisateur
- **Mode Sombre** automatique ou manuel
- **Responsive Design** : mobile, tablette, desktop
- Navigation mobile avec barre d'icônes en bas
- **Landing Page** professionnelle avec sections Hero, Features, CTA
- **Pages légales** : Mentions légales, Politique de confidentialité, CGU
- **SEO optimisé** : métadonnées, sitemap, robots.txt, Open Graph, Twitter Cards

---

## 🛠️ Stack Technique

| Technologie | Utilisation |
| :--- | :--- |
| **Next.js 16** (App Router) | Framework React avec Server Components |
| **TypeScript** | Typage statique |
| **Tailwind CSS** + **shadcn/ui** | Design System et composants UI |
| **Prisma 6** | ORM pour la base de données |
| **PostgreSQL** (Supabase) | Base de données relationnelle |
| **NextAuth 5** (Auth.js) | Authentification Magic Link |
| **Recharts** | Graphiques et visualisations |
| **@hello-pangea/dnd** | Drag & Drop du Kanban |
| **react-dropzone** | Upload de fichiers par glisser-déposer |
| **jsPDF** + **jspdf-autotable** | Génération de rapports PDF |
| **next-themes** | Gestion du mode sombre |
| **Resend** | Envoi d'emails transactionnels |
| **Vercel** | Déploiement et hébergement |

---

## 📸 Captures d'écran

### Dashboard
![Dashboard](screenshots/dashboard.png)

### Finances
![Finances](screenshots/finances.png)

### Tâches (Kanban)
![Tâches](screenshots/tasks.png)

### Fichiers
![Fichiers](screenshots/files.png)

### Landing Page
![Landing](screenshots/landing.png)

---

## 🚀 Installation en Local

### Prérequis
- Node.js 18+
- Un compte [Supabase](https://supabase.com) (gratuit)

### 1. Cloner le projet
```bash
git clone https://github.com/josuekelly-droid/flowboard.git
cd flowboard

2. Installer les dépendances
bash
npm install --legacy-peer-deps
3. Configurer les variables d'environnement
Créez un fichier .env à la racine :

env
# Base de données Supabase
DATABASE_URL="postgresql://postgres.[PROJECT_REF]:[MDP]@aws-0-eu-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.[PROJECT_REF]:[MDP]@aws-0-eu-west-1.pooler.supabase.com:5432/postgres?pgbouncer=true"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="votre-secret-genere"

# Email (Ethereal pour test local)
EMAIL_SERVER_HOST="smtp.ethereal.email"
EMAIL_SERVER_PORT="587"
EMAIL_SERVER_USER="votre-user@ethereal.email"
EMAIL_SERVER_PASSWORD="votre-mdp"
EMAIL_FROM="FlowBoard <noreply@flowboard.com>"
4. Initialiser la base de données
bash
npx prisma db push
npx prisma generate
5. Lancer le serveur de développement
bash
npm run dev
L'application est accessible sur http://localhost:3000.

📁 Structure du Projet
text
flowboard/
├── app/                    # Routes Next.js (App Router)
│   ├── api/                # API Routes
│   │   ├── auth/           # Authentification NextAuth
│   │   ├── tasks/          # CRUD Tâches
│   │   └── files/          # Upload/Delete Fichiers
│   ├── dashboard/          # Pages privées
│   │   ├── finance/        # Module Finances
│   │   ├── tasks/          # Module Tâches
│   │   ├── files/          # Module Fichiers
│   │   └── profile/        # Profil utilisateur
│   ├── legal/              # Pages légales
│   ├── login/              # Page de connexion
│   ├── layout.tsx          # Layout principal
│   ├── page.tsx            # Landing Page
│   ├── sitemap.ts          # Sitemap SEO
│   └── robots.ts           # Robots.txt SEO
├── components/             # Composants réutilisables
│   ├── ui/                 # Composants shadcn/ui
│   ├── Sidebar.tsx         # Barre latérale desktop
│   ├── MobileNav.tsx       # Navigation mobile
│   ├── TaskBoard.tsx       # Tableau Kanban
│   ├── FinanceChart.tsx    # Graphique donut
│   ├── FileUpload.tsx      # Upload de fichiers
│   └── ...
├── lib/                    # Utilitaires et configurations
│   ├── prisma.ts           # Client Prisma
│   └── auth.ts             # Configuration NextAuth
├── prisma/
│   └── schema.prisma       # Schéma de base de données
└── public/                 # Fichiers statiques
    └── uploads/            # Fichiers uploadés
    
🎯 Roadmap
Authentification Magic Link

Module Finances avec graphiques

Module Tâches Kanban avec Drag & Drop

Module Fichiers avec upload

Export PDF des rapports

Mode Sombre

Responsive Design complet

Landing Page professionnelle

Pages légales

SEO optimisé

Déploiement Vercel

Notifications Toast

Skeleton Loaders

Authentification Google/GitHub

Abonnements Stripe

📄 Licence
Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.

👤 Auteur
Créé avec passion par: [Kelly-Josué-AKPLOGAN]

GitHub : @josuekelly-droid

Portfolio : [kreativ-ux.vercel.app]

LinkedIn : [wwww.linkedin.com/in/kellyjosueakplogan]

🙏 Remerciements
shadcn/ui pour les composants UI

Supabase pour la base de données

Vercel pour l'hébergement

Resend pour les emails transactionnels

⭐ Si vous aimez ce projet, n'hésitez pas à laisser une étoile sur GitHub !