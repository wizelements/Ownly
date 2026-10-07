# Security Policy

## Scope

Ownly is a reusable SaaS foundation. This policy covers vulnerabilities in the starter repository itself; applications built from Ownly must define and operate their own production security program.

## Reporting a vulnerability

Do **not** open a public issue containing exploit details, secrets, personal data, or other sensitive evidence.

Preferred reporting paths:

1. Use GitHub's private security-advisory flow for this repository when available.
2. Otherwise email **contact@cod3blackagency.com** with `SECURITY — Ownly` in the subject.

Include the affected component, impact, reproduction steps, and the minimum safe evidence required to validate the report.

## Repository controls

The repository currently includes:

- a GitHub Actions CI workflow;
- a GitHub CodeQL workflow;
- environment-based secret configuration;
- Playwright/URL verification paths.

These controls do not prove that an application derived from Ownly is secure.

## Derived-application responsibilities

A production product built on Ownly should separately verify, as applicable:

- authentication and server-side authorization;
- tenancy/data isolation;
- secrets and key rotation;
- payment/webhook authenticity;
- input validation;
- database migration, backup, and restore behavior;
- dependency risk;
- logging/monitoring without sensitive-data leakage;
- HTTPS/cookie/session policy;
- incident and recovery procedures.

## Disclosure

Please allow maintainers to reproduce and address a verified issue before public disclosure. Priority and remediation timing depend on severity, exploitability, affected data/users, and production exposure.
