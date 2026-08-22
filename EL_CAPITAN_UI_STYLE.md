# El Capitan UI Style

This is the visual language for the whole interface. It references OS X 10.11: compact, orderly, lightly beveled, and tactile. It is not a glassmorphism system and should not become a collection of oversized floating pills.

## Core Principles

- Prefer calm hierarchy and clear grouping over decoration.
- Use compact controls with deliberate alignment and consistent chrome.
- Make surfaces feel physical with restrained gradients, borders, highlights, and shadows.
- Keep decoration subtle enough that labels, icons, and data remain primary.
- Use semantic color tokens so the material treatment works in light and dark themes.

## Shape And Spacing

- Use restrained radii: `rounded-sm` for compact controls and `rounded-md` for standard controls.
- Use larger radii only for genuinely large containers, not ordinary buttons or fields.
- Do not use pill shapes by default.
- Base spacing on a 4px rhythm, with 8px, 12px, 16px, and 24px as common steps.
- Align icons, labels, and control edges to a shared grid.
- Keep toolbars and dense data views tighter than content cards and dialogs.

## Surfaces And Chrome

- Use a light vertical gradient over colored or neutral surfaces to suggest a coated material.
- Add a thin, low-contrast border for the physical edge.
- Add a one-pixel inset top highlight where a control needs a beveled appearance.
- Use small shadows for separation, generally no more than `0 1px 3px` at rest.
- Avoid thick rings, diffuse halos, dramatic elevation, and floating-card treatment.
- Reserve visible rings for keyboard focus.
- Keep gradients and shadows subordinate to the surface color underneath.

## Layout Surfaces

### Window And Page

- Establish a quiet page background and clear content bounds.
- Use a strong top-level title and compact secondary metadata.
- Keep major regions visually connected instead of scattering isolated cards.

### Toolbars

- Keep toolbars shallow and horizontally organized.
- Use segmented controls for mutually exclusive view or mode choices.
- Give the selected segment a darker or more pronounced inset surface.
- Keep dividers thin and aligned with the control chrome.

### Panels And Cards

- Use borders and shallow shadows to define panels.
- Prefer a small number of broad surfaces over many nested cards.
- Use consistent internal padding and clear section headers.

### Dialogs And Popovers

- Use a stronger but still restrained shadow than ordinary panels.
- Keep the title, content, and action row clearly separated.
- Place the primary action at the predictable trailing edge.

## Controls

### Buttons

- Use a thin edge, restrained gloss, and small outer shadow at rest.
- Increase brightness slightly on hover without lifting or scaling.
- Move down one pixel on press and replace the outer shadow with an inset shadow.
- Preserve semantic variant colors for `default`, `outline`, `secondary`, `ghost`, `destructive`, and `link`.
- Keep `xs` and `icon-xs` controls more tightly rounded than standard controls.

### Inputs

- Use the same compact radius and thin chrome as buttons.
- Keep the resting surface quiet; use focus rings rather than heavy borders for attention.
- Make placeholder text visibly secondary without reducing entered-value legibility.

### Selection Controls

- Use clear selected and unselected surfaces, not color alone.
- Use segmented controls when choices are short and mutually exclusive.
- Keep checkboxes, radios, and switches compact with obvious focus and disabled states.

### Menus And Lists

- Use compact row heights and consistent leading icons.
- Highlight the active row with a contained surface, not a large shadow.
- Keep separators sparse and aligned to the content grid.

## Typography And Icons

- Use the existing sans-serif type system and a compact control scale.
- Use weight and contrast to establish hierarchy before changing font size.
- Keep labels concise; avoid decorative display typography in application chrome.
- Use Lucide icons consistently with the existing icon sizing rules.
- Align icons optically with text, not only by their bounding box.

## Interaction States

### Resting

- Flat position with quiet chrome and shallow separation.

### Hover

- Small brightness or surface-color change.
- No dramatic translation, scale, glow, or shadow expansion.

### Pressed

- One-pixel downward movement where appropriate.
- Inset shadow or darker lower surface to communicate depression.

### Focus

- Always preserve a visible `focus-visible` treatment using semantic ring tokens.
- Focus must remain distinguishable from hover and pressed states.

### Disabled

- Reduce contrast and opacity while retaining the component silhouette.
- Disable pointer interaction and all hover or pressed movement.

## Motion

- Use short, quiet transitions for surface, brightness, shadow, and transform changes.
- Prefer physical feedback over ornamental animation.
- Do not animate layout, gradients, or large shadows unnecessarily.
- Respect reduced-motion preferences when adding motion beyond simple state transitions.

## Implementation Rules

- Reuse existing shadcn components and compose them before creating replacements.
- Use Tailwind utilities and the existing `cn` helper.
- Use semantic tokens such as `bg-background`, `text-foreground`, `border-border`, and `ring-ring`.
- Keep shared material treatment in shared component variants, not duplicated per screen.
- Do not add component-specific CSS files or inline style objects.
- Preserve responsive behavior on desktop and mobile.

## Verification Checklist

- The interface reads as compact OS X-style application chrome rather than modern glass cards.
- Radii are restrained and consistent across controls, panels, menus, and dialogs.
- Surfaces have subtle material depth without thick borders or large halos.
- Toolbars use clear grouping and segmented selected states.
- Hover, focus, pressed, and disabled states are distinct and keyboard-accessible.
- Pressed controls look inset rather than merely darker.
- Text and icons remain the visual priority over gradients and shadows.
- The layout remains legible and usable at desktop and mobile widths.
- Light and dark themes preserve contrast and the same material hierarchy.
- No one-off styling silently contradicts this document without a deliberate reason.
