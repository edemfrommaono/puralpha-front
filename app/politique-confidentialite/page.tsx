import type { Metadata } from "next";
import { PageBanner } from "@/components/ui/PageBanner";

export const metadata: Metadata = {
  title: "Politique de confidentialité — PUR Alpha",
  description: "Politique de confidentialité de PUR Alpha — traitement et protection de vos données personnelles.",
};

const sections = [
  {
    id: "introduction",
    title: "Introduction",
    content: `Dans le cadre de ses activités, la société PUR Alpha, dont le siège social est situé au 26 rue des Sablons, 95360 Montmagny, collecte et traite des informations, dont certaines sont considérées comme des « données personnelles ». PUR Alpha accorde une grande importance à la protection de la vie privée et utilise ces données de manière responsable, confidentielle et pour des finalités précises.`,
  },
  {
    id: "donnees-personnelles",
    title: "Données personnelles",
    content: `Sur le site web pur-alpha.fr, deux types de données peuvent être collectées : les données fournies directement.

Les données sont celles que vous nous transmettez directement via le formulaire de contact ou par email. Les champs collectés dans le formulaire incluent : prénom, nom, e-mail et téléphone.
Les données collectées automatiquement

Lors de vos visites, avec votre consentement, nous pouvons recueillir des informations de type « web analytics » concernant : votre navigation, l'adresse de votre consultation, votre adresse IP, ainsi que votre type et version de navigateur. Nous utilisons des cookies pour cela.`,
  },
  {
    id: "utilisation",
    title: "Utilisation des données",
    content: `Les données que vous nous transmettez directement sont utilisées pour vous recontacter et/ou pour traiter votre demande.

Les données « web analytics » sont collectées de manière anonyme (en enregistrant des adresses IP anonymisées) par Axe Analytics, ce qui nous permet de mesurer l'audience de notre site, les consultations et les éventuelles erreurs afin d'améliorer continuellement l'expérience utilisateur. Ces données sont utilisées par PUR Alpha, responsable du traitement, et ne seront jamais partagées avec des tiers ni utilisées à d'autres fins que celles mentionnées.`,
  },
  {
    id: "base-legale",
    title: "Base légale",
    content: `Les données personnelles ne sont collectées qu'après votre consentement explicite. Ce consentement est obtenu de manière valide (via des boutons et cases à cocher), libre, clair et en connaissance de cause.

Durée de conservation
Les données seront conservées pendant une durée maximale de 3 ans. PUR Alpha peut conserver certaines données personnelles au-delà de cette période pour respecter ses obligations légales et réglementaires.`,
  },
  {
    id: "droits",
    title: "Vos droits concernant les données personnelles",
    content: `Vous avez le droit de consulter, de demander la modification ou la suppression de vos données personnelles. Vous pouvez également retirer votre consentement au traitement de vos données. Tout utilisateur concerné par le traitement de ses données personnelles peut exercer ses droits suivants, conformément au règlement européen 2016/679 et à la loi informatique et libertés (loi 78-17 du 6 janvier 1978) :

Droit d'accès, de rectification et droit à l'effacement des données (articles 15, 16 et 17 du RGPD)
Droit à la portabilité des données (article 20 du RGPD)
Droit à la limitation (article 18 du RGPD) et à l'opposition au traitement des données (article 21 du RGPD)
Droit de ne pas faire l'objet d'une décision fondée exclusivement sur un procédé automatisé
Droit de déterminer le sort des données après la mort

(voir aussi l'autorité de contrôle compétente : CNIL - https://www.cnil.fr / RGPD)

Pour exercer vos droits, veuillez envoyer votre demande au 26 rue des Sablons, 95360 Montmagny ou par email à contact@puralpha.fr.
Pour que le responsable du traitement puisse répondre à votre demande, vous devrez peut-être fournir certaines informations telles que : vos noms et prénoms, votre adresse e-mail ainsi que votre numéro de compte ou d'abonné.

Consultez ce lien pour plus d'informations sur vos droits.`,
  },

  {
    id: "conditions-modification",
    title: "Conditions de modification de la politique de confidentialité",
    content: `L'éditeur du site PUR Alpha se réserve le droit de modifier cette Politique à tout moment pour garantir la conformité avec la législation en vigueur. Les modifications n'affecteront pas les achats. D'autres achats éventuels ultérieurs resteront soumis à la Politique en vigueur au moment de l'achat, acceptée par l'utilisateur lors de la création. L'utilisateur est invité à consulter cette Politique chaque fois qu'il utilise nos services.`,
  },
];

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="min-h-screen">
      <PageBanner title="Politique de" titleHighlight="confidentialité" />

      {/* Content */}
      <div className="container mx-auto px-4 lg:px-8 py-10 lg:py-12">
        <div className="flex flex-col gap-10">
          {/* Contenu masqué temporairement à la demande du client
          {sections.map((section) => (
            <article key={section.id} id={section.id}>
              <h2 className="text-lg lg:text-xl font-black text-navy-800 mb-5 pb-4">
                {section.title}
              </h2>
              <div className="text-navy-800 text-sm lg:text-base leading-relaxed whitespace-pre-line">
                {section.content}
              </div>
            </article>
          ))}
          */}
        </div>

        {/* Back to top */}
        <div className="mt-12 text-center">
          <a
            href="#"
            className="inline-flex items-center gap-2 text-sm text-teal-500 hover:text-teal-600 font-semibold transition-colors"
          >
            ↑ Retour en haut
          </a>
        </div>
      </div>
    </div>
  );
}
