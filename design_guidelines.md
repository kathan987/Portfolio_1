# Design Guidelines: Kathan Thaker Dual Portfolio

## Design Approach
**Dual-Personality Portfolio**: This website showcases two distinct visual identities in a single platform—Professional (tech-focused) and Personal (design-focused)—with seamless navigation between them.

## Typography System
- **Headings**: Montserrat (Bold/SemiBold for hierarchy)
- **Body Text**: Source Sans Pro (Regular/Light)
- **Sizes**: 
  - Hero Headlines: 3xl to 5xl (responsive)
  - Section Headings: 2xl to 3xl
  - Body: base to lg
  - Captions/Labels: sm to base

## Color Palette
- **Primary**: #2C3E50 (Professional page backgrounds, dark sections)
- **Secondary**: #3498DB (Links, interactive elements, accents)
- **Accent**: #E74C3C (CTAs, highlights, important badges)
- **Personal Primary**: #FFD166 (Personal page hero, warm accents)
- **Neutrals**: White (#FFFFFF), Light Gray (#F8F9FA), Dark Gray (#34495E)

## Layout System
**Spacing**: Use Tailwind units of 4, 6, 8, 12, 16, 20, 24 for consistent rhythm
- Section padding: py-16 to py-24 (desktop), py-12 (mobile)
- Component spacing: gap-6 to gap-8
- Container max-width: max-w-7xl with px-4 to px-8

## Page-Specific Design

### Professional Page (Tech Identity)
**Hero Section**:
- Dark background (#2C3E50) with subtle animated networking cables/circuit patterns
- Centered headline: "Computer Systems Technician – Network & Systems"
- Subtext grid displaying: Windows/Linux, DHCP/DNS, AD, Virtualization, Cloud
- CompTIA A+ certification badge icons displayed prominently
- CTA buttons: "Download Resume" (accent red) + "View Projects" (secondary blue) with blurred backgrounds

**Content Sections**:
1. **Education & Certifications**: Card-based layout with institution logos, dates, and achievement highlights
2. **Skills & Tools**: Tag cloud or grouped card design organizing by category (Networking, OS, Cloud, Scripting)
3. **Projects**: Grid layout (2-3 columns desktop, 1 mobile) with project cards featuring thumbnail, title, brief description, and icon links to GitHub/Live demo
4. **Experience Timeline**: Vertical timeline with alternating left/right content blocks, role titles, company names, and bullet points
5. **Interactive CMD Box**: Terminal-style container with dark background, monospace font, typing animation showing "Switch1# config t" then revealing tools list with syntax highlighting

### Personal Page (Design Identity)
**Hero Section**:
- Bright warm yellow (#FFD166) gradient background with abstract illustrations
- Polaroid-style image frames floating with subtle tilt/shadow effects
- Headline: "Product & Visual Designer"
- Subtext: "Design, web & growth for ambitious brands"
- Friendly, approachable tone with rounded components

**Content Sections**:
1. **Portfolio Grid**: 6-9 design pieces in masonry/grid layout with hover zoom effects, category labels
2. **Scrolling Marquee**: Horizontal auto-scrolling banner with platform logos (YouTube, Instagram, TikTok, Facebook) repeating seamlessly
3. **Services Grid**: 3×3 colorful box layout, each service in vibrant color block with icon, title, and micro-description:
   - Web Design, Web Development, Content Creation
   - SEO, Brand Management, Social Media Management
   - Copywriting, Video/Photo Editing, AI Ads & UGC Marketing
4. **Tools Section**: Badge-style display of design/marketing tools (Figma, Adobe Suite, Canva, Notion, Meta Ads Manager)
5. **Achievements**: Stats/metrics cards with large numbers, client testimonial quotes in card format with avatar/name
6. **Contact Form**: Friendly form with name, email, message fields, submit button with encouraging copy

## Navigation & Transitions
- Fixed top navigation with toggle between "Professional" and "Personal" modes
- Toggle switch styled as modern slider with labels
- Page transition: Smooth fade-slide effect (300-500ms) when switching
- Active page indicator with underline or background highlight

## Component Library

**Cards**: Rounded corners (rounded-lg to rounded-xl), subtle shadows (shadow-md), hover lift effect
**Buttons**: 
- Primary (accent red): Solid fill, white text, hover darken
- Secondary (blue): Outline or ghost style, hover fill
- Buttons on hero images: Backdrop blur effect (backdrop-blur-md) with semi-transparent background
**Form Inputs**: Bordered, rounded, focus state with blue outline, proper labels and validation states
**Badges/Tags**: Pill-shaped (rounded-full), small padding, varied colors for categories
**Timeline**: Vertical line with circular nodes, connecting content cards
**Terminal Box**: Dark background, monospace font (Courier or Consolas), green/blue text accents

## Animations
- **Networking Cables**: Subtle moving lines/dots in hero background (Professional page)
- **Typing Effect**: CMD terminal typing animation for tools reveal
- **Marquee**: Continuous horizontal scroll for platform logos
- **Hover Effects**: Slight scale/lift on cards and project items
- **Page Transitions**: Fade-slide between Professional/Personal pages
- **Scroll Animations**: Subtle fade-in-up for section reveals (use sparingly)

## Images

**Professional Page**:
- No large hero image; use animated cable/network pattern background instead
- Project thumbnails: Screenshots or mockups of technical projects
- Certification badge images: CompTIA A+ logos

**Personal Page**:
- Hero section: 2-3 polaroid-style photos (portrait shots, workspace, design work in progress) with authentic feel
- Portfolio grid: 6-9 design work samples (web designs, branding, graphics)
- Testimonial section: Small circular client/colleague avatars
- Service grid icons: Simple illustrative icons for each service type
- All images optimized, modern formats (WebP), with fallbacks

## Footer
Consistent across both pages:
- Dark background (#2C3E50)
- Social links (LinkedIn, GitHub) with icons
- Copyright text: "© Kathan Thaker — Crafting Systems & Stories"
- Quick navigation links to main sections
- Light gray text for secondary information

## Responsive Behavior
- Mobile-first approach: Single column layouts below 768px
- Tablet (md): 2-column grids where appropriate
- Desktop (lg+): Full multi-column layouts, larger typography
- Navigation collapses to hamburger menu on mobile
- Touch-friendly button/link sizes (minimum 44px tap targets)

## Accessibility
- WCAG AA contrast ratios maintained
- Keyboard navigation support for all interactive elements
- Focus states clearly visible with blue outline
- Skip-to-content link for screen readers
- Semantic HTML structure with proper heading hierarchy
- Alt text for all images
- Form labels properly associated with inputs