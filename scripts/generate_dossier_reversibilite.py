import os
import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml import OxmlElement
from docx.oxml.ns import qn

def set_cell_background(cell, fill_hex):
    tcPr = cell._element.get_or_add_tcPr()
    shd = OxmlElement('w:shd')
    shd.set(qn('w:val'), 'clear')
    shd.set(qn('w:color'), 'auto')
    shd.set(qn('w:fill'), fill_hex)
    tcPr.append(shd)

def set_cell_margins(cell, top=100, bottom=100, left=140, right=140):
    tcPr = cell._element.get_or_add_tcPr()
    tcMar = OxmlElement('w:tcMar')
    for m, val in [('top', top), ('bottom', bottom), ('left', left), ('right', right)]:
        node = OxmlElement(f'w:{m}')
        node.set(qn('w:w'), str(val))
        node.set(qn('w:type'), 'dxa')
        tcMar.append(node)
    tcPr.append(tcMar)

def set_table_borders(table, color='CBD5E1', sz='4', val='single'):
    tblPr = table._element.xpath('w:tblPr')
    if tblPr:
        tblBorders = OxmlElement('w:tblBorders')
        for border_name in ['top', 'left', 'bottom', 'right', 'insideH']:
            border = OxmlElement(f'w:{border_name}')
            border.set(qn('w:val'), val)
            border.set(qn('w:sz'), sz)
            border.set(qn('w:space'), '0')
            border.set(qn('w:color'), color)
            tblBorders.append(border)
        border = OxmlElement('w:insideV')
        border.set(qn('w:val'), 'none')
        tblBorders.append(border)
        tblPr[0].append(tblBorders)

def build_dossier():
    doc = docx.Document()
    for section in doc.sections:
        section.top_margin = Inches(0.7)
        section.bottom_margin = Inches(0.7)
        section.left_margin = Inches(0.7)
        section.right_margin = Inches(0.7)

    navy = RGBColor(13, 61, 79)
    teal = RGBColor(15, 118, 110)
    dark = RGBColor(30, 41, 59)
    gray = RGBColor(100, 116, 139)

    # ----------------- ENTETE -----------------
    p_top = doc.add_paragraph()
    r_top = p_top.add_run('PUR ALPHA — DOSSIER DE LIVRAISON FINALE & RÉVERSIBILITÉ')
    r_top.font.name = 'Calibri'
    r_top.font.size = Pt(10)
    r_top.font.bold = True
    r_top.font.color.rgb = teal

    h_title = doc.add_paragraph()
    h_title.paragraph_format.space_before = Pt(2)
    h_title.paragraph_format.space_after = Pt(2)
    r_title = h_title.add_run('Réponse aux Demandes de Livraison Finale,\nRéversibilité Technique & Guide WordPress')
    r_title.font.name = 'Calibri'
    r_title.font.size = Pt(18)
    r_title.font.bold = True
    r_title.font.color.rgb = navy

    p_sub = doc.add_paragraph()
    p_sub.paragraph_format.space_after = Pt(12)
    r_sub = p_sub.add_run('Accès Administrateur (BO-02), Remise du Code & Réversibilité, Licences et Guide d\'Utilisation CMS\nSite : https://puralpha.fr — Prestataire : Agence MAONO — Novembre 2026')
    r_sub.font.size = Pt(10)
    r_sub.font.italic = True
    r_sub.font.color.rgb = gray

    # ----------------- PARTIE 1 : ACCES ADMINISTRATEUR -----------------
    h1 = doc.add_paragraph()
    h1.paragraph_format.space_before = Pt(10)
    h1.paragraph_format.space_after = Pt(4)
    h1.paragraph_format.keep_with_next = True
    r1 = h1.add_run('1. Confirmation des Accès Administrateur WordPress (Contrôle BO-02)')
    r1.font.size = Pt(13)
    r1.font.bold = True
    r1.font.color.rgb = navy

    p1_1 = doc.add_paragraph()
    p1_1.paragraph_format.space_after = Pt(6)
    p1_1.add_run(
        'Nous accusons réception de votre remarque concernant le contrôle de recette BO-02. '
        'Le statut de ce contrôle a été immédiatement rectifié dans la grille de recette pour refléter la situation réelle.'
    ).font.size = Pt(9.5)

    p1_2 = doc.add_paragraph()
    p1_2.paragraph_format.space_after = Pt(6)
    r_act = p1_2.add_run('Confirmation d\'activation effective : ')
    r_act.font.bold = True
    r_act.font.size = Pt(9.5)
    r_act.font.color.rgb = teal
    p1_2.add_run(
        'Le compte utilisateur de Madame Emma a été promu au rôle Administrateur complet sur le back-office WordPress '
        '(https://bk.puralpha.fr/wp-admin). Cette modification est d\'ores et déjà effective et active.'
    ).font.size = Pt(9.5)

    p1_3 = doc.add_paragraph()
    p1_3.paragraph_format.space_after = Pt(6)
    p1_3.add_run(
        'Le compte « Emma » dispose désormais des privilèges absolus et sans restriction sur l\'ensemble du CMS, incluant :\n'
        '• La gestion complète des utilisateurs (création, modification, attribution des rôles et suppression de comptes) ;\n'
        '• L\'édition et la publication de l\'intégralité des contenus éditoriaux (pages, articles, médias, taxonomies) ;\n'
        '• La consultation, le traitement et l\'export des données de formulaires de contact et de candidatures (Forminator Pro) ;\n'
        '• L\'accès complet aux réglages système, aux extensions (plugins) et aux outils de sauvegarde.'
    ).font.size = Pt(9)

    # ----------------- PARTIE 2 : PROPRIETE ET REVERSIBILITE -----------------
    doc.add_page_break()

    h2 = doc.add_paragraph()
    h2.paragraph_format.space_before = Pt(8)
    h2.paragraph_format.space_after = Pt(4)
    h2.paragraph_format.keep_with_next = True
    r2 = h2.add_run('2. Propriété, Réversibilité Technique et Cartographie des Licences')
    r2.font.size = Pt(13)
    r2.font.bold = True
    r2.font.color.rgb = navy

    p2_intro = doc.add_paragraph()
    p2_intro.paragraph_format.space_after = Pt(6)
    p2_intro.add_run(
        'Conformément aux engagements contractuels de l\'agence MAONO, PUR ALPHA dispose de la pleine maîtrise technique et juridique '
        'de son site internet. Vous trouverez ci-après l\'ensemble des garanties, livrables et éléments techniques assurant une '
        'réversibilité totale et immédiate.'
    ).font.size = Pt(9.5)

    # 2.1 Remise du code source
    h2_1 = doc.add_paragraph()
    h2_1.paragraph_format.space_before = Pt(6)
    h2_1.paragraph_format.space_after = Pt(2)
    h2_1.paragraph_format.keep_with_next = True
    r2_1 = h2_1.add_run('2.1 Remise du code source complet et des composants')
    r2_1.font.bold = True
    r2_1.font.size = Pt(10.5)
    r2_1.font.color.rgb = teal

    p2_1 = doc.add_paragraph()
    p2_1.paragraph_format.space_after = Pt(6)
    p2_1.add_run(
        'L\'intégralité des éléments constitutifs de la solution est mise à disposition de PUR ALPHA sans aucune rétention technique :\n'
        '1. Code source Frontend Next.js (puralpha-front) : archive zip complète contenant l\'ensemble du projet Next.js 16 (App Router), '
        'les composants React TypeScript, les feuilles de style Tailwind CSS, les scripts d\'automatisation et le fichier package.json.\n'
        '2. Modélisation des données ACF (acf-json/) : ensemble des schémas JSON définissant les champs personnalisés de toutes les pages '
        '(Home, Histoire, Services, Tarifs, Familles, Contact, Recrutement).\n'
        '3. Modèles de formulaires Forminator (forminator-json/) : fichiers d\'export JSON des formulaires Contact (ID 573/1206) et '
        'Candidature (ID 574/1207) avec leurs règles de validation et de rétention RGPD.\n'
        '4. Base de données et médias WordPress : sauvegarde complète de la base de données MySQL et des répertoires d\'uploads '
        'générée via l\'extension UpdraftPlus.'
    ).font.size = Pt(9)

    # 2.2 Redéploiement par un tiers
    h2_2 = doc.add_paragraph()
    h2_2.paragraph_format.space_before = Pt(6)
    h2_2.paragraph_format.space_after = Pt(2)
    h2_2.paragraph_format.keep_with_next = True
    r2_2 = h2_2.add_run('2.2 Éléments techniques pour la maintenance et le redéploiement par un tiers')
    r2_2.font.bold = True
    r2_2.font.size = Pt(10.5)
    r2_2.font.color.rgb = teal

    p2_2 = doc.add_paragraph()
    p2_2.paragraph_format.space_after = Pt(6)
    p2_2.add_run(
        'Le site a été conçu selon les standards ouverts les plus stricts du développement web contemporain (Stack Jamstack / Headless). '
        'Tout développeur React / Node.js / WordPress standard peut reprendre, maintenir, modifier ou redéployer le site sans assistance de MAONO :\n'
        '• Environnement d\'exécution : Node.js (version 20 LTS recommandée) et gestionnaire de paquets npm.\n'
        '• Procédure d\'installation locale ou serveur :\n'
        '   - Récupération du dossier source et exécution de : npm install\n'
        '   - Déclaration des variables d\'environnement dans .env.local :\n'
        '     NEXT_PUBLIC_WP_API_URL=https://bk.puralpha.fr/wp-json/wp/v2\n'
        '     NEXT_PUBLIC_GA_MEASUREMENT_ID=G-S60574HD6J (ou GTM)\n'
        '   - Lancement en développement : npm run dev (accessible sur http://localhost:3000)\n'
        '   - Compilation pour production : npm run build (génère le build optimisé standalone)\n'
        '   - Démarrage de production : npm start ou node server.js\n'
        '• Déploiement serveur Plesk / VPS : un script automatisé d\'empaquetage standalone (python scripts/package-plesk.py) produit '
        'directement une archive zip prête à déployer sur le gestionnaire Node.js de Plesk.'
    ).font.size = Pt(9)

    # 2.3 Connexions Next.js <-> WordPress
    h2_3 = doc.add_paragraph()
    h2_3.paragraph_format.space_before = Pt(6)
    h2_3.paragraph_format.space_after = Pt(2)
    h2_3.paragraph_format.keep_with_next = True
    r2_3 = h2_3.add_run('2.3 Documentation des flux et connexions Next.js ↔ WordPress')
    r2_3.font.bold = True
    r2_3.font.size = Pt(10.5)
    r2_3.font.color.rgb = teal

    p2_3 = doc.add_paragraph()
    p2_3.paragraph_format.space_after = Pt(6)
    p2_3.add_run(
        'L\'architecture repose sur un découplage total entre le back-office et le front-end via l\'API REST native de WordPress :\n'
        '• Endpoints d\'interrogation éditoriale :\n'
        '   - GET https://bk.puralpha.fr/wp-json/wp/v2/pages?slug=[slug]&_embed : récupération des données d\'une page et de ses champs ACF.\n'
        '   - GET https://bk.puralpha.fr/wp-json/wp/v2/posts : récupération des articles du blog, de leur image mise en avant et de leurs taxonomies.\n'
        '• Endpoint de réception des formulaires :\n'
        '   - POST https://bk.puralpha.fr/wp-json/v1/submit-form : point de terminaison sécurisé chiffré TLS 1.3 recevant les soumissions '
        'de formulaires depuis le front-end Next.js pour stockage et traitement direct dans Forminator Pro.\n'
        '• Revalidation et cache (ISR - Incremental Static Regeneration) :\n'
        '   Le front-end Next.js interroge le CMS et met en cache statique les pages côté serveur pour offrir une vitesse d\'affichage maximale. '
        'Grâce au mécanisme ISR (revalidate: 60), toute modification apportée et enregistrée dans le back-office WordPress est automatiquement '
        'recompilée et affichée sur le site public en moins d\'une minute, sans nécessité de rebuild manuel.'
    ).font.size = Pt(9)

    # 2.4 Extensions et licences
    h2_4 = doc.add_paragraph()
    h2_4.paragraph_format.space_before = Pt(6)
    h2_4.paragraph_format.space_after = Pt(2)
    h2_4.paragraph_format.keep_with_next = True
    r2_4 = h2_4.add_run('2.4 Cartographie exhaustive des extensions, licences et services tiers')
    r2_4.font.bold = True
    r2_4.font.size = Pt(10.5)
    r2_4.font.color.rgb = teal

    p2_4 = doc.add_paragraph()
    p2_4.paragraph_format.space_after = Pt(6)
    p2_4.add_run(
        'Voici l\'état factuel et documenté des 6 extensions actives installées sur le WordPress https://bk.puralpha.fr :'
    ).font.size = Pt(9.5)

    # Image extensions
    img_ext = r'D:\Maono\puralpha-front\rgpd-captures\extensions-wordpress-plugins.png'
    if os.path.exists(img_ext):
        p_img = doc.add_paragraph()
        p_img.paragraph_format.space_before = Pt(2)
        p_img.paragraph_format.space_after = Pt(8)
        p_img.paragraph_format.keep_with_next = True
        p_img.alignment = WD_ALIGN_PARAGRAPH.CENTER
        run_img = p_img.add_run()
        run_img.add_picture(img_ext, width=Inches(5.8))
        p_leg = doc.add_paragraph()
        p_leg.paragraph_format.space_after = Pt(8)
        p_leg.alignment = WD_ALIGN_PARAGRAPH.CENTER
        r_leg = p_leg.add_run('Figure : Liste des extensions actives sous WordPress (bk.puralpha.fr/wp-admin/plugins.php)')
        r_leg.font.size = Pt(8)
        r_leg.font.italic = True
        r_leg.font.color.rgb = gray

    ext_data = [
        (
            'Advanced Custom Fields PRO\n(v6.3.11 — WP Engine)',
            'Création et structuration des champs personnalisés de l\'ensemble des pages du site.',
            'Licence PRO Agence (MAONO). L\'extension reste pleinement fonctionnelle à vie sur l\'installation. Aucune dépendance de renouvellement bloquante pour l\'exploitation du site.'
        ),
        (
            'Forminator Pro\n(v1.38.5 — WPMU DEV)',
            'Moteur de formulaires interactifs (Contact et Candidatures), gestion RGPD, pièces jointes et purge automatique.',
            'Licence Pro Agence WPMU DEV (fournie par MAONO). Reste active et opérationnelle. Les formulaires continueront de fonctionner normalement.'
        ),
        (
            'Defender Pro\n(v6.4.1 — WPMU DEV)',
            'Sécurité WordPress, pare-feu applicatif, prévention des intrusions, analyse des vulnérabilités.',
            'Licence Pro Agence WPMU DEV (fournie par MAONO). Assure le durcissement de sécurité du back-office.'
        ),
        (
            'WPMU DEV Dashboard\n(v5.0.3 — WPMU DEV)',
            'Connecteur de maintenance et de synchronisation des outils WPMU DEV.',
            'Inclus dans la suite WPMU DEV.'
        ),
        (
            'UpdraftPlus - Sauvegarde\n(v1.26.14 — TeamUpdraft)',
            'Sauvegardes automatisées de la base de données et des répertoires de fichiers.',
            'Version Standard gratuite. Aucun abonnement ni frais de renouvellement requis.'
        ),
        (
            'WPCode Lite\n(v2.4.1 — WPCode)',
            'Insertion sécurisée de snippets PHP et de scripts d\'en-tête sans modifier le code source du thème.',
            'Version Lite gratuite. Aucun abonnement ni frais de renouvellement requis.'
        )
    ]

    t_ext = doc.add_table(rows=len(ext_data) + 1, cols=3)
    t_ext.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_borders(t_ext)
    h_ext = ['Extension installée & Version', 'Rôle & Finalité technique', 'Régime de licence & Conditions de renouvellement']
    for i, h in enumerate(h_ext):
        c = t_ext.rows[0].cells[i]
        set_cell_background(c, '0D3D4F')
        set_cell_margins(c, 80, 80, 100, 100)
        p = c.paragraphs[0]
        r = p.add_run(h)
        r.font.bold = True
        r.font.size = Pt(8.5)
        r.font.color.rgb = RGBColor(255, 255, 255)

    for row_i, row in enumerate(ext_data, start=1):
        for col_i, text in enumerate(row):
            c = t_ext.rows[row_i].cells[col_i]
            set_cell_background(c, 'F8FAFC' if row_i % 2 == 1 else 'FFFFFF')
            set_cell_margins(c, 60, 60, 100, 100)
            p = c.paragraphs[0]
            r = p.add_run(text)
            r.font.size = Pt(8)
            r.font.color.rgb = dark

    p_tiers = doc.add_paragraph()
    p_tiers.paragraph_format.space_before = Pt(8)
    p_tiers.paragraph_format.space_after = Pt(6)
    p_tiers.add_run(
        'Services tiers externes :\n'
        '• Hébergement IONOS : contrat d\'infrastructure serveur Cloud/VPS (renouvellement annuel chez IONOS SARL).\n'
        '• Google Analytics 4 : service gratuit fourni par Google LLC sans abonnement.\n'
        '• Google Maps : service gratuit sous réserve du respect du quota mensuel standard Google Cloud Platform.'
    ).font.size = Pt(8.5)

    # 2.5 Cession des droits et pleine propriété
    h2_5 = doc.add_paragraph()
    h2_5.paragraph_format.space_before = Pt(6)
    h2_5.paragraph_format.space_after = Pt(2)
    h2_5.paragraph_format.keep_with_next = True
    r2_5 = h2_5.add_run('2.5 Confirmation expresse des droits d\'exploitation et de propriété')
    r2_5.font.bold = True
    r2_5.font.size = Pt(10.5)
    r2_5.font.color.rgb = teal

    p2_5 = doc.add_paragraph()
    p2_5.paragraph_format.space_after = Pt(8)
    p2_5.add_run(
        'L\'agence MAONO confirme formellement que PUR ALPHA est propriétaire pleine et entière de l\'ensemble des livrables réalisés :\n'
        '1. Propriété des contenus et des données : PUR ALPHA détient la propriété exclusive de tous les textes, photos, vidéos, chartes graphiques, '
        'marques, logos et données collectées via le site (contacts et candidatures).\n'
        '2. Cession des droits sur les développements : MAONO cède à PUR ALPHA l\'intégralité des droits patrimoniaux d\'auteur sur les '
        'développements spécifiques réalisés pour le site (code source front-end Next.js, intégrations personnalisées, templates).\n'
        '3. Liberté totale de maintenance par un tiers : PUR ALPHA dispose du droit perpétuel, irrévocable et non-exclusif d\'exploiter, '
        'modifier, adapter, faire évoluer ou faire maintenir le site web par tout prestataire ou développeur de son choix, sans droit de regard '
        'ni indemnité exigible de la part de MAONO (garantie intégrale contre tout verrouillage technologique).'
    ).font.size = Pt(9)

    # ----------------- PARTIE 3 : GUIDE D'UTILISATION WORDPRESS -----------------
    doc.add_page_break()

    h3 = doc.add_paragraph()
    h3.paragraph_format.space_before = Pt(8)
    h3.paragraph_format.space_after = Pt(4)
    h3.paragraph_format.keep_with_next = True
    r3 = h3.add_run('3. Guide d\'Utilisation WordPress (CMS Headless PUR ALPHA)')
    r3.font.size = Pt(13)
    r3.font.bold = True
    r3.font.color.rgb = navy

    p3_intro = doc.add_paragraph()
    p3_intro.paragraph_format.space_after = Pt(8)
    p3_intro.add_run(
        'Ce guide pratique est destiné à Madame Emma et à l\'équipe PUR ALPHA pour administrer en toute autonomie '
        'le contenu du site internet via le back-office WordPress.'
    ).font.size = Pt(9.5)

    def add_guide_step(num, title, content):
        h = doc.add_paragraph()
        h.paragraph_format.space_before = Pt(8)
        h.paragraph_format.space_after = Pt(2)
        h.paragraph_format.keep_with_next = True
        r = h.add_run(f'3.{num} {title}')
        r.font.bold = True
        r.font.size = Pt(10.5)
        r.font.color.rgb = teal

        p = doc.add_paragraph()
        p.paragraph_format.space_after = Pt(6)
        r_c = p.add_run(content)
        r_c.font.size = Pt(9)
        r_c.font.color.rgb = dark

    add_guide_step(
        1,
        'Connexion au back-office',
        '• Adresse d\'accès : https://bk.puralpha.fr/wp-admin\n'
        '• Identifiant : votre adresse e-mail ou votre nom d\'utilisateur (compte Emma).\n'
        '• Mot de passe : le mot de passe défini lors de la création de votre compte.\n'
        '• Recommandation sécurité : activez un mot de passe fort d\'au moins 12 caractères combinant majuscules, chiffres et symboles.'
    )

    add_guide_step(
        2,
        'Comprendre l\'architecture Headless (WordPress ↔ Site public)',
        'Dans cette architecture moderne, WordPress sert uniquement de « centre de rédaction et de stockage » (CMS). '
        'Le site visible par les internautes (https://puralpha.fr) est propulsé par Next.js.\n'
        '• Principe : lorsque vous enregistrez une modification dans WordPress, l\'API transmet automatiquement la nouvelle version au front-end.\n'
        '• Délai de rafraîchissement : grâce au système de régénération automatique (ISR), vos modifications apparaissent sur le site public '
        'dans un délai maximal d\'une minute sans qu\'aucune manipulation technique ne soit requise.'
    )

    add_guide_step(
        3,
        'Modifier le contenu d\'une page existante (Accueil, Tarifs, Histoire, etc.)',
        '1. Dans le menu de gauche, cliquez sur « Pages » > « Toutes les pages ».\n'
        '2. Survolez la page de votre choix (ex: Accueil, Nos Services, Notre Histoire, Pour les familles, Nos Tarifs) et cliquez sur « Modifier ».\n'
        '3. Dans l\'éditeur, vous verrez les blocs de champs structurés (ACF) correspondant fidèlement à la mise en page du site :\n'
        '   - Section Hero : titre principal, sous-titre, texte d\'introduction, image de fond ou visuel clé.\n'
        '   - Sections de contenu : cartes explicatives, étapes d\'accompagnement, grilles de tarifs, citations et valeurs.\n'
        '   - Boutons d\'appel à l\'action (CTA) : libellé du bouton et lien de destination.\n'
        '4. Modifiez les textes ou remplacez les images souhaitées.\n'
        '5. Cliquez impérativement sur le bouton bleu « Mettre à jour » (en haut à droite) pour enregistrer vos changements.'
    )

    add_guide_step(
        4,
        'Publier et gérer les actualités (Blog)',
        '1. Dans le menu de gauche, cliquez sur « Articles » > « Ajouter un article ».\n'
        '2. Renseignez le titre de l\'article et rédigez votre contenu dans la zone de texte principale.\n'
        '3. Dans le panneau latéral droit :\n'
        '   - Catégories : cochez la catégorie appropriée (ou créez-en une nouvelle).\n'
        '   - Image mise en avant : cliquez sur « Définir l\'image mise en avant » pour attribuer le visuel principal qui apparaîtra sur la liste du blog.\n'
        '   - Extrait : rédigez un résumé de 2 à 3 lignes qui servira d\'accroche sur la page d\'accueil et la liste des actualités.\n'
        '4. Cliquez sur « Publier » pour mettre l\'article en ligne (ou « Enregistrer le brouillon » si vous souhaitez y revenir plus tard).'
    )

    add_guide_step(
        5,
        'Consulter et exporter les formulaires (Contacts & Candidatures)',
        'Les demandes issues des formulaires ne sont pas stockées dans la boîte mail uniquement, elles sont centralisées sous WordPress :\n'
        '1. Dans le menu de gauche, cliquez sur « Forminator Pro » > « Entrées ».\n'
        '2. Dans le menu déroulant en haut, sélectionnez le formulaire à consulter :\n'
        '   - Formulaire de contact (demandes des familles et partenaires) ;\n'
        '   - Formulaire de candidature (recrutement, CVs et lettres de motivation déposés).\n'
        '3. Vous visualisez la liste complète des messages avec date, expéditeur, objet et état de lecture.\n'
        '4. Cliquez sur un message pour lire son contenu complet et télécharger les éventuelles pièces jointes (CV en PDF).\n'
        '5. Export Excel / CSV : cliquez sur le bouton « Exporter » en haut à droite pour télécharger un tableau de toutes les demandes '
        'pour vos bilans de suivi ou votre CRM interne.'
    )

    add_guide_step(
        6,
        'Gestion de la Médiathèque et optimisation des images',
        'Pour préserver la vitesse de chargement et le référencement naturel (SEO) du site, respectez ces quelques règles simples :\n'
        '• Formats recommandés : JPG ou WebP pour les photos, PNG pour les illustrations ou logos avec fond transparent.\n'
        '• Poids des images : privilégiez des images pesant moins de 500 Ko (idéalement entre 100 et 300 Ko). Évitez d\'importer des photos brutes d\'appareil de 5 à 10 Mo.\n'
        '• Dimensions recommandées : 1920x1080 px pour les grandes bannières / Hero, 800x600 px pour les photos d\'articles et de portraits.\n'
        '• Texte alternatif (balise Alt) : lors de l\'ajout d\'une image dans la médiathèque, renseignez systématiquement le champ « Texte alternatif » '
        'en décrivant brièvement l\'image pour les personnes malvoyantes et le référencement Google.'
    )

    add_guide_step(
        7,
        'Sauvegardes manuelles avant modification importante (UpdraftPlus)',
        'Bien que les sauvegardes automatiques soient actives quotidiennement chez l\'hébergeur et sous WordPress :\n'
        '1. Rendez-vous dans « Réglages » > « Sauvegardes UpdraftPlus ».\n'
        '2. Cliquez sur le bouton bleu « Sauvegarder maintenant » avant d\'opérer une refonte majeure de vos textes ou pages.\n'
        '3. En cas de fausse manipulation, vous pourrez restaurer la version précédente en un clic.'
    )

    return doc

if __name__ == '__main__':
    doc = build_dossier()
    out_docx = r'D:\Maono\puralpha-front\Dossier_Reversibilite_Propriete_Guide_WordPress_PureAlpha.docx'
    try:
        doc.save(out_docx)
        print(f'DOCX successfully created: {out_docx}')
    except PermissionError:
        out_docx = r'D:\Maono\puralpha-front\Dossier_Reversibilite_Propriete_Guide_WordPress_PureAlpha_v2.docx'
        doc.save(out_docx)
        print(f'Original locked. DOCX successfully created as: {out_docx}')

