# NDIS Service Management Platform

A React + TypeScript application connecting people with disabilities to high-quality service providers. This platform streamlines service agreement management, with planned features for shift tracking and invoicing.

## Overview

This application facilitates the connection between NDIS participants (customers) and registered service providers, managing the full lifecycle of service agreements including terms, schedules, and compliance documentation.

## Tech Stack

- **React** with TypeScript for type-safe component development
- **Vite** for fast development and optimized production builds
- **Firebase** for authentication and data persistence
- **Chakra UI** for accessible, consistent UI components

## Core Type System

The application is built around a comprehensive TypeScript type system defined in `src/AppTypes.ts`, ensuring type safety and data consistency across the platform.

### User & Profile Types

**AppUser**: Firebase-authenticated user with personal identifier

```typescript
AppUser = FirebaseUser & { pid: string; emailVerified: boolean }
```

**UserProfile**: Basic user information

- PID (Personal Identifier)
- First/Last name and PreferredName

**CustomerProfile**: NDIS participant profile

- NDIS Number for service eligibility
- PlanManager details for funding coordination
- Contact information (Address, Phone)

**ProviderProfile**: Service provider business profile

- ABN (Australian Business Number)
- Business Name and contact details
- Physical Address

### Service Agreement Types

**Product**: NDIS service line items

- Name and Code (aligned with NDIS pricing)
- MaxPrice (NDIS price guide limit)

**Service**: Delivered service instance

- Links Provider to Product
- Actual Price (may be below MaxPrice)

**ServiceSchedule**: Recurring service delivery plan

- Service details (what, who, how much)
- Units and Frequency
- Period ('Daily' | 'Weekly' | 'Monthly')
- Start and End dates

**ServiceAgreement**: Complete service contract

- Customer and Provider profiles
- Array of ServiceSchedule items
- Terms and Conditions
- Digital signatures (Provider and Customer)
- Tracking status (IsSent)

### Supporting Types

**Address**: Standardized address structure

- Number, Street, City, Postcode

**PlanManager**: NDIS plan manager details

- Contact information
- Dedicated invoices email
- Physical address

**TermsAndConditions**: Legal agreement sections

- Heading and Paragraph content
- Structured as arrays for flexible agreement composition

## Project Structure

```
src/
├── AppTypes.ts           # Core type definitions
├── components/
│   ├── Claims.tsx        # User claims management
│   ├── LoginForm.tsx     # Authentication
│   ├── SignupForm.tsx    # User registration
│   └── ui/               # Reusable UI components
├── context/
│   └── AuthContext.tsx   # Firebase authentication state
├── lib/
│   └── firebase.ts       # Firebase configuration
└── pages/
    └── Home.tsx          # Main landing page
```

## Future Roadmap

1. **Shift Tracking**: Log and verify service delivery
2. **Invoicing**: Generate NDIS-compliant invoices from service schedules
3. **Reporting**: Service utilization and budget tracking
4. **Compliance**: Document management and audit trails

## Development

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

## Firebase Functions (Apollo GraphQL)

- Function name: `graphql` (Firebase HTTPS function)
- Stack: Apollo Server v4 on Express 4, exposed via `/graphql`
- Health: GET `/` on the function returns status and endpoint metadata

### Run emulators (functions + hosting)

```bash
cd functions
npm run build
cd ..
firebase emulators:start --only functions,hosting
```

### Test endpoints

- Direct (Functions emulator):

  ```bash
  curl -X POST http://127.0.0.1:5001/circle-ced55/us-central1/graphql \
      -H "Content-Type: application/json" \
      -d '{"query":"{ hello }"}'
  ```

  Expected: `{"data":{"hello":"Hello from Firebase + Apollo (working!)"}}`

- Hosting rewrite (if enabled at `/api/graphql` in firebase.json):

  ```bash
  curl -X POST http://127.0.0.1:5022/api/graphql \
      -H "Content-Type: application/json" \
      -d '{"query":"{ hello }"}'
  ```

- Browser playground: http://127.0.0.1:5001/circle-ced55/us-central1/graphql and run `query { hello }`
