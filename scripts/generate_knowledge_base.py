import json
import os
import shutil
from datetime import datetime

# ReportLab imports
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, HRFlowable
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT, TA_JUSTIFY
from reportlab.pdfgen import canvas

# Define custom NumberedCanvas for professional "Page X of Y" and running headers/footers
class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super(NumberedCanvas, self).__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super(NumberedCanvas, self).showPage()
        super(NumberedCanvas, self).save()

    def draw_page_decorations(self, page_count):
        if self._pageNumber == 1:
            # Suppress running header/footer on cover page
            return
        
        self.saveState()
        
        # Running Top Header
        self.setFont("Helvetica-Bold", 7.5)
        self.setFillColor(colors.HexColor("#B8934A"))
        self.drawString(40, 808, "DAGSIS PROPERTY 3 DUMMY")
        
        self.setFont("Helvetica", 7.5)
        self.setFillColor(colors.HexColor("#64748B"))
        self.drawRightString(555, 808, "OFFICIAL AI CHATBOT KNOWLEDGE BASE & SYSTEM CONTEXT")
        
        self.setStrokeColor(colors.HexColor("#CBD5E1"))
        self.setLineWidth(0.75)
        self.line(40, 800, 555, 800)
        
        # Running Bottom Footer
        self.line(40, 46, 555, 46)
        
        self.setFont("Helvetica", 7.5)
        self.setFillColor(colors.HexColor("#94A3B8"))
        self.drawString(40, 34, "CONFIDENTIAL & PROPRIETARY · CEA REG: L3009842J · PRIVATE CLIENT DESK")
        
        page_str = f"Page {self._pageNumber} of {page_count}"
        self.setFont("Helvetica-Bold", 7.5)
        self.setFillColor(colors.HexColor("#64748B"))
        self.drawRightString(555, 34, page_str)
        
        self.restoreState()


def load_database():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    db_path = os.path.join(base_dir, "database.json")
    with open(db_path, "r", encoding="utf-8") as f:
        return json.load(f), base_dir


def create_markdown_knowledge_base(data, output_md_path):
    our_story = data.get("our_story", {})
    stats = data.get("statistics", [])
    locations = data.get("featured_locations", [])
    hero_projects = data.get("hero_projects", [])
    featured_properties = data.get("featured_properties", [])
    comparisons = data.get("project_comparisons", [])
    facilities = data.get("facilities", [])
    financing = data.get("financing_options", [])
    appointments = data.get("viewing_appointments", [])
    agents = data.get("agents", [])
    testimonials = data.get("testimonials", [])
    gallery = data.get("portfolio_gallery", [])

    md = []
    md.append("# DAGSIS PROPERTY 3 DUMMY")
    md.append("## OFFICIAL AI CHATBOT KNOWLEDGE BASE & SYSTEM CONTEXT DIRECTORY\n")
    md.append("**Document Version:** 2.5 (Comprehensive Production Edition)")
    md.append(f"**Generated Date:** {datetime.now().strftime('%B %d, %Y')}")
    md.append("**Target Environment:** LLM Vector Stores, OpenAI Custom GPT, Claude Project, LangChain, Flowise, Botpress, Voiceflow")
    md.append("**Entity:** Dagsis Property 3 Dummy Pte Ltd (CEA License: L3009842J)")
    md.append("**Direct Hotline:** +65 XXXXXXXXX (24/7 Desk) | **Email:** concierge@hauteterres.sg\n")
    md.append("---\n")

    md.append("## 1. READY-TO-USE SYSTEM PROMPT FOR AI CHATBOT\n")
    md.append("```text")
    md.append("You are the Dagsis Property 3 Dummy Private Client Concierge AI, the official digital representative of Dagsis Property 3 Dummy Pte Ltd (CEA License: L3009842J), Singapore's premier ultra-luxury architectural advisory firm.")
    md.append("")
    md.append("YOUR MISSION:")
    md.append("Engage prospective Ultra-High-Net-Worth Individuals (UHNWIs), family office principals, private wealth advisors, and collectors of monumental architecture. Guide them through Singapore's most guarded Good Class Bungalows (GCBs), iconic super penthouses, and oceanfront trophy estates.")
    md.append("")
    md.append("TONE & PERSONA:")
    md.append("- Poised, erudite, discreet, and refined.")
    md.append("- Deeply knowledgeable in structural architecture, material craftsmanship, and Singapore real estate regulations.")
    md.append("- Never use vulgar, informal, or pushy sales language. Speak with understated confidence.")
    md.append("")
    md.append("STRICT OPERATING GUARDRAILS:")
    md.append("1. Confidentiality: Never fabricate or disclose private owner identities, unlisted cadastral boundaries, or off-market floor plans without NDA verification.")
    md.append("2. Regulatory Precision: Accurately explain Buyer's Stamp Duty (BSD), Additional Buyer's Stamp Duty (ABSD), SLA Land Dealings Approval Unit (LDAU) restrictions for foreigners on landed GCBs, and Free Trade Agreement (FTA) national treatment exceptions.")
    md.append("3. Primary Call-to-Action: Always invite qualified patrons to book an immersive session at the Private Viewing Salon (/book-viewing) or call the 24/7 Concierge Hotline (+65 XXXXXXXXX).")
    md.append("4. Escalation: For off-market portfolios exceeding S$50M, family office trusts (Section 13O / 13U), or sovereign debt facilities, politely connect the client with Senior Partner Alistair Vance or Founding Principals Lord Julian Sterling and Valerie Montrose.")
    md.append("```\n")

    md.append("## 2. CORPORATE ENTITY & CONTACT DIRECTORY\n")
    md.append("- **Legal Name:** Dagsis Property 3 Dummy Pte Ltd")
    md.append("- **Brand Name:** DAGSIS PROPERTY 3 DUMMY · Architecture & Domaines")
    md.append("- **CEA License:** L3009842J (Private Wealth & Ultra-Prime Advisory)")
    md.append("- **Headquarters:** 123, Street ABC, State XYZ, Pin-000000")
    md.append("- **Direct Client Line (24/7):** +65 XXXXXXXXX")
    md.append("- **Confidential Email:** concierge@hauteterres.sg")
    md.append("- **Founding Principals:** Lord Julian Sterling & Valerie Montrose (Est. 2002)")
    md.append("- **Cumulative Investment Volume:** Over S$ 4.8 Billion in prime real estate transactions\n")

    md.append("## 3. ATELIER MANIFESTO & PHILOSOPHY\n")
    md.append(f"**Lead Quote:** *\"{our_story.get('lead_quote', '')}\"*\n")
    md.append(f"**Company Vision:** {our_story.get('company_vision', '')}\n")
    md.append(f"**Property Expertise:** {our_story.get('property_expertise', '')}\n")
    md.append(f"**Luxury Philosophy:** {our_story.get('luxury_philosophy', '')}\n")

    md.append("## 4. KEY OPERATIONAL STATISTICS & BENCHMARKS\n")
    for s in stats:
        prefix = s.get("prefix", "")
        suffix = s.get("suffix", "")
        val = s.get("value", "")
        md.append(f"- **{s.get('label', '')}:** {prefix}{val}{suffix} — *{s.get('description', '')}*")
    md.append("")

    md.append("## 5. SINGAPORE PRIME ENCLAVES (DISTRICT INTELLIGENCE)\n")
    for loc in locations:
        md.append(f"### {loc.get('district', '')}")
        md.append(f"- **Average Price:** {loc.get('average_price', '')} ({loc.get('average_price_label', '')})")
        md.append(f"- **Current Availability:** {loc.get('availability', '')}")
        md.append(f"- **Flagship Monograph:** {loc.get('featured_property', '')}")
        md.append(f"- **Enclave Character:** {loc.get('character', '')}\n")

    md.append("## 6. FLAGSHIP HERO RESIDENCES\n")
    for hp in hero_projects:
        md.append(f"### {hp.get('name', '')} (Hero ID: {hp.get('id', '')})")
        md.append(f"- **Subtitle:** {hp.get('subtitle', '')}")
        md.append(f"- **Location & District:** {hp.get('location', '')} ({hp.get('district', '')})")
        md.append(f"- **Price:** {hp.get('price_formatted', '')} (SGD {hp.get('starting_price_sgd', 0):,})")
        md.append(f"- **Status:** {hp.get('availability', '')}")
        md.append(f"- **Type:** {hp.get('property_type', '')}")
        md.append(f"- **Accommodations:** {hp.get('bedrooms', '')} | {hp.get('bathrooms', '')}")
        md.append(f"- **Floor Area:** {hp.get('area_sqft', '')}")
        md.append(f"- **Master Architect:** {hp.get('architect', '')}")
        md.append(f"- **Completion:** {hp.get('completion_year', '')}")
        md.append(f"- **Tagline:** {hp.get('tagline', '')}\n")

    md.append("## 7. COMPLETE FEATURED RESIDENCE CATALOG\n")
    for p in featured_properties:
        md.append(f"### {p.get('title', '')} (ID: {p.get('id', '')})")
        md.append(f"- **Location & District:** {p.get('location', '')} ({p.get('district', '')})")
        md.append(f"- **Price:** {p.get('price_formatted', '')} (SGD {p.get('price_sgd', 0):,})")
        md.append(f"- **Status:** {p.get('availability', '')}")
        md.append(f"- **Property Type:** {p.get('property_type', '')}")
        md.append(f"- **Layout:** {p.get('bedrooms', '')} En-Suite Suites | {p.get('bathrooms', '')} Baths")
        md.append(f"- **Floor Area:** {p.get('area_sqft', 0):,} sq ft")
        md.append(f"- **Levels:** {p.get('floor', 'N/A')}")
        md.append(f"- **Master Architect:** {p.get('architect', 'Confidential')}")
        md.append(f"- **Completion Date:** {p.get('completion_date', 'Completed')}")
        md.append(f"- **Investment Outlook:** {p.get('investment_potential', '')}")
        md.append(f"- **Description:** {p.get('description', '')}")
        highlights = ", ".join(p.get("highlights", []))
        md.append(f"- **Signature Highlights:** {highlights}\n")

    md.append("## 8. PROJECT COMPARISON & SPECIFICATION MATRIX\n")
    for cmp in comparisons:
        md.append(f"### {cmp.get('project_name', '')} (Ref: {cmp.get('comparison_id', '')})")
        md.append(f"- **Price:** {cmp.get('price', '')}")
        md.append(f"- **Location:** {cmp.get('location', '')}")
        md.append(f"- **Type & Area:** {cmp.get('property_type', '')} ({cmp.get('area', '')})")
        md.append(f"- **Tenure:** {cmp.get('tenure', '')}")
        md.append(f"- **View Orientation:** {cmp.get('view_type', '')}")
        md.append(f"- **Architect:** {cmp.get('architect', '')}")
        md.append(f"- **Completion:** {cmp.get('completion_date', '')}")
        md.append(f"- **Key Facilities:** {cmp.get('facilities', '')}\n")

    md.append("## 9. PRIVATE ARCHITECTURAL AMENITIES & FACILITIES\n")
    for fac in facilities:
        md.append(f"### {fac.get('title', '')} (ID: {fac.get('id', '')})")
        md.append(f"- **Category:** {fac.get('category', '')}")
        md.append(f"- **Overview:** {fac.get('description', '')}")
        md.append(f"- **Technical Specifications:** {fac.get('specs', '')}\n")

    md.append("## 10. CAPITAL ADVISORY, PRIVATE BANKING & MORTGAGE PACKAGES\n")
    for fin in financing:
        md.append(f"### {fin.get('bank_name', '')} — {fin.get('package_name', '')}")
        md.append(f"- **Loan-to-Value (LTV):** {fin.get('loan_to_value', '')}")
        md.append(f"- **Interest Rate:** {fin.get('interest_rate_display', '')} ({fin.get('interest_rate_pct', 0)}%)")
        md.append(f"- **Minimum Down Payment:** {fin.get('min_down_payment_pct', 0)}%")
        md.append(f"- **Maximum Loan Tenor:** {fin.get('max_tenor_years', 30)} Years")
        md.append(f"- **Processing Fee:** {fin.get('processing_fee', 'Waived')}")
        md.append(f"- **Client Perks:** {'; '.join(fin.get('perks', []))}")
        md.append(f"- **Advisory Assessment:** {fin.get('advisory_notes', '')}\n")

    md.append("## 11. SINGAPORE TAX & REGULATORY FRAMEWORK\n")
    md.append("### Buyer's Stamp Duty (BSD)")
    md.append("- First S$180,000: 1%")
    md.append("- Next S$180,000: 2%")
    md.append("- Next S$640,000: 3%")
    md.append("- Next S$500,000: 4%")
    md.append("- Next S$1,500,000: 5%")
    md.append("- Amounts exceeding S$3,000,000: 6%\n")

    md.append("### Additional Buyer's Stamp Duty (ABSD)")
    md.append("- **Singapore Citizens:** 0% on 1st residential property, 20% on 2nd, 30% on 3rd and subsequent.")
    md.append("- **Singapore Permanent Residents:** 5% on 1st residential property, 30% on 2nd, 35% on 3rd and subsequent.")
    md.append("- **Foreign Nationals:** 60% on any residential property.")
    md.append("- **Entities & Corporate Vehicles:** 65% upfront.")
    md.append("- **Free Trade Agreement (FTA) National Treatment Exception:** Nationals and Permanent Residents of Iceland, Liechtenstein, Norway, Switzerland, and Nationals of the United States of America are accorded the same ABSD status as Singapore Citizens (0% on 1st residential acquisition).\n")

    md.append("### Foreign Ownership Restrictions (Landed vs. Non-Landed)")
    md.append("- **Landed Properties (Good Class Bungalows / GCBs):** Under the Residential Property Act, foreign nationals (including Permanent Residents) require express prior approval from the Land Dealings Approval Unit (LDAU) of the Singapore Land Authority. GCB approvals for non-citizens are extraordinarily rare and strictly contingent upon exceptional economic contributions.")
    md.append("- **Sentosa Cove Waterfront Landed:** The only designated exception in Singapore where foreign nationals may apply for expedited LDAU approval to acquire a 99-year leasehold landed property for owner-occupation.")
    md.append("- **Strata-Titled Properties (Super Penthouses, Duplexes, Condominiums):** Foreign nationals may purchase freely without prior LDAU approval.\n")

    md.append("### MAS Section 13O / 13U Family Office Structuring")
    md.append("Dagsis Property 3 Dummy Capital Advisory works alongside top-tier private banks (DBS, UBS, HSBC) to coordinate residential acquisitions within compliant Single Family Office (SFO) architectures, qualifying for tax exemptions under Sections 13O and 13U of the Income Tax Act.\n")

    md.append("## 12. PRIVATE VIEWING SALON PROTOCOLS & VIP EXPERIENCE\n")
    md.append("Clients book via `/book-viewing` or via phone +65 XXXXXXXXX.\n")
    md.append("### 12.1 Viewing Formats")
    md.append("1. **Golden Hour Sunset & Champagne Salon (90 Mins):** Panoramic dusk vistas, terrace illumination, and sommelier vintage tasting.")
    md.append("2. **Morning Solar Light & Architectural Study (75 Mins):** Natural daylight penetration, acoustic analysis, and structural finishes.")
    md.append("3. **Executive Fast-Track & Structural Vault Inspection (60 Mins):** High-efficiency inspection of biometric systems, security vaults, and supercar galleries.")
    md.append("4. **Helicopter Touchdown & Deep Ocean Berth Tour (120 Mins):** Marina walkthrough, private yacht mooring assessment, and coastal aerial perspective.\n")

    md.append("### 12.2 Chauffeur Fleet Options")
    md.append("- Rolls-Royce Spectre (Electric Ultra-Luxury)")
    md.append("- Rolls-Royce Ghost Extended (V12 Twin-Turbo Chauffeur)")
    md.append("- Mercedes-Maybach S 680 (First-Class Rear Executive Suite)")
    md.append("- Bentley Flying Spur Mulliner (Handcrafted Grand Tourer)")
    md.append("- Self-Arrival (Subterranean Supercar Bay Reserved with high-speed DC charging)\n")

    md.append("### 12.3 Sommelier & Refreshment Pairings")
    md.append("- Dom Pérignon Vintage 2015 (Grand Vintage Champagne)")
    md.append("- Krug Grande Cuvée 171ème Édition (Multi-Vintage Prestige)")
    md.append("- Louis Roederer Cristal 2014 (Cellar Master Selection)")
    md.append("- Artisanal Rare Tea & Sparkling Mineral Pairing (Organic Non-Alcoholic Botanical Pairing)\n")

    md.append("## 13. SENIOR PRIVATE CLIENT ADVISORY PARTNERS\n")
    for ag in agents:
        md.append(f"### {ag.get('name', '')} ({ag.get('id', '')})")
        md.append(f"- **Title & Division:** {ag.get('title', '')} · {ag.get('division', '')}")
        md.append(f"- **Experience & Volume:** {ag.get('experience', '')} ({ag.get('volume', '')})")
        md.append(f"- **Languages Spoken:** {', '.join(ag.get('languages', []))}\n")

    md.append("## 14. PATRONAGE TESTIMONIALS & ENDORSEMENTS\n")
    for t in testimonials:
        md.append(f"### {t.get('author', '')} — {t.get('title', '')} ({t.get('year', '')})")
        md.append(f"- **Acquisition:** {t.get('property', '')}")
        md.append(f"- **Endorsement:** *\"{t.get('quote', '')}\"*\n")

    md.append("## 15. VISUAL MONOGRAPH ANTHOLOGY (PORTFOLIO GALLERY)\n")
    for g in gallery:
        md.append(f"- **{g.get('title', '')}** ({g.get('category', '')}): {g.get('location', '')} by {g.get('architect', '')}")
    md.append("")

    md.append("## 16. FREQUENTLY ASKED QUESTIONS (FAQ) & RAG RETRIEVAL PAIRS\n")
    faqs = [
        ("Can non-Singapore citizens purchase landed Good Class Bungalows (GCBs)?",
         "Under Singapore's Residential Property Act, foreign nationals (including Permanent Residents) require express approval from the Land Dealings Approval Unit (LDAU) of the Singapore Land Authority to acquire landed residential property. GCBs in prime mainland districts (such as Nassim Hill, Cluny Road, or Bukit Timah) are almost exclusively restricted to Singapore Citizens who have made exceptional economic contributions. However, foreign nationals can freely acquire ultra-luxury strata-titled properties, including super penthouses and Sentosa Cove oceanfront villas."),
        ("Are foreigners eligible to buy oceanfront villas in Sentosa Cove?",
         "Yes. Sentosa Cove (District 04) is Singapore's only designated oceanic enclave where foreign buyers and non-residents can obtain LDAU approval to acquire 99-year leasehold landed waterfront villas and berths on an expedited basis."),
        ("What are the current Buyer's Stamp Duty (BSD) and Additional Buyer's Stamp Duty (ABSD) rates?",
         "Standard BSD applies progressively up to 6% for residential properties above S$3,000,000. For ABSD: Singapore Citizens pay 0% on their first residential property, 20% on the second, and 30% on subsequent properties. Permanent Residents pay 5% on their first property and 30% on the second. Foreign nationals pay 60% ABSD unless they qualify under Free Trade Agreements (FTA) with equivalent national treatment (such as nationals and permanent residents of Iceland, Liechtenstein, Norway, Switzerland, and US nationals). Entities and trusts incur 65% upfront ABSD."),
        ("How does Dagsis Property 3 Dummy assist with Family Office structuring under MAS Section 13O and 13U?",
         "Our Capital Advisory works directly with premier private wealth institutions (DBS Private Access, UBS, HSBC Premier Global, and Standard Chartered) and legal counsel to structure residential acquisitions within compliant Single Family Office (SFO) architectures, qualifying for tax exemptions on funds managed under Sections 13O and 13U of the Income Tax Act."),
        ("How do I book a private viewing of a property?",
         "You can book through our interactive Private Viewing Salon at `/book-viewing` or contact our 24/7 Concierge Hotline at +65 XXXXXXXXX. You may select your preferred viewing format (e.g. Sunset Champagne Salon, Morning Solar Study), complimentary private chauffeur service (Rolls-Royce Spectre, Maybach S680, or Bentley), and refreshment pairings."),
        ("Are private viewings covered by Non-Disclosure Agreements (NDAs)?",
         "Yes. For our confidential off-market acquisitions and Good Class Bungalow compounds, both prospective patrons and our advisory execute reciprocal confidentiality agreements to protect owner privacy and asset integrity."),
        ("What is the typical down payment and LTV for ultra-luxury residential properties?",
         "Loan-to-Value (LTV) limits in Singapore prime tier generally range between 70% and 75% for individuals with no outstanding home loans. Minimum cash/CPF down payments range from 25% to 30%. Dagsis Property 3 Dummy private bank partners offer specialized Lombard credit facilities and interest-offset structures to maximize liquidity."),
        ("Can I request an unlisted off-market property?",
         "Yes. Over 40% of our ultra-prime transactions are conducted off-market. Prospective patrons can register confidential mandates with our Managing Partners or subscribe to our quarterly Off-Market Intelligence Monograph at `/` or by contacting concierge@hauteterres.sg."),
        ("What is the highest-priced property in your current collection?",
         "Our highest publicly listed estate is the Nassim Hill Heritage Pavilion (Ref: RP003) at S$ 42,000,000, featuring a 16,400 sq ft compound with 7 en-suite palatial wings, a 30-car subterranean vault, private onsen, and helicopter touchdown pad designed by Kengo Kuma. Confidential off-market GCB compounds exceeding S$100,000,000 are available upon verified executive NDA."),
        ("What amenities are standard across Dagsis Property 3 Dummy represented properties?",
         "Signature amenities include cantilevered horizon glass pools, Technogym biometric studios, Lutron/Crestron OS 4 smart automation, biometric retina security, subterranean climate-controlled supercar garages (50% RH), and private sommelier tasting cellars."),
        ("Who founded Dagsis Property 3 Dummy and what is their background?",
         "Dagsis Property 3 Dummy was founded in 2002 by Lord Julian Sterling and Valerie Montrose. Over 24 years, they have overseen more than S$ 4.8 Billion in landmark residential transactions across Southeast Asia."),
        ("Where is your physical private client office located?",
         "Our private salon and executive office is located at 123, Street ABC, State XYZ, Pin-000000. Visits are strictly by prior appointment.")
    ]

    for q, a in faqs:
        md.append(f"### Q: {q}")
        md.append(f"**A:** {a}\n")

    with open(output_md_path, "w", encoding="utf-8") as f:
        f.write("\n".join(md))


def build_pdf_document(data, output_pdf_path):
    doc = SimpleDocTemplate(
        output_pdf_path,
        pagesize=A4,
        leftMargin=38,
        rightMargin=38,
        topMargin=50,
        bottomMargin=50
    )

    styles = getSampleStyleSheet()

    # Custom Luxury Palettes
    c_primary = colors.HexColor("#090A0F")
    c_gold = colors.HexColor("#B8934A")
    c_slate = colors.HexColor("#1E293B")
    c_muted = colors.HexColor("#64748B")
    c_light_bg = colors.HexColor("#F8FAFC")
    c_border = colors.HexColor("#CBD5E1")
    c_card_bg = colors.HexColor("#F1F5F9")

    # Typography Styles
    title_style = ParagraphStyle(
        'CoverTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=26,
        leading=32,
        textColor=c_primary,
        alignment=TA_CENTER
    )

    subtitle_style = ParagraphStyle(
        'CoverSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=11,
        leading=16,
        textColor=c_gold,
        alignment=TA_CENTER,
        spaceAfter=12
    )

    h1_style = ParagraphStyle(
        'SectionHeading1',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=14,
        leading=18,
        textColor=c_primary,
        spaceBefore=14,
        spaceAfter=6,
        keepWithNext=True
    )

    h2_style = ParagraphStyle(
        'SectionHeading2',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=15,
        textColor=c_gold,
        spaceBefore=8,
        spaceAfter=4,
        keepWithNext=True
    )

    body_style = ParagraphStyle(
        'BodyTextCustom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8,
        leading=11.5,
        textColor=c_slate,
        spaceAfter=5
    )

    body_bold = ParagraphStyle(
        'BodyBoldCustom',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8,
        leading=11.5,
        textColor=c_primary,
        spaceAfter=3
    )

    quote_style = ParagraphStyle(
        'QuoteCustom',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=9,
        leading=13,
        textColor=c_primary,
        alignment=TA_CENTER,
        spaceBefore=6,
        spaceAfter=6
    )

    th_style = ParagraphStyle(
        'TableHeader',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=7.5,
        leading=9.5,
        textColor=colors.white,
        alignment=TA_LEFT
    )

    td_style = ParagraphStyle(
        'TableCell',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=7,
        leading=9.5,
        textColor=c_slate,
        alignment=TA_LEFT
    )

    td_bold = ParagraphStyle(
        'TableCellBold',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=7,
        leading=9.5,
        textColor=c_primary,
        alignment=TA_LEFT
    )

    callout_style = ParagraphStyle(
        'CalloutText',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=7.5,
        leading=10.5,
        textColor=c_slate
    )

    code_style = ParagraphStyle(
        'SystemPromptCode',
        parent=styles['Normal'],
        fontName='Courier',
        fontSize=6.8,
        leading=9.2,
        textColor=c_primary
    )

    story = []

    # ================= PAGE 1: EXECUTIVE COVER PAGE =================
    story.append(Spacer(1, 35))
    story.append(Paragraph("DAGSIS PROPERTY 3 DUMMY", title_style))
    story.append(Paragraph("ARCHITECTURE & DOMAINES · ATELIER PRIVÉ", subtitle_style))
    story.append(HRFlowable(width="55%", thickness=1.5, color=c_gold, spaceBefore=4, spaceAfter=20))
    
    story.append(Paragraph("<b>COMPREHENSIVE AI CHATBOT KNOWLEDGE BASE</b>", ParagraphStyle(
        'CoverDocType', parent=title_style, fontSize=16, leading=22, textColor=c_primary
    )))
    story.append(Paragraph("Official System Instructions, Property Directory, Capital Advisory & Client Concierge Systems", ParagraphStyle(
        'CoverDocSub', parent=subtitle_style, fontSize=9.5, leading=13, textColor=c_muted
    )))

    story.append(Spacer(1, 30))

    # Executive Metadata Box
    meta_data = [
        [Paragraph("<b>Target Integration:</b>", td_bold), Paragraph("LLM RAG Vector Stores, OpenAI GPT-4o, Claude 3.5, LangChain, Flowise, Botpress", td_style)],
        [Paragraph("<b>Regulatory Authority:</b>", td_bold), Paragraph("Council for Estate Agencies (CEA) License: L3009842J", td_style)],
        [Paragraph("<b>Corporate Entity:</b>", td_bold), Paragraph("Dagsis Property 3 Dummy Pte Ltd", td_style)],
        [Paragraph("<b>Headquarters:</b>", td_bold), Paragraph("123, Street ABC, State XYZ, Pin-000000", td_style)],
        [Paragraph("<b>Concierge Direct Line:</b>", td_bold), Paragraph("+65 XXXXXXXXX (24/7 Global Client Desk) | concierge@hauteterres.sg", td_style)],
        [Paragraph("<b>Founding Principals:</b>", td_bold), Paragraph("Lord Julian Sterling & Valerie Montrose (Established 2002)", td_style)],
        [Paragraph("<b>Cumulative Volume:</b>", td_bold), Paragraph("S$ 4.8 Billion+ in Curated Ultra-Prime Residential Transactions", td_style)],
        [Paragraph("<b>Document Edition:</b>", td_bold), Paragraph("Version 2.5 (Complete Production Knowledge Base)", td_style)]
    ]
    meta_table = Table(meta_data, colWidths=[130, 389])
    meta_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), c_light_bg),
        ('BOX', (0,0), (-1,-1), 1, c_border),
        ('INNERGRID', (0,0), (-1,-1), 0.5, c_border),
        ('PADDING', (0,0), (-1,-1), 5.5),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    story.append(meta_table)

    story.append(Spacer(1, 35))
    our_story = data.get("our_story", {})
    story.append(Paragraph(f"<i>\"{our_story.get('lead_quote', '')}\"</i>", quote_style))

    story.append(PageBreak())

    # ================= SECTION 1: SYSTEM PROMPT & PERSONA =================
    story.append(Paragraph("1. Ready-to-Deploy AI Chatbot System Prompt", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=c_gold, spaceBefore=2, spaceAfter=8))

    prompt_box_content = (
        "<b>SYSTEM PROMPT TEMPLATE (COPY INTO LLM / CHATBOT ENGINE):</b><br/>"
        "You are the <b>Dagsis Property 3 Dummy Private Client Concierge AI</b> representing Dagsis Property 3 Dummy Pte Ltd (CEA: L3009842J).<br/><br/>"
        "<b>Persona:</b> Sophisticated, discreet, erudite, and highly articulate. You specialize in Singapore's most prestigious Good Class Bungalows, super penthouses, and waterfront estates across Districts 01, 04, 09, 10, 11, and 15.<br/><br/>"
        "<b>Primary Directives:</b><br/>"
        "1. <b>Understated Luxury:</b> Respond with architectural literacy, mentioning spatial volumes, architects (WOHA, Kengo Kuma, Foster + Partners, Kerry Hill), and high craftsmanship.<br/>"
        "2. <b>Discretion:</b> Guard owner privacy. Do not disclose exact residential addresses or unverified cadastral maps without an active NDA.<br/>"
        "3. <b>Legal Accuracy:</b> Provide accurate breakdowns of Buyer's Stamp Duty (BSD), Additional Buyer's Stamp Duty (ABSD), and Singapore Land Authority LDAU regulations for foreign buyers.<br/>"
        "4. <b>Action Orientation:</b> Proactively guide prospective buyers to book the Private Viewing Salon (`/book-viewing`) or dial the 24/7 Concierge Hotline (`+65 XXXXXXXXX`).<br/>"
        "5. <b>Human Escalation:</b> Seamlessly route mandates above S$50M or bespoke family office trusts (Section 13O/13U) to Managing Partners Lord Julian Sterling, Valerie Montrose, or Senior Partner Alistair Vance."
    )
    prompt_table = Table([[Paragraph(prompt_box_content, code_style)]], colWidths=[519])
    prompt_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), c_card_bg),
        ('BOX', (0,0), (-1,-1), 1, c_gold),
        ('PADDING', (0,0), (-1,-1), 7),
    ]))
    story.append(prompt_table)
    story.append(Spacer(1, 10))

    # ================= SECTION 2: BRAND IDENTITY & BENCHMARKS =================
    story.append(Paragraph("2. Atelier Manifesto & Key Market Benchmarks", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=c_gold, spaceBefore=2, spaceAfter=8))

    manifesto_p = (
        f"<b>Heritage & Vision:</b> {our_story.get('company_vision', '')}<br/>"
        f"<b>Property Expertise:</b> {our_story.get('property_expertise', '')}<br/>"
        f"<b>Luxury Philosophy:</b> {our_story.get('luxury_philosophy', '')}"
    )
    story.append(Paragraph(manifesto_p, body_style))
    story.append(Spacer(1, 6))

    # Benchmark Statistics Table
    stats = data.get("statistics", [])
    stat_rows = [[Paragraph("Benchmark Metric", th_style), Paragraph("Reported Value", th_style), Paragraph("Operational Significance", th_style)]]
    for s in stats:
        prefix = s.get("prefix", "")
        suffix = s.get("suffix", "")
        val_str = f"{prefix}{s.get('value', '')}{suffix}"
        stat_rows.append([
            Paragraph(f"<b>{s.get('label', '')}</b>", td_bold),
            Paragraph(val_str, td_bold),
            Paragraph(s.get("description", ""), td_style)
        ])
    stat_table = Table(stat_rows, colWidths=[130, 85, 304])
    stat_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), c_primary),
        ('BOX', (0,0), (-1,-1), 1, c_border),
        ('INNERGRID', (0,0), (-1,-1), 0.5, c_border),
        ('PADDING', (0,0), (-1,-1), 4.5),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, c_light_bg]),
    ]))
    story.append(stat_table)
    story.append(Spacer(1, 10))

    # ================= SECTION 3: CURATED SINGAPORE ENCLAVES =================
    story.append(Paragraph("3. Singapore Prime Enclaves (District Intelligence)", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=c_gold, spaceBefore=2, spaceAfter=8))

    locs = data.get("featured_locations", [])
    loc_rows = [[Paragraph("District / Enclave", th_style), Paragraph("Pricing Metrics", th_style), Paragraph("Current Inventory", th_style), Paragraph("Enclave Character & Demographics", th_style)]]
    for loc in locs:
        loc_rows.append([
            Paragraph(f"<b>{loc.get('district', '')}</b>", td_bold),
            Paragraph(f"{loc.get('average_price', '')}<br/>({loc.get('average_price_label', '')})", td_style),
            Paragraph(loc.get("availability", ""), td_style),
            Paragraph(f"{loc.get('character', '')}<br/><b>Flagship:</b> {loc.get('featured_property', '')}", td_style)
        ])
    loc_table = Table(loc_rows, colWidths=[120, 95, 80, 224])
    loc_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), c_primary),
        ('BOX', (0,0), (-1,-1), 1, c_border),
        ('INNERGRID', (0,0), (-1,-1), 0.5, c_border),
        ('PADDING', (0,0), (-1,-1), 4.5),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, c_light_bg]),
    ]))
    story.append(loc_table)

    story.append(PageBreak())

    # ================= SECTION 4: FLAGSHIP HERO RESIDENCES =================
    story.append(Paragraph("4. Flagship Monograph Hero Residences", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=c_gold, spaceBefore=2, spaceAfter=8))

    hero_projects = data.get("hero_projects", [])
    hero_rows = [[
        Paragraph("Hero Estate & Location", th_style),
        Paragraph("Price / Type", th_style),
        Paragraph("Area / Layout", th_style),
        Paragraph("Architect / Status", th_style),
        Paragraph("Curatorial Tagline", th_style)
    ]]
    for hp in hero_projects:
        hero_rows.append([
            Paragraph(f"<b>{hp.get('name', '')}</b><br/>{hp.get('location', '')} ({hp.get('district', '')})", td_bold),
            Paragraph(f"<b>{hp.get('price_formatted', '')}</b><br/>{hp.get('property_type', '')}", td_style),
            Paragraph(f"{hp.get('area_sqft', '')}<br/>{hp.get('bedrooms', '')}", td_style),
            Paragraph(f"{hp.get('architect', '')}<br/><i>{hp.get('availability', '')}</i>", td_style),
            Paragraph(hp.get("tagline", ""), td_style)
        ])
    hero_table = Table(hero_rows, colWidths=[115, 95, 95, 105, 109])
    hero_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), c_primary),
        ('BOX', (0,0), (-1,-1), 1, c_border),
        ('INNERGRID', (0,0), (-1,-1), 0.5, c_border),
        ('PADDING', (0,0), (-1,-1), 4.5),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, c_light_bg]),
    ]))
    story.append(hero_table)
    story.append(Spacer(1, 12))

    # ================= SECTION 5: COMPLETE FEATURED RESIDENCE CATALOG =================
    story.append(Paragraph("5. Curated Residence & Penthouse Catalog", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=c_gold, spaceBefore=2, spaceAfter=8))

    properties = data.get("featured_properties", [])
    for p in properties:
        p_card = [
            [
                Paragraph(f"<b>{p.get('title', '')}</b> (Ref: {p.get('id', '')})", ParagraphStyle('PTitle', parent=th_style, fontSize=8.5)),
                Paragraph(f"<b>{p.get('price_formatted', '')}</b> | {p.get('availability', '')}", ParagraphStyle('PPrice', parent=th_style, fontSize=8.5, alignment=TA_RIGHT))
            ],
            [
                Paragraph(
                    f"<b>Location:</b> {p.get('location', '')} ({p.get('district', '')}) &nbsp;|&nbsp; "
                    f"<b>Type:</b> {p.get('property_type', '')} &nbsp;|&nbsp; "
                    f"<b>Area:</b> {p.get('area_sqft', 0):,} sq ft &nbsp;|&nbsp; "
                    f"<b>Layout:</b> {p.get('bedrooms', '')} Suites, {p.get('bathrooms', '')} Baths<br/>"
                    f"<b>Levels:</b> {p.get('floor', 'N/A')} &nbsp;|&nbsp; "
                    f"<b>Architect:</b> {p.get('architect', 'Confidential')} &nbsp;|&nbsp; "
                    f"<b>Completion:</b> {p.get('completion_date', 'Completed')} &nbsp;|&nbsp; "
                    f"<b>Investment Outlook:</b> {p.get('investment_potential', '')}<br/>"
                    f"<b>Description:</b> {p.get('description', '')}<br/>"
                    f"<b>Highlights:</b> {', '.join(p.get('highlights', []))}",
                    td_style
                ),
                ""
            ]
        ]
        p_table = Table(p_card, colWidths=[385, 134])
        p_table.setStyle(TableStyle([
            ('SPAN', (0,1), (1,1)),
            ('BACKGROUND', (0,0), (-1,0), c_primary),
            ('BACKGROUND', (0,1), (-1,1), c_light_bg),
            ('BOX', (0,0), (-1,-1), 1, c_border),
            ('PADDING', (0,0), (-1,-1), 4.5),
        ]))
        story.append(p_table)
        story.append(Spacer(1, 6))

    story.append(PageBreak())

    # ================= SECTION 6: COMPARISON MATRIX & FACILITIES =================
    story.append(Paragraph("6. Project Comparison Matrix", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=c_gold, spaceBefore=2, spaceAfter=8))

    cmps = data.get("project_comparisons", [])
    cmp_rows = [[
        Paragraph("Flagship Project", th_style),
        Paragraph("Price / Area", th_style),
        Paragraph("Tenure / View", th_style),
        Paragraph("Architect", th_style),
        Paragraph("Signature Facilities & Amenities", th_style)
    ]]
    for c in cmps:
        cmp_rows.append([
            Paragraph(f"<b>{c.get('project_name', '')}</b><br/>{c.get('location', '')}", td_bold),
            Paragraph(f"<b>{c.get('price', '')}</b><br/>{c.get('area', '')}", td_style),
            Paragraph(f"<b>{c.get('tenure', '')}</b><br/>{c.get('view_type', '')}", td_style),
            Paragraph(c.get("architect", ""), td_style),
            Paragraph(c.get("facilities", ""), td_style)
        ])
    cmp_table = Table(cmp_rows, colWidths=[110, 85, 95, 90, 139])
    cmp_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), c_primary),
        ('BOX', (0,0), (-1,-1), 1, c_border),
        ('INNERGRID', (0,0), (-1,-1), 0.5, c_border),
        ('PADDING', (0,0), (-1,-1), 4.5),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, c_light_bg]),
    ]))
    story.append(cmp_table)
    story.append(Spacer(1, 10))

    story.append(Paragraph("7. Architectural Amenities & Wellness Directory", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=c_gold, spaceBefore=2, spaceAfter=8))

    facs = data.get("facilities", [])
    fac_rows = [[Paragraph("Facility & Title", th_style), Paragraph("Category", th_style), Paragraph("Curated Specifications & Details", th_style)]]
    for f in facs:
        fac_rows.append([
            Paragraph(f"<b>{f.get('title', '')}</b>", td_bold),
            Paragraph(f.get("category", ""), td_style),
            Paragraph(f"{f.get('description', '')}<br/><b>Specs:</b> {f.get('specs', '')}", td_style)
        ])
    fac_table = Table(fac_rows, colWidths=[140, 95, 284])
    fac_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), c_primary),
        ('BOX', (0,0), (-1,-1), 1, c_border),
        ('INNERGRID', (0,0), (-1,-1), 0.5, c_border),
        ('PADDING', (0,0), (-1,-1), 4.5),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, c_light_bg]),
    ]))
    story.append(fac_table)

    story.append(PageBreak())

    # ================= SECTION 8: CAPITAL ADVISORY & TAX =================
    story.append(Paragraph("8. Capital Advisory, Private Banking & Mortgage Matrix", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=c_gold, spaceBefore=2, spaceAfter=8))

    fin_list = data.get("financing_options", [])
    fin_rows = [[
        Paragraph("Private Bank Desk", th_style),
        Paragraph("Package & Rate", th_style),
        Paragraph("LTV / Min DP", th_style),
        Paragraph("Exclusive Client Privileges & Advisory Notes", th_style)
    ]]
    for fin in fin_list:
        perks_txt = "<br/>• ".join(fin.get("perks", []))
        fin_rows.append([
            Paragraph(f"<b>{fin.get('bank_name', '')}</b><br/>Tenor: {fin.get('max_tenor_years', 30)} Yrs", td_bold),
            Paragraph(f"<b>{fin.get('package_name', '')}</b><br/>{fin.get('interest_rate_display', '')}", td_style),
            Paragraph(f"<b>LTV:</b> {fin.get('loan_to_value', '')}<br/><b>DP:</b> {fin.get('min_down_payment_pct', 0)}%", td_style),
            Paragraph(f"• {perks_txt}<br/><i>Note: {fin.get('advisory_notes', '')}</i>", td_style)
        ])
    fin_table = Table(fin_rows, colWidths=[110, 115, 75, 219])
    fin_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), c_primary),
        ('BOX', (0,0), (-1,-1), 1, c_border),
        ('INNERGRID', (0,0), (-1,-1), 0.5, c_border),
        ('PADDING', (0,0), (-1,-1), 4.5),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, c_light_bg]),
    ]))
    story.append(fin_table)
    story.append(Spacer(1, 10))

    # Regulatory Stamp Duty & Tax Summary Box
    tax_info = (
        "<b>SINGAPORE RESIDENTIAL TAX, STAMP DUTY & FAMILY OFFICE REGULATIONS:</b><br/>"
        "• <b>Buyer's Stamp Duty (BSD):</b> Tiered up to 6% for consideration exceeding S$3,000,000.<br/>"
        "• <b>Additional Buyer's Stamp Duty (ABSD):</b> Citizens: 0% (1st), 20% (2nd), 30% (3rd+). PRs: 5% (1st), 30% (2nd). Foreigners: 60%. Entities/Trusts: 65%.<br/>"
        "• <b>FTA National Treatment Exception:</b> Citizens/PRs of Iceland, Liechtenstein, Norway, Switzerland, and US nationals receive identical ABSD treatment as Singapore Citizens (0% on 1st residential acquisition).<br/>"
        "• <b>Landed GCB Approvals:</b> Land Dealings Approval Unit (LDAU) approval is strictly mandatory for foreigners purchasing landed properties. GCBs are reserved for Citizens with exceptional economic contributions.<br/>"
        "• <b>Sentosa Cove Exception:</b> Foreigners may acquire 99-year leasehold landed waterfront villas on Sentosa Cove with expedited LDAU approval.<br/>"
        "• <b>MAS Section 13O / 13U:</b> Single Family Office tax-exempt structures manage investment portfolios with tax certainty."
    )
    tax_box = Table([[Paragraph(tax_info, callout_style)]], colWidths=[519])
    tax_box.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), c_card_bg),
        ('BOX', (0,0), (-1,-1), 1, c_gold),
        ('PADDING', (0,0), (-1,-1), 6.5),
    ]))
    story.append(tax_box)
    story.append(Spacer(1, 10))

    # ================= SECTION 9: VIEWING SALON & PARTNERS =================
    story.append(Paragraph("9. Private Viewing Salon & Advisory Partners", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=c_gold, spaceBefore=2, spaceAfter=8))

    viewing_summary = (
        "Clients book through `/book-viewing` or via phone +65 XXXXXXXXX.<br/>"
        "<b>Viewing Formats:</b> (1) Golden Hour Sunset & Champagne (90m), (2) Morning Solar Light & Architectural Study (75m), (3) Executive Fast-Track & Structural Vault (60m), (4) Helicopter & Deep Ocean Berth Tour (120m).<br/>"
        "<b>Chauffeur Fleet:</b> Rolls-Royce Spectre (Electric), Rolls-Royce Ghost Extended, Mercedes-Maybach S 680, Bentley Flying Spur Mulliner, or Self-Arrival with reserved subterranean supercar charging bay.<br/>"
        "<b>Sommelier Pairings:</b> Dom Pérignon Vintage 2015, Krug Grande Cuvée 171ème, Louis Roederer Cristal 2014, or Artisanal Rare Botanical Tea Pairing."
    )
    story.append(Paragraph(viewing_summary, body_style))
    story.append(Spacer(1, 6))

    # Advisory Partners Table
    agents = data.get("agents", [])
    ag_rows = [[Paragraph("Partner Name & Division", th_style), Paragraph("Credentials & Volume", th_style), Paragraph("Languages Spoken", th_style)]]
    for ag in agents:
        ag_rows.append([
            Paragraph(f"<b>{ag.get('name', '')}</b><br/>{ag.get('title', '')} · {ag.get('division', '')}", td_bold),
            Paragraph(f"<b>Experience:</b> {ag.get('experience', '')}<br/><b>Volume:</b> {ag.get('volume', '')}", td_style),
            Paragraph(", ".join(ag.get("languages", [])), td_style)
        ])
    ag_table = Table(ag_rows, colWidths=[195, 160, 164])
    ag_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), c_primary),
        ('BOX', (0,0), (-1,-1), 1, c_border),
        ('INNERGRID', (0,0), (-1,-1), 0.5, c_border),
        ('PADDING', (0,0), (-1,-1), 4.5),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, c_light_bg]),
    ]))
    story.append(ag_table)

    story.append(PageBreak())

    # ================= SECTION 10: FAQ & RAG KNOWLEDGE BASE =================
    story.append(Paragraph("10. AI Chatbot FAQ & High-Intent RAG Pairs", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=c_gold, spaceBefore=2, spaceAfter=8))

    qa_list = [
        ("Can non-Singapore citizens purchase landed Good Class Bungalows (GCBs)?",
         "Under Singapore's Residential Property Act, foreign nationals (including Permanent Residents) require express approval from the Land Dealings Approval Unit (LDAU) of the Singapore Land Authority to acquire landed residential property. GCBs in prime mainland districts (such as Nassim Hill, Cluny Road, or Bukit Timah) are almost exclusively restricted to Singapore Citizens who have made exceptional economic contributions. However, foreign nationals can freely acquire ultra-luxury strata-titled properties, including super penthouses and Sentosa Cove oceanfront villas."),
        ("Are foreigners eligible to buy oceanfront villas in Sentosa Cove?",
         "Yes. Sentosa Cove (District 04) is Singapore's only designated oceanic enclave where foreign buyers and non-residents can obtain LDAU approval to acquire 99-year leasehold landed waterfront villas and berths on an expedited basis."),
        ("What are the current Buyer's Stamp Duty (BSD) and Additional Buyer's Stamp Duty (ABSD) rates?",
         "Standard BSD applies progressively up to 6% for residential properties above S$3,000,000. For ABSD: Singapore Citizens pay 0% on their first residential property, 20% on the second, and 30% on subsequent properties. Permanent Residents pay 5% on their first property and 30% on the second. Foreign nationals pay 60% ABSD unless they qualify under Free Trade Agreements (FTA) with equivalent national treatment (such as nationals and permanent residents of Iceland, Liechtenstein, Norway, Switzerland, and US nationals). Entities and trusts incur 65% upfront ABSD."),
        ("How does Dagsis Property 3 Dummy assist with Family Office structuring under MAS Section 13O and 13U?",
         "Our Capital Advisory works directly with premier private wealth institutions (DBS Private Access, UBS, HSBC Premier Global, and Standard Chartered) and legal counsel to structure residential acquisitions within compliant Single Family Office (SFO) architectures, qualifying for tax exemptions on funds managed under Sections 13O and 13U of the Income Tax Act."),
        ("How do I book a private viewing of a property?",
         "You can book through our interactive Private Viewing Salon at `/book-viewing` or contact our 24/7 Concierge Hotline at +65 XXXXXXXXX. You may select your preferred viewing format (e.g. Sunset Champagne Salon, Morning Solar Study), complimentary private chauffeur service (Rolls-Royce Spectre, Maybach S680, or Bentley), and refreshment pairings."),
        ("Are private viewings covered by Non-Disclosure Agreements (NDAs)?",
         "Yes. For our confidential off-market acquisitions and Good Class Bungalow compounds, both prospective patrons and our advisory execute reciprocal confidentiality agreements to protect owner privacy and asset integrity."),
        ("What is the typical down payment and LTV for ultra-luxury residential properties?",
         "Loan-to-Value (LTV) limits in Singapore prime tier generally range between 70% and 75% for individuals with no outstanding home loans. Minimum cash/CPF down payments range from 25% to 30%. Dagsis Property 3 Dummy private bank partners offer specialized Lombard credit facilities and interest-offset structures to maximize liquidity."),
        ("Can I request an unlisted off-market property?",
         "Yes. Over 40% of our ultra-prime transactions are conducted off-market. Prospective patrons can register confidential mandates with our Managing Partners or subscribe to our quarterly Off-Market Intelligence Monograph at `/` or by contacting concierge@hauteterres.sg."),
        ("What is the highest-priced property in your current collection?",
         "Our highest publicly listed estate is the Nassim Hill Heritage Pavilion (Ref: RP003) at S$ 42,000,000, featuring a 16,400 sq ft compound with 7 en-suite palatial wings, a 30-car subterranean vault, private onsen, and helicopter touchdown pad designed by Kengo Kuma. Confidential off-market GCB compounds exceeding S$100,000,000 are available upon verified executive NDA."),
        ("What amenities are standard across Dagsis Property 3 Dummy represented properties?",
         "Signature amenities include cantilevered horizon glass pools, Technogym biometric studios, Lutron/Crestron OS 4 smart automation, biometric retina security, subterranean climate-controlled supercar garages (50% RH), and private sommelier tasting cellars."),
        ("Who founded Dagsis Property 3 Dummy and what is their background?",
         "Dagsis Property 3 Dummy was founded in 2002 by Lord Julian Sterling and Valerie Montrose. Over 24 years, they have overseen more than S$ 4.8 Billion in landmark residential transactions across Southeast Asia."),
        ("Where is your physical private client office located?",
         "Our private salon and executive office is located at 123, Street ABC, State XYZ, Pin-000000. Visits are strictly by prior appointment.")
    ]

    for q, a in qa_list:
        qa_card = [
            [Paragraph(f"<b>Q: {q}</b>", ParagraphStyle('QAHead', parent=td_bold, fontSize=7.5, textColor=c_primary))],
            [Paragraph(f"<b>A:</b> {a}", td_style)]
        ]
        qa_table = Table(qa_card, colWidths=[519])
        qa_table.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,0), c_light_bg),
            ('BACKGROUND', (0,1), (-1,1), colors.white),
            ('BOX', (0,0), (-1,-1), 0.75, c_border),
            ('PADDING', (0,0), (-1,-1), 4),
        ]))
        story.append(qa_table)
        story.append(Spacer(1, 4))

    story.append(Spacer(1, 8))

    # ================= SECTION 11: ESCALATION & HUMAN HANDOFF =================
    story.append(PageBreak())
    story.append(Paragraph("11. Escalation Protocols & Human Handoff Workflow", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=c_gold, spaceBefore=2, spaceAfter=8))

    escalation_text = (
        "<b>Escalation Triggers for Human Advisor Handover:</b><br/>"
        "• Specific mandates for off-market GCB acquisitions exceeding S$50,000,000.<br/>"
        "• Sovereign wealth funds, cross-border family trust allocations, and bespoke tax structuring.<br/>"
        "• Requests for helicopter touchdown or private yacht transfers to viewing sites.<br/>"
        "• Execution of bilateral non-disclosure agreements (NDAs) prior to architectural file release.<br/><br/>"
        "<b>Immediate Contact Routing:</b><br/>"
        "• <b>24/7 Client Desk Hotline:</b> +65 XXXXXXXXX<br/>"
        "• <b>Confidential Advisory Inquiries:</b> concierge@hauteterres.sg<br/>"
        "• <b>Managing Principals:</b> Lord Julian Sterling & Valerie Montrose<br/>"
        "• <b>Executive Address:</b> 123, Street ABC, State XYZ, Pin-000000"
    )
    story.append(Paragraph(escalation_text, body_style))
    story.append(Spacer(1, 10))

    # ================= SECTION 12: PATRONAGE ENDORSEMENTS =================
    story.append(Paragraph("12. Patronage Endorsements & Client Testimonials", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=c_gold, spaceBefore=2, spaceAfter=8))

    testimonials = data.get("testimonials", [])
    test_rows = [[Paragraph("Patron & Title", th_style), Paragraph("Acquisition", th_style), Paragraph("Verbatim Testimonial", th_style)]]
    for t in testimonials:
        test_rows.append([
            Paragraph(f"<b>{t.get('author', '')}</b><br/>{t.get('title', '')} ({t.get('year', '')})", td_bold),
            Paragraph(t.get('property', ''), td_style),
            Paragraph(f"<i>\"{t.get('quote', '')}\"</i>", td_style)
        ])
    test_table = Table(test_rows, colWidths=[140, 110, 269])
    test_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), c_primary),
        ('BOX', (0,0), (-1,-1), 1, c_border),
        ('INNERGRID', (0,0), (-1,-1), 0.5, c_border),
        ('PADDING', (0,0), (-1,-1), 4.5),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, c_light_bg]),
    ]))
    story.append(test_table)
    story.append(Spacer(1, 10))

    # ================= SECTION 13: VISUAL MONOGRAPH ANTHOLOGY =================
    story.append(Paragraph("13. Visual Monograph Anthology (Portfolio Gallery)", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=c_gold, spaceBefore=2, spaceAfter=8))

    gallery = data.get("portfolio_gallery", [])
    gal_rows = [[Paragraph("Monograph Plate", th_style), Paragraph("Category", th_style), Paragraph("Location & Architect", th_style)]]
    for g in gallery:
        gal_rows.append([
            Paragraph(f"<b>{g.get('title', '')}</b>", td_bold),
            Paragraph(g.get('category', ''), td_style),
            Paragraph(f"{g.get('location', '')} &nbsp;·&nbsp; {g.get('architect', '')}", td_style)
        ])
    gal_table = Table(gal_rows, colWidths=[180, 150, 189])
    gal_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), c_primary),
        ('BOX', (0,0), (-1,-1), 1, c_border),
        ('INNERGRID', (0,0), (-1,-1), 0.5, c_border),
        ('PADDING', (0,0), (-1,-1), 4),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, c_light_bg]),
    ]))
    story.append(gal_table)
    story.append(Spacer(1, 10))

    # Compliance & Document Control Box
    comp_box = [
        [Paragraph(
            "<b>DOCUMENT INTEGRITY & COMPLIANCE NOTICE:</b><br/>"
            "This document constitutes the proprietary and confidential knowledge base of Dagsis Property 3 Dummy Pte Ltd (CEA Reg: L3009842J). "
            "Prepared strictly for authorized artificial intelligence model grounding, semantic retrieval (RAG), and digital concierge operations. "
            "All property specifications, architectural attributions, and pricing representations are verified as of October 2026.",
            callout_style
        )]
    ]
    comp_table = Table(comp_box, colWidths=[519])
    comp_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), c_card_bg),
        ('BOX', (0,0), (-1,-1), 0.75, c_border),
        ('PADDING', (0,0), (-1,-1), 5),
    ]))
    story.append(comp_table)

    # Build document with NumberedCanvas
    doc.build(story, canvasmaker=NumberedCanvas)


def main():
    data, base_dir = load_database()
    
    # Target files in workspace
    output_pdf = os.path.join(base_dir, "HAUTE_TERRES_AI_KNOWLEDGE_BASE.pdf")
    output_md = os.path.join(base_dir, "HAUTE_TERRES_AI_KNOWLEDGE_BASE.md")
    output_json = os.path.join(base_dir, "HAUTE_TERRES_AI_KNOWLEDGE_BASE.json")
    
    # Public directory files
    public_dir = os.path.join(base_dir, "public")
    if not os.path.exists(public_dir):
        os.makedirs(public_dir)
    public_pdf = os.path.join(public_dir, "HAUTE_TERRES_AI_KNOWLEDGE_BASE.pdf")
    public_json = os.path.join(public_dir, "HAUTE_TERRES_AI_KNOWLEDGE_BASE.json")

    # Brain / Artifacts directory copy
    artifact_dir = r"C:\Users\Mehardeep\.gemini\antigravity\brain\64de96cb-ce27-48ec-8685-2541562ff63a"
    artifact_pdf = os.path.join(artifact_dir, "HAUTE_TERRES_AI_KNOWLEDGE_BASE.pdf")
    artifact_md = os.path.join(artifact_dir, "HAUTE_TERRES_AI_KNOWLEDGE_BASE.md")

    print("[1/5] Generating Markdown Knowledge Base...")
    create_markdown_knowledge_base(data, output_md)
    if os.path.exists(artifact_dir):
        shutil.copyfile(output_md, artifact_md)
    print(f"Created: {output_md}")

    print("[2/5] Generating JSON Knowledge Base for Vector Embeddings...")
    with open(output_json, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)
    shutil.copyfile(output_json, public_json)
    print(f"Created: {output_json} and {public_json}")

    print("[3/5] Generating Publication-Grade PDF...")
    build_pdf_document(data, output_pdf)
    shutil.copyfile(output_pdf, public_pdf)
    if os.path.exists(artifact_dir):
        shutil.copyfile(output_pdf, artifact_pdf)
    print(f"Created: {output_pdf}")
    print(f"Copied to public: {public_pdf}")
    if os.path.exists(artifact_dir):
        print(f"Copied to artifacts: {artifact_pdf}")

    print("[4/5] Verifying PDF Integrity...")
    pdf_size = os.path.getsize(output_pdf)
    print(f"PDF Size: {pdf_size:,} bytes")

    print("[5/5] Complete!")

if __name__ == "__main__":
    main()
