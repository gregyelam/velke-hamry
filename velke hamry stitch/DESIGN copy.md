# Design System Document: The Tactile Explorer

## 1. Overview & Creative North Star
**Creative North Star: "The Modern Naturalist"**

This design system moves away from the sterile, high-contrast rigidity of traditional utility apps. Instead, it adopts an editorial, "Modern Naturalist" aesthetic. We are not just building a tool; we are creating a digital field guide. 

To achieve this, the system breaks the "template" look through **intentional asymmetry** and **tonal depth**. Rather than aligning everything to a strict, boxed grid, we use generous breathing room and overlapping elements (e.g., a trail map image bleeding off the edge of a container) to mimic the organic unpredictability of nature. The typography scale is aggressive—large, authoritative display headers contrasted with functional, airy labels—ensuring the UI feels premium, curated, and trustworthy.

---

## 2. Colors & Surface Philosophy
The palette is rooted in the Bohemian landscape: muted forest greens, warm stone, and the clay-rich terracotta of the region.

### The "No-Line" Rule
**Explicit Instruction:** Do not use 1px solid borders for sectioning or containment. 
Boundaries must be defined exclusively through background color shifts. For example, a card (using `surface-container-lowest`) should sit on a section background of `surface-container-low`. The transition between `#ffffff` and `#f6f3eb` provides all the definition a premium UI requires.

### Surface Hierarchy & Nesting
Treat the UI as a series of stacked, physical layers—like sheets of fine cotton paper.
*   **Base:** `surface` (#fcf9f1) for the main canvas.
*   **Structural Sections:** `surface-container-low` (#f6f3eb) for footer or secondary content areas.
*   **Interactive Layers:** `surface-container-highest` (#e5e2da) for active navigation elements.
*   **Content Cards:** `surface-container-lowest` (#ffffff) to provide "pop" and clarity for trail data.

### The "Glass & Gradient" Rule
To avoid a flat, "Bootstrap" appearance:
*   **Glassmorphism:** Use `surface` at 80% opacity with a `20px` backdrop-blur for floating navigation bars or sticky headers.
*   **Signature Textures:** Apply subtle linear gradients to primary CTAs. Transition from `primary` (#384b38) to `primary-container` (#4f634f) at a 135-degree angle. This adds a "soulful" depth that flat hex codes lack.

---

## 3. Typography
We utilize **Plus Jakarta Sans** for its contemporary geometric feel and excellent legibility at small sizes.

*   **Display (lg/md/sm):** Used for "Hero" moments and trail titles. Use **Bold (700)** or **ExtraBold (800)** weights. These should feel loud and editorial.
*   **Headline & Title:** Used for Czech trail names (e.g., *Hamrovský okruh*). The bold weight here conveys authority and ruggedness.
*   **Body (lg/md/sm):** Set to **Medium (500)** or **Regular (400)**. Increase the line-height to 1.6x to ensure readability while the user is outdoors or on the move.
*   **Labels:** Used for metadata (elevation, duration). These should be uppercase with a +5% letter-spacing to maintain a sophisticated, "spec-sheet" vibe.

---

## 4. Elevation & Depth
We eschew traditional drop shadows in favor of **Tonal Layering**.

*   **The Layering Principle:** Softness is key. A `surface-container-lowest` card placed on a `surface-container-low` background creates a natural lift.
*   **Ambient Shadows:** If an element must "float" (e.g., a floating action button for "Start Hike"), use an extra-diffused shadow: `0px 12px 32px rgba(28, 28, 23, 0.06)`. The shadow color is a tint of our `on-surface` (#1c1c17), never pure black.
*   **The "Ghost Border":** For accessibility in high-glare outdoor environments, use a border with `outline-variant` (#c3c8c0) at **15% opacity**. This provides a hint of structure without creating visual noise.

---

## 5. Components

### Buttons
*   **Primary:** Gradient of `primary` to `primary-container`. `8px` (DEFAULT) corner radius. White text.
*   **Secondary:** `secondary-container` background with `on-secondary-container` text. No border.
*   **Tertiary:** Ghost style. No background; `primary` text weight set to Bold.

### Cards & Lists
*   **No Dividers:** Forbid the use of line dividers. Use `spacing-6` (1.5rem) of vertical white space to separate list items.
*   **Imagery:** Use `md` (0.75rem) or `lg` (1rem) corner radius for trail photos. Photos should always have a subtle `primary-fixed` inner glow to tie them to the earthy palette.

### Filter Pills (Chips)
*   **Style:** `full` (9999px) roundness. 
*   **Unselected:** `surface-container-high` background.
*   **Selected:** `tertiary` (#783016) background with `on-tertiary` text. This terracotta accent provides a "hit" of energy against the forest greens.

### Specific App Components
*   **The Trail Stats Bar:** A horizontal container using `surface-variant` with semi-transparent background to display KM, Elevation, and Time.
*   **Elevation Profile:** A custom-drawn SVG graph using `tertiary` for the path and `primary-fixed` for the fill area, styled with a soft gradient fade.

---

## 6. Do's and Don'ts

### Do
*   **Do** use Czech names for trails exactly as they appear in local cartography (e.g., *Velké Hamry II*), but keep UI labels (e.g., "Difficulty") in English.
*   **Do** use asymmetrical margins. For example, give a header a larger left margin than the body text to create an editorial feel.
*   **Do** prioritize the `tertiary` (terracotta) color for "critical" actions or trail hazards.

### Don't
*   **Don't** use 100% black (#000000). Use `on-surface` (#1c1c17) to maintain the soft, organic atmosphere.
*   **Don't** use sharp 90-degree corners. Everything must feel "weathered" and "organic."
*   **Don't** use standard Material Design elevation levels (dp1, dp2). Stick to the Tonal Layering rules defined in Section 4.