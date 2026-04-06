# Accomplish Points — Content Extraction Plan

## Overview

This PowerPoint is a raw "brain dump" from Mary Cook Swanson, a consultant who wants a website built for her business **Accomplish Points Consulting** (evolved from her prior firm, **Swanson Partners, LLC**). The deck contains a mix of:

- Usable website content (text and photos)
- Documents photographed/embedded as images that need OCR transcription
- Personal notes and instructions to the developer (not site content)
- Filler/blank slides
- Personal "for fun" photos not suitable for the website

The goal is to produce clean, structured documentation that a website build can reference directly.

---

## Slide-by-Slide Inventory

### Category A — Direct Website Content (text already extracted)

| Slides | Topic | What's There |
|--------|-------|-------------|
| 1 | Title / Tagline | Business name, value proposition bullets (Experience, Expertise, Strategic, Effective, Personal, Joyful) |
| 2 | Services Overview | Two-column: "People" services (coaching, teams, communities, strategic planning, summits, hearings, non-profits) + "Planning" services |
| 13 | Leaders & Managers | Service bullets: thought partnership, trusted ally, personal/team development, alignment, humor, confidentiality, customization |
| 14 | Coaching — All Levels | Service bullets: similar to 13 + DISC personality assessments |
| 15 | Meetings/Deliverables | Extra-ordinary facilitation, award-winning, urban planning certification |
| 16 | Conferences/Motivational | Conference speaking, retreat-style sessions, change management |
| 17 | Intersectionality — People | Emotionally intelligent, adaptive, experienced, Change Management Certified (ADKAR/PROSCI) |
| 18 | Intersectionality — Planning | Same people attributes + planning lens |
| 19 | Intersectionality — Economics | Public/private sector, partnerships, redesigning public services |
| 20 | Results & Reports | Written documentation "for use, not the shelf" — donors, voters, philanthropy |
| 21 | Partial Client List | Public Service Orgs, OSU Extension, OSU Institutions, Cities, Counties, Districts |
| 22 | Endorsements/Testimonials | Connie L. testimonial, Daphne quote |
| 26 | Retreats | "Retreats from office rooms to outdoors" |
| 27 | Working Sessions | "Working Sessions Of Meaning and Relationships" |
| 30 | Retreats Settings | "Retreats — Business Settings — Recreational Settings" |
| 31 | Futures Discussions | "Futures Discussions at Winery" |
| 42–47 | Her Story (Bio) | Multi-slide personal/professional narrative (see details below) |

### Category B — Images Containing Text (need OCR transcription)

| Image | Source Slide | Description | Content Type |
|-------|-------------|-------------|-------------|
| `slide07_img005.jpg` | 7 | Old website screenshot — "What We Do" + "We Produce Results" + Clark Seavert testimonial | **Services list, testimonial, tagline** |
| `slide08_img006.jpg` | 8 | Old website continued — services list continued + Dan Zinzer testimonial + "Your Partner in Service" tagline + word cloud | **Services, testimonial, branding** |
| `slide09_img007.jpg` | 9 | Swanson Partners Professional Profile document | **Full professional bio, client list, career summary** |
| `slide10_img008.jpg` | 10 | Swanson Partners Firm Profile document — services scope | **Firm profile, service categories (Management/Leadership, detailed bullets)** |
| `slide11_img009.jpg` | 11 | Firm Profile page 2 — Project Development, Plan/Policy Making, Interagency Coordination, Communication Strategies | **Detailed service descriptions** |
| `slide12_img010.jpg` | 12 | Credentials page — Education, Certifications, Affiliations, Awards, Appointments, Contact, WBE Certification | **Credentials, awards, certifications** |

### Category C — Usable Photography (no text, potential website imagery)

| Image | Source Slide | Description | Usability |
|-------|-------------|-------------|-----------|
| `slide03_img001.jpg` | 3 | Professional headshot — dark background, navy blazer | **PRIMARY HEADSHOT CANDIDATE** (has watermark "timothy park photo + video") |
| `slide04_img002.jpg` | 4 | Professional photo — outdoor park/water setting, tan jacket | **STRONG CANDIDATE** (watermarked) |
| `slide05_img003.jpg` | 5 | Professional headshot — dark background, white shirt | **STRONG CANDIDATE** (watermarked) |
| `slide06_img004.jpg` | 6 | Professional photo — brick wall background, tan jacket, arms crossed | **STRONG CANDIDATE** (watermarked) |
| `slide26_img016.jpg` | 26 | Casual outdoor portrait — sunset, sunglasses | Possible "about" or casual section |
| `slide27_img017.jpg` | 27 | Working session photo — people at conference table | Good for "services" or "working sessions" section |
| `slide31_img018.jpg` | 31 | Retreat photo — three people at outdoor picnic table, scenic background | Good for "retreats" section |
| `slide48_img026.jpg` | 48 | Mary at Swanson Partners trade show booth | Historic/about section |

### Category D — Skip / Not for Website

| Slides/Images | Reason |
|---------------|--------|
| Slides 23, 25 | Personal notes about Chihuly glass photo and whiteboard — not site content |
| `slide23_img014.jpg` | Chihuly glass art — copyright concerns noted by Mary herself |
| `slide25_img015.jpg` | Whiteboard with child's handwriting — personal/sentimental |
| Slides 24, 28, 29 | Developer instructions ("Can Ryan Enhance...", "Crop and mask churchiness") |
| Slides 32–40 | **Blank slides** — no content |
| Slide 41, `slide41_img019.jpg` | Autumn leaves photo — personal/artistic, labeled "FOR FUN" |
| `slide48_img027.jpg`, `slide48_img028.jpg` | Personal family photos — not for website |
| `slide13_img011.png` through `slide15_img013.png`, `slide42_img020.png` through `slide47_img025.png` | Audio player icons embedded in slides — not real images |

---

## Extraction Work Chunks

Each chunk below is a self-contained task that produces a specific output file.

### Chunk 1: `content/bio.md` — Mary's Professional Biography

**Source:** Slides 42–47 text + OCR from `slide09_img007.jpg` (Professional Profile)

**What to produce:**
- Clean, polished narrative biography suitable for an "About" page
- Sections: Early Life & Leadership, Education, Career Path, Consultancy Evolution, Current Focus
- Key facts to preserve:
  - First generation college student
  - B.A. Political Science, UCLA
  - M.A. Urban Planning, UCLA (courses from School of Law + Anderson Business School)
  - U.S. Congressional Intern
  - Geography minor
  - Private sector economic consulting → Swanson Partners LLC → Senior Planner for Clackamas County (~17 years) → Accomplish Points Consulting
  - Relocated to Bend, Oregon
  - Change Management Certified (ADKAR/PROSCI)
  - A.I.C.P. National Certification
  - Award-winning projects for County and City

### Chunk 2: `content/services.md` — Services Offered

**Source:** Slides 2, 13–20 text + OCR from `slide07_img005.jpg`, `slide08_img006.jpg`, `slide10_img008.jpg`, `slide11_img009.jpg`

**What to produce:**
- Structured service categories with descriptions:
  1. **Leadership & Management Coaching** — thought partnership, trusted ally, personal/team development, DISC assessments
  2. **Meeting Design & Facilitation** — award-winning, conferences, retreats, summits, think tanks
  3. **Strategic & Organizational Planning** — strategic planning, change management, scenario backcasting
  4. **Project Development & Management** — scoping, implementation, interagency coordination
  5. **Written Deliverables** — reports "for use not the shelf", strategic communications, bid materials
  6. **Community & Public Engagement** — stakeholder interviews, focus groups, public workshops
- Key differentiators to call out: Urban planning + emotional intelligence intersection, public/private sector bridging

### Chunk 3: `content/credentials.md` — Credentials, Certifications & Awards

**Source:** OCR from `slide12_img010.jpg` + slides 15, 17, 44

**What to produce:**
- Education (degrees, institutions)
- Certifications (A.I.C.P., PROSCI/ADKAR Change Management, IRB)
- Professional affiliations (APA, Special Districts Association of Oregon, City Club of Portland)
- Awards ("League of Oregon Cities Good Governance Award", "Award of Excellence" for Operation Listen)
- Appointments (West Linn Sustainability Task Force, Tualatin Parks Advisory Board)
- WBE Certification (State of Oregon, #5490)

### Chunk 4: `content/testimonials.md` — Client Testimonials

**Source:** Slide 22 text + OCR from `slide07_img005.jpg` and `slide08_img006.jpg`

**What to produce:**
- Clean, attributed testimonials:
  1. **Connie L.** — trusted advisor, career guidance
  2. **Daphne** — "You cracked open the doors"
  3. **Clark Seavert, Director, OSU Research Center** — "first rate in her planning skills... excellent at eliciting participation... an excellent writer"
  4. **Dan Zinzer, Director, Clackamas County Business & Community Services** — "energetic problem solver... highly ethical and reliable... can develop and manage a project through all phases"

### Chunk 5: `content/clients.md` — Client List

**Source:** Slide 21 + OCR from `slide09_img007.jpg`

**What to produce:**
- Categorized client list:
  - Public: Cities, Counties, Districts, OSU Extension, OSU Institutions
  - Specific named clients: Oregon Wine Research Institute, Food Innovation Center, North Willamette Research & Extension Center, Clackamas County Extension & 4-H, Clackamas County Library District, Tillamook County Transportation District, City of Molalla, North Clackamas Parks & Recreation District

### Chunk 6: `content/brand.md` — Brand Identity & Messaging

**Source:** Slides 1, 2, 8, 46, 47

**What to produce:**
- Business name: **Accomplish Points Consulting**
- Prior brand: Swanson Partners, LLC ("Your Partner in Service")
- Core tagline elements from slide 1
- Brand values / tone words: Gravitas, Reliable Expert, Friendly, Safe, Joyful Service
- Key phrases to preserve: "Facilitation with a Difference", "Meetings with Mary", "Accomplish what is most important"
- Mission statement draft from slide 47 content

### Chunk 7: `content/images.md` — Image Inventory & Decisions

**What to produce:**
- Table of all images with: filename, description, recommended use on website, action needed (watermark removal, cropping, etc.)
- Note: Professional headshots (slides 3–6) are watermarked by Timothy Park Photo + Video — **Mary needs to obtain unwatermarked versions from the photographer**
- Flag working session photos that may need participant consent for website use

---

## Execution Order

1. **Chunk 6** (Brand) — establishes naming/voice for all other docs
2. **Chunk 1** (Bio) — foundational "About" content
3. **Chunk 3** (Credentials) — factual, quick to produce
4. **Chunk 5** (Clients) — factual, quick to produce
5. **Chunk 4** (Testimonials) — factual, quick to produce
6. **Chunk 2** (Services) — most complex, benefits from brand context
7. **Chunk 7** (Images) — inventory and decisions, produces action items for Mary

---

## Notes for Development

- **All professional headshots are watermarked.** Mary will need to source unwatermarked versions from Timothy Park Photo + Video before the site can go live.
- **OCR is needed** for 6 document images (slides 7–12). These contain the most detailed and polished content from the Swanson Partners era.
- **Mary's writing style** is informal and stream-of-consciousness in the slide notes. The final content docs should be professional but warm — matching her brand of "gravitas + friendly."
- **Slides 32–40 are blank** — likely placeholders she intended to fill later.
- **Privacy consideration:** Some photos show identifiable people in working sessions. Verify consent before using on website.
- **"Accomplish Points"** is the current business name; **"Swanson Partners, LLC"** is the prior firm. Content should be written for the Accomplish Points brand, drawing on Swanson Partners history as background.
