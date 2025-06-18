
# Project Structure Analysis - Jai Dee Mental Wellness App

## File Tree Structure

```
📁 src/
  📁 components/
    📁 layout/
      📄 BottomNavigation.tsx 🟢 - Main navigation component with Thai/English language support (5+ imports)
      📄 MobileLayout.tsx 🟢 - Core mobile layout wrapper with responsive design (10+ imports)
    📁 ui/ 🟡 - Reusable UI components from shadcn/ui library
      📄 accordion.tsx 🔴 - Collapsible content sections
      📄 alert-dialog.tsx 🔴 - Modal confirmation dialogs
      📄 alert.tsx 🔴 - Status notification components
      📄 aspect-ratio.tsx 🔴 - Responsive image containers
      📄 avatar.tsx 🔴 - User profile image components
      📄 badge.tsx 🔴 - Status indicators and labels
      📄 breadcrumb.tsx 🔴 - Navigation breadcrumb trails
      📄 button.tsx 🟡 - Primary action buttons (5+ imports)
      📄 calendar.tsx 🔴 - Date picker components
      📄 card.tsx 🟡 - Content container components (3-5 imports)
      📄 carousel.tsx 🔴 - Image slideshow components
      📄 chart.tsx 🔴 - Data visualization components
      📄 checkbox.tsx 🔴 - Form checkbox inputs
      📄 collapsible.tsx 🔴 - Expandable content sections
      📄 command.tsx 🔴 - Command palette interface
      📄 context-menu.tsx 🔴 - Right-click menu components
      📄 dialog.tsx 🔴 - Modal dialog components
      📄 drawer.tsx 🔴 - Side panel components
      📄 dropdown-menu.tsx 🔴 - Dropdown selection menus
      📄 form.tsx 🔴 - Form validation components
      📄 hover-card.tsx 🟡 - Tooltip-like hover components (1-2 imports)
      📄 input-otp.tsx 🟡 - OTP verification inputs (1-2 imports)
      📄 input.tsx 🟡 - Text input form fields (3-5 imports)
      📄 label.tsx 🟡 - Form field labels (2-3 imports)
      📄 menubar.tsx 🔴 - Horizontal menu navigation
      📄 navigation-menu.tsx 🔴 - Complex navigation structures
      📄 pagination.tsx 🟡 - Page navigation controls (1-2 imports)
      📄 popover.tsx 🟡 - Floating content panels (2-3 imports)
      📄 progress.tsx 🟡 - Progress bar indicators (2-3 imports)
      📄 radio-group.tsx 🟡 - Radio button selections (1-2 imports)
      📄 resizable.tsx 🟡 - Resizable panel components (1-2 imports)
      📄 scroll-area.tsx 🟡 - Custom scrollable areas (1-2 imports)
      📄 select.tsx 🔴 - Dropdown selection components
      📄 separator.tsx 🟡 - Visual content dividers (2-3 imports)
      📄 sheet.tsx 🔴 - Side sheet panel components
      📄 sidebar.tsx 🔴 - Sidebar navigation components
      📄 skeleton.tsx 🟡 - Loading state placeholders (2-3 imports)
      📄 slider.tsx 🟡 - Range input sliders (1-2 imports)
      📄 sonner.tsx 🟡 - Toast notification system (3-5 imports)
      📄 switch.tsx 🟡 - Toggle switch components (1-2 imports)
      📄 table.tsx 🔴 - Data table components
      📄 tabs.tsx 🟡 - Tabbed content interfaces (1-2 imports)
      📄 textarea.tsx 🟡 - Multi-line text inputs (2-3 imports)
      📄 toast.tsx 🔴 - Toast notification components
      📄 toaster.tsx 🟡 - Toast notification container (3-5 imports)
      📄 toggle-group.tsx 🟡 - Group toggle selections (1-2 imports)
      📄 toggle.tsx 🟡 - Individual toggle components (2-3 imports)
      📄 tooltip.tsx 🟡 - Hover tooltip components (2-3 imports)
      📄 use-toast.ts 🟡 - Toast notification hook (3-5 imports)
  📁 contexts/
    📄 LanguageContext.tsx 🟢 - Thai/English language switching context (10+ imports)
  📁 hooks/
    📄 use-mobile.tsx 🟡 - Mobile breakpoint detection hook (3-5 imports)
    📄 use-toast.ts 🟡 - Toast notification management hook (5+ imports)
  📁 integrations/
    📁 supabase/
      📄 client.ts 🟢 - Supabase database client configuration (10+ imports)
      📄 types.ts 🟢 - TypeScript database type definitions (10+ imports)
  📁 lib/
    📄 utils.ts 🟢 - Utility functions for styling and common operations (10+ imports)
  📁 pages/
    📄 AIChat.tsx 🟢 - AI-powered mental health chat interface (Main feature)
    📄 Content.tsx 🟢 - Educational content and resources page (Main feature)
    📄 Home.tsx 🟢 - Dashboard and main landing page (Main feature)
    📄 NotFound.tsx 🔴 - 404 error page component
    📄 Profile.tsx 🟢 - User profile and settings page (Main feature)
    📄 Therapist.tsx 🟢 - Therapist connection and booking page (Main feature)
  📄 App.tsx 🟢 - Main application component with routing (Root component)
  📄 index.css 🟢 - Global styles and Tailwind configuration (Root styles)
  📄 main.tsx 🟢 - Application entry point and React mounting (Root entry)
  📄 vite-env.d.ts 🔴 - Vite environment type definitions

📁 public/
  📄 favicon.ico 🔴 - Browser tab icon
  📄 placeholder.svg 🔴 - Placeholder image for development
  📄 robots.txt 🔴 - Search engine crawling instructions

📁 supabase/
  📄 config.toml 🟡 - Supabase project configuration (Backend config)

📄 index.html 🟢 - HTML entry point with Thai font loading (Root HTML)
📄 package.json 🟢 - Dependencies and build scripts (Project config)
📄 tailwind.config.ts 🟡 - Tailwind CSS configuration (Styling config)
📄 vite.config.ts 🟡 - Vite build tool configuration (Build config)
📄 README.md 🔴 - Project documentation
```

## Key Components Analysis

### Core Application Files
- **App.tsx**: Main application router with language context and mobile layout
- **main.tsx**: React 18 application bootstrap
- **index.html**: Thai font loading (Sarabun + Poppins) and meta configuration

### Feature Pages (High Usage)
- **Home.tsx**: Dashboard with wellness tracking
- **AIChat.tsx**: AI-powered mental health conversations
- **Content.tsx**: Educational resources and articles
- **Profile.tsx**: User settings and preferences
- **Therapist.tsx**: Professional therapist connections

### Layout Components (Critical)
- **MobileLayout.tsx**: Responsive container with bottom navigation
- **BottomNavigation.tsx**: Multi-language navigation with Thai/English support

### Context & State Management
- **LanguageContext.tsx**: Internationalization for Thai/English
- **use-toast.ts**: Global notification system

### External Integrations
- **Supabase**: Database, authentication, and real-time features
- **shadcn/ui**: Component library for consistent UI
- **Tailwind CSS**: Utility-first styling with custom Thai design tokens

## Dependencies Overview
- **Critical**: React Router, Supabase, Tailwind CSS, shadcn/ui
- **Important**: React Query, Lucide Icons, TypeScript
- **Supporting**: Vite, ESLint, PostCSS

---
*Last Updated: December 2024 | Version: 1.0*
