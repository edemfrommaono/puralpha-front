import type { Metadata } from "next";
import { PageBanner } from "@/components/ui/PageBanner";

export const metadata: Metadata = {
  title: "Mentions légales — PUR Alpha",
  description: "Mentions légales de PUR Alpha, conformément à l'article 6 de la loi n° 2004-575 du 21 juin 2004.",
};

const sections = [
  {
    id: "edition",
    title: "1 – Édition du site",
    content: `Conformément à l'article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique, nous informons les utilisateurs du site internet pur-alpha.fr l'identité des différents acteurs impliqués dans sa création et son suivi :

Propriétaire du site : PUR ALPHA
Identification de l'entreprise : PUR ALPHA, SIRET 989 156 989 00018, sis 41 avenue des Reises, 75009 PARIS
Directeur de la publication : Marc LEBLANC
Réalisation : Studio Créatif
Hébergeur : OVH, Société par Actions Simplifiée au capital de 10 069 020 €, ayant son siège social au 2 rue Kellermann, 59100 ROUBAIX France, Siren 424 761 419 RCS Lille
Délégué à la protection des données : Marc LEBLANC`,
  },
  {
    id: "propriete-intellectuelle",
    title: "2 – Propriété intellectuelle et contrefaçons",
    content: `PUR ALPHA détient les droits de propriété intellectuelle sur tous les éléments présents sur le site, y compris les textes, images, graphismes, logos, vidéos, et sons. Toute reproduction, modification, ou exploitation non autorisée des contenus du site pour quelque motif que ce soit est prohibée et peut être considérée comme une contrefaçon conformément aux articles L335-2 et suivants du Code de la propriété intellectuelle.`,
  },
  {
    id: "responsabilite",
    title: "3 – Limitations de responsabilité",
    content: `PUR ALPHA ne pourra être tenu responsable des dommages directs ou indirects causés au matériel de l'utilisateur lors de l'accès au site pur-alpha.fr. Nous déclinons toute responsabilité concernant l'utilisation des informations et contenus présents sur pur-alpha.fr. Bien que nous nous engagions à sécuriser le site, nous ne pouvons être tenus responsables des données personnelles qui pourraient être introuvées à notre insu.

Des espaces interactifs (contact ou commentaires) sont disponibles pour les utilisateurs. PUR ALPHA se réserve le droit de supprimer tout contenu qui contreviendrait à la législation en vigueur, notamment en matière de protection des données. Le cas échéant, inapproprié, PUR ALPHA se réserve également le droit de poursuivre l'utilisateur le cas échéant sur le plan pénal.`,
  },
  {
    id: "litiges",
    title: "4 – Litiges, réclamations et médiation",
    content: `En cas de litige, le client peut adresser une réclamation au service concerné pour tenter de trouver une solution amiable. Si aucune réponse satisfaisante n'est obtenue, le client peut saisir le médiateur de la consommation compétent. Conformément aux articles L612-1 et suivants du Code de la consommation, le client a le droit de recourir gratuitement à un médiateur après avoir effectué une réclamation écrite préalable. PUR ALPHA a désigné comme médiateur :

AMF Conseil
197 Boulevard Saint-Germain – 75007 Paris
Site internet : https://www.mediation-ame.com

Le consommateur peut saisir le médiateur par voie électronique ou par courrier selon les conditions prévues par la loi. Le client peut également contacter le Défenseur des droits pour toute atteinte présumée à ses droits. En cas d'échec de la médiation amiable le litige sera soumis au droit français et aux tribunaux compétents.`,
  },
  {
    id: "cnil",
    title: "5 – CNIL et gestion des données personnelles",
    content: `Conformément à la loi 78-17 du 6 janvier liée modifiée, l'utilisateur du site pur-alpha.fr dispose d'un droit d'accès, de modification et de suppression des informations collectées. Pour exercer ce droit, contactez notre Délégué à la Protection des Données : pur-alpha.fr – M. LEBLANC. Pour plus d'informations sur le traitement de vos données, consultez notre Politique de confidentialité.`,
  },
  {
    id: "liens",
    title: "6 – Liens hypertextes et cookies",
    content: `pur-alpha.fr contient des liens vers d'autres sites et décline toute responsabilité concernant ces liens externes. Toute navigation sur pur-alpha.fr peut entraîner l'installation de cookies sur l'ordinateur de l'utilisateur. Un cookie est un fichier qui enregistre des informations relatives à la navigation. Vous pouvez accepter ou refuser les cookies en modifiant les paramètres de votre navigateur. Aucun cookie ne sera installé sans votre consentement. Pour plus d'informations sur notre utilisation des cookies, consultez notre Politique des Cookies.`,
  },
  {
    id: "credits",
    title: "7 – Crédits photos",
    content: `Photos et illustrations : PUR ALPHA, Shutterstock`,
  },
  {
    id: "juridiction",
    title: "8 – Droit applicable et attribution de juridiction",
    content: `Tout litige relatif à l'utilisation du site pur-alpha.fr est soumis au droit français. En cas de contradiction, les tribunaux compétents de Paris ont seuls compétence.`,
  },
];

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen">
      <PageBanner title="Mentions" titleHighlight="légales" />

      {/* Content */}
      <div className="container mx-auto px-4 lg:px-8 py-10 lg:py-12">
        <div className="flex flex-col gap-10">
          {sections.map((section) => (
            <article
              key={section.id}
              id={section.id}
              className=""
            >
              <h2 className="text-lg lg:text-xl font-black text-navy-800 mb-5 pb-4">
                {section.title}
              </h2>
              <div className="text-navy-800 text-sm lg:text-base leading-relaxed whitespace-pre-line">
                {section.content}
              </div>
            </article>
          ))}
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
