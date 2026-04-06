# T20 — Image Selection & Placeholder Strategy

## Phase
5 — Polish

## Dependencies
- **T01** — Project scaffolding (folder structure in place)

## Objective
Execute the image selection process defined in the website plan: categorize every file in `extracted_images/`, classify each as APPROVED / CONDITIONAL / DISCARD, create placeholder components for blocked images, and set up the `public/images/` directory structure for when unwatermarked photos become available.

This is a procedural + code task. The agent must VIEW each image, apply the decision tree, and then implement the placeholder strategy.

## Files to Reference
- `agent-tasks/README.md` — Design system (brand-stone color for placeholders)
- `content/images.md` — Pre-existing human classification of all images (authoritative source)
- `extracted_images/` — All 28 raw image files

## Files to Create

1. `public/images/headshots/.gitkeep` — Directory for unwatermarked headshots
2. `public/images/work/.gitkeep` — Directory for approved work photos
3. `public/images/og/.gitkeep` — Directory for Open Graph images
4. `src/components/ui/ImagePlaceholder.tsx` — Placeholder component
5. `__tests__/components/ui/ImagePlaceholder.test.tsx`
6. `IMAGE_AUDIT.md` — Documentation of classification decisions

## Pre-existing Image Classification

Use `content/images.md` as the authoritative source. The following is the expected classification:

### APPROVED (pending unwatermarked versions — BLOCKED)

| File | Description | Target Placement | Status |
|------|-------------|-----------------|--------|
| `slide03_img001.jpg` | Navy blazer headshot, dark bg | Hero section primary | BLOCKED — watermarked (Timothy Park Photo + Video) |
| `slide04_img002.jpg` | Outdoor park/river portrait | About page | BLOCKED — watermarked |
| `slide05_img003.jpg` | White shirt headshot, dark bg | Contact page alt | BLOCKED — watermarked |
| `slide06_img004.jpg` | Brick wall, arms crossed | Contact page | BLOCKED — watermarked |

### CONDITIONALLY APPROVED

| File | Description | Condition |
|------|-------------|-----------|
| `slide31_img018.jpg` | Outdoor retreat, 3 people, shot from behind | Faces not clearly visible — lower consent risk. Strongest "work in action" photo. |
| `slide27_img017.jpg` | Indoor conference room session | Identifiable faces — requires consent confirmation |
| `slide48_img026.jpg` | Trade show booth (old branding) | Use only if About page includes "history" section |

### DISCARD

All remaining files — document photos (text already transcribed), PowerPoint audio icons, copyrighted art, personal/family content, "FOR FUN" casual photos.

## Decision Tree (apply to each file)

```
Is the file a .png under 50KB?
  → YES → DISCARD (PowerPoint UI element)
  → NO → Continue

Does the image show a printed document/page with text?
  → YES → DISCARD (already transcribed in content/*.md)
  → NO → Continue

Does it contain copyrighted third-party content?
  → YES → DISCARD (legal risk)
  → NO → Continue

Is it personal/sentimental content?
  → YES → DISCARD (not brand-aligned)
  → NO → Continue

Does it show identifiable faces (not Mary) without confirmed consent?
  → YES → FLAG as "consent-required"
  → NO → CANDIDATE
```

## Tests to Write First

**`__tests__/components/ui/ImagePlaceholder.test.tsx`:**

```tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder'

describe('ImagePlaceholder component', () => {
  it('renders with the provided alt text', () => {
    render(<ImagePlaceholder alt="Portrait of Mary Cook" />)
    // The placeholder should have a role or data-testid
    expect(screen.getByTestId('image-placeholder')).toBeInTheDocument()
  })

  it('applies stone background color', () => {
    render(<ImagePlaceholder alt="Portrait of Mary Cook" />)
    const el = screen.getByTestId('image-placeholder')
    expect(el.className).toContain('bg-brand-stone')
  })

  it('displays descriptive text', () => {
    render(<ImagePlaceholder alt="Portrait of Mary Cook" label="Mary Cook" />)
    expect(screen.getByText(/Mary Cook/)).toBeInTheDocument()
  })

  it('has appropriate aspect ratio by default', () => {
    render(<ImagePlaceholder alt="Portrait" />)
    const el = screen.getByTestId('image-placeholder')
    // Should have aspect-ratio styling
    expect(el.className).toContain('aspect-')
  })

  it('accepts custom aspect ratio', () => {
    render(<ImagePlaceholder alt="Portrait" aspectRatio="square" />)
    const el = screen.getByTestId('image-placeholder')
    expect(el.className).toContain('aspect-square')
  })

  it('does not contain any watermarked images', () => {
    const { container } = render(<ImagePlaceholder alt="Portrait" />)
    expect(container.querySelector('img')).not.toBeInTheDocument()
  })

  it('contains no emojis', () => {
    const { container } = render(<ImagePlaceholder alt="Portrait" label="Mary Cook" />)
    expect(container.innerHTML).not.toMatch(/[\u{1F300}-\u{1F9FF}]/u)
  })
})
```

## Implementation Spec

### ImagePlaceholder Component

```tsx
// src/components/ui/ImagePlaceholder.tsx

type ImagePlaceholderProps = {
  alt: string
  label?: string
  aspectRatio?: 'portrait' | 'square' | 'landscape' | 'og'
  className?: string
}

const aspectClasses = {
  portrait: 'aspect-[3/4]',
  square: 'aspect-square',
  landscape: 'aspect-[4/3]',
  og: 'aspect-[1200/630]',
}

export function ImagePlaceholder({
  alt,
  label,
  aspectRatio = 'portrait',
  className = '',
}: ImagePlaceholderProps) {
  return (
    <div
      data-testid="image-placeholder"
      role="img"
      aria-label={alt}
      className={`bg-brand-stone border border-border flex items-center justify-center ${aspectClasses[aspectRatio]} ${className}`}
    >
      {label && (
        <span className="text-brand-teal font-heading text-h4 text-center px-4">
          {label}
        </span>
      )}
    </div>
  )
}
```

### IMAGE_AUDIT.md

The agent should create a markdown file documenting:
1. Every file in `extracted_images/` with its classification (APPROVED / CONDITIONAL / DISCARD)
2. The reason for each classification
3. Where approved images should go when available
4. Required alt text for each approved image

### Alt Text for Approved Images

| Image | Alt Text |
|-------|----------|
| slide03 (navy blazer) | "Portrait of Mary Cook, consulting professional" |
| slide04 (outdoor park) | "Mary Cook in an outdoor setting along the river in Oregon" |
| slide05 (white shirt) | "Mary Cook, strategic planning consultant" |
| slide06 (brick wall) | "Mary Cook, confident and approachable, against a brick wall backdrop" |
| slide31 (retreat) | "Outdoor retreat setting with participants collaborating at a picnic table in the Oregon hills" |

### Placeholder Strategy

Until unwatermarked professional photos arrive:
- Use `ImagePlaceholder` component everywhere an image would appear
- Solid `brand-stone` background with Mary's name in `brand-teal` text
- Do NOT use any watermarked images on the site — this would be unprofessional and a potential licensing violation
- Each placeholder has a descriptive `aria-label` matching what the final image alt text will be

### Directory Structure

```
public/
  images/
    headshots/
      .gitkeep          # Ready for: mary-headshot-formal.jpg, mary-portrait-outdoor.jpg, etc.
    work/
      .gitkeep          # Ready for: retreat-outdoor-hillside.jpg, etc.
    og/
      .gitkeep          # Ready for: og-default.jpg (1200x630)
```

## Acceptance Criteria

1. All tests pass
2. `ImagePlaceholder` component renders correctly with all prop variants
3. `IMAGE_AUDIT.md` documents every file in `extracted_images/` with classification
4. `public/images/` directory structure created with `.gitkeep` files
5. No watermarked images are used anywhere in the project
6. Alt text prepared for all approved images
7. Placeholder component uses `role="img"` and `aria-label` for accessibility
