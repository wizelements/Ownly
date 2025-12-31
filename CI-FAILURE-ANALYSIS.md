# CI Failure Analysis — Full Diagnostic Report

**Date**: December 31, 2025  
**Run ID**: 20608953111  
**Commit**: 8ce22a1 (feat: sell-ready enhancements)

---

## Executive Summary

| Category | Errors | Warnings | Priority |
|----------|--------|----------|----------|
| **Lint (web)** | 22 | 3 | HIGH |
| **TypeCheck (api)** | 8 | 0 | CRITICAL |
| **TypeCheck (web)** | 0 | 0 | OK |

**Total Blocking Issues**: 30 errors across 2 jobs

---

## CATEGORY 1: LINT ERRORS (web)

### 1.1 Unescaped Entities (18 errors)
**Rule**: `react/no-unescaped-entities`
**Issue**: Single quotes `'` and double quotes `"` must be escaped in JSX

| File | Line | Character | Fix |
|------|------|-----------|-----|
| `app/page.tsx` | 40:19 | `'` | `&apos;` |
| `app/page.tsx` | 115:61 | `'` | `&apos;` |
| `app/page.tsx` | 116:20 | `'` | `&apos;` |
| `app/page.tsx` | 145:19 | `'` | `&apos;` |
| `app/page.tsx` | 145:31 | `'` | `&apos;` |
| `app/page.tsx` | 171:58 | `'` | `&apos;` |
| `app/page.tsx` | 172:21 | `'` | `&apos;` |
| `app/page.tsx` | 207:50 | `'` | `&apos;` |
| `app/page.tsx` | 218:21 | `'` | `&apos;` |
| `app/page.tsx` | 221:64 | `'` | `&apos;` |
| `app/page.tsx` | 388:24 | `'` | `&apos;` |
| `app/page.tsx` | 389:24 | `'` | `&apos;` |
| `app/page.tsx` | 390:24 | `'` | `&apos;` |
| `app/page.tsx` | 402:24 | `'` | `&apos;` |
| `app/page.tsx` | 404:24 | `'` | `&apos;` |
| `app/page.tsx` | 502:35 | `"` | `&quot;` |
| `app/page.tsx` | 502:43 | `"` | `&quot;` |
| `app/dashboard/page.tsx` | 173:43 | `'` | `&apos;` |

### 1.2 Unused Imports (1 error)
**Rule**: `@typescript-eslint/no-unused-vars`
**Issue**: Imported `Users` from lucide-react but never used

| File | Line | Fix |
|------|------|-----|
| `app/page.tsx` | 19:3 | Remove `Users` from import |

### 1.3 React Hooks Rules Violation (2 errors)
**Rule**: `react-hooks/rules-of-hooks`
**Issue**: Hooks called conditionally (after early return)

| File | Line | Hook | Fix |
|------|------|------|-----|
| `lib/auth.ts` | 17 | `useUser` | Restructure to avoid conditional hook calls |
| `lib/auth.ts` | 34 | `useAuth` | Restructure to avoid conditional hook calls |

### 1.4 Warnings (non-blocking)
**Rule**: `@typescript-eslint/no-explicit-any`

| File | Line | Note |
|------|------|------|
| `app/dashboard/page.tsx` | 134:64 | `any` type used |
| `app/dashboard/page.tsx` | 209:49 | `any` type used |
| `lib/trpc.ts` | 26:40 | `any` type used |

---

## CATEGORY 2: TYPECHECK ERRORS (api)

### 2.1 Missing Base Config (1 error)
```
error TS5083: Cannot read file '/home/runner/work/Ownly/Ownly/tsconfig.base.json'.
```
**Fix**: Create `tsconfig.base.json` in root OR update `apps/api/tsconfig.json` to remove extends

### 2.2 Clerk VerifyToken Options (1 error)
```
src/context.ts(17,48): error TS2345: Argument of type '{ secretKey: string; }' is not assignable to parameter of type 'VerifyTokenOptions'.
Property 'issuer' is missing in type '{ secretKey: string; }'
```
**Fix**: Add `issuer` property to Clerk verifyToken call

### 2.3 Missing Database Exports (3 errors)
```
src/routers/business.ts(4,10): error TS2305: Module '"@ownly/database"' has no exported member 'USState'.
src/routers/business.ts(4,19): error TS2305: Module '"@ownly/database"' has no exported member 'BusinessType'.
src/routers/business.ts(4,33): error TS2305: Module '"@ownly/database"' has no exported member 'Plan'.
```
**Fix**: Export these enums from `packages/database/index.ts`

### 2.4 Implicit Any Parameters (2 errors)
```
src/routers/business.ts(248,36): error TS7006: Parameter 'i' implicitly has an 'any' type.
src/routers/business.ts(249,36): error TS7006: Parameter 'f' implicitly has an 'any' type.
```
**Fix**: Add explicit types to lambda parameters

### 2.5 Missing Module (1 error)
```
src/trpc.ts(2,23): error TS2307: Cannot find module 'superjson' or its corresponding type declarations.
```
**Fix**: Install `superjson` in `apps/api` package

### 2.6 Prisma Client Not Generated (1 error)
```
../../packages/database/index.ts(1,10): error TS2305: Module '"@prisma/client"' has no exported member 'PrismaClient'.
```
**Fix**: Add `prisma generate` to CI pipeline before type-check

---

## FIX PLAN

### Phase 1: Critical Fixes (TypeCheck - api)

| ID | Task | File | Effort |
|----|------|------|--------|
| T1 | Create `tsconfig.base.json` | `/tsconfig.base.json` | 5min |
| T2 | Fix Clerk verifyToken options | `apps/api/src/context.ts` | 5min |
| T3 | Export enums from database package | `packages/database/index.ts` | 5min |
| T4 | Add types to lambda params | `apps/api/src/routers/business.ts` | 5min |
| T5 | Install superjson | `apps/api/package.json` | 2min |
| T6 | Add prisma generate to CI | `.github/workflows/ci.yml` | 5min |

### Phase 2: Lint Fixes (web)

| ID | Task | File | Effort |
|----|------|------|--------|
| L1 | Remove unused `Users` import | `apps/web/app/page.tsx` | 1min |
| L2 | Escape all single quotes | `apps/web/app/page.tsx` | 10min |
| L3 | Escape quote in dashboard | `apps/web/app/dashboard/page.tsx` | 1min |
| L4 | Fix conditional hooks | `apps/web/lib/auth.ts` | 10min |

### Phase 3: Warnings (Optional)

| ID | Task | File | Effort |
|----|------|------|--------|
| W1 | Replace `any` with proper types | Multiple files | 15min |

---

## EXECUTION ORDER

```bash
# 1. Fix TypeCheck errors first (blocking)
# 2. Fix Lint errors second (blocking)
# 3. Fix warnings last (non-blocking)

# Total estimated time: 45 minutes
```

---

## Files to Modify

1. `/tsconfig.base.json` — CREATE
2. `apps/api/src/context.ts` — MODIFY
3. `packages/database/index.ts` — MODIFY
4. `apps/api/src/routers/business.ts` — MODIFY
5. `apps/api/package.json` — MODIFY (add superjson)
6. `.github/workflows/ci.yml` — MODIFY (add prisma generate)
7. `apps/web/app/page.tsx` — MODIFY (lint fixes)
8. `apps/web/app/dashboard/page.tsx` — MODIFY (lint fix)
9. `apps/web/lib/auth.ts` — MODIFY (hooks fix)

---

*Analysis complete. Ready for fix implementation.*
