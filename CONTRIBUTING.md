# Contributing to Ownly

Thank you for your interest in contributing to Ownly! We're building the best platform for entrepreneurs, and we'd love your help.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Process](#development-process)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Documentation](#documentation)
- [Community](#community)

## Code of Conduct

### Our Pledge

We pledge to make participation in our project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Our Standards

**Positive behavior includes:**
- Using welcoming and inclusive language
- Being respectful of differing viewpoints
- Gracefully accepting constructive criticism
- Focusing on what's best for the community
- Showing empathy towards other community members

**Unacceptable behavior includes:**
- Trolling, insulting/derogatory comments, and personal attacks
- Public or private harassment
- Publishing others' private information without permission
- Other conduct which could reasonably be considered inappropriate

## Getting Started

### Prerequisites

1. Read our [Getting Started Guide](./docs/GETTING_STARTED.md)
2. Set up your local development environment
3. Join our [Discord community](https://discord.gg/ownly)

### First-Time Contributors

Look for issues labeled `good first issue` or `help wanted`:
- [Good First Issues](https://github.com/yourusername/ownly/labels/good%20first%20issue)
- [Help Wanted](https://github.com/yourusername/ownly/labels/help%20wanted)

## Development Process

### 1. Fork the Repository

```bash
# Fork on GitHub, then clone your fork
git clone https://github.com/YOUR_USERNAME/ownly.git
cd ownly

# Add upstream remote
git remote add upstream https://github.com/yourusername/ownly.git
```

### 2. Create a Branch

```bash
# Get latest code
git checkout main
git pull upstream main

# Create feature branch
git checkout -b feature/your-feature-name

# Or for bug fixes
git checkout -b fix/bug-description
```

**Branch naming convention:**
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation changes
- `refactor/` - Code refactoring
- `test/` - Adding/updating tests
- `chore/` - Maintenance tasks

### 3. Make Changes

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Make your changes...
```

### 4. Write Tests

All new features and bug fixes must include tests:

```bash
# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Check coverage
pnpm test:coverage
```

### 5. Commit Your Changes

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Format
<type>(<scope>): <description>

# Examples
git commit -m "feat(auth): add passkey authentication"
git commit -m "fix(invoice): correct tax calculation"
git commit -m "docs(api): update tRPC router documentation"
```

**Commit types:**
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation only
- `style` - Code style (formatting, missing semicolons, etc.)
- `refactor` - Code refactoring
- `perf` - Performance improvement
- `test` - Adding/updating tests
- `chore` - Maintenance tasks
- `ci` - CI/CD changes

### 6. Push and Create Pull Request

```bash
# Push to your fork
git push origin feature/your-feature-name

# Create pull request on GitHub
```

## Pull Request Process

### PR Checklist

Before submitting, ensure:

- [ ] Code follows our style guide
- [ ] All tests pass (`pnpm test`)
- [ ] Linting passes (`pnpm lint`)
- [ ] Type checking passes (`pnpm type-check`)
- [ ] New tests are added for new features
- [ ] Documentation is updated
- [ ] Commit messages follow convention
- [ ] PR description is clear and complete

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How has this been tested?

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] My code follows the style guidelines
- [ ] I have performed a self-review
- [ ] I have commented my code where needed
- [ ] I have updated the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests
- [ ] All tests pass
```

### Review Process

1. **Automated checks** - CI/CD must pass
2. **Code review** - At least one approval required
3. **Product review** - For user-facing changes
4. **Merge** - Squash and merge by maintainer

**Review timeline:**
- Initial review: Within 2 business days
- Follow-up: Within 1 business day
- Merge: Once approved and CI passes

## Coding Standards

### TypeScript

```typescript
// ✅ Good
interface User {
  id: string
  email: string
  createdAt: Date
}

function getUser(id: string): Promise<User | null> {
  return prisma.user.findUnique({ where: { id } })
}

// ❌ Bad
function getUser(id: any) {
  return prisma.user.findUnique({ where: { id } })
}
```

### React Components

```tsx
// ✅ Good - Functional component with proper types
interface ButtonProps {
  onClick: () => void
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
}

export function Button({ onClick, children, variant = 'primary' }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn('button', `button-${variant}`)}
    >
      {children}
    </button>
  )
}

// ❌ Bad - No types, unclear props
export function Button(props) {
  return <button onClick={props.onClick}>{props.children}</button>
}
```

### Naming Conventions

```typescript
// Components: PascalCase
export function UserProfile() {}

// Functions: camelCase
function calculateTax() {}

// Constants: UPPER_SNAKE_CASE
const MAX_RETRIES = 3

// Interfaces/Types: PascalCase
interface UserProfile {}
type PaymentStatus = 'pending' | 'completed'

// Files:
// - Components: PascalCase (UserProfile.tsx)
// - Utils: camelCase (calculateTax.ts)
// - Hooks: camelCase with 'use' prefix (useAuth.ts)
```

### Code Organization

```typescript
// ✅ Good - Clear structure
import { useState, useEffect } from 'react'
import { type User } from '@/types'
import { api } from '@/lib/api'
import { Button } from '@/components/ui/button'

export function UserList() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUsers()
  }, [])

  async function fetchUsers() {
    setLoading(true)
    const data = await api.users.list()
    setUsers(data)
    setLoading(false)
  }

  if (loading) return <div>Loading...</div>

  return (
    <div>
      {users.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  )
}
```

### Error Handling

```typescript
// ✅ Good - Proper error handling
try {
  const result = await api.createLLC(data)
  toast.success('LLC created successfully')
  return result
} catch (error) {
  if (error instanceof ValidationError) {
    toast.error(error.message)
  } else {
    toast.error('An unexpected error occurred')
    console.error('LLC creation failed:', error)
  }
  throw error
}

// ❌ Bad - Silent failures
try {
  await api.createLLC(data)
} catch {}
```

## Testing Guidelines

### Unit Tests

```typescript
import { describe, it, expect } from 'vitest'
import { calculateTax } from './tax'

describe('calculateTax', () => {
  it('should calculate correct tax for income', () => {
    expect(calculateTax(100000)).toBe(24000)
  })

  it('should handle zero income', () => {
    expect(calculateTax(0)).toBe(0)
  })

  it('should throw for negative income', () => {
    expect(() => calculateTax(-1000)).toThrow()
  })
})
```

### Integration Tests

```typescript
import { describe, it, expect } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { UserProfile } from './UserProfile'

describe('UserProfile', () => {
  it('should display user information', async () => {
    render(<UserProfile userId="123" />)
    
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument()
    })
  })

  it('should handle loading state', () => {
    render(<UserProfile userId="123" />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })
})
```

### E2E Tests

```typescript
import { test, expect } from '@playwright/test'

test('complete LLC formation flow', async ({ page }) => {
  await page.goto('http://localhost:3000')
  
  // Click "Get Started"
  await page.click('text=Get Started')
  
  // Fill formation quiz
  await page.fill('[name="companyName"]', 'Test LLC')
  await page.selectOption('[name="state"]', 'DE')
  
  // Submit form
  await page.click('button:has-text("Continue")')
  
  // Verify success
  await expect(page.locator('text=LLC formation in progress')).toBeVisible()
})
```

### Test Coverage Requirements

- **New features**: Minimum 80% coverage
- **Bug fixes**: Must include regression test
- **Critical paths**: 100% coverage

## Documentation

### Code Comments

```typescript
// ✅ Good - Explains why, not what
// Cache user data to reduce database queries
const userCache = new Map<string, User>()

// Calculate quarterly tax estimate based on IRS guidelines
// https://www.irs.gov/forms-pubs/about-form-1040-es
function calculateQuarterlyTax(income: number): number {
  // Implementation...
}

// ❌ Bad - States the obvious
// Increment counter by 1
counter += 1
```

### JSDoc for Public APIs

```typescript
/**
 * Creates a new LLC in the specified state
 * 
 * @param data - LLC formation data
 * @param data.name - Company name
 * @param data.state - US state code (e.g., 'DE', 'WY')
 * @returns Promise resolving to the created LLC
 * @throws {ValidationError} If data is invalid
 * @throws {StateError} If state is not supported
 * 
 * @example
 * ```ts
 * const llc = await createLLC({
 *   name: 'My Company LLC',
 *   state: 'DE'
 * })
 * ```
 */
export async function createLLC(data: LLCFormData): Promise<LLC> {
  // Implementation...
}
```

### README Updates

When adding a new package or major feature:

1. Update main README.md
2. Add package-specific README
3. Update docs/ folder
4. Add examples if applicable

## Community

### Getting Help

- **Discord**: [Join our server](https://discord.gg/ownly)
- **GitHub Discussions**: For questions and ideas
- **GitHub Issues**: For bugs and feature requests
- **Email**: dev@ownly.com

### Ways to Contribute

Beyond code:
- 📝 Improve documentation
- 🐛 Report bugs
- 💡 Suggest features
- 🎨 Design improvements
- 🌍 Translations
- 📹 Create tutorials
- 💬 Help others in Discord

## Recognition

Contributors are recognized in:
- CONTRIBUTORS.md file
- Release notes
- Social media shoutouts
- Swag for significant contributions

## Questions?

Feel free to ask questions:
- Open a GitHub Discussion
- Ask in #dev-questions on Discord
- Email dev@ownly.com

---

**Thank you for contributing to Ownly!** Together, we're helping millions of people become their own boss.
