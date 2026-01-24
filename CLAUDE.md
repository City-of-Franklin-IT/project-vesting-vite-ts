# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Standards

Follow the coding standards and conventions documented in `/opt/claude-standards`.

## Project Overview

React application built with Vite and TypeScript for managing project vesting lifecycles used by the City of Franklin Planning department. Tracks projects through milestones, vesting periods, approvals, resolutions, and notifications.

**Production URL**: https://dev.franklintn.gov/vesting
**API**: https://dev.franklintn.gov/api/v2/eng
**Database**: [COFDBV08].[project_vesting]

## Development Commands

```bash
# Start development server on port 6000
npm run dev

# Build for production (runs TypeScript compilation + Vite build)
npm run build

# Deploy to server
npm run deploy

# Lint TypeScript/TSX files
npm run lint

# Run tests with Vitest
npm run test

# Preview production build
npm run preview
```

## Architecture

### Authentication Flow
- Uses Azure MSAL (`@azure/msal-react`) for SSO authentication
- Token management handled by `useGetToken` hook in `src/helpers/hooks.ts`
- Development mode bypasses auth with mock token (NODE_ENV in `src/config/index.ts`)
- Active account tokens are validated and refreshed every 4 minutes
- Auth config in `src/context/Auth/config.ts` with Azure AD settings

### Data Flow & State Management
- TanStack Query v5 (`@tanstack/react-query`) for server state and caching
- All API calls in `src/context/AppActions.ts` follow consistent pattern:
  - Accept form data and auth headers
  - Return typed `ServerResponse` with optional data payload
- `useEnableQuery` hook delays query execution until token is available
- Forms use `react-hook-form` with `useFormContext` for nested form state
- Query hooks use object syntax: `useQuery({ queryKey: [...], queryFn: ... })`
- Query invalidation uses object syntax: `invalidateQueries({ queryKey: [...] })`

### Component Organization Pattern
Components follow a consistent file structure pattern:
```
ComponentName/
  ├── index.tsx          # Main component export
  ├── components.tsx     # Sub-components
  ├── hooks.ts          # Component-specific hooks
  └── utils.ts          # Component utilities
```

### Project Types
The application manages three project types with distinct forms:
1. **Site Plan** - `CreateSitePlanForm` / `UpdateSitePlanForm`
2. **Development Plan** - `CreateDevelopmentPlanForm` / `UpdateDevelopmentPlanForm`
3. **Preliminary Plat** - `CreatePreliminaryPlatForm` / `UpdatePreliminaryPlatForm`

Each project type has create and update variants with shared logic in `utils.ts` files.

### Key Data Entities
All entities use UUIDs for identification:
- **Projects** - Parent entity with type, address, zoning ordinance
- **Milestones** - Project checkpoints with status (achieved/expired)
- **MilestoneExtensions** - Extensions for milestone #1 (triggers 2-year extension for milestone #2)
- **VestingPeriods** - Time periods with status tracking
- **VestingExtensions** - Extensions to vesting periods
- **Approvals** - Project approval records with BOMA/site plan approval dates
- **Resolutions** - Resolution tracking
- **Notifications** - Project notifications with recipients

### Special Business Logic
- **Project Expiration** (`useExpireProject` hook): When project is marked expired, all non-achieved milestones and vesting periods are automatically expired
- **Milestone #1 Extension** (`useMilestoneExt` hook): Extending milestone #1 automatically adds 2 years to milestone #2 date
- **Disabled State Handling** (`useProjectCreateCtx`): Form fields are disabled when project is expired

### Path Aliases
Configured in both `tsconfig.json` and `vite.config.ts`:
- `@/*` → `src/*`
- `@components/*` → `src/components/*`
- `@config/*` → `src/config/*`
- `@context/*` → `src/context/*`
- `@helpers/*` → `src/helpers/*`
- `@pages/*` → `src/pages/*`
- `@utils/*` → `src/utils/*`
- `@assets/*` → `src/assets/*`

### Styling
- Tailwind CSS v4 with DaisyUI components
- Custom animations in `src/animations.css`
- Component-specific CSS modules (e.g., `Error.module.css`)

### Testing
- Vitest for unit tests with jsdom environment
- React Testing Library for component tests
- Setup file: `src/test/setup.ts` (configures jest-dom)
- Test mocks in `src/test/mocks/`
- Run individual tests: `npm run test -- path/to/test.test.tsx`

### Routing
React Router v7 with base path `/vesting`:
- `/` - Login page (MSAL authentication)
- `/projects` - Project list with table, search, filtering
- `/create` - Create new project (selects project type)
- `/update/:uuid` - Update existing project
- `/*` - Redirect handler

### Error Handling
- `ErrorBoundary` component wraps app sections
- `ErrorHandler` utility in `src/utils/ErrorHandler/`
- Toast notifications via `react-toastify`
- Loading states managed by `HandleLoading` utility

## User Preference
Props should be written inline rather than each on a new line.
