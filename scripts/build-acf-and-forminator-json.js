/**
 * Script de génération et synchronisation des configurations :
 * 1. Fichiers ACF JSON complets dans /acf-json (prêts pour "ACF > Outils > Importer")
 * 2. Fichiers Forminator JSON dans /forminator-json (prêts pour "Forminator > Formulaires > Importer")
 */

const fs = require('fs');
const path = require('path');

const ACF_DIR = path.join(__dirname, '..', 'acf-json');
const FORMINATOR_DIR = path.join(__dirname, '..', 'forminator-json');

if (!fs.existsSync(ACF_DIR)) fs.mkdirSync(ACF_DIR, { recursive: true });
if (!fs.existsSync(FORMINATOR_DIR)) fs.mkdirSync(FORMINATOR_DIR, { recursive: true });

// ─────────────────────────────────────────────────────────────
// 1. ACF : ACCUEIL (pur-alpha)
// ─────────────────────────────────────────────────────────────
const acfHomePage = [
  {
    key: "group_home_page",
    title: "Page Accueil",
    active: true,
    show_in_rest: true,
    fields: [
      { key: "field_home_tab_hero", label: "Hero", type: "tab" },
      {
        key: "field_home_hero",
        label: "Section Hero",
        name: "hero",
        type: "group",
        show_in_rest: true,
        sub_fields: [
          { key: "field_home_hero_title", label: "Titre", name: "title", type: "text", default_value: "Garde et accompagnement à domicile d'enfants en" },
          { key: "field_home_hero_title_highlight", label: "Titre (partie colorée)", name: "title_highlight", type: "text", default_value: "situation de handicap" },
          { key: "field_home_hero_subtitle", label: "Sous-titre", name: "subtitle", type: "text", default_value: "Leur bien-être à domicile, votre sérénité au quotidien" },
          { key: "field_home_hero_description", label: "Description", name: "description", type: "textarea", default_value: "PUR Alpha propose une solution de services à la personne exclusivement dédiée aux enfants et jeunes en situation de handicap, de 0 à 25 ans, dans le Val-d'Oise." },
          { key: "field_home_hero_cta_primary_text", label: "CTA primaire — texte", name: "cta_primary_text", type: "text", default_value: "Demander un premier échange" },
          { key: "field_home_hero_cta_primary_url", label: "CTA primaire — URL", name: "cta_url", type: "text", default_value: "/contact" },
          { key: "field_home_hero_cta_secondary_text", label: "CTA secondaire — texte", name: "cta_secondary_text", type: "text", default_value: "Découvrir PUR Alpha en vidéo" },
          { key: "field_home_hero_image_left", label: "Image gauche", name: "hero_image_left", type: "image", return_format: "id" },
          { key: "field_home_hero_image_right", label: "Image droite", name: "hero_image_right", type: "image", return_format: "id" },
          { key: "field_home_hero_overlay_text", label: "Texte overlay", name: "hero_overlay_text", type: "textarea", default_value: "Des interventions personnalisées, assurées par des professionnels formés aux spécificités du handicap." }
        ]
      },
      { key: "field_home_tab_values", label: "Barre de valeurs", type: "tab" },
      {
        key: "field_home_values_bar",
        label: "Valeurs",
        name: "values_bar",
        type: "repeater",
        show_in_rest: true,
        layout: "table",
        button_label: "Ajouter une valeur",
        sub_fields: [
          { key: "field_home_values_image", label: "Image / Icône", name: "image", type: "image", return_format: "array" },
          { key: "field_home_values_label", label: "Label", name: "label", type: "text" }
        ]
      },
      { key: "field_home_tab_accompagnement", label: "Accompagnement", type: "tab" },
      {
        key: "field_home_accompagnement",
        label: "Section Accompagnement",
        name: "accompagnement",
        type: "group",
        show_in_rest: true,
        sub_fields: [
          { key: "field_home_acc_img_main", label: "Image mise en avant", name: "image_mise_en_avant", type: "image", return_format: "id" },
          { key: "field_home_acc_tag", label: "Tag section", name: "section_tag", type: "text", default_value: "Notre accompagnement" },
          { key: "field_home_acc_title", label: "Titre", name: "title", type: "text", default_value: "Un service à domicile, pensé pour" },
          { key: "field_home_acc_title_hl", label: "Titre (coloré)", name: "title_highlight", type: "text", default_value: "votre enfant." },
          {
            key: "field_home_acc_services",
            label: "Services",
            name: "services",
            type: "repeater",
            layout: "block",
            button_label: "Ajouter un service",
            sub_fields: [
              { key: "field_home_acc_srv_image", label: "Image", name: "image", type: "image", return_format: "id" },
              { key: "field_home_acc_srv_title", label: "Titre", name: "title", type: "text" },
              { key: "field_home_acc_srv_desc", label: "Description", name: "description", type: "textarea" }
            ]
          },
          {
            key: "field_home_acc_info_boxes",
            label: "Encarts info",
            name: "info_boxes",
            type: "repeater",
            layout: "block",
            button_label: "Ajouter un encart",
            sub_fields: [
              { key: "field_home_acc_info_title", label: "Titre", name: "title", type: "text" },
              { key: "field_home_acc_info_desc", label: "Description", name: "description", type: "textarea" }
            ]
          },
          { key: "field_home_acc_cta_text", label: "CTA texte", name: "cta_text", type: "text", default_value: "Découvrir notre offre en détail" },
          { key: "field_home_acc_cta_url", label: "CTA URL", name: "cta_url", type: "text", default_value: "/nos-services" }
        ]
      },
      { key: "field_home_tab_etapes", label: "Étapes", type: "tab" },
      {
        key: "field_home_etapes",
        label: "Section Étapes",
        name: "etapes",
        type: "group",
        show_in_rest: true,
        sub_fields: [
          { key: "field_home_et_title", label: "Titre", name: "title", type: "text", default_value: "Comment ça marche ?" },
          { key: "field_home_et_desc", label: "Description", name: "description", type: "textarea", default_value: "De la première prise de contact à la mise en place de l'intervention, PUR Alpha vous accompagne à chaque étape." },
          {
            key: "field_home_et_steps",
            label: "Étapes",
            name: "steps",
            type: "repeater",
            layout: "block",
            button_label: "Ajouter une étape",
            sub_fields: [
              { key: "field_home_et_step_image", label: "Image", name: "image", type: "image", return_format: "array" },
              { key: "field_home_et_step_title", label: "Titre", name: "title", type: "text" },
              { key: "field_home_et_step_desc", label: "Description", name: "description", type: "textarea" }
            ]
          },
          { key: "field_home_et_cta_text", label: "CTA texte", name: "cta_text", type: "text", default_value: "Demander un premier échange" },
          { key: "field_home_et_cta_url", label: "CTA URL", name: "cta_url", type: "text", default_value: "/contact" }
        ]
      },
      { key: "field_home_tab_histoire", label: "Histoire", type: "tab" },
      {
        key: "field_home_histoire",
        label: "Section Histoire",
        name: "histoire",
        type: "group",
        show_in_rest: true,
        sub_fields: [
          { key: "field_home_hist_tag", label: "Tag section", name: "section_tag", type: "text", default_value: "Notre histoire" },
          { key: "field_home_hist_title", label: "Titre", name: "title", type: "text", default_value: "Pourquoi PUR Alpha" },
          { key: "field_home_hist_title_hl", label: "Titre (coloré)", name: "title_highlight", type: "text", default_value: "existe." },
          { key: "field_home_hist_paragraph", label: "Paragraphe", name: "paragraphe", type: "wysiwyg", default_value: "<p>PUR Alpha est né d'une expérience personnelle : celle d'une mère confrontée à la difficulté de trouver un accompagnement fiable pour son enfant en situation de handicap.</p><p>De ce vécu est née une conviction : les familles ont besoin d'un relais à domicile rassurant et respectueux du quotidien de leur enfant.</p>", tabs: "all", media_upload: 0 },
          { key: "field_home_hist_cta_text", label: "CTA texte", name: "cta_text", type: "text", default_value: "Lire notre manifeste" },
          { key: "field_home_hist_cta_url", label: "CTA URL", name: "cta_url", type: "text", default_value: "/notre-histoire" },
          { key: "field_home_hist_image", label: "Image", name: "image", type: "image", return_format: "id" }
        ]
      },
      { key: "field_home_tab_territoire", label: "Territoire", type: "tab" },
      {
        key: "field_home_territoire",
        label: "Section Territoire",
        name: "territoire",
        type: "group",
        show_in_rest: true,
        sub_fields: [
          { key: "field_home_terr_tag", label: "Tag section", name: "section_tag", type: "text", default_value: "Implantation territoriale" },
          { key: "field_home_terr_title", label: "Titre", name: "title", type: "text", default_value: "Ancré dans" },
          { key: "field_home_terr_title_hl", label: "Titre (coloré)", name: "title_highlight", type: "text", default_value: "le Val-d'Oise" },
          { key: "field_home_terr_title_2", label: "Titre 2", name: "titre_2", type: "text" },
          { key: "field_home_terr_desc1", label: "Description 1", name: "description_1", type: "wysiwyg", tabs: "all", media_upload: 0 },
          { key: "field_home_terr_desc2", label: "Description 2", name: "description_2", type: "wysiwyg", tabs: "all", media_upload: 0 },
          { key: "field_home_terr_cta_text", label: "CTA texte", name: "cta_text", type: "text", default_value: "Retour en images sur l'événement" },
          { key: "field_home_terr_cta_url", label: "CTA URL", name: "cta_url", type: "text" },
          { key: "field_home_terr_map", label: "Image de carte", name: "image_de_carte", type: "image", return_format: "id" },
          {
            key: "field_home_terr_logos",
            label: "Logos partenaires",
            name: "logos",
            type: "repeater",
            layout: "table",
            button_label: "Ajouter un logo",
            sub_fields: [
              { key: "field_home_terr_logo_img", label: "Logo", name: "image_logo", type: "image", return_format: "id" }
            ]
          }
        ]
      },
      { key: "field_home_tab_parcours", label: "Parcours", type: "tab" },
      {
        key: "field_home_parcours",
        label: "Section Parcours",
        name: "parcours",
        type: "group",
        show_in_rest: true,
        sub_fields: [
          { key: "field_home_parc_tag", label: "Tag section", name: "section_tag", type: "text", default_value: "Vous êtes concerné ?" },
          { key: "field_home_parc_title", label: "Titre", name: "title", type: "text", default_value: "Choisissez votre parcours" },
          {
            key: "field_home_parc_cards",
            label: "Cartes parcours",
            name: "cards",
            type: "repeater",
            layout: "block",
            button_label: "Ajouter une carte",
            sub_fields: [
              { key: "field_home_parc_card_cov", label: "Image de couverture", name: "image_de_couverture", type: "image", return_format: "array" },
              { key: "field_home_parc_card_tag", label: "Tag", name: "tag", type: "text" },
              { key: "field_home_parc_card_title", label: "Titre", name: "title", type: "text" },
              { key: "field_home_parc_card_desc", label: "Description", name: "description", type: "textarea" },
              { key: "field_home_parc_card_cta", label: "CTA texte", name: "cta_text", type: "text" },
              { key: "field_home_parc_card_url", label: "CTA URL", name: "cta_url", type: "text" }
            ]
          }
        ]
      },
      { key: "field_home_tab_cta", label: "CTA Final", type: "tab" },
      {
        key: "field_home_cta_final",
        label: "Section CTA Final",
        name: "cta_final",
        type: "group",
        show_in_rest: true,
        sub_fields: [
          { key: "field_home_cta_bg", label: "Image de fond", name: "image_de_fond", type: "image", return_format: "array" },
          { key: "field_home_cta_title", label: "Titre", name: "title", type: "text", default_value: "Parce que votre enfant mérite un accompagnement" },
          { key: "field_home_cta_title_hl", label: "Titre (coloré)", name: "title_highlight", type: "text", default_value: "à la hauteur de ses besoins." },
          { key: "field_home_cta_subtitle", label: "Sous-titre", name: "subtitle", type: "text", default_value: "Prendre soin de son enfant, c'est aussi préserver l'équilibre de toute la famille" },
          {
            key: "field_home_cta_badges",
            label: "Badges",
            name: "badges",
            type: "repeater",
            layout: "table",
            button_label: "Ajouter un badge",
            sub_fields: [
              { key: "field_home_cta_badge_text", label: "Texte", name: "text", type: "text" }
            ]
          },
          { key: "field_home_cta_text", label: "CTA texte", name: "cta_text", type: "text", default_value: "Demander un premier échange" },
          { key: "field_home_cta_url", label: "CTA URL", name: "cta_url", type: "text", default_value: "/contact" }
        ]
      }
    ],
    location: [
      [{ param: "page_slug", operator: "==", value: "pur-alpha" }],
      [{ param: "page_type", operator: "==", value: "front_page" }]
    ]
  }
];

// ─────────────────────────────────────────────────────────────
// 2. ACF : POUR LES FAMILLES (pour-les-familles)
// ─────────────────────────────────────────────────────────────
const acfPourLesFamilles = [
  {
    key: "group_pour_les_familles",
    title: "Page Pour les Familles",
    active: true,
    show_in_rest: true,
    fields: [
      { key: "field_plf_tab_hero", label: "Hero", type: "tab" },
      {
        key: "field_plf_hero",
        label: "Hero",
        name: "hero",
        type: "group",
        show_in_rest: true,
        sub_fields: [
          { key: "field_plf_hero_title", label: "Titre", name: "title", type: "text", default_value: "Votre enfant mérite une" },
          { key: "field_plf_hero_hl", label: "Titre coloré", name: "title_highlight", type: "text", default_value: "présence stable et bienveillante" },
          { key: "field_plf_hero_desc", label: "Description", name: "description", type: "wysiwyg", tabs: "all", media_upload: 0 },
          { key: "field_plf_hero_cta1_text", label: "CTA 1 texte", name: "cta_primary_text", type: "text", default_value: "Parlons de votre situation →" },
          { key: "field_plf_hero_cta1_url", label: "CTA 1 URL", name: "cta_primary_url", type: "text", default_value: "/contact" },
          { key: "field_plf_hero_cta2_text", label: "CTA 2 texte", name: "cta_secondary_text", type: "text", default_value: "Voir les aides financières" },
          { key: "field_plf_hero_cta2_url", label: "CTA 2 URL", name: "cta_secondary_url", type: "text", default_value: "/nos-tarifs" },
          {
            key: "field_plf_hero_stats",
            label: "Stats",
            name: "stats",
            type: "repeater",
            layout: "table",
            button_label: "Ajouter une stat",
            sub_fields: [
              { key: "field_plf_stat_val", label: "Valeur", name: "value", type: "text" },
              { key: "field_plf_stat_lbl", label: "Label", name: "label", type: "text" }
            ]
          }
        ]
      },
      { key: "field_plf_tab_handicaps", label: "Handicaps", type: "tab" },
      {
        key: "field_plf_handicaps",
        label: "Handicaps",
        name: "handicaps",
        type: "group",
        show_in_rest: true,
        sub_fields: [
          { key: "field_plf_h_title", label: "Titre", name: "title", type: "text" },
          { key: "field_plf_h_hl", label: "Titre coloré", name: "title_highlight", type: "text" },
          { key: "field_plf_h_desc", label: "Description", name: "description", type: "wysiwyg", tabs: "all", media_upload: 0 },
          {
            key: "field_plf_h_types",
            label: "Types",
            name: "types",
            type: "repeater",
            layout: "table",
            button_label: "Ajouter un type",
            sub_fields: [
              { key: "field_plf_h_t_img", label: "Image / Icône", name: "image", type: "image", return_format: "array" },
              { key: "field_plf_h_t_label", label: "Label", name: "label", type: "text" }
            ]
          },
          { key: "field_plf_h_quote", label: "Citation", name: "highlight_quote", type: "text" },
          { key: "field_plf_h_qdesc", label: "Détail citation", name: "highlight_description", type: "textarea" }
        ]
      },
      { key: "field_plf_tab_services", label: "Services", type: "tab" },
      {
        key: "field_plf_services",
        label: "Services",
        name: "services",
        type: "group",
        show_in_rest: true,
        sub_fields: [
          { key: "field_plf_s_title", label: "Titre", name: "title", type: "text" },
          { key: "field_plf_s_hl", label: "Titre coloré", name: "title_highlight", type: "text" },
          { key: "field_plf_s_desc", label: "Description", name: "description", type: "wysiwyg", tabs: "all", media_upload: 0 },
          {
            key: "field_plf_s_cards",
            label: "Cartes",
            name: "cards",
            type: "repeater",
            layout: "block",
            button_label: "Ajouter une carte",
            sub_fields: [
              { key: "field_plf_s_c_tag", label: "Tag", name: "tag", type: "text" },
              { key: "field_plf_s_c_img", label: "Image", name: "image", type: "image", return_format: "id" },
              { key: "field_plf_s_c_title", label: "Titre", name: "title", type: "text" },
              { key: "field_plf_s_c_desc", label: "Description", name: "description", type: "textarea" },
              {
                key: "field_plf_s_c_tags",
                label: "Tags",
                name: "tags",
                type: "repeater",
                layout: "table",
                button_label: "Ajouter un tag",
                sub_fields: [{ key: "field_plf_s_c_t_text", label: "Texte", name: "text", type: "text" }]
              }
            ]
          }
        ]
      },
      { key: "field_plf_tab_etapes", label: "Étapes", type: "tab" },
      {
        key: "field_plf_etapes",
        label: "Section Étapes",
        name: "etapes",
        type: "group",
        show_in_rest: true,
        sub_fields: [
          { key: "field_plf_et_title", label: "Titre", name: "title", type: "text", default_value: "Comment ça marche ?" },
          { key: "field_plf_et_desc", label: "Description", name: "description", type: "textarea", default_value: "De la première prise de contact à l'intervention, nous vous accompagnons à chaque étape." },
          {
            key: "field_plf_et_steps",
            label: "Étapes",
            name: "steps",
            type: "repeater",
            layout: "block",
            button_label: "Ajouter une étape",
            sub_fields: [
              { key: "field_plf_et_st_title", label: "Titre de l'étape", name: "title", type: "text" },
              {
                key: "field_plf_et_st_items",
                label: "Points clés",
                name: "items",
                type: "repeater",
                layout: "table",
                button_label: "Ajouter un point",
                sub_fields: [
                  { key: "field_plf_et_st_i_text", label: "Texte", name: "text", type: "text" }
                ]
              }
            ]
          },
          { key: "field_plf_et_cta_text", label: "CTA Texte", name: "cta_text", type: "text", default_value: "Prendre contact" },
          { key: "field_plf_et_cta_url", label: "CTA URL", name: "cta_url", type: "text", default_value: "/contact" }
        ]
      },
      { key: "field_plf_tab_garanties", label: "Garanties", type: "tab" },
      {
        key: "field_plf_garanties",
        label: "Garanties",
        name: "garanties",
        type: "group",
        show_in_rest: true,
        sub_fields: [
          { key: "field_plf_g_title", label: "Titre", name: "title", type: "text" },
          { key: "field_plf_g_hl", label: "Titre coloré", name: "title_highlight", type: "text" },
          { key: "field_plf_g_desc", label: "Description", name: "description", type: "wysiwyg", tabs: "all", media_upload: 0 },
          {
            key: "field_plf_g_items",
            label: "Garanties Ligne 1",
            name: "items",
            type: "repeater",
            layout: "block",
            button_label: "Ajouter une garantie",
            sub_fields: [
              { key: "field_plf_g_i_img", label: "Image / Icône", name: "image", type: "image", return_format: "array" },
              { key: "field_plf_g_i_title", label: "Titre", name: "title", type: "text" },
              { key: "field_plf_g_i_desc", label: "Description", name: "description", type: "textarea" }
            ]
          },
          {
            key: "field_plf_g_l2",
            label: "Garanties Ligne 2",
            name: "garanties_ligne_2",
            type: "repeater",
            layout: "block",
            button_label: "Ajouter un élément ligne 2",
            sub_fields: [
              { key: "field_plf_g_l2_img", label: "Image", name: "image", type: "image", return_format: "array" },
              { key: "field_plf_g_l2_titre", label: "Titre", name: "titre", type: "text" },
              { key: "field_plf_g_l2_desc", label: "Description", name: "description", type: "textarea" }
            ]
          },
          {
            key: "field_plf_g_l3",
            label: "Garanties Ligne 3",
            name: "garantie_ligne_3",
            type: "repeater",
            layout: "block",
            button_label: "Ajouter un élément ligne 3",
            sub_fields: [
              { key: "field_plf_g_l3_titre", label: "Titre", name: "titre", type: "text" },
              { key: "field_plf_g_l3_desc", label: "Description", name: "description", type: "textarea" }
            ]
          },
          { key: "field_plf_g_l4", label: "Garantie Ligne 4 (Texte récapitulatif)", name: "garantie_ligne_4", type: "textarea" }
        ]
      },
      { key: "field_plf_tab_faq", label: "FAQ", type: "tab" },
      {
        key: "field_plf_faq",
        label: "FAQ",
        name: "faq",
        type: "group",
        show_in_rest: true,
        sub_fields: [
          { key: "field_plf_faq_tag", label: "Tag", name: "section_tag", type: "text", default_value: "Questions fréquentes" },
          { key: "field_plf_faq_title", label: "Titre", name: "title", type: "text", default_value: "Vos questions," },
          { key: "field_plf_faq_hl", label: "Titre coloré", name: "title_highlight", type: "text", default_value: "nos réponses" },
          {
            key: "field_plf_faq_items",
            label: "Questions",
            name: "items",
            type: "repeater",
            layout: "block",
            button_label: "Ajouter une question",
            sub_fields: [
              { key: "field_plf_faq_q", label: "Question", name: "question", type: "text" },
              { key: "field_plf_faq_a", label: "Réponse", name: "answer", type: "textarea" }
            ]
          }
        ]
      },
      { key: "field_plf_tab_cta", label: "CTA Final", type: "tab" },
      {
        key: "field_plf_cta",
        label: "CTA Final",
        name: "cta_final",
        type: "group",
        show_in_rest: true,
        sub_fields: [
          { key: "field_plf_cta_bg", label: "Image de fond", name: "image_de_fond", type: "image", return_format: "id" },
          { key: "field_plf_cta_title", label: "Titre", name: "title", type: "text" },
          { key: "field_plf_cta_hl", label: "Titre coloré", name: "title_highlight", type: "text" },
          { key: "field_plf_cta_sub", label: "Sous-titre", name: "subtitle", type: "text" },
          {
            key: "field_plf_cta_badges",
            label: "Badges",
            name: "badges",
            type: "repeater",
            layout: "table",
            button_label: "Ajouter un badge",
            sub_fields: [{ key: "field_plf_cta_b_text", label: "Texte", name: "text", type: "text" }]
          },
          { key: "field_plf_cta_text", label: "CTA texte", name: "cta_text", type: "text", default_value: "Prendre contact" },
          { key: "field_plf_cta_url", label: "CTA URL", name: "cta_url", type: "text", default_value: "/contact" }
        ]
      }
    ],
    location: [[{ param: "page_slug", operator: "==", value: "pour-les-familles" }]]
  }
];

// ─────────────────────────────────────────────────────────────
// 3. ACF : NOUS REJOINDRE (nous-rejoindre)
// ─────────────────────────────────────────────────────────────
const acfNousRejoindre = [
  {
    key: "group_nous_rejoindre",
    title: "Page Nous Rejoindre",
    active: true,
    show_in_rest: true,
    fields: [
      { key: "field_nr_tab_hero", label: "Hero", type: "tab" },
      {
        key: "field_nr_hero",
        label: "Hero",
        name: "hero",
        type: "group",
        show_in_rest: true,
        sub_fields: [
          { key: "field_nr_hero_l1", label: "Titre ligne 1", name: "title_line_1", type: "text", default_value: "Vous aimez" },
          { key: "field_nr_hero_l2", label: "Titre ligne 2", name: "title_line_2", type: "text", default_value: "les gens." },
          { key: "field_nr_hero_hl", label: "Titre coloré", name: "title_highlight", type: "text", default_value: "Rejoignez-nous." },
          { key: "field_nr_hero_desc", label: "Description", name: "description", type: "wysiwyg", tabs: "all", media_upload: 0 },
          { key: "field_nr_hero_cta1", label: "CTA primaire texte", name: "cta_primary_text", type: "text", default_value: "Candidater maintenant" },
          { key: "field_nr_hero_cta2", label: "CTA secondaire texte", name: "cta_secondary_text", type: "text", default_value: "Poser une question" }
        ]
      },
      { key: "field_nr_tab_avantages", label: "Avantages", type: "tab" },
      {
        key: "field_nr_avantages",
        label: "Avantages",
        name: "avantages",
        type: "group",
        show_in_rest: true,
        sub_fields: [
          { key: "field_nr_av_tag", label: "Tag", name: "section_tag", type: "text", default_value: "Pourquoi nous rejoindre" },
          { key: "field_nr_av_title", label: "Titre", name: "title", type: "text" },
          { key: "field_nr_av_hl", label: "Titre coloré", name: "title_highlight", type: "text" },
          { key: "field_nr_av_desc", label: "Description", name: "description", type: "wysiwyg", tabs: "all", media_upload: 0 },
          {
            key: "field_nr_av_cards",
            label: "Cartes",
            name: "cards",
            type: "repeater",
            layout: "block",
            button_label: "Ajouter un avantage",
            sub_fields: [
              { key: "field_nr_avc_img", label: "Image / Icône", name: "image", type: "image", return_format: "array" },
              { key: "field_nr_avc_title", label: "Titre", name: "title", type: "text" },
              { key: "field_nr_avc_desc", label: "Description", name: "description", type: "textarea" }
            ]
          }
        ]
      },
      { key: "field_nr_tab_valeurs", label: "Valeurs humaines", type: "tab" },
      {
        key: "field_nr_valeurs",
        label: "Valeurs humaines",
        name: "valeurs_humaines",
        type: "group",
        show_in_rest: true,
        sub_fields: [
          { key: "field_nr_vh_tag", label: "Tag", name: "section_tag", type: "text", default_value: "Nos valeurs humaines" },
          { key: "field_nr_vh_title", label: "Titre", name: "title", type: "text" },
          { key: "field_nr_vh_hl", label: "Titre coloré", name: "title_highlight", type: "text" },
          { key: "field_nr_vh_paragraph", label: "Paragraphe", name: "paragraph", type: "wysiwyg", tabs: "all", media_upload: 0 },
          {
            key: "field_nr_vh_quals",
            label: "Qualités",
            name: "qualities",
            type: "repeater",
            layout: "table",
            button_label: "Ajouter une qualité",
            sub_fields: [{ key: "field_nr_vhq_text", label: "Texte", name: "text", type: "text" }]
          },
          { key: "field_nr_vh_img", label: "Image", name: "image", type: "image", return_format: "id" }
        ]
      },
      { key: "field_nr_tab_formation", label: "Formation & accompagnement", type: "tab" },
      { key: "field_nr_formation_tag", label: "Tag Formation", name: "formation_tag", type: "text", default_value: "Formation & accompagnement" },
      { key: "field_nr_formation_title", label: "Titre Formation (ligne 1)", name: "formation_title", type: "text", default_value: "Vous êtes formés avant d'intervenir, puis" },
      { key: "field_nr_formation_hl", label: "Titre Formation coloré", name: "formation_title_highlight", type: "text", default_value: "accompagnés" },
      { key: "field_nr_formation_end", label: "Titre Formation (suite)", name: "formation_title_end", type: "text", default_value: "dans vos missions" },
      { key: "field_nr_formation_desc", label: "Description Formation", name: "formation_description", type: "textarea" },
      {
        key: "field_nr_formation_etapes",
        label: "Étapes formation",
        name: "formation_etapes",
        type: "repeater",
        layout: "table",
        button_label: "Ajouter une étape",
        sub_fields: [
          { key: "field_nr_fe_valeur", label: "Valeur (ex: 70h)", name: "valeur", type: "text" },
          { key: "field_nr_fe_soustitre", label: "Sous-titre", name: "sous_titre", type: "text" },
          { key: "field_nr_fe_titre", label: "Titre", name: "titre", type: "textarea", rows: 2 },
          { key: "field_nr_fe_desc", label: "Description", name: "description", type: "textarea", rows: 2 }
        ]
      },
      { key: "field_nr_tab_temoignage", label: "Témoignage", type: "tab" },
      {
        key: "field_nr_temoignage",
        label: "Témoignage",
        name: "temoignage",
        type: "group",
        show_in_rest: true,
        sub_fields: [
          { key: "field_nr_tem_bg", label: "Image de fond", name: "image_de_fond", type: "image", return_format: "array" },
          { key: "field_nr_tem_quote", label: "Citation", name: "quote", type: "textarea" },
          { key: "field_nr_tem_author", label: "Auteur", name: "author", type: "text" }
        ]
      },
      { key: "field_nr_tab_process", label: "Process de recrutement", type: "tab" },
      {
        key: "field_nr_process",
        label: "Process de recrutement",
        name: "process",
        type: "group",
        show_in_rest: true,
        sub_fields: [
          { key: "field_nr_pr_tag", label: "Tag", name: "section_tag", type: "text", default_value: "Process de recrutement" },
          { key: "field_nr_pr_title", label: "Titre", name: "title", type: "text", default_value: "Simple," },
          { key: "field_nr_pr_hl", label: "Titre coloré", name: "title_highlight", type: "text", default_value: "transparent" },
          { key: "field_nr_pr_tend", label: "Fin du titre", name: "title_end", type: "text", default_value: ", humain" },
          {
            key: "field_nr_pr_etapes",
            label: "Étapes",
            name: "etapes",
            type: "repeater",
            layout: "block",
            button_label: "Ajouter une étape",
            sub_fields: [
              { key: "field_nr_pre_num", label: "Numéro", name: "num", type: "text" },
              { key: "field_nr_pre_icon", label: "Icône alternative", name: "icon", type: "text" },
              { key: "field_nr_pre_title", label: "Titre", name: "title", type: "text" },
              { key: "field_nr_pre_desc", label: "Description", name: "description", type: "textarea" }
            ]
          }
        ]
      },
      { key: "field_nr_tab_faq", label: "FAQ", type: "tab" },
      {
        key: "field_nr_faq",
        label: "FAQ",
        name: "faq",
        type: "group",
        show_in_rest: true,
        sub_fields: [
          { key: "field_nr_faq_tag", label: "Tag", name: "section_tag", type: "text", default_value: "FAQ" },
          { key: "field_nr_faq_title", label: "Titre", name: "title", type: "text" },
          { key: "field_nr_faq_hl", label: "Titre coloré", name: "title_highlight", type: "text" },
          {
            key: "field_nr_faq_items",
            label: "Questions",
            name: "items",
            type: "repeater",
            layout: "block",
            button_label: "Ajouter une question",
            sub_fields: [
              { key: "field_nr_faq_q", label: "Question", name: "question", type: "text" },
              { key: "field_nr_faq_a", label: "Réponse", name: "answer", type: "textarea" }
            ]
          }
        ]
      },
      { key: "field_nr_tab_form", label: "Formulaire", type: "tab" },
      {
        key: "field_nr_formulaire",
        label: "Formulaire",
        name: "formulaire",
        type: "group",
        show_in_rest: true,
        sub_fields: [
          { key: "field_nr_form_tag", label: "Tag", name: "section_tag", type: "text", default_value: "Formulaire de candidature" },
          { key: "field_nr_form_title", label: "Titre", name: "title", type: "text", default_value: "Prêt(e) à rejoindre l'équipe PUR Alpha ?" },
          { key: "field_nr_form_desc", label: "Description", name: "description", type: "wysiwyg", tabs: "all", media_upload: 0 },
          { key: "field_nr_form_submit", label: "Texte bouton", name: "submit_text", type: "text", default_value: "Envoyer ma candidature" },
          { key: "field_nr_form_email", label: "Email fallback", name: "email_fallback", type: "text", default_value: "contact@puralpha.fr" },
          { key: "field_nr_form_note", label: "Note de bas de page", name: "notes", type: "textarea" }
        ]
      }
    ],
    location: [[{ param: "page_slug", operator: "==", value: "nous-rejoindre" }]]
  }
];

// ─────────────────────────────────────────────────────────────
// 4. ACF : NOTRE HISTOIRE (notre-histoire)
// ─────────────────────────────────────────────────────────────
const acfNotreHistoire = [
  {
    key: "group_notre_histoire",
    title: "Page Notre Histoire",
    active: true,
    show_in_rest: true,
    fields: [
      { key: "field_nh_tab_hero", label: "Hero", type: "tab" },
      {
        key: "field_nh_hero",
        label: "Hero",
        name: "hero",
        type: "group",
        show_in_rest: true,
        sub_fields: [
          { key: "field_nh_hero_tag", label: "Tag de section", name: "section_tag", type: "text", default_value: "Notre histoire" },
          { key: "field_nh_hero_title", label: "Titre", name: "title", type: "text", default_value: "Pourquoi PUR Alpha" },
          { key: "field_nh_hero_hl", label: "Titre (coloré)", name: "title_highlight", type: "text", default_value: "existe" },
          { key: "field_nh_hero_desc", label: "Description", name: "description", type: "textarea", rows: 3, default_value: "PUR Alpha est né de mon histoire avec Matthew, mon fils, porteur du syndrome PURA, et de plusieurs années passées à chercher pour lui un accompagnement à domicile fiable et stable." },
          { key: "field_nh_hero_quote", label: "Citation", name: "quote", type: "textarea", rows: 2, default_value: "Ce que je n'ai pas trouvé pour mon fils, j'ai décidé de le construire pour d'autres familles." },
          { key: "field_nh_hero_fname", label: "Nom de la fondatrice", name: "founder_name", type: "text", default_value: "Arame Bougha" },
          { key: "field_nh_hero_frole", label: "Rôle de la fondatrice", name: "founder_role", type: "text", default_value: "Fondatrice de PUR Alpha" },
          { key: "field_nh_hero_photo", label: "Photo", name: "photo", type: "image", return_format: "id", preview_size: "medium" },
          { key: "field_nh_hero_plegende", label: "Légende de la photo", name: "photo_legende", type: "text", default_value: "Photographie d'Arame & Matthew" },
          { key: "field_nh_hero_pnote", label: "Note (emplacement réservé)", name: "photo_note", type: "text", default_value: "Photo personnelle à intégrer — aucune image de substitution n'est publiée avant validation." }
        ]
      },
      { key: "field_nh_tab_relais", label: "Trouver un relais", type: "tab" },
      {
        key: "field_nh_relais",
        label: "Quand trouver un relais devient un parcours",
        name: "relais",
        type: "group",
        show_in_rest: true,
        sub_fields: [
          { key: "field_nh_rel_title", label: "Titre", name: "title", type: "text", default_value: "Quand trouver un relais" },
          { key: "field_nh_rel_hl", label: "Titre (coloré)", name: "title_highlight", type: "text", default_value: "devient un parcours" },
          { key: "field_nh_rel_p1", label: "Paragraphe 1", name: "paragraph_1", type: "textarea", rows: 3, default_value: "J'ai connu les changements d'intervenants, les absences, les difficultés de remplacement et ces moments où il faut encore réorganiser le quotidien et tout réexpliquer." },
          { key: "field_nh_rel_p2", label: "Paragraphe 2", name: "paragraph_2", type: "textarea", rows: 2, default_value: "Comme beaucoup de parents, je ne cherchais pas simplement quelqu'un de disponible quelques heures." },
          { key: "field_nh_rel_ph", label: "Paragraphe en gras", name: "paragraph_highlight", type: "textarea", rows: 2, default_value: "Je cherchais une personne préparée, un accompagnement stable et une organisation sur laquelle je puisse compter." },
          { key: "field_nh_rel_img", label: "Image", name: "image", type: "image", return_format: "id", preview_size: "medium" },
          { key: "field_nh_rel_alt", label: "Texte alternatif de l'image", name: "image_alt", type: "text", default_value: "Accompagnement d'un enfant à domicile" }
        ]
      },
      { key: "field_nh_tab_galerie", label: "Galerie quotidien", type: "tab" },
      {
        key: "field_nh_galerie",
        label: "Matthew et moi, au quotidien",
        name: "galerie",
        type: "group",
        show_in_rest: true,
        sub_fields: [
          { key: "field_nh_gal_title", label: "Titre", name: "title", type: "text", default_value: "Matthew et moi," },
          { key: "field_nh_gal_hl", label: "Titre (coloré)", name: "title_highlight", type: "text", default_value: "au quotidien" },
          {
            key: "field_nh_gal_photos",
            label: "Photos",
            name: "photos",
            type: "repeater",
            layout: "block",
            button_label: "Ajouter une photo",
            sub_fields: [
              { key: "field_nh_gal_p_img", label: "Photo", name: "photo", type: "image", return_format: "id", preview_size: "medium" },
              { key: "field_nh_gal_p_lib", label: "Libellé", name: "libelle", type: "text", default_value: "Arame & Matthew" },
              { key: "field_nh_gal_p_note", label: "Note (si photo absente)", name: "note", type: "text", default_value: "Emplacement réservé" }
            ]
          }
        ]
      },
      { key: "field_nh_tab_video", label: "Vidéo", type: "tab" },
      {
        key: "field_nh_video",
        label: "Notre histoire, racontée de vive voix",
        name: "video",
        type: "group",
        show_in_rest: true,
        sub_fields: [
          { key: "field_nh_vid_title", label: "Titre", name: "title", type: "text", default_value: "Notre histoire, racontée" },
          { key: "field_nh_vid_hl", label: "Titre (coloré)", name: "title_highlight", type: "text", default_value: "de vive voix" },
          { key: "field_nh_vid_desc", label: "Description", name: "description", type: "textarea", rows: 4, default_value: "Certaines choses se comprennent mieux quand on les entend. Je reviens sur ces années passées à chercher un accompagnement fiable pour Matthew, sur ce qui manquait vraiment aux familles, et sur la conviction qui a donné naissance à PUR Alpha." },
          { key: "field_nh_vid_url", label: "URL de la vidéo", name: "video_url", type: "url" },
          { key: "field_nh_vid_plabel", label: "Libellé (emplacement réservé)", name: "placeholder_label", type: "text", default_value: "Vidéo à venir" },
          { key: "field_nh_vid_pnote", label: "Note (emplacement réservé)", name: "placeholder_note", type: "text", default_value: "Emplacement réservé" }
        ]
      },
      { key: "field_nh_tab_construction", label: "Construction", type: "tab" },
      {
        key: "field_nh_construction",
        label: "Ce qui manquait, j'ai décidé de le construire",
        name: "construction",
        type: "group",
        show_in_rest: true,
        sub_fields: [
          { key: "field_nh_con_title", label: "Titre", name: "title", type: "text", default_value: "Ce qui manquait, j'ai décidé de" },
          { key: "field_nh_con_hl", label: "Titre (coloré)", name: "title_highlight", type: "text", default_value: "le construire" },
          { key: "field_nh_con_p1", label: "Paragraphe 1", name: "paragraph_1", type: "textarea", rows: 2, default_value: "Avec le temps, une conviction s'est imposée : la qualité d'un accompagnement ne repose pas seulement sur la personne qui intervient." },
          { key: "field_nh_con_p2", label: "Paragraphe 2", name: "paragraph_2", type: "textarea", rows: 2, default_value: "Elle repose aussi sur la manière dont elle est recrutée, préparée, encadrée et suivie." },
          { key: "field_nh_con_ph", label: "Paragraphe en gras", name: "paragraph_highlight", type: "textarea", rows: 2, default_value: "C'est de cette conviction qu'est né PUR Alpha." },
          { key: "field_nh_con_img", label: "Image", name: "image", type: "image", return_format: "id", preview_size: "medium" },
          { key: "field_nh_con_alt", label: "Texte alternatif de l'image", name: "image_alt", type: "text", default_value: "Une famille accompagnée par PUR Alpha" }
        ]
      },
      { key: "field_nh_tab_experience", label: "Expérience", type: "tab" },
      {
        key: "field_nh_experience",
        label: "Une expérience personnelle, mais aussi professionnelle",
        name: "experience",
        type: "group",
        show_in_rest: true,
        sub_fields: [
          { key: "field_nh_exp_title", label: "Titre", name: "title", type: "text", default_value: "Une expérience personnelle, mais aussi" },
          { key: "field_nh_exp_hl", label: "Titre (coloré)", name: "title_highlight", type: "text", default_value: "professionnelle" },
          {
            key: "field_nh_exp_stats",
            label: "Chiffres clés",
            name: "stats",
            type: "repeater",
            layout: "block",
            button_label: "Ajouter un chiffre",
            sub_fields: [
              { key: "field_nh_exp_s_chiffre", label: "Chiffre", name: "chiffre", type: "text", default_value: "20 ans +" },
              { key: "field_nh_exp_s_desc", label: "Description", name: "description", type: "textarea", rows: 2, default_value: "d'expérience professionnelle, dont la gestion administrative de PME et TPE" }
            ]
          },
          { key: "field_nh_exp_p1", label: "Paragraphe", name: "paragraph_1", type: "textarea", rows: 4 },
          { key: "field_nh_exp_ph", label: "Paragraphe en gras", name: "paragraph_highlight", type: "textarea", rows: 3 }
        ]
      },
      { key: "field_nh_tab_methode", label: "Méthode", type: "tab" },
      {
        key: "field_nh_methode",
        label: "Du vécu à une méthode",
        name: "methode",
        type: "group",
        show_in_rest: true,
        sub_fields: [
          { key: "field_nh_met_title", label: "Titre", name: "title", type: "text", default_value: "Du vécu à une" },
          { key: "field_nh_met_hl", label: "Titre (coloré)", name: "title_highlight", type: "text", default_value: "méthode" },
          { key: "field_nh_met_desc", label: "Description", name: "description", type: "textarea", rows: 3 },
          {
            key: "field_nh_met_etapes",
            label: "Étapes",
            name: "etapes",
            type: "repeater",
            layout: "block",
            button_label: "Ajouter une étape",
            sub_fields: [
              { key: "field_nh_met_e_titre", label: "Titre", name: "titre", type: "text" }
            ]
          }
        ]
      },
      { key: "field_nh_tab_valeurs", label: "Valeurs", type: "tab" },
      {
        key: "field_nh_valeurs",
        label: "Ce qui guide PUR Alpha",
        name: "valeurs",
        type: "group",
        show_in_rest: true,
        sub_fields: [
          { key: "field_nh_val_tag", label: "Tag de section", name: "section_tag", type: "text", default_value: "Nos valeurs" },
          { key: "field_nh_val_title", label: "Titre", name: "title", type: "text", default_value: "Ce qui guide" },
          { key: "field_nh_val_hl", label: "Titre (coloré)", name: "title_highlight", type: "text", default_value: "PUR Alpha" },
          {
            key: "field_nh_val_items",
            label: "Valeurs",
            name: "items",
            type: "repeater",
            layout: "block",
            button_label: "Ajouter une valeur",
            sub_fields: [
              { key: "field_nh_val_i_img", label: "Image", name: "image", type: "image", return_format: "id", preview_size: "medium" },
              { key: "field_nh_val_i_titre", label: "Titre", name: "titre", type: "text", default_value: "Exigence" },
              { key: "field_nh_val_i_desc", label: "Description", name: "description", type: "textarea" }
            ]
          }
        ]
      },
      { key: "field_nh_tab_citation", label: "Citation finale", type: "tab" },
      {
        key: "field_nh_citation",
        label: "Citation finale + CTA",
        name: "citation_finale",
        type: "group",
        show_in_rest: true,
        sub_fields: [
          { key: "field_nh_cit_bg", label: "Image de fond", name: "background_image", type: "image", return_format: "id" },
          { key: "field_nh_cit_text", label: "Citation", name: "citation", type: "textarea", rows: 3 },
          { key: "field_nh_cit_auteur", label: "Auteur", name: "auteur", type: "text", default_value: "Arame Bougha" },
          { key: "field_nh_cit_role", label: "Rôle", name: "role", type: "text", default_value: "Fondatrice et présidente de PUR Alpha" },
          { key: "field_nh_cit_cta_texte", label: "Texte du bouton", name: "cta_texte", type: "text", default_value: "Découvrir nos services" },
          { key: "field_nh_cit_cta_url", label: "URL du bouton", name: "cta_url", type: "text", default_value: "/nos-services" }
        ]
      }
    ],
    location: [[{ param: "page_slug", operator: "==", value: "notre-histoire" }]]
  }
];

// ─────────────────────────────────────────────────────────────
// 5. ACF : AIDES FINANCIÈRES (aides-financieres)
// ─────────────────────────────────────────────────────────────
const acfAidesFinancieres = [
  {
    key: "group_aides_financieres",
    title: "Page Aides Financières",
    active: true,
    show_in_rest: true,
    fields: [
      { key: "field_af_tab_hero", label: "Hero", type: "tab" },
      {
        key: "field_af_hero",
        label: "Hero",
        name: "hero",
        type: "group",
        show_in_rest: true,
        sub_fields: [
          { key: "field_af_hero_l1", label: "Titre ligne 1", name: "title_line_1", type: "text", default_value: "L'accompagnement" },
          { key: "field_af_hero_l2", label: "Titre ligne 2", name: "title_line_2", type: "text", default_value: "que vous méritez," },
          { key: "field_af_hero_hl", label: "Titre coloré", name: "title_highlight", type: "text", default_value: "au juste prix." },
          { key: "field_af_hero_desc", label: "Description", name: "description", type: "wysiwyg", tabs: "all", media_upload: 0 }
        ]
      },
      { key: "field_af_tab_rac", label: "Reste à charge", type: "tab" },
      { key: "field_af_rac_image", label: "Image reste à charge", name: "reste_a_charge_image", type: "image", return_format: "id" },
      { key: "field_af_rac_caption", label: "Légende de l'image", name: "reste_a_charge_image_caption", type: "text" },
      { key: "field_af_rac_title", label: "Titre", name: "reste_a_charge_title", type: "text", default_value: "Comprendre votre reste à charge" },
      { key: "field_af_rac_hl", label: "Titre coloré", name: "reste_a_charge_title_highlight", type: "text", default_value: "avant de vous engager" },
      { key: "field_af_rac_desc", label: "Description", name: "reste_a_charge_description", type: "textarea" },
      { key: "field_af_rac_cta_text", label: "Texte CTA principal", name: "reste_a_charge_cta_primary_text", type: "text", default_value: "Demander une simulation personnalisée" },
      { key: "field_af_rac_cta_url", label: "URL CTA principal", name: "reste_a_charge_cta_primary_url", type: "text", default_value: "/contact" },
      { key: "field_af_rac_cta_sec_text", label: "Texte CTA secondaire", name: "reste_a_charge_cta_secondary_text", type: "text", default_value: "Voir les aides mobilisables" },
      { key: "field_af_rac_cta_sec_url", label: "URL CTA secondaire", name: "reste_a_charge_cta_secondary_url", type: "text", default_value: "#dispositifs" },

      { key: "field_af_tab_aides", label: "Aides", type: "tab" },
      {
        key: "field_af_aides",
        label: "Aides",
        name: "aides",
        type: "group",
        show_in_rest: true,
        sub_fields: [
          { key: "field_af_a_tag", label: "Tag", name: "section_tag", type: "text", default_value: "Dispositifs mobilisables" },
          { key: "field_af_a_title", label: "Titre", name: "title", type: "text" },
          { key: "field_af_a_hl", label: "Titre coloré", name: "title_highlight", type: "text" },
          { key: "field_af_a_desc", label: "Description", name: "description", type: "wysiwyg", tabs: "all", media_upload: 0 },
          {
            key: "field_af_a_cards",
            label: "Cartes aides",
            name: "cards",
            type: "repeater",
            layout: "block",
            button_label: "Ajouter un dispositif",
            sub_fields: [
              { key: "field_af_ac_color", label: "Couleur accent", name: "accent_color", type: "text" },
              { key: "field_af_ac_img", label: "Image / Icône", name: "image", type: "image", return_format: "array" },
              { key: "field_af_ac_title", label: "Titre", name: "title", type: "text" },
              { key: "field_af_ac_sub", label: "Sous-titre", name: "subtitle", type: "text" },
              { key: "field_af_ac_desc", label: "Description", name: "description", type: "textarea" },
              { key: "field_af_ac_hval", label: "Valeur mise en avant", name: "highlight_value", type: "text" },
              { key: "field_af_ac_hlbl", label: "Label valeur", name: "highlight_label", type: "text" },
              {
                key: "field_af_ac_tags",
                label: "Tags",
                name: "tags",
                type: "repeater",
                layout: "table",
                button_label: "Ajouter un tag",
                sub_fields: [{ key: "field_af_act_text", label: "Texte", name: "text", type: "text" }]
              }
            ]
          }
        ]
      },
      { key: "field_af_tab_tarif", label: "Tarification", type: "tab" },
      {
        key: "field_af_tarif",
        label: "Tarification",
        name: "tarification",
        type: "group",
        show_in_rest: true,
        sub_fields: [
          { key: "field_af_t_tag", label: "Tag", name: "section_tag", type: "text", default_value: "Notre tarification" },
          { key: "field_af_t_title", label: "Titre", name: "title", type: "text", default_value: "Un tarif unique." },
          { key: "field_af_t_hl", label: "Titre coloré", name: "title_highlight", type: "text", default_value: "Aucune surprise." },
          { key: "field_af_t_price", label: "Prix", name: "price", type: "text", default_value: "38" },
          { key: "field_af_t_details", label: "Détails prix", name: "price_details", type: "text", default_value: "TTC / heure · TVA 5,5% · Tarif tout compris" },
          {
            key: "field_af_t_inclus",
            label: "Inclus",
            name: "inclus_badges",
            type: "repeater",
            layout: "table",
            button_label: "Ajouter un élément inclus",
            sub_fields: [{ key: "field_af_ti_text", label: "Texte", name: "text", type: "text" }]
          },
          {
            key: "field_af_t_rows",
            label: "Lignes tableau",
            name: "rows",
            type: "repeater",
            layout: "table",
            button_label: "Ajouter une ligne tarifaire",
            sub_fields: [
              { key: "field_af_tr_creneau", label: "Créneau", name: "creneau", type: "text" },
              { key: "field_af_tr_ttc", label: "Tarif TTC", name: "tarif_ttc", type: "text" },
              { key: "field_af_tr_pch", label: "Aide PCH", name: "aide_pch", type: "text" },
              { key: "field_af_tr_ci", label: "Crédit impôt", name: "credit_impot", type: "text" },
              { key: "field_af_tr_rac", label: "Reste à charge", name: "reste_a_charge", type: "text" }
            ]
          },
          { key: "field_af_t_footnote", label: "Note de bas", name: "footnote", type: "textarea" },
          { key: "field_af_t_est_title", label: "Titre estimation", name: "estimation_title", type: "text" },
          { key: "field_af_t_est_desc", label: "Description estimation", name: "estimation_description", type: "wysiwyg", tabs: "all", media_upload: 0 },
          { key: "field_af_t_est_cta_text", label: "Texte CTA estimation", name: "estimation_cta_text", type: "text" },
          { key: "field_af_t_est_cta_url", label: "URL CTA estimation", name: "estimation_cta_url", type: "text" }
        ]
      },
      { key: "field_af_tab_simulateur", label: "Simulateur", type: "tab" },
      {
        key: "field_af_simulateur",
        label: "Simulateur",
        name: "simulateur",
        type: "group",
        show_in_rest: true,
        sub_fields: [
          { key: "field_af_sim_tag", label: "Tag", name: "tag", type: "text" },
          { key: "field_af_sim_title", label: "Titre", name: "titre", type: "text" },
          { key: "field_af_sim_hl", label: "Titre coloré", name: "title_highlight", type: "text" },
          { key: "field_af_sim_desc", label: "Description", name: "description", type: "wysiwyg", tabs: "all", media_upload: 0 }
        ]
      },
      { key: "field_af_tab_accomp", label: "Accompagnement administratif", type: "tab" },
      {
        key: "field_af_accomp",
        label: "Accompagnement",
        name: "accompagnement_administratif",
        type: "group",
        show_in_rest: true,
        sub_fields: [
          { key: "field_af_acc_tag", label: "Tag", name: "tag", type: "text" },
          { key: "field_af_acc_title1", label: "Titre 1", name: "titre_1", type: "text" },
          { key: "field_af_acc_title2", label: "Titre 2", name: "titre_2", type: "text" },
          { key: "field_af_acc_hl", label: "Titre coloré", name: "title_highlight", type: "text" },
          { key: "field_af_acc_desc", label: "Description", name: "description", type: "wysiwyg", tabs: "all", media_upload: 0 },
          {
            key: "field_af_acc_items",
            label: "Accompagnements",
            name: "accompagnements",
            type: "repeater",
            layout: "block",
            button_label: "Ajouter un point",
            sub_fields: [
              { key: "field_af_acci_ordre", label: "Ordre", name: "ordre", type: "number" },
              { key: "field_af_acci_title", label: "Titre", name: "titre", type: "text" },
              { key: "field_af_acci_desc", label: "Description", name: "description", type: "textarea" }
            ]
          },
          {
            key: "field_af_acc_proc",
            label: "Processus",
            name: "processus",
            type: "repeater",
            layout: "block",
            button_label: "Ajouter une étape processus",
            sub_fields: [
              { key: "field_af_accp_tag", label: "Tag", name: "tag", type: "text" },
              { key: "field_af_accp_title", label: "Titre", name: "titre", type: "text" },
              { key: "field_af_accp_desc", label: "Description", name: "description", type: "textarea" },
              { key: "field_af_accp_bg", label: "Image de fond", name: "image_du_fond", type: "image", return_format: "array" }
            ]
          },
          { key: "field_af_acc_mod_tag", label: "Modalités Tag", name: "modalites_tag", type: "text" },
          { key: "field_af_acc_mod_title", label: "Modalités Titre", name: "modalites_title", type: "text" },
          { key: "field_af_acc_mod_hl", label: "Modalités Titre coloré", name: "modalites_title_highlight", type: "text" },
          { key: "field_af_acc_mod_title2", label: "Modalités Titre 2", name: "modalites_title_2", type: "text" },
          { key: "field_af_acc_mod_desc", label: "Modalités Description", name: "modalites_description", type: "wysiwyg", tabs: "all", media_upload: 0 }
        ]
      },
      { key: "field_af_tab_cta", label: "CTA Final", type: "tab" },
      {
        key: "field_af_cta",
        label: "CTA Final",
        name: "cta_final",
        type: "group",
        show_in_rest: true,
        sub_fields: [
          { key: "field_af_cta_bg", label: "Image de fond", name: "image_de_fond", type: "image", return_format: "id" },
          { key: "field_af_cta_title", label: "Titre", name: "title", type: "text" },
          { key: "field_af_cta_hl", label: "Titre coloré", name: "title_highlight", type: "text" },
          { key: "field_af_cta_desc", label: "Description", name: "description", type: "textarea" },
          {
            key: "field_af_cta_badges",
            label: "Badges",
            name: "badges",
            type: "repeater",
            layout: "table",
            button_label: "Ajouter un badge",
            sub_fields: [
              { key: "field_af_cta_badge_titre", label: "Titre", name: "titre", type: "text" },
              { key: "field_af_cta_badge_doc", label: "Document PDF", name: "document", type: "file", return_format: "array" },
              { key: "field_af_cta_badge_url", label: "URL du document", name: "document_url", type: "text" }
            ]
          },
          { key: "field_af_cta_text", label: "CTA texte", name: "cta_text", type: "text", default_value: "Demander une simulation personnalisée" },
          { key: "field_af_cta_text_2", label: "CTA texte secondaire", name: "cta_texte_2", type: "text", default_value: "Nous contacter" },
          { key: "field_af_cta_url", label: "CTA URL", name: "cta_url", type: "text", default_value: "/contact" }
        ]
      }
    ],
    location: [[{ param: "page_slug", operator: "==", value: "aides-financieres" }]]
  }
];

// ─────────────────────────────────────────────────────────────
// 6. ACF : CONTACT (contact)
// ─────────────────────────────────────────────────────────────
const acfContact = [
  {
    key: "group_contact",
    title: "Page Contact",
    active: true,
    show_in_rest: true,
    fields: [
      { key: "field_contact_tab_hero", label: "Hero", type: "tab" },
      {
        key: "field_contact_hero",
        label: "Section Hero",
        name: "hero",
        type: "group",
        show_in_rest: true,
        sub_fields: [
          { key: "field_contact_hero_title", label: "Titre", name: "title", type: "text", default_value: "Prenons" },
          { key: "field_contact_hero_title_hl", label: "Titre (coloré)", name: "title_highlight", type: "text", default_value: "contact" },
          { key: "field_contact_hero_desc", label: "Description", name: "description", type: "textarea", default_value: "Tout commence par une écoute. Parlez-nous de votre situation." }
        ]
      },
      { key: "field_contact_tab_form", label: "Formulaire", type: "tab" },
      {
        key: "field_contact_formulaire",
        label: "Formulaire",
        name: "formulaire",
        type: "group",
        show_in_rest: true,
        sub_fields: [
          { key: "field_contact_form_title", label: "Titre", name: "title", type: "text", default_value: "Envoyez-nous un message" },
          { key: "field_contact_form_image", label: "Image", name: "image", type: "image", return_format: "id" },
          { key: "field_contact_form_notes", label: "Notes", name: "notes", type: "textarea" }
        ]
      },
      { key: "field_contact_tab_coords", label: "Coordonnées", type: "tab" },
      {
        key: "field_contact_coordonnees",
        label: "Coordonnées",
        name: "coordonnees",
        type: "group",
        show_in_rest: true,
        sub_fields: [
          { key: "field_contact_coords_title", label: "Titre", name: "title", type: "text", default_value: "Nos coordonnées" },
          {
            key: "field_contact_coords_items",
            label: "Items",
            name: "items",
            type: "repeater",
            layout: "block",
            button_label: "Ajouter une coordonnée",
            sub_fields: [
              { key: "field_contact_coord_icon", label: "Icône", name: "image", type: "image", return_format: "array" },
              { key: "field_contact_coord_label", label: "Label", name: "label", type: "text" },
              { key: "field_contact_coord_value", label: "Valeur", name: "value", type: "text" }
            ]
          }
        ]
      }
    ],
    location: [
      [{ param: "page_slug", operator: "==", value: "contact" }],
      [{ param: "page", operator: "==", value: "14" }]
    ]
  }
];

// ─────────────────────────────────────────────────────────────
// 7. ACF : ARTICLES BLOG (post)
// ─────────────────────────────────────────────────────────────
const acfBlogArticles = [
  {
    key: "group_blog_article",
    title: "Informations de l'article",
    active: true,
    show_in_rest: true,
    fields: [
      { key: "field_blog_tab_auteur", label: "Auteur", type: "tab" },
      {
        key: "field_blog_auteur",
        label: "Auteur de l'article",
        name: "auteur",
        type: "group",
        show_in_rest: true,
        sub_fields: [
          { key: "field_blog_auteur_nom", label: "Nom complet", name: "nom", type: "text", required: 1 },
          { key: "field_blog_auteur_role", label: "Rôle / Poste", name: "role", type: "text" },
          { key: "field_blog_auteur_avatar", label: "Photo de l'auteur", name: "avatar", type: "image", return_format: "url" }
        ]
      },
      { key: "field_blog_tab_meta", label: "Date & Catégorie", type: "tab" },
      { key: "field_blog_date_publication", label: "Date de publication", name: "date_publication", type: "date_picker", display_format: "d F Y", return_format: "d F Y" },
      { key: "field_blog_tab_extrait", label: "Extrait & SEO", type: "tab" },
      { key: "field_blog_extrait", label: "Extrait personnalisé", name: "extrait", type: "textarea", rows: 3 },
      { key: "field_blog_image_mise_en_avant_alt", label: "Texte alternatif de l'image", name: "image_alt", type: "text" },
      { key: "field_blog_url_video", label: "URL de la vidéo", name: "url_video", type: "url" }
    ],
    location: [[{ param: "post_type", operator: "==", value: "post" }]]
  }
];

// Sauvegarde des fichiers ACF
fs.writeFileSync(path.join(ACF_DIR, 'acf-home-page.json'), JSON.stringify(acfHomePage, null, 2), 'utf-8');
fs.writeFileSync(path.join(ACF_DIR, 'acf-pour-les-familles.json'), JSON.stringify(acfPourLesFamilles, null, 2), 'utf-8');
fs.writeFileSync(path.join(ACF_DIR, 'acf-nous-rejoindre.json'), JSON.stringify(acfNousRejoindre, null, 2), 'utf-8');
fs.writeFileSync(path.join(ACF_DIR, 'acf-notre-histoire.json'), JSON.stringify(acfNotreHistoire, null, 2), 'utf-8');
fs.writeFileSync(path.join(ACF_DIR, 'acf-aides-financieres.json'), JSON.stringify(acfAidesFinancieres, null, 2), 'utf-8');
fs.writeFileSync(path.join(ACF_DIR, 'acf-contact.json'), JSON.stringify(acfContact, null, 2), 'utf-8');
fs.writeFileSync(path.join(ACF_DIR, 'acf-blog-articles.json'), JSON.stringify(acfBlogArticles, null, 2), 'utf-8');

console.log('✓ Tous les fichiers ACF JSON ont été générés dans /acf-json');

// ─────────────────────────────────────────────────────────────
// 8. FORMINATOR : CONTACT (ID 573)
// ─────────────────────────────────────────────────────────────
const forminatorContact = {
  type: "form",
  data: {
    fields: [
      {
        id: "select-1",
        element_id: "select-1",
        form_id: "wrapper-select-1",
        type: "select",
        options: [
          { label: "Une famille / un représentant légal", value: "one" },
          { label: "Un professionnel / une structure partenaire", value: "two" },
          { label: "Autre", value: "Autre" }
        ],
        cols: 12,
        required: true,
        field_label: "Vous êtes...",
        placeholder: "Sélectionnez...",
        wrapper_id: "wrapper-select-1"
      },
      {
        id: "name-1",
        element_id: "name-1",
        form_id: "wrapper-names",
        type: "name",
        cols: 6,
        required: true,
        field_label: "Nom",
        placeholder: "Votre nom",
        wrapper_id: "wrapper-names"
      },
      {
        id: "name-2",
        element_id: "name-2",
        form_id: "wrapper-names",
        type: "text",
        cols: 6,
        required: true,
        field_label: "Prénom",
        placeholder: "Votre prénom",
        wrapper_id: "wrapper-names"
      },
      {
        id: "email-1",
        element_id: "email-1",
        form_id: "wrapper-email",
        type: "email",
        cols: 12,
        required: true,
        field_label: "Email",
        placeholder: "votre@email.fr",
        validation: true,
        wrapper_id: "wrapper-email"
      },
      {
        id: "phone-1",
        element_id: "phone-1",
        form_id: "wrapper-phone",
        type: "phone",
        cols: 6,
        required: true,
        field_label: "Téléphone",
        placeholder: "06 XX XX XX XX",
        wrapper_id: "wrapper-phone"
      },
      {
        id: "text-1",
        element_id: "text-1",
        form_id: "wrapper-phone",
        type: "text",
        cols: 6,
        required: false,
        field_label: "Commune concernée",
        placeholder: "Votre commune",
        wrapper_id: "wrapper-phone"
      },
      {
        id: "select-2",
        element_id: "select-2",
        form_id: "wrapper-select-2",
        type: "select",
        options: [
          { label: "Renseignements généraux", value: "one" },
          { label: "Demande d'accompagnement", value: "two" },
          { label: "Partenariat", value: "Partenariat" },
          { label: "Autre demande", value: "Autre-demande" }
        ],
        cols: 12,
        required: true,
        field_label: "Objet de votre demande",
        placeholder: "Sélectionnez...",
        wrapper_id: "wrapper-select-2"
      },
      {
        id: "textarea-1",
        element_id: "textarea-1",
        form_id: "wrapper-message",
        type: "textarea",
        cols: 12,
        required: false,
        field_label: "Votre message",
        placeholder: "Expliquez-nous votre besoin...",
        wrapper_id: "wrapper-message"
      },
      {
        id: "checkbox-1",
        element_id: "checkbox-1",
        form_id: "wrapper-consent",
        type: "checkbox",
        options: [
          { label: "J'accepte de recevoir par e-mail les informations et actualités de PUR Alpha.", value: "oui" }
        ],
        cols: 12,
        required: false,
        field_label: "Consentement",
        wrapper_id: "wrapper-consent"
      }
    ],
    settings: {
      "pagination-header": "nav",
      "paginationInit": "open",
      "formName": "Formulaire de contact PUR Alpha",
      "version": "1.38.0",
      "form_method": "ajax",
      "form_id": "573",
      "submission-behaviour": "behaviour-thankyou",
      "thankyou-message": "Votre demande a bien été envoyée. Nous reviendrons vers vous au plus vite.",
      "submitData": {
        "custom-submit-text": "Envoyer ma demande"
      }
    }
  },
  status: "publish",
  version: "1.38.0"
};

// ─────────────────────────────────────────────────────────────
// 9. FORMINATOR : CANDIDATURE (ID 574)
// ─────────────────────────────────────────────────────────────
const forminatorCandidature = {
  type: "form",
  data: {
    fields: [
      {
        id: "name-1",
        element_id: "name-1",
        form_id: "wrapper-names",
        type: "text",
        cols: 6,
        required: true,
        field_label: "Prénom",
        placeholder: "Votre prénom",
        wrapper_id: "wrapper-names"
      },
      {
        id: "name-2",
        element_id: "name-2",
        form_id: "wrapper-names",
        type: "text",
        cols: 6,
        required: true,
        field_label: "Nom",
        placeholder: "Votre nom",
        wrapper_id: "wrapper-names"
      },
      {
        id: "email-1",
        element_id: "email-1",
        form_id: "wrapper-email",
        type: "email",
        cols: 12,
        required: true,
        field_label: "Email",
        placeholder: "votre@email.fr",
        validation: true,
        wrapper_id: "wrapper-email"
      },
      {
        id: "phone-1",
        element_id: "phone-1",
        form_id: "wrapper-phone",
        type: "phone",
        cols: 12,
        required: true,
        field_label: "Téléphone",
        placeholder: "06 XX XX XX XX",
        wrapper_id: "wrapper-phone"
      },
      {
        id: "text-1",
        element_id: "text-1",
        form_id: "wrapper-location",
        type: "text",
        cols: 6,
        required: true,
        field_label: "Commune de résidence",
        placeholder: "Votre commune",
        wrapper_id: "wrapper-location"
      },
      {
        id: "text-2",
        element_id: "text-2",
        form_id: "wrapper-location",
        type: "text",
        cols: 6,
        required: true,
        field_label: "Disponibilités principales",
        placeholder: "Ex : Mercredi et week-ends",
        wrapper_id: "wrapper-location"
      },
      {
        id: "select-1",
        element_id: "select-1",
        form_id: "wrapper-exp",
        type: "select",
        options: [
          { label: "Aucune", value: "Aucune" },
          { label: "Expérience personnelle", value: "one" },
          { label: "Expérience professionnelle", value: "two" }
        ],
        cols: 6,
        required: true,
        field_label: "Expérience dans le handicap",
        placeholder: "Sélectionnez...",
        wrapper_id: "wrapper-exp"
      },
      {
        id: "number-1",
        element_id: "number-1",
        form_id: "wrapper-exp",
        type: "number",
        cols: 6,
        required: false,
        field_label: "Nombre d'années",
        placeholder: "Ex: 2",
        wrapper_id: "wrapper-exp"
      },
      {
        id: "textarea-2",
        element_id: "textarea-2",
        form_id: "wrapper-diplome",
        type: "textarea",
        cols: 12,
        required: false,
        field_label: "Diplôme / qualification (si applicable)",
        placeholder: "Ex : DEAES, BAFA, CAP Petite Enfance, etc.",
        wrapper_id: "wrapper-diplome"
      },
      {
        id: "upload-1",
        element_id: "upload-1",
        form_id: "wrapper-cv",
        type: "upload",
        cols: 12,
        required: true,
        field_label: "CV (format PDF, DOC, DOCX - max 10 Mo)",
        file_type: "custom",
        file_limit: 10,
        custom_file_types: "pdf,doc,docx",
        wrapper_id: "wrapper-cv"
      },
      {
        id: "textarea-1",
        element_id: "textarea-1",
        form_id: "wrapper-motivation",
        type: "textarea",
        cols: 12,
        required: false,
        field_label: "Votre motivation en quelques mots (180 caractères max)",
        placeholder: "Présentez-vous brièvement...",
        wrapper_id: "wrapper-motivation"
      },
      {
        id: "checkbox-1",
        element_id: "checkbox-1",
        form_id: "wrapper-vivier",
        type: "checkbox",
        options: [
          { label: "J'accepte que ma candidature soit conservée dans le vivier PUR Alpha.", value: "one" }
        ],
        cols: 12,
        required: false,
        field_label: "Conservation vivier",
        wrapper_id: "wrapper-vivier"
      }
    ],
    settings: {
      "pagination-header": "nav",
      "paginationInit": "open",
      "formName": "Formulaire de candidature PUR Alpha",
      "version": "1.38.0",
      "form_method": "ajax",
      "form_id": "574",
      "submission-behaviour": "behaviour-thankyou",
      "thankyou-message": "Votre candidature a bien été transmise. Nous vous contacterons rapidement.",
      "submitData": {
        "custom-submit-text": "Envoyer ma candidature"
      }
    }
  },
  status: "publish",
  version: "1.38.0"
};

fs.writeFileSync(path.join(FORMINATOR_DIR, 'forminator-contact-573.json'), JSON.stringify(forminatorContact, null, 2), 'utf-8');
fs.writeFileSync(path.join(FORMINATOR_DIR, 'forminator-candidature-574.json'), JSON.stringify(forminatorCandidature, null, 2), 'utf-8');

console.log('✓ Tous les fichiers Forminator JSON ont été générés dans /forminator-json');
