import type { Metadata } from "next";
import { PageBanner } from "@/components/ui/PageBanner";

export const metadata: Metadata = {
  title: "Politique de cookies — PUR Alpha",
  description: "Politique de cookies de PUR Alpha — utilisation, gestion et suppression des cookies sur notre site.",
};

const sections = [
  {
    id: "introduction",
    title: "1. Introduction",
    content: `Notre site web, pur-alpha.fr, utilise des cookies et d'autres technologies similaires (ci-après, le terme « cookies » est utilisé pour tous les cookies et technologies similaires). Lisez la politique ci-dessous pour vous informer sur l'utilisation des cookies sur notre site.`,
  },
  {
    id: "que-sont-les-cookies",
    title: "2. Que sont les cookies ?",
    content: `Un cookie est un petit fichier envoyé avec les pages de ce site et stocké par votre navigateur sur le disque dur de votre ordinateur ou d'un autre appareil. Les informations stockées peuvent être renvoyées à nos serveurs ou à ceux des tiers concernés lors d'une visite ultérieure.`,
  },
  {
    id: "que-sont-les-scripts",
    title: "3. Que sont les scripts ?",
    content: `Un script est un morceau de code qui permet le site afin de fonctionner correctement et de manière interactive. Ce code s'exécute sur notre serveur ou sur votre appareil.`,
  },
  {
    id: "balise-invisible",
    title: "4. Qu'est-ce qu'un cookie invisible ?",
    content: `Une balise web (ou balise web), est un petit texte ou une image invisible sur un site, utilisé le suivi des pages d'un site web. Pour ce faire, diverses données vous concernant sont stockées à l'aide de cookies.`,
  },
  {
    id: "cookies",
    title: "5. Cookies",
    content: `5.1 Cookies techniques au fonctionnel

Certains cookies garantissent le bon fonctionnement de certaines parties du site et prennent en compte vos préférences en tant qu'utilisateur. En plaçant ces cookies fonctionnels, nous vous facilitons la visite de notre site. Vous n'avez pas besoin d'accepter les mêmes informations à plusieurs reprises et les articles restent dans votre panier jusqu'au paiement. Nous pouvons placer ces cookies sans votre consentement.

5.2 Cookies statistiques

Nous utilisons des cookies statistiques pour améliorer l'expérience des utilisateurs sur notre site. Cela permet nous de mesurer des informations sur la façon dont les visiteurs. Nous permettons aussi aux statistiques pour les pages.

5.3 Cookies de marketing/duel

Les cookies de marketing/duel sont utilisés pour créer des profils d'utilisateurs et afficher des publicités ou de les suivre les utilisateurs sur notre site et d'autres sites dans le marketing et la liaison.`,
  },
  {
    id: "cookies-places",
    title: "6. Cookies placés",
    content: `Vous trouverez ci-dessous une liste complète des cookies que nous utilisons sur ce site, regroupés par catégorie.

Fonctionnel
Analytique
Marketing`,
  },
  {
    id: "consentement",
    title: "7. Consentement",
    content: `Lorsque vous visitez notre site pour la première fois, une fenêtre contextuelle vous expliquera les cookies. Dès que vous cliquerez sur « Accepter tous les cookies », vous consentez à ce que nous utilisions tous les cookies et plugins décrits dans notre politique de cookies. Si vous souhaitez désactiver les cookies analytiques, veuillez pas ceci pour eux affectent le bon fonctionnement de notre site.

7.1 Gérez vos réglages de consentement`,
  },
  {
    id: "activer-desactiver",
    title: "8. Activer/désactiver et supprimer les cookies",
    content: `Vous pouvez utiliser votre navigateur pour supprimer les cookies automatiquement ou manuellement. Vous pouvez également spécifier que certains cookies ne peuvent pas être placés. Une autre option consiste à modifier les réglages de votre navigateur pour recevoir un message chaque fois qu'un cookie est placé. Pour plus d'informations, consultez la section d'aide de votre navigateur.

Veuillez noter que notre site ne peut pas être fonctionnel si tous les cookies sont désactivés. Si vous supprimez les cookies, de nombreux paramètres seront perdus, notamment vos consentements et vos diverses préférences.`,
  },
  {
    id: "droits",
    title: "9. Vos droits concernant les données personnelles",
    content: `Vous avez les droits suivants concernant les données personnelles :

- Vous avez le droit de savoir pourquoi vos données personnelles sont nécessaires, ce qui leur arrivera et combien de temps elles seront conservées.
- Droit d'accès : vous avez le droit d'accéder à vos données personnelles que nous connaissons.
- Droit de rectification : vous avez le droit à tout moment de compléter, corriger, supprimer ou bloquer vos données personnelles.
- Si vous nous donnez votre consentement pour le traitement de vos données, vous avez le droit de le révoquer et de faire supprimer vos données personnelles.
- Droit de transfert de vos données : vous avez le droit de demander toutes vos données personnelles au responsable du traitement et de les transférer dans leur intégralité à un autre responsable du traitement.
- Droit d'opposition : vous pouvez vous opposer au traitement de vos données. Nous nous y conformerons, à moins qu'il y ait des raisons valables au traitement.

Pour exercer ces droits, veuillez nous contacter. Référez-vous aux coordonnées au bas de cette Politique de cookies. Si vous avez une plainte sur la façon dont nous traitons vos données, nous aimerions en être informés, mais vous avez également le droit de déposer une plainte auprès de l'autorité de contrôle.`,
  },
  {
    id: "coordonnees",
    title: "10. Coordonnées",
    content: `PUR Alpha
26 rue des Sablons, 95360 Montmagny
France
Site web : https://pur-alpha.fr
Email : contact@puralpha.fr
Numéro de téléphone : 06 14 79 60 47

Cette politique de cookies a été synchronisée avec cookiedatabase.org le 19 avril 2025.`,
  },
];

export default function PolitiqueCookiesPage() {
  return (
    <div className="min-h-screen">
      <PageBanner title="Politique de" titleHighlight="cookies" />

      {/* Content */}
      <div className="container mx-auto px-4 lg:px-8 py-10 lg:py-12">
        <div className="flex flex-col gap-10">
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
