import type { Metadata } from "next";
import { PageBanner } from "@/components/ui/PageBanner";
import { getMentionsLegalesPage } from "@/lib/wordpress";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mentions légales — PUR Alpha",
  description: "Mentions légales de PUR Alpha, conformément à l'article 6 de la loi n° 2004-575 du 21 juin 2004.",
};

const sections = [
  {
    id: "edition",
    title: "1 – Édition du site",
    content: (
      <div className="space-y-4">
        <p>
          Conformément à l'article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique, nous informons les utilisateurs du site internet <code>puralpha.fr</code> de l'identité des différents acteurs impliqués dans sa création et son suivi :
        </p>
        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100/80 space-y-2">
          <p><strong>Propriétaire du site :</strong> PUR ALPHA</p>
          <p><strong>Identification de l'entreprise :</strong> PUR ALPHA, SIRET 989 156 989 00026, Agrément SAP N° SAP989156989, sis 26 rue des Sablons, 95360 Montmagny</p>
          <p><strong>Directeur de la publication :</strong> Marc LEBLANC</p>
          <p><strong>Réalisation :</strong> PUR ALPHA</p>
          <p><strong>Hébergeur :</strong> OVH, Société par Actions Simplifiée au capital de 10 069 020 €, ayant son siège social au 2 rue Kellermann, 59100 ROUBAIX France, Siren 424 761 419 RCS Lille</p>
          <p><strong>Délégué à la protection des données :</strong> Marc LEBLANC</p>
        </div>
      </div>
    ),
  },
  {
    id: "propriete-intellectuelle",
    title: "2 – Propriété intellectuelle et contrefaçons",
    content: (
      <p>
        PUR ALPHA détient les droits de propriété intellectuelle sur tous les éléments présents sur le site, y compris les textes, images, graphismes, logos, vidéos, et sons. Toute reproduction, modification, ou exploitation non autorisée des contenus du site pour quelque motif que ce soit est prohibée et peut être considérée comme une contrefaçon conformément aux articles L335-2 et suivants du Code de la propriété intellectuelle.
      </p>
    ),
  },
  {
    id: "responsabilite",
    title: "3 – Limitations de responsabilité",
    content: (
      <div className="space-y-4">
        <p>
          PUR ALPHA ne pourra être tenu responsable des dommages directs ou indirects causés au matériel de l'utilisateur lors de l'accès au site <code>puralpha.fr</code>. Nous déclinons toute responsabilité concernant l'utilisation des informations et contenus présents sur <code>puralpha.fr</code>. Bien que nous nous engagions à sécuriser le site, nous ne pouvons être tenus responsables des données personnelles qui pourraient être introuvées à notre insu.
        </p>
        <p>
          Des espaces interactifs (contact ou commentaires) sont disponibles pour les utilisateurs. PUR ALPHA se réserve le droit de supprimer tout contenu qui contreviendrait à la législation en vigueur, notamment en matière de protection des données. Le cas échéant, inapproprié, PUR ALPHA se réserve également le droit de poursuivre l'utilisateur le cas échéant sur le plan pénal.
        </p>
      </div>
    ),
  },
  {
    id: "litiges",
    title: "4 – Litiges, réclamations et médiation",
    content: (
      <div className="space-y-4">
        <p>
          Après avoir adressé une réclamation écrite préalable à PUR Alpha et à défaut de réponse satisfaisante, le consommateur peut recourir gratuitement au médiateur de la consommation dont relève PUR Alpha :
        </p>
        <div className="bg-teal-50/50 rounded-2xl p-6 border border-teal-100/60 space-y-2">
          <p className="font-bold text-navy-900 text-base">Centre de Médiation de la Consommation d’Opale - CMCO</p>
          <p>1 rue de Course</p>
          <p>Hameau Le Bois Julien</p>
          <p>62240 Courset</p>
          <p><strong>Téléphone :</strong> 06 82 13 38 86</p>
          <p><strong>Courriel :</strong> <a href="mailto:cmco-mediation@outlook.com" className="text-teal-600 hover:underline">cmco-mediation@outlook.com</a></p>
          <p>
            <strong>Site internet :</strong>{" "}
            <a
              href="https://www.cmco-mediation.fr/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-600 hover:underline font-semibold"
            >
              https://www.cmco-mediation.fr/
            </a>
          </p>
        </div>
        <p>
          Le consommateur peut saisir le médiateur par voie électronique ou par courrier selon les conditions prévues par la loi. Le client peut également contacter le Défenseur des droits pour toute atteinte présumée à ses droits. En cas d'échec de la médiation amiable le litige sera soumis au droit français et aux tribunaux compétents.
        </p>
      </div>
    ),
  },
  {
    id: "cnil",
    title: "5 – CNIL et gestion des données personnelles",
    content: (
      <p>
        Conformément à la loi 78-17 du 6 janvier liée modifiée, l'utilisateur du site <code>puralpha.fr</code> dispose d'un droit d'accès, de modification et de suppression des informations collectées. Pour exercer ce droit, contactez notre Délégué à la Protection des Données : <code>contact@puralpha.fr</code> – M. LEBLANC. Pour plus d'informations sur le traitement de vos données, consultez notre{" "}
        <Link href="/politique-confidentialite" className="text-teal-600 hover:underline font-semibold">
          Politique de confidentialité
        </Link>.
      </p>
    ),
  },
  {
    id: "liens",
    title: "6 – Liens hypertextes et cookies",
    content: (
      <p>
        <code>puralpha.fr</code> contient des liens vers d'autres sites et décline toute responsabilité concernant ces liens externes. Toute navigation sur <code>puralpha.fr</code> peut entraîner l'installation de cookies sur l'ordinateur de l'utilisateur. Un cookie est un fichier qui enregistre des informations relatives à la navigation. Vous pouvez accepter ou refuser les cookies en modifiant les paramètres de votre navigateur. Aucun cookie ne sera installé sans votre consentement. Pour plus d'informations sur notre utilisation des cookies, consultez notre{" "}
        <Link href="/politique-cookies" className="text-teal-600 hover:underline font-semibold">
          Politique des Cookies
        </Link>.
      </p>
    ),
  },
  {
    id: "credits",
    title: "7 – Crédits photos",
    content: (
      <p>
        Photos et illustrations : PUR ALPHA, Shutterstock
      </p>
    ),
  },
  {
    id: "juridiction",
    title: "8 – Droit applicable et attribution de juridiction",
    content: (
      <p>
        Tout litige relatif à l'utilisation du site <code>puralpha.fr</code> est soumis au droit français. En cas de contradiction, les tribunaux compétents de Paris ont seuls compétence.
      </p>
    ),
  },
];

export default async function MentionsLegalesPage() {
  const wpPage = await getMentionsLegalesPage();
  const wpContent = wpPage?.content?.rendered?.trim();

  return (
    <div className="min-h-screen">
      <PageBanner title="Mentions" titleHighlight="légales" />

      {/* Content */}
      <div className="container mx-auto px-4 lg:px-8 py-10 lg:py-12">
        <div className="max-w-4xl mx-auto">
          {wpContent ? (
            <div
              className="prose prose-slate max-w-none text-navy-800/95 leading-relaxed text-sm md:text-base
                prose-headings:text-navy-800 prose-headings:font-extrabold
                prose-h2:text-xl md:prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
                prose-p:mb-5 prose-p:leading-relaxed
                prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-6
                prose-strong:font-bold prose-strong:text-navy-800
                prose-a:text-teal-600 prose-a:underline hover:prose-a:text-teal-700"
              dangerouslySetInnerHTML={{ __html: wpContent }}
            />
          ) : (
            <div className="flex flex-col gap-10">
              {sections.map((section) => (
                <article
                  key={section.id}
                  id={section.id}
                  className="border-b border-gray-100 pb-8 last:border-0"
                >
                  <h2 className="text-lg lg:text-xl font-bold text-navy-800 mb-4">
                    {section.title}
                  </h2>
                  <div className="text-navy-950 text-sm lg:text-[15px] leading-relaxed">
                    {section.content}
                  </div>
                </article>
              ))}
            </div>
          )}
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