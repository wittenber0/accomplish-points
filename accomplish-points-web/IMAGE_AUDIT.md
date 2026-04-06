# Image Audit — Accomplish Points Consulting

> Source: 28 images extracted from PPTX, located in `../extracted_images/`
> Classification authority: `../content/images.md`

---

## Classification Key

- **APPROVED** — Ready to use on the website (or ready once unwatermarked version is obtained)
- **CONDITIONAL** — Usable only after a specific action is completed (consent, watermark removal, etc.)
- **DISCARD** — Not suitable for the website

---

## Professional Headshots

All four photos are by **Timothy Park Photo + Video** and contain visible watermarks. Unwatermarked versions must be obtained before use.

| File | Classification | Reason | Website Placement | Required Alt Text |
|------|---------------|--------|-------------------|-------------------|
| `slide03_img001.jpg` | CONDITIONAL | Watermarked. Obtain clean version from photographer. | Primary headshot — hero section or About page (`public/images/headshots/`) | "Portrait of Mary Cook, consulting professional" |
| `slide04_img002.jpg` | CONDITIONAL | Watermarked. Obtain clean version from photographer. | About page or Services page (`public/images/headshots/`) | "Mary Cook in an outdoor setting along the river in Oregon" |
| `slide05_img003.jpg` | CONDITIONAL | Watermarked. Obtain clean version from photographer. | Alternate headshot (`public/images/headshots/`) | "Mary Cook, strategic planning consultant" |
| `slide06_img004.jpg` | CONDITIONAL | Watermarked. Obtain clean version from photographer. | Contact page or leadership section (`public/images/headshots/`) | "Mary Cook, confident and approachable, against a brick wall backdrop" |

**Action required:** Mary must contact Timothy Park Photo + Video for unwatermarked originals and choose which photo to have retouched as the primary website image.

---

## Working Session / Event Photos

| File | Classification | Reason | Website Placement | Required Alt Text |
|------|---------------|--------|-------------------|-------------------|
| `slide27_img017.jpg` | CONDITIONAL | Contains identifiable people. Verify participant consent before publishing. | Services or "How We Work" section (`public/images/work/`) | "Indoor working session with participants collaborating at a conference table" |
| `slide31_img018.jpg` | CONDITIONAL | Contains identifiable people. Verify participant consent before publishing. | Retreats section (`public/images/work/`) | "Outdoor retreat setting with participants collaborating at a picnic table in the Oregon hills" |
| `slide48_img026.jpg` | CONDITIONAL | Mary at trade show booth. Usable (Mary is subject), but Mary should confirm she wants it on the site. | About page history section (`public/images/work/`) | "Mary Cook at the Swanson Partners trade show booth" |

---

## Casual / Lifestyle Photo

| File | Classification | Reason | Website Placement | Required Alt Text |
|------|---------------|--------|-------------------|-------------------|
| `slide26_img016.jpg` | CONDITIONAL | Ready to use if Mary decides it fits the brand. | About page personal section (`public/images/headshots/`) | "Mary Cook, casual outdoor portrait at sunset" |

---

## Document Images (Text Content Transcribed)

These are low-quality photos of printed Swanson Partners marketing materials. All text content has been fully transcribed into the `content/` folder. The original images are not suitable for website use.

| File | Classification | Reason |
|------|---------------|--------|
| `slide07_img005.jpg` | DISCARD | Photo of printed document. Text transcribed to `services.md`, `testimonials.md`. |
| `slide08_img006.jpg` | DISCARD | Photo of printed document. Text transcribed to `services.md`, `testimonials.md`, `brand.md`. |
| `slide09_img007.jpg` | DISCARD | Photo of printed document. Text transcribed to `bio.md`. |
| `slide10_img008.jpg` | DISCARD | Photo of printed document. Text transcribed to `services.md`, `clients.md`. |
| `slide11_img009.jpg` | DISCARD | Photo of printed document. Text transcribed to `services.md`. |
| `slide12_img010.jpg` | DISCARD | Photo of printed document. Text transcribed to `credentials.md`. |

---

## Images Not Suitable for Website

| File | Classification | Reason |
|------|---------------|--------|
| `slide23_img014.jpg` | DISCARD | Chihuly glass art. Copyright concerns flagged by Mary. |
| `slide25_img015.jpg` | DISCARD | Child's whiteboard writing. Personal/sentimental, not professional content. |
| `slide41_img019.jpg` | DISCARD | Autumn leaves photo labeled "FOR FUN" by Mary. Personal artistic shot. |
| `slide48_img027.jpg` | DISCARD | Personal family photo (person cooking). Not professional content. |
| `slide48_img028.jpg` | DISCARD | Personal family photo (person at dinner). Not professional content. |

---

## Audio Player Icons (Not Real Images)

PowerPoint audio-player icons extracted as PNGs. Not usable images.

| File | Classification | Reason |
|------|---------------|--------|
| `slide13_img011.png` | DISCARD | Audio icon artifact from PPTX. |
| `slide14_img012.png` | DISCARD | Audio icon artifact from PPTX. |
| `slide15_img013.png` | DISCARD | Audio icon artifact from PPTX. |
| `slide42_img020.png` | DISCARD | Audio icon artifact from PPTX. |
| `slide43_img021.png` | DISCARD | Audio icon artifact from PPTX. |
| `slide44_img022.png` | DISCARD | Audio icon artifact from PPTX. |
| `slide45_img023.png` | DISCARD | Audio icon artifact from PPTX. |
| `slide46_img024.png` | DISCARD | Audio icon artifact from PPTX. |
| `slide47_img025.png` | DISCARD | Audio icon artifact from PPTX. |

---

## Directory Structure for Final Images

When approved images are obtained, place them in:

```
public/images/headshots/   — Professional headshots (slides 3-6)
public/images/work/        — Working sessions, events, retreats (slides 27, 31, 48)
public/images/og/          — Open Graph / social sharing images (generated)
```

---

## Summary of Pending Actions for Mary

1. Contact Timothy Park Photo + Video for unwatermarked headshot originals (slides 3-6)
2. Choose which headshot to have retouched as the primary website photo
3. Confirm consent for identifiable participants in working session photos (slides 27, 31)
4. Decide whether the trade show booth photo (slide 48) should appear on the site
5. Decide whether the casual sunset portrait (slide 26) fits the desired brand

---

## Current Website Status

Until unwatermarked images are obtained, the website uses the `ImagePlaceholder` component (`src/components/ui/ImagePlaceholder.tsx`) to render styled placeholder blocks with descriptive labels. No watermarked images are used anywhere in the codebase.
