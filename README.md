
# Jai Dee - Mental Wellness App 🌟

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/your-org/jai-dee)
[![Version](https://img.shields.io/badge/version-1.0.0-blue)](https://github.com/your-org/jai-dee/releases)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Backend-3ECF8E?logo=supabase)](https://supabase.com/)

> AI-powered mental health and wellness application designed specifically for Thai users, offering culturally-sensitive support, professional therapist connections, and comprehensive wellness resources.

## 📱 Project Overview

Jai Dee (ใจดี - "Good Heart" in Thai) is a comprehensive mental wellness platform that combines modern AI technology with Thai cultural values to provide accessible mental health support. The application offers a safe space for users to discuss their mental health concerns while connecting them with professional resources and educational content.

### ✨ Key Features

- **🤖 AI-Powered Chat**: Culturally-aware AI assistant for mental health conversations
- **🌍 Bilingual Support**: Seamless Thai/English language switching
- **👨‍⚕️ Therapist Connection**: Directory and booking system for professional help
- **📚 Educational Content**: Wellness resources, articles, and guided exercises
- **📊 Progress Tracking**: Personal wellness metrics and mood tracking
- **🔒 Privacy-First**: End-to-end encryption and secure data handling
- **📱 Mobile-Optimized**: Responsive design for iOS and Android devices

### 🛠 Technology Stack

| Category | Technology | Version |
|----------|------------|---------|
| **Frontend** | React | 18.3.1 |
| **Language** | TypeScript | 5.5.3 |
| **Styling** | Tailwind CSS | 3.4.11 |
| **UI Components** | shadcn/ui | Latest |
| **Backend** | Supabase | 2.50.0 |
| **State Management** | React Query | 5.56.2 |
| **Routing** | React Router | 6.26.2 |
| **Build Tool** | Vite | 5.4.1 |
| **Icons** | Lucide React | 0.462.0 |

## 🚀 Quick Start

### System Requirements

- **Node.js**: 18.0.0 or higher ([Download](https://nodejs.org/))
- **npm**: 8.0.0 or higher (comes with Node.js)
- **Git**: Latest version ([Download](https://git-scm.com/))

### Installation Guide

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-org/jai-dee.git
   cd jai-dee
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   ```bash
   # Copy environment template
   cp .env.example .env.local
   
   # Configure your environment variables
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

   🎉 Application will be available at `http://localhost:5173`

### Configuration Examples

**Supabase Setup**
```typescript
// src/integrations/supabase/client.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://your-project.supabase.co'
const supabaseAnonKey = 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

**Tailwind Custom Colors**
```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        'nature-green': '#2E7D32',
        'calm-blue': '#B3D9F2',
        'mint-green': '#D4F4E2',
        // ... more custom colors
      }
    }
  }
}
```

### Troubleshooting Common Issues

**Issue**: Build fails with TypeScript errors
```bash
# Solution: Check TypeScript configuration
npx tsc --noEmit
npm run build
```

**Issue**: Supabase connection fails
```bash
# Solution: Verify environment variables
echo $VITE_SUPABASE_URL
echo $VITE_SUPABASE_ANON_KEY
```

**Issue**: Font loading issues
```bash
# Solution: Check Google Fonts connectivity
curl -I https://fonts.googleapis.com/css2?family=Sarabun
```

## 🏗 Development

### Branch Strategy

We follow **Git Flow** with these main branches:

- `main` - Production-ready code
- `develop` - Integration branch for features
- `feature/*` - New feature development
- `hotfix/*` - Critical production fixes
- `release/*` - Release preparation

### Code Style Guide

**TypeScript Standards**
```typescript
// ✅ Good - Explicit types and interfaces
interface UserProfile {
  id: string;
  fullName: string;
  avatarUrl?: string;
}

// ❌ Bad - Implicit any types
const user = {}; // Type: any
```

**Component Structure**
```typescript
// ✅ Good - Consistent component structure
interface ComponentProps {
  title: string;
  isVisible?: boolean;
}

const Component: React.FC<ComponentProps> = ({ title, isVisible = true }) => {
  return (
    <div className="component-container">
      {isVisible && <h1>{title}</h1>}
    </div>
  );
};

export default Component;
```

**CSS Classes**
```css
/* ✅ Good - Semantic Tailwind classes */
.wellness-card {
  @apply bg-white rounded-xl shadow-lg p-6 border border-gray-100;
}

/* ❌ Bad - Inline styles */
style={{ backgroundColor: 'white', padding: '24px' }}
```

### Testing Requirements

**Unit Tests**
```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

**E2E Tests**
```bash
# Run Cypress tests
npm run test:e2e

# Open Cypress UI
npm run test:e2e:open
```

**Testing Standards**
- Minimum 80% code coverage
- All API endpoints must have integration tests
- Critical user flows require E2E tests
- Component tests for all UI components

### Pull Request Process

1. **Create Feature Branch**
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/your-feature-name
   ```

2. **Development Checklist**
   - [ ] Code follows style guidelines
   - [ ] Tests are written and passing
   - [ ] TypeScript compilation successful
   - [ ] No console errors or warnings
   - [ ] Accessibility guidelines followed
   - [ ] Mobile responsiveness verified

3. **Submit Pull Request**
   - Target: `develop` branch
   - Title: Clear, descriptive summary
   - Description: Link to issue, testing notes
   - Reviewers: Assign 2+ team members
   - Labels: Add appropriate labels

4. **Review Requirements**
   - Code review from 2+ developers
   - QA testing on staging environment
   - Performance benchmarks maintained
   - Security review for sensitive changes

## 🚀 Operations

### Deployment Checklist

**Pre-Deployment**
- [ ] All tests passing in CI/CD
- [ ] Database migrations applied
- [ ] Environment variables configured
- [ ] SSL certificates valid
- [ ] CDN cache invalidation prepared
- [ ] Rollback plan documented

**Deployment Steps**
```bash
# Build production version
npm run build

# Run production tests
npm run test:prod

# Deploy to staging
npm run deploy:staging

# Deploy to production
npm run deploy:prod
```

**Post-Deployment**
- [ ] Health checks passing
- [ ] Error monitoring active
- [ ] Performance metrics stable
- [ ] User acceptance testing
- [ ] Analytics tracking verified

### Monitoring Guidelines

**Application Health**
- Response time < 2 seconds
- Error rate < 1%
- Uptime > 99.9%
- Database performance metrics

**User Experience**
- Page load speed monitoring
- User session tracking
- Feature usage analytics
- Error boundary reporting

**Infrastructure**
- Server resource utilization
- Database connection pooling
- CDN performance metrics
- Security event monitoring

### Backup Procedures

**Database Backups**
```bash
# Daily automated backups via Supabase
# Manual backup command
npx supabase db dump --file=backup-$(date +%Y%m%d).sql
```

**Code Backups**
- Git repository mirroring
- Automated daily pushes to backup remote
- Tagged releases for major versions

**Recovery Testing**
- Monthly recovery drills
- Documented recovery procedures
- RTO: 4 hours, RPO: 1 hour

### Emergency Contacts

| Role | Contact | Availability |
|------|---------|--------------|
| **Lead Developer** | dev@jaidee.app | 24/7 |
| **DevOps Engineer** | ops@jaidee.app | Business hours |
| **Product Manager** | pm@jaidee.app | Business hours |
| **Security Team** | security@jaidee.app | 24/7 |
| **Supabase Support** | support@supabase.io | 24/7 |

**Incident Response**
1. Acknowledge incident within 15 minutes
2. Form incident response team
3. Communicate with stakeholders
4. Implement fix or rollback
5. Post-mortem within 48 hours

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

We welcome contributions! Please read our [Contributing Guidelines](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📞 Support

- **Documentation**: [docs.jaidee.app](https://docs.jaidee.app)
- **Issues**: [GitHub Issues](https://github.com/your-org/jai-dee/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-org/jai-dee/discussions)
- **Email**: support@jaidee.app

---

<div align="center">
  <strong>Built with ❤️ for the Thai mental wellness community</strong>
  <br>
  <em>Made with React, TypeScript, and Supabase</em>
</div>

---
*Last Updated: December 2024 | Version: 1.0.0*
