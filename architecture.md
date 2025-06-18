
# System Design Documentation - Jai Dee Mental Wellness App

## Table of Contents
1. [System Overview](#system-overview)
2. [User Flow Diagram](#user-flow-diagram)
3. [Component Architecture](#component-architecture)
4. [Database Schema](#database-schema)
5. [Authentication Flow](#authentication-flow)
6. [API Architecture](#api-architecture)
7. [Deployment Architecture](#deployment-architecture)
8. [Integration Points](#integration-points)

## System Overview

Jai Dee is a mobile-first mental wellness application designed specifically for Thai users, offering AI-powered chat support, educational content, and professional therapist connections. The application follows a modern React architecture with TypeScript, utilizing Supabase for backend services.

## User Flow Diagram

```mermaid
flowchart TD
    A[User Opens App] --> B{Authenticated?}
    B -->|No| C[Language Selection]
    B -->|Yes| D[Home Dashboard]
    
    C --> E[Login/Register]
    E --> F[Authentication]
    F --> D
    
    D --> G[Bottom Navigation]
    G --> H[Home - Wellness Dashboard]
    G --> I[AI Chat - Mental Health Support]
    G --> J[Content - Educational Resources]
    G --> K[Therapist - Professional Help]
    G --> L[Profile - Settings]
    
    I --> M[AI Conversation]
    M --> N[Mood Tracking]
    M --> O[Crisis Detection]
    O -->|Crisis Detected| P[Emergency Resources]
    
    J --> Q[Articles & Videos]
    Q --> R[Wellness Exercises]
    Q --> S[Progress Tracking]
    
    K --> T[Therapist Directory]
    T --> U[Booking System]
    U --> V[Session Management]
    
    L --> W[Language Toggle]
    L --> X[Privacy Settings]
    L --> Y[Notification Preferences]
```

## Component Architecture

```mermaid
graph TB
    subgraph "Application Layer"
        App[App.tsx]
        Router[React Router]
        Layout[MobileLayout]
    end
    
    subgraph "Context Layer"
        Lang[LanguageContext]
        Query[QueryClient]
        Toast[ToastProvider]
    end
    
    subgraph "Page Components"
        Home[Home.tsx]
        Chat[AIChat.tsx]
        Content[Content.tsx]
        Therapist[Therapist.tsx]
        Profile[Profile.tsx]
    end
    
    subgraph "Layout Components"
        BottomNav[BottomNavigation]
        MobileWrapper[MobileLayout]
    end
    
    subgraph "UI Components"
        Button[Button]
        Card[Card]
        Input[Input]
        Dialog[Dialog]
        Toast[Toast]
    end
    
    subgraph "Hooks & Utils"
        Mobile[use-mobile]
        ToastHook[use-toast]
        Utils[lib/utils]
    end
    
    App --> Router
    App --> Lang
    App --> Query
    App --> Toast
    Router --> Layout
    Layout --> BottomNav
    Layout --> Home
    Layout --> Chat
    Layout --> Content
    Layout --> Therapist
    Layout --> Profile
    
    Home --> Card
    Chat --> Input
    Content --> Button
    Profile --> Dialog
    
    BottomNav --> Mobile
    Toast --> ToastHook
```

## Database Schema

```mermaid
erDiagram
    users {
        uuid id PK
        string full_name
        string avatar_url
        json billing_address
        json payment_method
        timestamp created_at
        timestamp updated_at
    }
    
    customers {
        uuid id PK
        string stripe_customer_id
    }
    
    subscriptions {
        uuid id PK
        uuid user_id FK
        string price_id FK
        string status
        timestamp current_period_start
        timestamp current_period_end
        timestamp created_at
    }
    
    products {
        uuid id PK
        string name
        string description
        boolean active
        json metadata
    }
    
    prices {
        uuid id PK
        uuid product_id FK
        boolean active
        string currency
        number unit_amount
        string type
        string interval
    }
    
    users ||--o{ subscriptions : "has"
    users ||--o{ customers : "maps_to"
    products ||--o{ prices : "has"
    prices ||--o{ subscriptions : "uses"
```

## Authentication Flow

```mermaid
sequenceDiagram
    participant User
    participant App
    participant Supabase
    participant Database
    
    User->>App: Open Application
    App->>Supabase: Check Auth State
    
    alt User Not Authenticated
        Supabase->>App: No Session
        App->>User: Show Login Screen
        User->>App: Enter Credentials
        App->>Supabase: Sign In Request
        Supabase->>Database: Validate Credentials
        Database->>Supabase: Return User Data
        Supabase->>App: Return Session
        App->>User: Redirect to Home
    else User Authenticated
        Supabase->>App: Return Existing Session
        App->>User: Show Home Dashboard
    end
    
    Note over App,Supabase: Session managed via localStorage
    Note over Supabase: Auto-refresh tokens handled
```

## API Architecture

```mermaid
flowchart LR
    subgraph "Frontend"
        React[React App]
        TanStack[React Query]
    end
    
    subgraph "Supabase Backend"
        Auth[Authentication]
        DB[PostgreSQL Database]
        Storage[File Storage]
        Realtime[Real-time Subscriptions]
        Edge[Edge Functions]
    end
    
    subgraph "External APIs"
        AI[AI Chat Service]
        Maps[Google Maps]
        Payment[Stripe]
    end
    
    React --> TanStack
    TanStack --> Auth
    TanStack --> DB
    TanStack --> Storage
    TanStack --> Realtime
    
    Edge --> AI
    Edge --> Maps
    Edge --> Payment
    
    Auth --> DB
    Storage --> DB
```

## Deployment Architecture

```mermaid
graph TB
    subgraph "Development"
        Dev[Local Development]
        Vite[Vite Dev Server]
        Hot[Hot Module Reload]
    end
    
    subgraph "Build Process"
        Build[Vite Build]
        TS[TypeScript Check]
        Lint[ESLint]
        Bundle[Production Bundle]
    end
    
    subgraph "Hosting"
        CDN[Content Delivery Network]
        Static[Static Files]
        Domain[Custom Domain]
    end
    
    subgraph "Backend Services"
        Supabase[Supabase Cloud]
        DB[PostgreSQL]
        Auth[Authentication]
        Storage[File Storage]
    end
    
    Dev --> Build
    Build --> Bundle
    Bundle --> CDN
    CDN --> Static
    Static --> Domain
    
    CDN --> Supabase
    Supabase --> DB
    Supabase --> Auth
    Supabase --> Storage
```

## Integration Points

### 1. Supabase Database Integration
**Purpose**: Primary backend for user data, content management, and real-time features
- **Connection**: `@/integrations/supabase/client.ts`
- **Authentication**: Row Level Security (RLS) policies
- **Real-time**: WebSocket connections for live updates
- **Security**: JWT token-based authentication

### 2. React Query Integration
**Purpose**: Data fetching, caching, and synchronization layer
- **Configuration**: Optimistic updates and background refetching
- **Error Handling**: Automatic retry logic with exponential backoff
- **Caching**: Intelligent cache invalidation strategies

### 3. Internationalization (i18n)
**Purpose**: Thai/English language support
- **Implementation**: Context-based language switching
- **Fonts**: Google Fonts (Sarabun for Thai, Poppins for English)
- **RTL Support**: Prepared for future Arabic/Hebrew support

### 4. UI Component Library
**Purpose**: Consistent design system implementation
- **Library**: shadcn/ui with Radix UI primitives
- **Theming**: Custom CSS variables for Thai cultural colors
- **Accessibility**: WCAG 2.1 AA compliance

### 5. Mobile-First Design
**Purpose**: Optimized mobile experience
- **Responsive**: Tailwind CSS breakpoints
- **Touch**: Gesture-friendly interactions
- **Performance**: Lazy loading and code splitting

### 6. State Management
**Purpose**: Application state coordination
- **Global State**: React Context for language and authentication
- **Local State**: React hooks for component state
- **Persistence**: LocalStorage for user preferences

## Component Descriptions

### Core Layout Components

**MobileLayout (200-300 words)**
The MobileLayout component serves as the primary structural foundation for the entire Jai Dee application. It implements a mobile-first design philosophy that ensures optimal user experience across all device sizes. The component features a gradient background that evokes the calming nature of Thai wellness traditions, using custom CSS classes like `bg-wellness-gradient` that blend soft blues and mint greens. The layout maintains a consistent max-width container that centers content on larger screens while utilizing full width on mobile devices. The component includes bottom padding to accommodate the fixed bottom navigation, preventing content from being obscured. It also implements the modern iOS-style safe area handling to ensure content visibility on devices with notches or home indicators.

**BottomNavigation (200-300 words)**
The BottomNavigation component represents the primary navigation interface for the Jai Dee application, designed specifically for mobile-first interaction patterns. It implements a five-tab navigation system covering Home, AI Chat, Content, Therapist connections, and Profile management. Each navigation item features carefully selected Lucide React icons that provide universal recognition while maintaining cultural sensitivity. The component integrates deeply with the LanguageContext to provide seamless Thai/English text switching. Visual feedback is provided through gradient backgrounds that activate on selection, with each tab having its own unique color scheme that reflects the emotional tone of its content area. The navigation includes subtle animations and hover effects that enhance the user experience without overwhelming the interface. The component uses React Router's location detection to maintain accurate active states and implements proper accessibility features including semantic navigation roles.

### Feature Pages

**AIChat (200-300 words)**
The AIChat page implements the core AI-powered mental health conversation feature that distinguishes Jai Dee from other wellness applications. The component is designed to provide a safe, judgment-free environment where users can discuss their mental health concerns with an AI assistant trained in Thai cultural context and mental health best practices. The interface mimics familiar chat applications while incorporating wellness-specific features like mood tracking, crisis detection, and resource suggestions. The component integrates with Supabase for conversation persistence and implements real-time message delivery. Special attention is paid to privacy and security, with end-to-end encryption considerations and careful data handling. The AI responses are designed to be culturally appropriate for Thai users while maintaining professional mental health support standards.

**Home (200-300 words)**
The Home page serves as the primary dashboard for users' mental wellness journey, providing a comprehensive overview of their progress and immediate access to key features. The design incorporates Thai design principles with gentle curves, natural color palettes, and harmonious spacing that promotes a sense of calm and well-being. The dashboard includes personalized wellness metrics, recent activity summaries, and quick access buttons to core features. Weather-aware wellness suggestions adapt to Bangkok's climate and seasonal patterns. The component implements progressive disclosure, showing basic information initially with options to drill down into detailed analytics. Integration with the user's profile allows for personalized recommendations and culturally relevant content suggestions based on their preferences and usage patterns.

## Security Considerations

### Data Protection
- End-to-end encryption for sensitive conversations
- GDPR compliance for EU users
- Thai Personal Data Protection Act (PDPA) compliance
- Secure storage of mental health data

### Authentication Security
- Multi-factor authentication support
- Session management with secure token refresh
- Rate limiting on authentication endpoints
- Account lockout protection

### Privacy Features
- Anonymous chat options
- Data retention policies
- User data export capabilities
- Right to be forgotten implementation

---
*Last Updated: December 2024 | Version: 1.0 | Architecture Review: Q4 2024*
