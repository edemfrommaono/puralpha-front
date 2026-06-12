export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  readTime: string;
  imageUrl: string;
  author: {
    name: string;
    role: string;
    avatarUrl?: string;
  };
}

export const BLOG_POSTS_FALLBACK: Post[] = [
  {
    id: "1",
    slug: "comprendre-le-syndrome-pura-causes-symptomes-accompagnement",
    title: "Comprendre le syndrome PURA : causes, symptômes et accompagnement",
    excerpt: "Le syndrome PURA est une maladie génétique rare. Découvrez comment adapter l'accompagnement au quotidien pour soutenir le développement de l'enfant.",
    content: `
      <p>Le syndrome PURA est une maladie génétique rare liée à une altération du gène PURA, situé sur le chromosome 5. Ce gène joue un rôle crucial dans le développement du cerveau et la production de la protéine PURA. Découvrez ses aspects essentiels et comment adapter la garde de l'enfant.</p>

      <h2>Qu'est-ce que le syndrome PURA ?</h2>
      <p>Identifié récemment grâce aux progrès du séquençage génétique, ce syndrome se manifeste principalement par un retard global du développement (moteur, cognitif et du langage), une hypotonie néonatale (faiblesse musculaire) et des difficultés d'alimentation.</p>
      
      <blockquote>
        "Chaque enfant atteint du syndrome PURA progresse à son rythme. Un accompagnement précoce et pluridisciplinaire est la clé de son épanouissement."
      </blockquote>

      <h2>Les symptômes courants</h2>
      <ul>
        <li><strong>Hypotonie :</strong> Présente dès la naissance, elle impacte la tenue de tête, la station assise et la marche.</li>
        <li><strong>Difficultés de déglutition et d'alimentation :</strong> Nécessitant parfois une texture adaptée ou une aide humaine renforcée.</li>
        <li><strong>Absence ou retard sévère du langage :</strong> Bien que la compréhension soit souvent bien meilleure que l'expression.</li>
        <li><strong>Troubles du sommeil et épilepsie :</strong> Qui requièrent une vigilance constante de l'intervenant à domicile.</li>
      </ul>

      <h2>Comment adapter l'accompagnement à domicile ?</h2>
      <p>L'accompagnement à domicile par des professionnels formés permet de soulager les aidants familiaux tout en stimulant l'enfant dans son environnement rassurant. Le jeu sensoriel, la communication alternative (pictogrammes, langue des signes simplifiée) et le maintien des postures recommandées par les kinésithérapeutes font partie intégrante des interventions PUR Alpha.</p>
    `,
    date: "12 Juin 2026",
    category: "Sensibilisation",
    readTime: "5 min",
    imageUrl: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=800&auto=format&fit=crop",
    author: {
      name: "Marc Leblanc",
      role: "Fondateur PUR Alpha"
    }
  },
  {
    id: "2",
    slug: "le-credit-impot-sap-comment-diviser-facture-par-deux",
    title: "Le crédit d'impôt SAP : comment diviser votre facture par deux ?",
    excerpt: "Les services d'aide à domicile pour enfants en situation de handicap ouvrent droit à un crédit d'impôt de 50%. Mode d'emploi simple.",
    content: `
      <p>Bénéficier d'un accompagnement à domicile de qualité pour son enfant a un coût. Heureusement, le statut de Services à la Personne (SAP) permet aux familles de bénéficier d'aides fiscales majeures. Décryptage.</p>

      <h2>Qu'est-ce que le crédit d'impôt SAP ?</h2>
      <p>Toute famille faisant appel à un organisme agréé de services à la personne comme PUR Alpha bénéficie d'un crédit d'impôt égal à 50% des dépenses engagées dans l'année, dans la limite de plafonds spécifiques définis par la loi.</p>

      <h2>Comment cela fonctionne-t-il concrètement ?</h2>
      <p>Chaque début d'année, PUR Alpha vous délivre une attestation fiscale récapitulant l'ensemble des sommes versées l'année précédente. Lors de votre déclaration de revenus, il vous suffit de reporter ce montant dans la case dédiée (souvent la case 7DB).</p>

      <h2>Le versement de l'aide</h2>
      <p>L'État vous rembourse 50% de cette somme, que vous payiez des impôts ou non (il s'agit d'un crédit d'impôt et non d'une simple déduction fiscale). De plus, l'Avance Immédiate du crédit d'impôt se déploie progressivement pour vous éviter d'avancer les frais.</p>
    `,
    date: "08 Juin 2026",
    category: "Démarches & Aides",
    readTime: "4 min",
    imageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=800&auto=format&fit=crop",
    author: {
      name: "Sabrina Benali",
      role: "Responsable Administrative"
    }
  },
  {
    id: "3",
    slug: "eveil-sensoriel-activites-adaptees-domicile",
    title: "Éveil sensoriel : 5 activités adaptées à faire à la maison",
    excerpt: "Découvrez des activités faciles à mettre en place à domicile pour stimuler les sens et favoriser l'épanouissement de votre enfant.",
    content: `
      <p>Pour un enfant en situation de handicap, appréhender le monde par les sens est une étape fondamentale. Voici 5 idées d'ateliers simples, ludiques et stimulants à réaliser à la maison avec l'aide de votre intervenant PUR Alpha.</p>

      <h2>1. Le bac sensoriel texturé</h2>
      <p>Remplissez un bac en plastique avec des graines (riz, pâtes, lentilles) ou du sable magique, et cachez-y des petits objets texturés. L'enfant adore y plonger les mains pour chercher, manipuler et verser.</p>

      <h2>2. Les bouteilles de retour au calme</h2>
      <p>Prenez des petites bouteilles d'eau transparentes, ajoutez de l'eau, de la glycérine (ou de l'huile pour bébé), des paillettes et des colorants. En les secouant doucement, le mouvement des paillettes offre un spectacle visuel captivant et apaisant.</p>

      <h2>3. Le parcours tactile des pieds</h2>
      <p>Disposez au sol différentes dalles : du carton ondulé, du papier bulle, une serviette éponge, du gazon synthétique. Si l'enfant le peut, faites-le marcher pieds nus (ou guidez ses mains s'il est assis) pour ressentir les différents contrastes.</p>
    `,
    date: "03 Juin 2026",
    category: "Activités",
    readTime: "6 min",
    imageUrl: "https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=800&auto=format&fit=crop",
    author: {
      name: "Julie Dupont",
      role: "Éducatrice Spécialisée"
    }
  }
];
