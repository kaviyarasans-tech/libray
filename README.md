# LibraDesk — Library Management System

A front-end Web Technology micro project for course 25CS208. Built with HTML5, CSS3 and vanilla JavaScript.

## Run locally
1. Extract the ZIP file.
2. Open the `Library_Management_System` folder in VS Code.
3. Open `index.html` in a browser (or use the VS Code Live Server extension).
4. Use **Sign Up** to create a demo account, then sign in.
5. Open the dashboard to add, search, issue and return books.

## Demo behaviour and important limitation
This is a browser-only academic prototype. Accounts, books and theme preference are stored in `window.localStorage` on the current browser. It has no server, database, secure authentication, multi-user synchronisation or real library circulation backend. Do not use real passwords or confidential personal information.

## File structure
- `index.html` — FR-01 landing page
- `register.html` — FR-02 member registration and detailed validation
- `signup.html` — FR-03 sign-up with Terms of Service checkbox
- `signin.html` — FR-04 sign-in and show/hide password
- `home.html` — FR-05 dashboard, catalogue and responsive layout
- `chatbot.js` — FR-06 keyword-based assistant
- `theme.js` — FR-07 persistent light/dark theme and mobile navigation
- `calculator.js` — FR-08 calculator
- `library.js` — add/search/issue/return book functionality
- `styles.css`, `layout.css` — shared styling and responsive layouts
- `validation.js`, `auth.js` — registration and account demo logic

## Checklist traceability
| Checklist item | Implementation |
|---|---|
| FR-01 Landing page | `index.html`, navigation, hero, feature cards and outline |
| FR-02 Registration | `register.html`, `validation.js`; blur + submit regex checks, inline errors, invalid styles, disabled submit |
| FR-03 Sign-up | `signup.html`, `auth.js`; email/password and consent |
| FR-04 Sign-in | `signin.html`, `auth.js`; password visibility toggle and format/credential alert |
| FR-05 Dashboard | `home.html`, `styles.css`, `layout.css`; desktop 250px/1fr/300px grid and mobile flex/hamburger |
| FR-06 Chatbot | `chatbot.js`; fixed FAB, chat panel, user/bot nodes, keyword replies and auto-scroll |
| FR-07 Theme | `theme.js`, CSS variables; localStorage persistence |
| FR-08 Calculator | `calculator.js`, calculator panel in `home.html`; digits/operators/C/= and error handling |
| Book management | `library.js`; book details, add, search, issue and return status |

## GitHub and Vercel submission
The checklist also requires GitHub version control and Vercel HTTPS deployment. These are external publishing steps, not completed by the source code ZIP.
1. Create a GitHub repository and upload the extracted project files.
2. In Vercel, choose **Add New → Project**, import the GitHub repository, and deploy with the default static settings.
3. Test the generated `.vercel.app` URL on desktop and mobile.
4. Capture screenshots for the report and presentation.

## Before submission
The provided checklist also asks for a 20+ page A4 report, signed certificate/declaration, screenshots, GitHub/Vercel proof, QR codes, Google Form submission, printouts and a 5-minute presentation video. Complete those with your actual student/team/supervisor details and institution's official templates.
