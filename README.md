# Decision Maker

- Frontend GitHub Repository: [<your-github-repo-url>](your-github-repo-url)https://github.com/Bisheshxx/Decision-Maker-Frontend
- Backend GitHub Repository: [<your-github-repo-url>](your-github-repo-url)https://github.com/Bisheshxx/Decision-Maker
- Live Demo: [<your-deployed-url>](your-deployed-url)https://decision-maker-project.vercel.app/

![Decision Maker logo](public/Banner.jpeg)

Decision Maker is a web application that helps users make choices faster when they are stuck between multiple options. The app lets each user create decisions, add possible options, and spin a visual selector that randomly lands on one choice.

## What It Does

The app is built around a simple flow: sign in, create a decision, add options, and let the app pick one for you. It also includes a dashboard for managing saved decisions and a profile area for updating account details.

## Features

### Authentication

Users can register, log in, and confirm their email before using the app. Each account keeps its own decisions, so the experience stays private and personal.

### Decision Dashboard

After login, users land on a dashboard where they can browse all saved decisions. The dashboard supports search and pagination so it stays usable even with a long list of decisions.

### Create Decisions

Users can create a new decision by providing a title and description. This gives context for the choice they are trying to make.

### Decision Detail Page

Each decision has its own detail page where users can view the decision, edit the title and description inline, see creation and update timestamps, and manage the decision.

### Add and Manage Options

Users can add multiple options to a decision. These are the possible outcomes the app will spin through when choosing a result.

### Spin-to-Choose Interaction

The main interaction in the app is a spinning selector. It animates through the available options and stops on one randomly, turning indecision into a clear result.

### Delete Decisions

Users can remove decisions they no longer need from the detail page.

### Profile Management

The profile page lets users update personal information and profile details.

### Password Update

Users can also change their password from the profile area.

### Responsive UI

The interface adapts to desktop and mobile screens, including the decision spinner and dashboard layout.

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- React Hook Form
- Zod
- TanStack Query
- Zustand
- Sonner
- Lucide React

## Getting Started

### Prerequisites

- Node.js
- pnpm

### Install Dependencies

```bash
pnpm install
```

### Run Locally

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
pnpm build
```

### Start the Production Server

```bash
pnpm start
```

### Lint the Codebase

```bash
pnpm lint
```

## Routes

- `/login` for authentication
- `/register` for new account creation
- `/dashboard` for the main decision list
- `/decision/[id]` for decision details and spinning
- `/profile` for account settings

## User Flow

1. Create an account or log in.
2. Create a new decision.
3. Add the options you are choosing between.
4. Spin the selector to pick one option.
5. Return later to review, edit, or delete the decision.

## Notes

The homepage redirects authenticated users to the dashboard, so the app is designed to be used primarily after sign-in.
