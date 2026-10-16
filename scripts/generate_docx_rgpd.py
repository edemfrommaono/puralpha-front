import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml import OxmlElement
from docx.oxml.ns import qn

def set_cell_background(cell, fill_hex):
    tcPr = cell._element.get_or_add_tcPr()
    shd = OxmlElement('w:shd')
    shd.set(qn('w:val'), 'clear')
    shd.set(qn('w:color'), 'auto')
    shd.set(qn('w:fill'), fill_hex)
    tcPr.append(shd)

def set_cell_margins(cell, top=80, bottom=80, left=120, right=120):
    tcPr = cell._element.get_or_add_tcPr()
    tcMar = OxmlElement('w:tcMar')
    for m, val in [('top', top), ('bottom', bottom), ('left', left), ('right', right)]:
        node = OxmlElement(f'w:{m}')
        node.set(qn('w:w'), str(val))
        node.set(qn('w:type'), 'dxa')
        tcMar.append(node)
    tcPr.append(tcMar)

def set_table_borders(table, color="CBD5E1", sz="4", val="single"):
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

def create_document():
    doc = docx.Document()

    for section in doc.sections:
        section.top_margin = Inches(0.7)
        section.bottom_margin = Inches(0.7)
        section.left_margin = Inches(0.7)
        section.right_margin = Inches(0.7)

    navy = RGBColor(13, 61, 79)       # #0D3D4F
    teal = RGBColor(15, 118, 110)     # #0F766E
    dark = RGBColor(30, 41, 59)       # #1E293B
    gray = RGBColor(100, 116, 139)    # #64748B

    # Document Header
    p_top = doc.add_paragraph()
    p_top.paragraph_format.space_before = Pt(0)
    p_top.paragraph_format.space_after = Pt(2)
    r_top = p_top.add_run("PUR ALPHA — AUDIT TECHNIQUE ET CONFORMITÉ RGPD")
    r_top.font.name = "Calibri"
    r_top.font.size = Pt(11)
    r_top.font.bold = True
    r_top.font.color.rgb = teal

    h_main = doc.add_paragraph()
    h_main.paragraph_format.space_before = Pt(0)
    h_main.paragraph_format.space_after = Pt(4)
    r_title = h_main.add_run("Réponses Techniques aux Questions de Conformité")
    r_title.font.name = "Calibri"
    r_title.font.size = Pt(20)
    r_title.font.bold = True
    r_title.font.color.rgb = navy

    sub_p = doc.add_paragraph()
    sub_p.paragraph_format.space_before = Pt(0)
    sub_p.paragraph_format.space_after = Pt(12)
    r_sub = sub_p.add_run("Environnement de production : https://puralpha.fr & Back-office : https://bk.puralpha.fr — Version révisée — Octobre 2026")
    r_sub.font.name = "Calibri"
    r_sub.font.size = Pt(10.5)
    r_sub.font.italic = True
    r_sub.font.color.rgb = gray

    # NOTE METHODOLOGIQUE FACTUELLE
    p_note = doc.add_paragraph()
    p_note.paragraph_format.space_before = Pt(4)
    p_note.paragraph_format.space_after = Pt(12)
    p_note.paragraph_format.left_indent = Inches(0.1)
    r_note_title = p_note.add_run("Note méthodologique : ")
    r_note_title.font.bold = True
    r_note_title.font.size = Pt(9.5)
    r_note_title.font.color.rgb = teal
    r_note_txt = p_note.add_run(
        "Ce document dresse l'état factuel et technique des dispositifs actuellement implémentés sur le site web puralpha.fr et son CMS WordPress bk.puralpha.fr. "
        "Il fournit l'ensemble des réponses techniques directes au conseil juridique de PUR Alpha pour son appréciation légale."
    )
    r_note_txt.font.size = Pt(9.5)
    r_note_txt.font.color.rgb = dark

    # SECTION : TABLEAU RÉCAPITULATIF GÉNÉRAL
    h_recap = doc.add_paragraph()
    h_recap.paragraph_format.space_before = Pt(8)
    h_recap.paragraph_format.space_after = Pt(6)
    h_recap.paragraph_format.keep_with_next = True
    r_rec_num = h_recap.add_run("Tableau Récapitulatif Général de l'Audit")
    r_rec_num.font.name = "Calibri"
    r_rec_num.font.size = Pt(14)
    r_rec_num.font.bold = True
    r_rec_num.font.color.rgb = navy

    recap_data = [
        (
            "1. Google Analytics",
            "• GA4 actif en production (ID : G-S60574HD6J)\n• Bloqué par défaut via Google Consent Mode v2\n• Aucun cookie avant acceptation « Statistiques »\n• GTM non utilisé en production",
            "Implémenté & conditionné",
            "Cookies : _ga (2 ans), _ga_S60574HD6J (2 ans) — Google LLC (USA / DPF)"
        ),
        (
            "2. Bandeau cookies & choix",
            "• Stockage : localStorage ('puralpha-cookie-consent')\n• Durée : Persistant dans le navigateur du visiteur\n• Égalité stricte bouton Accepter / Refuser\n• Bouton permanent « Gérer les cookies » dans le pied de page",
            "Actif en production",
            "Choix modifiable ou révocable à tout moment par l'internaute"
        ),
        (
            "3. Google Maps",
            "• Bloqué par défaut sur /contact (façade + bouton interactif)\n• Déclenché sur clic explicite ou consentement Marketing\n• Iframe non chargée avant interaction de l'utilisateur",
            "Implémenté (Solution 2-clics)",
            "Cookies Google Maps (NID, AEC, SOCS, CONSENT) uniquement après clic"
        ),
        (
            "4. Formulaires & Forminator",
            "• Données transmises au back-office WordPress (IDs 1206 & 1207)\n• Contact : conservation 3 ans (1095 jours)\n• Candidatures vivier : conservation 2 ans (730 jours)\n• Candidatures hors vivier : suppression manuelle post-recrutement",
            "Paramétré sous WordPress",
            "Purge automatique Forminator sur durées fixes (CNIL)"
        ),
        (
            "5. Preuves consentement navigateur",
            "• Mécanisme puralpha_consent_proofs actif\n• 9 champs enregistrés (email, libellé, horodatage, etc.)\n• Copie miroir locale dans le localStorage client\n• Preuve primaire enregistrée dans la base WordPress",
            "Actif en production",
            "Traçabilité technique des soumissions et de l'accord opt-in"
        ),
        (
            "6. Hébergement, Logs & Sauvegardes",
            "• Hébergeur effectif : IONOS (serveur Cloud/VPS)\n• Datacenters situés dans l'Union Européenne\n• Serveur configuré le 7 oct. 2026 par Edem (MAONO)\n• Détails logs et sauvegardes : à confirmer avec Edem",
            "Infogérance MAONO / IONOS",
            "Données du site, CMS, candidatures et CVs 100% hébergées dans l'UE"
        ),
        (
            "7. Services tiers & Transferts hors UE",
            "• Hébergement & base de données : 100% UE (IONOS)\n• YouTube : Solution 2-clics avec youtube-nocookie.com (actif sur clic)\n• Google Analytics et Google Maps bloqués avant accord\n• Cadre juridique : EU-US Data Privacy Framework (DPF)\n• Polices Poppins auto-hébergées (zéro appel externe Google Fonts)",
            "Activations conditionnées",
            "Transferts tiers limités aux services Google et couverts par le DPF"
        )
    ]

    recap_table = doc.add_table(rows=len(recap_data) + 1, cols=4)
    recap_table.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_borders(recap_table)

    rec_headers = ["Point d'audit", "Réponse technique factuelle", "Statut d'implémentation", "Observation clé"]

    for i, h in enumerate(rec_headers):
        cell = recap_table.rows[0].cells[i]
        set_cell_background(cell, "0D3D4F")
        set_cell_margins(cell, top=100, bottom=100, left=100, right=100)
        p = cell.paragraphs[0]
        r = p.add_run(h)
        r.font.bold = True
        r.font.size = Pt(9)
        r.font.color.rgb = RGBColor(255, 255, 255)

    for row_idx, row_data in enumerate(recap_data, start=1):
        for col_idx, text in enumerate(row_data):
            cell = recap_table.rows[row_idx].cells[col_idx]
            set_cell_background(cell, "F8FAFC" if row_idx % 2 == 1 else "FFFFFF")
            set_cell_margins(cell, top=80, bottom=80, left=100, right=100)
            p = cell.paragraphs[0]
            p.paragraph_format.space_after = Pt(2)
            r = p.add_run(text)
            r.font.size = Pt(8.5)
            r.font.color.rgb = dark
            if col_idx == 2:
                r.font.bold = True
                r.font.color.rgb = teal

    doc.add_paragraph().paragraph_format.space_after = Pt(12)

    def add_q_header(title, num):
        h = doc.add_paragraph()
        h.paragraph_format.space_before = Pt(14)
        h.paragraph_format.space_after = Pt(4)
        h.paragraph_format.keep_with_next = True
        r_num = h.add_run(f"{num}. ")
        r_num.font.name = "Calibri"
        r_num.font.size = Pt(13)
        r_num.font.bold = True
        r_num.font.color.rgb = teal
        r_txt = h.add_run(title)
        r_txt.font.name = "Calibri"
        r_txt.font.size = Pt(13)
        r_txt.font.bold = True
        r_txt.font.color.rgb = navy

    def add_bullet(p, q_label, ans_text):
        p.paragraph_format.space_after = Pt(3)
        p.paragraph_format.left_indent = Inches(0.15)
        r1 = p.add_run("• " + q_label + " : ")
        r1.font.bold = True
        r1.font.size = Pt(9.5)
        r1.font.color.rgb = dark
        r2 = p.add_run(ans_text)
        r2.font.size = Pt(9.5)
        r2.font.color.rgb = dark

    # 1. GOOGLE ANALYTICS
    add_q_header("Google Analytics", 1)
    p = doc.add_paragraph()
    add_bullet(p, "GA4 actif en production", "Oui. Intégré via @next/third-parties/google dans app/layout.tsx.")
    p = doc.add_paragraph()
    add_bullet(p, "Identifiant de mesure", "G-S60574HD6J (défini par la variable d'environnement NEXT_PUBLIC_GA_MEASUREMENT_ID).")
    p = doc.add_paragraph()
    add_bullet(p, "Blocage par défaut", "Oui. Google Consent Mode v2 injecté en tête de document (analytics_storage, ad_storage, ad_user_data et ad_personalization configurés sur 'denied' par défaut avant toute action du visiteur).")
    p = doc.add_paragraph()
    add_bullet(p, "Transmission avant consentement", "Aucune. Aucun cookie n'est déposé et aucun signal d'audience n'est transmis avant l'acceptation expresse de la catégorie « Statistiques ».")
    p = doc.add_paragraph()
    add_bullet(p, "Cookies déposés après consentement", "Deux cookies d'analyse Google :")

    t_ga = doc.add_table(rows=3, cols=4)
    t_ga.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_borders(t_ga)
    ga_h = ["Cookie", "Fournisseur / Pays", "Finalité", "Durée de conservation"]
    for i, h in enumerate(ga_h):
        c = t_ga.rows[0].cells[i]
        set_cell_background(c, "0D3D4F")
        set_cell_margins(c, 70, 70, 90, 90)
        p = c.paragraphs[0]
        r = p.add_run(h)
        r.font.bold = True
        r.font.size = Pt(8.5)
        r.font.color.rgb = RGBColor(255, 255, 255)
    ga_rows = [
        ("_ga", "Google LLC (USA / DPF)", "Distinction des visiteurs uniques anonymisés", "2 ans (durée par défaut Google)"),
        ("_ga_S60574HD6J", "Google LLC (USA / DPF)", "Maintien de l'état de session utilisateur", "2 ans / durée de session")
    ]
    for row_idx, row_data in enumerate(ga_rows, start=1):
        for col_idx, text in enumerate(row_data):
            c = t_ga.rows[row_idx].cells[col_idx]
            set_cell_background(c, "F8FAFC" if row_idx % 2 == 1 else "FFFFFF")
            set_cell_margins(c, 60, 60, 90, 90)
            p = c.paragraphs[0]
            r = p.add_run(text)
            r.font.size = Pt(8.5)
            r.font.color.rgb = dark

    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(4)
    add_bullet(p, "Utilisation de Google Tag Manager (GTM)", "Non. Seul GA4 direct est utilisé en production. Aucun conteneur GTM externe n'est chargé.")

    # 2. BANDEAU COOKIES
    add_q_header("Bandeau cookies et durée des choix", 2)
    p = doc.add_paragraph()
    add_bullet(p, "Support technique de conservation", "localStorage du navigateur sous la clé 'puralpha-cookie-consent'.")
    p = doc.add_paragraph()
    add_bullet(p, "Durée de conservation", "Persistant dans le navigateur du visiteur (conservé jusqu'à suppression manuelle du cache ou des données de navigation par l'internaute).")
    p = doc.add_paragraph()
    add_bullet(p, "Égalité stricte acceptation / refus", "Oui. La même durée et la même méthode de stockage s'appliquent pour l'acceptation et pour le refus. Les boutons « Accepter » et « Refuser » présentent la même ergonomie et visibilité.")
    p = doc.add_paragraph()
    add_bullet(p, "Lien permanent « Gérer les cookies »", "Oui. Présent de façon permanente dans le pied de page (Footer.tsx). Il permet à l'internaute de modifier ou révoquer son choix à tout instant.")

    # 3. GOOGLE MAPS
    add_q_header("Google Maps", 3)
    p = doc.add_paragraph()
    add_bullet(p, "Blocage préalable sur /contact", "Actif. La carte interactive est masquée par défaut derrière une façade informative comprenant un bouton explicite « Afficher la carte ». L'iframe tiers n'est pas chargée au premier affichage.")
    p = doc.add_paragraph()
    add_bullet(p, "Modalité de déclenchement", "La carte ne se charge que sur action délibérée de l'internaute (clic sur le bouton) ou si la catégorie « Marketing » a été expressément acceptée dans le bandeau cookies.")
    p = doc.add_paragraph()
    add_bullet(p, "Traceurs tiers déposés après activation", "Quatre cookies Google (Google LLC — USA / EU-US Data Privacy Framework) :")

    t_maps = doc.add_table(rows=5, cols=4)
    t_maps.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_borders(t_maps)
    maps_h = ["Cookie", "Domaine / Fournisseur", "Finalité", "Durée"]
    for i, h in enumerate(maps_h):
        c = t_maps.rows[0].cells[i]
        set_cell_background(c, "0D3D4F")
        set_cell_margins(c, 70, 70, 90, 90)
        p = c.paragraphs[0]
        r = p.add_run(h)
        r.font.bold = True
        r.font.size = Pt(8.5)
        r.font.color.rgb = RGBColor(255, 255, 255)
    maps_rows = [
        ("NID", "maps.google.com (Google LLC)", "Préférences d'affichage géographique et ciblage", "6 mois"),
        ("AEC", "google.com (Google LLC)", "Sécurité des requêtes et prévention des fraudes", "6 mois"),
        ("SOCS", "google.com (Google LLC)", "Mémorisation de l'état de consentement Google", "13 mois"),
        ("CONSENT", "google.com (Google LLC)", "Enregistrement des choix de consentement Google", "2 ans")
    ]
    for row_idx, row_data in enumerate(maps_rows, start=1):
        for col_idx, text in enumerate(row_data):
            c = t_maps.rows[row_idx].cells[col_idx]
            set_cell_background(c, "F8FAFC" if row_idx % 2 == 1 else "FFFFFF")
            set_cell_margins(c, 60, 60, 90, 90)
            p = c.paragraphs[0]
            r = p.add_run(text)
            r.font.size = Pt(8.5)
            r.font.color.rgb = dark

    # 4. FORMULAIRES & FORMINATOR
    add_q_header("Formulaires et WordPress / Forminator", 4)
    p = doc.add_paragraph()
    add_bullet(p, "Transmission sécurisée des formulaires", "Les formulaires front-end transmettent les données directement en HTTPS / TLS 1.3 vers l'API REST WordPress (https://bk.puralpha.fr/wp-json/v1/submit-form, formulaire Contact ID 1206 et Candidature ID 1207).")
    p = doc.add_paragraph()
    add_bullet(p, "Stockage front-end", "Aucun. Le front-end est stateless : aucune donnée saisie n'est conservée localement dans le navigateur.")
    p = doc.add_paragraph()
    add_bullet(p, "Durées de conservation appliquées sous WordPress", "La politique de rétention Forminator est paramétrée selon des durées fixes conformes aux recommandations légales :")

    t_ret = doc.add_table(rows=4, cols=4)
    t_ret.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_borders(t_ret)
    ret_h = ["Formulaire / Données", "Durée définie", "Base / Recommandation", "Mécanisme d'exécution"]
    for i, h in enumerate(ret_h):
        c = t_ret.rows[0].cells[i]
        set_cell_background(c, "0D3D4F")
        set_cell_margins(c, 70, 70, 90, 90)
        p = c.paragraphs[0]
        r = p.add_run(h)
        r.font.bold = True
        r.font.size = Pt(8.5)
        r.font.color.rgb = RGBColor(255, 255, 255)
    ret_rows = [
        ("Contact (demandes prospects/partenaires)", "3 ans (1095 jours)", "Recommandation CNIL pour les prospects", "Purge automatique programmée dans Forminator"),
        ("Candidature avec accord Vivier", "2 ans (730 jours)", "Consentement exprès du candidat (case dédiée)", "Purge automatique programmée dans Forminator"),
        ("Candidature standard (hors vivier)", "Durée de la procédure de recrutement", "Finalité de recrutement immédiat", "Purge manuelle post-recrutement par l'administrateur RH")
    ]
    for row_idx, row_data in enumerate(ret_rows, start=1):
        for col_idx, text in enumerate(row_data):
            c = t_ret.rows[row_idx].cells[col_idx]
            set_cell_background(c, "F8FAFC" if row_idx % 2 == 1 else "FFFFFF")
            set_cell_margins(c, 60, 60, 90, 90)
            p = c.paragraphs[0]
            r = p.add_run(text)
            r.font.size = Pt(8.5)
            r.font.color.rgb = dark

    # 5. PREUVES DE CONSENTEMENT DANS LE NAVIGATEUR
    add_q_header("Preuves de consentement dans le navigateur", 5)
    p = doc.add_paragraph()
    add_bullet(p, "Mécanisme actif", "Oui. La clé 'puralpha_consent_proofs' s'alimente dans le localStorage lors de chaque soumission comportant une case de consentement cochée.")
    p = doc.add_paragraph()
    add_bullet(p, "Champs consignés", "9 informations techniques garantissant la traçabilité de l'action de l'utilisateur :")

    t_proof = doc.add_table(rows=10, cols=3)
    t_proof.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_borders(t_proof)
    proof_h = ["Champ", "Exemple de valeur", "Description technique"]
    for i, h in enumerate(proof_h):
        c = t_proof.rows[0].cells[i]
        set_cell_background(c, "0D3D4F")
        set_cell_margins(c, 60, 60, 80, 80)
        p = c.paragraphs[0]
        r = p.add_run(h)
        r.font.bold = True
        r.font.size = Pt(8.5)
        r.font.color.rgb = RGBColor(255, 255, 255)
    proof_rows = [
        ("email", "candidat@email.fr", "Adresse électronique renseignée lors de la soumission"),
        ("choice", "consent_vivier ou consent_email", "Identifiant technique de la finalité consentie"),
        ("label", "« J'accepte que ma candidature soit conservée... »", "Libellé exact de la mention présentée sous la case"),
        ("accepted", "true", "État booléen d'acceptation par le visiteur"),
        ("date", "2026-10-14", "Date de soumission au format AAAA-MM-JJ"),
        ("time", "12:30:00", "Heure exacte de soumission (HH:MM:SS)"),
        ("source", "Formulaire de candidature - puralpha.fr", "Formulaire d'origine de la collecte"),
        ("canal", "Web", "Canal de collecte numérique"),
        ("text_version", "v1.1 - August 2026", "Version du texte de la politique associée")
    ]
    for row_idx, row_data in enumerate(proof_rows, start=1):
        for col_idx, text in enumerate(row_data):
            c = t_proof.rows[row_idx].cells[col_idx]
            set_cell_background(c, "F8FAFC" if row_idx % 2 == 1 else "FFFFFF")
            set_cell_margins(c, 50, 50, 80, 80)
            p = c.paragraphs[0]
            r = p.add_run(text)
            r.font.size = Pt(8)
            r.font.color.rgb = dark

    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(4)
    add_bullet(p, "Rôle et valeur probante", "L'enregistrement dans le localStorage client constitue une trace miroir locale consultable par l'internaute. La preuve primaire officielle faisant foi est enregistrée directement dans la base de données WordPress au sein de l'entrée de soumission du formulaire.")

    # 6. HÉBERGEMENT & LOGS
    add_q_header("Hébergement, journaux techniques et sauvegardes", 6)
    p = doc.add_paragraph()
    add_bullet(p, "Hébergeur effectif", "IONOS (IONOS SARL — 7 place de la Gare, BP 70109, 57200 Sarreguemines Cedex, France — RCS Sarreguemines B 431 303 775 / Filiale de IONOS SE, Montabaur, Allemagne).")
    p = doc.add_paragraph()
    add_bullet(p, "Localisation des données", "Union Européenne (Datacenters certifiés ISO 27001 situés en UE). Les environnements puralpha.fr et bk.puralpha.fr sont hébergés sur cette même infrastructure européenne.")
    p = doc.add_paragraph()
    add_bullet(p, "Configuration serveur, journaux et sauvegardes", "Infrastructure configurée le 7 octobre 2026 par M. Edem (administrateur système MAONO). Les éléments de détail technique (adresses IP, durée exacte des logs serveur Nginx/Apache et politique de sauvegardes Plesk) relèvent de la gestion de l'infrastructure et sont à confirmer directement auprès de M. Edem.")
    p = doc.add_paragraph()
    add_bullet(p, "Prestataires techniques habilités", "Seuls l'agence MAONO (administration système, infogérance) et IONOS (hébergement matériel et réseau) ont accès aux environnements.")

    # 7. SERVICES TIERS ET TRANSFERTS HORS UE
    add_q_header("Services tiers utilisés en production et transferts hors UE", 7)
    p = doc.add_paragraph()
    p.paragraph_format.space_after = Pt(4)
    r_t_desc = p.add_run("Cartographie des services externes sollicités sur l'environnement de production :")
    r_t_desc.font.size = Pt(9.5)
    r_t_desc.font.color.rgb = dark

    t_tiers = doc.add_table(rows=7, cols=4)
    t_tiers.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_borders(t_tiers)
    tiers_h = ["Service tiers", "Éditeur / Pays", "Modalité d'appel et d'activation", "Statut d'implémentation"]
    for i, h in enumerate(tiers_h):
        c = t_tiers.rows[0].cells[i]
        set_cell_background(c, "0D3D4F")
        set_cell_margins(c, 70, 70, 90, 90)
        p = c.paragraphs[0]
        r = p.add_run(h)
        r.font.bold = True
        r.font.size = Pt(8.5)
        r.font.color.rgb = RGBColor(255, 255, 255)
    tiers_rows = [
        (
            "Google Analytics 4 (G-S60574HD6J)",
            "Google LLC (États-Unis / DPF)",
            "Script asynchrone (@next/third-parties)",
            "Bloqué par défaut (Consent Mode v2) ; activé uniquement après accord « Statistiques »"
        ),
        (
            "Google Maps",
            "Google LLC (États-Unis / DPF)",
            "Iframe intégrée sur /contact",
            "Bloqué par défaut derrière un bouton d'action explicite ou accord « Marketing »"
        ),
        (
            "YouTube (Lecteur vidéo)",
            "Google LLC (États-Unis / DPF)",
            "Iframe sur /notre-histoire et modalité vidéo du blog",
            "Solution 2-clics : strict blocage initial, domaine youtube-nocookie.com, chargé uniquement sur clic de lecture"
        ),
        (
            "WordPress REST API (bk.puralpha.fr)",
            "PUR Alpha / IONOS (Union Européenne)",
            "Appels serveur à serveur et transmission formulaires",
            "Données hébergées en UE sur serveur IONOS, flux chiffrés HTTPS TLS 1.3"
        ),
        (
            "Google Fonts (Police Poppins)",
            "Google LLC",
            "Compilateur local next/font au build",
            "Zéro requête externe : polices téléchargées et servies en local par le serveur"
        ),
        (
            "Unsplash",
            "Unsplash Inc. (États-Unis)",
            "Fallback statique d'illustration (blog.ts)",
            "Non sollicité en production : les visuels effectifs proviennent de la médiathèque WordPress"
        )
    ]
    for row_idx, row_data in enumerate(tiers_rows, start=1):
        for col_idx, text in enumerate(row_data):
            c = t_tiers.rows[row_idx].cells[col_idx]
            set_cell_background(c, "F8FAFC" if row_idx % 2 == 1 else "FFFFFF")
            set_cell_margins(c, 60, 60, 90, 90)
            p = c.paragraphs[0]
            r = p.add_run(text)
            r.font.size = Pt(8)
            r.font.color.rgb = dark

    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(8)
    p.paragraph_format.space_after = Pt(2)
    r_yt_title = p.add_run("Précisions techniques sur l'intégration YouTube :")
    r_yt_title.font.bold = True
    r_yt_title.font.size = Pt(10)
    r_yt_title.font.color.rgb = navy

    p = doc.add_paragraph()
    add_bullet(p, "Absence de chargement à l'affichage", "Aucune requête réseau vers YouTube n'est émise au premier affichage des pages. Les vidéos sont présentées sous la forme d'un aperçu visuel (façade) avec bouton de lecture.")
    p = doc.add_paragraph()
    add_bullet(p, "Domaine youtube-nocookie.com", "L'intégration utilise exclusivement le domaine officiel de protection renforcée https://www.youtube-nocookie.com/embed/... qui empêche le dépôt de cookies publicitaires avant la lecture.")
    p = doc.add_paragraph()
    add_bullet(p, "Traceurs déposés exclusivement lors du visionnage", "Une fois la lecture déclenchée par l'internaute, YouTube peut déposer les cookies techniques suivants : VISITOR_INFO1_LIVE (estimation de bande passante, durée ~6 mois), YSC (suivi de session, durée de session), et PREF (préférences du lecteur, durée ~8 mois).")

    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(8)
    p.paragraph_format.space_after = Pt(2)
    r_trans_title = p.add_run("Encadrement des transferts de données hors Union Européenne :")
    r_trans_title.font.bold = True
    r_trans_title.font.size = Pt(10)
    r_trans_title.font.color.rgb = navy

    p = doc.add_paragraph()
    add_bullet(p, "Données internes et hébergement applicatif", "L'ensemble des données nominatives (coordonnées des contacts, candidatures, pièces jointes/CVs, contenus du CMS) est stocké et traité exclusivement au sein de l'Union Européenne sur le serveur IONOS. Aucun transfert hors UE n'a lieu sur ces données.")
    p = doc.add_paragraph()
    add_bullet(p, "Services tiers Google (Analytics, Maps, YouTube)", "Ces fonctionnalités optionnelles impliquent des flux techniques vers Google LLC (États-Unis).")
    p = doc.add_paragraph()
    add_bullet(p, "Garantie juridique (Data Privacy Framework)", "Ces transferts sont régis par le Cadre de protection des données UE-États-Unis (EU-US Data Privacy Framework - DPF), adopté par décision d'adéquation de la Commission Européenne le 10 juillet 2023. De plus, ces services sont strictement bloqués avant action ou accord explicite du visiteur.")

    try:
        doc.save("Reponses_Audit_RGPD_PureAlpha_Octobre_2026.docx")
        print("Document successfully created: Reponses_Audit_RGPD_PureAlpha_Octobre_2026.docx")
    except PermissionError:
        output_name = "Reponses_Audit_RGPD_PureAlpha_Octobre_2026_v2.docx"
        doc.save(output_name)
        print(f"Reponses_Audit_RGPD_PureAlpha_Octobre_2026.docx est actuellement ouvert dans Word. Fichier sauvegarde sous : {output_name}")

if __name__ == "__main__":
    create_document()
