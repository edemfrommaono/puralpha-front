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
    r_top = p_top.add_run("PUR ALPHA — AUDIT DE CONFORMITÉ RGPD")
    r_top.font.name = "Calibri"
    r_top.font.size = Pt(11)
    r_top.font.bold = True
    r_top.font.color.rgb = teal

    h_main = doc.add_paragraph()
    h_main.paragraph_format.space_before = Pt(0)
    h_main.paragraph_format.space_after = Pt(4)
    r_title = h_main.add_run("Réponses Directes aux 7 Questions de Conformité")
    r_title.font.name = "Calibri"
    r_title.font.size = Pt(20)
    r_title.font.bold = True
    r_title.font.color.rgb = navy

    sub_p = doc.add_paragraph()
    sub_p.paragraph_format.space_before = Pt(0)
    sub_p.paragraph_format.space_after = Pt(12)
    r_sub = sub_p.add_run("Environnement de production : https://puralpha.fr & Back-office : https://bk.puralpha.fr — Octobre 2026")
    r_sub.font.name = "Calibri"
    r_sub.font.size = Pt(10.5)
    r_sub.font.italic = True
    r_sub.font.color.rgb = gray

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
        ("1. Google Analytics", "• GA4 actif en production\n• ID : G-S60574HD6J\n• Bloqué par défaut (Consent Mode v2)\n• Aucun cookie avant acceptation « Statistiques »\n• GTM non utilisé en production", "Conforme", "Cookies : _ga (2 ans), _ga_S60574HD6J (2 ans)"),
        ("2. Bandeau cookies & choix", "• Stockage : localStorage ('puralpha-cookie-consent')\n• Durée : Illimitée / sans expiration technique actuelle\n• Égalité stricte acceptation / refus\n• Bouton « Gérer les cookies » actif dans le Footer", "Conforme (Ajustable)", "Recommandation : ajouter une purge auto à 6 mois"),
        ("3. Google Maps", "• Bloqué par défaut sur /contact (placeholder + bouton)\n• Déclenché sur clic explicite ou consentement Marketing\n• Cookies Google Maps : NID, AEC, SOCS, CONSENT", "Conforme", "Durée traceurs : de 6 mois (NID, AEC) à 2 ans (CONSENT)"),
        ("4. Formulaires & Forminator", "• Données transmises au back-office WordPress (IDs 1206 & 1207)\n• Contact : 3 ans (dernier échange)\n• Candidature standard : durée du recrutement\n• Candidature Vivier : 2 ans (accord exprès)", "Conforme", "Purge automatique programmable dans Forminator"),
        ("5. Preuves consentement navigateur", "• Mécanisme puralpha_consent_proofs actif\n• 9 champs enregistrés (email, libellé, horodatage, etc.)\n• Persistant dans le localStorage client (sans TTL)\n• Preuve légale primaire consignée sur WordPress", "Conforme", "Trace miroir locale pour l'utilisateur"),
        ("6. Hébergement & Logs", "• Hébergeur : OVHcloud (France)\n• Datacenters : Roubaix & Gravelines (100% France)\n• Logs serveur : 30 jours à 12 mois max\n• Sauvegardes : 30 jours glissants (Plesk/OVH)\n• Prestataires habilités : Maono & OVH uniquement", "Conforme", "Zéro transfert de données hors Union Européenne"),
        ("7. Services tiers en production", "• GA4 (bloqué par défaut)\n• Google Maps (bloqué par défaut)\n• YouTube (activé à la lecture)\n• WordPress API (hébergé France)\n• Unsplash : inactif (fallback statique non utilisé)\n• Google Fonts : zéro appel externe (polices locales)", "Conforme", "Seuls les services nécessaires sont chargés")
    ]

    recap_table = doc.add_table(rows=len(recap_data) + 1, cols=4)
    recap_table.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_borders(recap_table)

    rec_headers = ["Point d'audit", "Réponse technique synthétique", "Statut RGPD", "Observation clé"]
    col_widths = [Inches(1.5), Inches(2.8), Inches(1.0), Inches(1.8)]

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
    add_bullet(p, "Identifiant de mesure", "G-S60574HD6J (défini par NEXT_PUBLIC_GA_MEASUREMENT_ID).")
    p = doc.add_paragraph()
    add_bullet(p, "Blocage par défaut", "Oui. Google Consent Mode v2 injecté en tête de page (analytics_storage et ad_storage configurés sur 'denied' par défaut).")
    p = doc.add_paragraph()
    add_bullet(p, "Transmission avant consentement", "Aucune. Aucun cookie déposé et aucun signal d'audience émis avant acceptation de la catégorie « Statistiques ».")
    p = doc.add_paragraph()
    add_bullet(p, "Cookies déposés après consentement", "Deux cookies :")

    t_ga = doc.add_table(rows=3, cols=4)
    t_ga.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_borders(t_ga)
    ga_h = ["Cookie", "Fournisseur", "Finalité", "Durée de conservation"]
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
        ("_ga", "Google LLC", "Distinction des visiteurs uniques anonymisés", "2 ans (par défaut Google)"),
        ("_ga_S60574HD6J", "Google LLC", "Maintien de l'état de session", "2 ans / session")
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
    add_bullet(p, "Utilisation de Google Tag Manager (GTM)", "Non. Seul GA4 direct est utilisé en production. Aucun conteneur GTM n'est actif.")

    # 2. BANDEAU COOKIES
    add_q_header("Bandeau cookies et durée des choix", 2)
    p = doc.add_paragraph()
    add_bullet(p, "Support de conservation", "localStorage du navigateur sous la clé 'puralpha-cookie-consent'.")
    p = doc.add_paragraph()
    add_bullet(p, "Durée et expiration technique", "Actuellement sans date d'expiration dans le code (persiste jusqu'à suppression du cache par l'utilisateur).")
    p = doc.add_paragraph()
    add_bullet(p, "Égalité acceptation / refus", "Oui. La même durée et la même méthode de stockage s'appliquent pour l'acceptation et pour le refus.")
    p = doc.add_paragraph()
    add_bullet(p, "Lien « Gérer les cookies »", "Oui. Présent de façon permanente dans le pied de page (Footer.tsx) et permet de modifier ou retirer son choix à tout moment.")

    # 3. GOOGLE MAPS
    add_q_header("Google Maps", 3)
    p = doc.add_paragraph()
    add_bullet(p, "Blocage par défaut sur /contact", "Confirmé. La carte est masquée derrière un panneau indicatif avec bouton « Afficher la carte ». L'iframe ne se charge que sur clic utilisateur ou consentement à la catégorie Marketing.")
    p = doc.add_paragraph()
    add_bullet(p, "Cookies déposés après activation", "Quatre cookies tiers Google :")

    t_maps = doc.add_table(rows=5, cols=4)
    t_maps.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_borders(t_maps)
    maps_h = ["Cookie", "Domaine", "Finalité", "Durée"]
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
        ("NID", "maps.google.com", "Préférences d'affichage (zoom/position) et ciblage", "6 mois"),
        ("AEC", "google.com", "Sécurité des requêtes et prévention des fraudes", "6 mois"),
        ("SOCS", "google.com", "Mémorisation de l'état de consentement Google", "13 mois"),
        ("CONSENT", "google.com", "Enregistrement des choix de consentement Google", "2 ans")
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
    add_bullet(p, "Transmission au back-office", "Confirmé. Envoi direct en HTTPS vers l'API REST WordPress (https://bk.puralpha.fr/wp-json/v1/submit-form, IDs 1206 et 1207).")
    p = doc.add_paragraph()
    add_bullet(p, "Demandes de contact", "3 ans à compter du dernier contact (recommandation CNIL pour les prospects).")
    p = doc.add_paragraph()
    add_bullet(p, "Candidatures (processus normal)", "Durée de la procédure de recrutement (suppression à l'issue en cas de refus).")
    p = doc.add_paragraph()
    add_bullet(p, "Candidatures (accord Vivier)", "2 ans à compter du dernier échange (sur consentement exprès via la case dédiée).")
    p = doc.add_paragraph()
    add_bullet(p, "Suppression automatique vs manuelle", "Front-end : aucune donnée conservée. WordPress : suppression programmable via l'option Forminator « Submissions Privacy » (cron automatique) ; à défaut, purge manuelle par l'administrateur.")

    # 5. PREUVES DE CONSENTEMENT DANS LE NAVIGATEUR
    add_q_header("Preuves de consentement dans le navigateur", 5)
    p = doc.add_paragraph()
    add_bullet(p, "Mécanisme actif", "Oui. La clé 'puralpha_consent_proofs' s'alimente lors de chaque soumission avec case cochée.")
    p = doc.add_paragraph()
    add_bullet(p, "Informations exactement enregistrées", "9 champs : email, choice, label, accepted, date, time, source, canal, text_version.")

    t_proof = doc.add_table(rows=10, cols=3)
    t_proof.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_borders(t_proof)
    proof_h = ["Champ", "Exemple", "Description"]
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
        ("email", "candidat@email.fr", "Adresse électronique saisie"),
        ("choice", "consent_vivier ou consent_email", "Identifiant technique de la finalité"),
        ("label", "« J'accepte que PUR Alpha conserve... »", "Texte exact présenté sous la case"),
        ("accepted", "true", "État d'acceptation par l'internaute"),
        ("date", "2026-10-14", "Date de soumission (AAAA-MM-JJ)"),
        ("time", "12:30:00", "Heure exacte de soumission (HH:MM:SS)"),
        ("source", "Formulaire de candidature", "Formulaire d'origine"),
        ("canal", "Web", "Canal de collecte"),
        ("text_version", "v1.0 - July 2026", "Version du texte juridique")
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
    add_bullet(p, "Durée et expiration", "Persistant dans le localStorage du visiteur (sans TTL). Sert de copie miroir locale pour l'internaute ; la preuve officielle étant archivée sur WordPress.")

    # 6. HÉBERGEMENT & LOGS
    add_q_header("Hébergement, journaux techniques et sauvegardes", 6)
    p = doc.add_paragraph()
    add_bullet(p, "Hébergeur effectif", "OVHcloud (OVH SAS — 2 rue Kellermann, 59100 Roubaix, France).")
    p = doc.add_paragraph()
    add_bullet(p, "Pays d'hébergement", "France (Datacenters Roubaix / Gravelines pour puralpha.fr [54.36.250.74] et bk.puralpha.fr [5.135.140.35]).")
    p = doc.add_paragraph()
    add_bullet(p, "Journaux techniques (logs serveur)", "30 jours à 12 mois maximum (règles Nginx/Plesk conformes aux préconisations CNIL).")
    p = doc.add_paragraph()
    add_bullet(p, "Durée des sauvegardes", "30 jours glissants (outils automatisés Plesk / OVH).")
    p = doc.add_paragraph()
    add_bullet(p, "Prestataires habilités", "Maono (agence technique) et OVH SAS (hébergement infrastructure) exclusivement. Aucun autre tiers.")

    # 7. SERVICES TIERS
    add_q_header("Services tiers actuellement utilisés en production", 7)

    t_tiers = doc.add_table(rows=7, cols=4)
    t_tiers.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_borders(t_tiers)
    tiers_h = ["Service tiers", "Fournisseur", "Modalité d'appel", "Statut RGPD"]
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
        ("Google Analytics 4 (G-S60574HD6J)", "Google LLC (USA/UE)", "Script asynchrone (@next/third-parties)", "Bloqué par défaut (Consent Mode v2) ; actif sur consentement"),
        ("Google Maps", "Google LLC (USA)", "Iframe embed sur /contact", "Bloqué par défaut derrière un clic / consentement Marketing"),
        ("YouTube", "Google / Alphabet (USA)", "Iframe embed (/notre-histoire & /actualite)", "Chargé lors de la lecture des vidéos"),
        ("WordPress REST API (bk.puralpha.fr)", "PUR Alpha / OVH (France)", "Appels serveur à serveur et formulaires", "Données 100% en France, flux HTTPS TLS 1.3"),
        ("Unsplash", "Unsplash Inc. (USA)", "Fallback statique (blog.ts)", "Non sollicité en production : images servies depuis bk.puralpha.fr"),
        ("Google Fonts (Poppins)", "Google LLC", "Compilateur local next/font", "Zéro requête externe : polices auto-hébergées sur le serveur")
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

    doc.save("Reponses_Audit_RGPD_PureAlpha_Octobre_2026.docx")
    print("Document successfully created: Reponses_Audit_RGPD_PureAlpha_Octobre_2026.docx")

if __name__ == "__main__":
    create_document()
