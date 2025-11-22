# Task Management AI

A modern, AI-powered task management application built with Next.js, featuring intelligent task suggestions, automated summaries, and an intuitive user interface.

## 🚀 Features

### Core Functionality
- **Task Management**: Create, update, and delete tasks with ease
- **Status Workflow**: Cycle through task statuses (TODO → IN_PROGRESS → DONE)
- **Due Date Management**: Set and update due dates with visual indicators
- **Task Sorting**: Automatic sorting by due date priority
- **Bulk Operations**: Delete all completed tasks with a single action

### AI-Powered Features
- **Intelligent Suggestions**: Real-time AI-generated task suggestions as you type
- **AI Task Descriptions**: Automatically generated detailed descriptions for tasks
- **Daily Digest Summary**: Get AI-powered summaries of your tasks, priorities, and recommendations

### User Experience
- **Modern UI**: Built with HeroUI components and Tailwind CSS
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Updates**: Instant UI updates with optimized state management
- **Visual Indicators**: Color-coded status chips and due date badges

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **UI Library**: [HeroUI](https://heroui.com/) (React component library)
- **Styling**: Tailwind CSS 4
- **AI Integration**: OpenAI GPT-4
- **State Management**: React Context API with custom hooks
- **Date Handling**: @internationalized/date
- **Animations**: Framer Motion

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.x or higher
- **npm**, **yarn**, **pnpm**, or **bun** package manager
- **OpenAI API Key** (for AI features)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd task-management-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # OpenAI API Configuration
   OPENAI_API_KEY=your_openai_api_key_here
   
   # Backend API URL (optional, defaults to http://localhost:3001)
   API_URL=http://localhost:3001
   NEXT_PUBLIC_API_URL=http://localhost:3001
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
task-management-frontend/
├── app/
│   ├── api/
│   │   └── ai/
│   │       └── digest/          # AI digest summary endpoint
│   ├── tasks/
│   │   ├── api/                 # Task API client
│   │   ├── components/          # Task-related components
│   │   ├── hooks/               # Custom React hooks
│   │   ├── types/               # TypeScript type definitions
│   │   └── page.tsx             # Tasks page
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Home page
├── components/                   # Shared UI components
├── env.local.ts                 # Environment configuration
└── package.json
```

## 📖 Usage

### Creating a Task

1. Navigate to the Tasks page
2. Enter a task title in the "New task" field
3. (Optional) Add a due date using the date picker
4. (Optional) Review and edit the AI-generated description
5. Click "+ New" to create the task

### Managing Tasks

- **Update Status**: Click the "Next" button to cycle through statuses
- **Change Due Date**: Use the date picker to update the due date
- **Delete Task**: Click the "Delete" button to remove a task
- **Delete Completed**: Use "Delete completed" to remove all DONE tasks

### AI Features

- **Task Suggestions**: Start typing a task title to see AI-generated suggestions appear in the placeholder
- **AI Descriptions**: The description field automatically populates with AI-generated content
- **Daily Digest**: Click "Resumen IA del día" to generate an AI-powered summary of your tasks

## 🔌 API Endpoints

### Task Management API

The application expects a backend API at the URL specified in `API_URL`. The following endpoints are used:

- `GET /tasks` - Fetch all tasks
- `POST /tasks` - Create a new task
- `PUT /tasks/:id` - Update a task
- `DELETE /tasks/:id` - Delete a task
- `PUT /tasks/:id/cycle` - Cycle task status
- `PUT /tasks/:id/due` - Update task due date
- `DELETE /tasks?status=STATUS` - Delete tasks by status
- `POST /suggestions` - Get AI task suggestions

### AI API

- `POST /api/ai/digest` - Generate AI digest summary

## 🎨 Customization

### Styling

The application uses Tailwind CSS for styling. Customize the theme by modifying:
- `app/globals.css` - Global styles and CSS variables
- Component-level Tailwind classes

### Components

Reusable components are located in the `components/` directory:
- `Button.tsx` - Custom button component
- `Input.tsx` - Input field wrapper
- `Nav.tsx` - Navigation component
- `Providers.tsx` - React context providers

## 🧪 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Style

- TypeScript strict mode enabled
- ESLint configuration for Next.js
- Component-based architecture
- Custom hooks for state management

## 🔒 Security

- Environment variables are used for sensitive data (API keys)
- `.env.local` is gitignored to prevent committing secrets
- API keys are never exposed to the client-side code
- Server-side API routes handle sensitive operations

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy automatically on every push

### Other Platforms

The application can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Docker containers

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is private and proprietary.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [HeroUI](https://heroui.com/) for the beautiful component library
- [OpenAI](https://openai.com/) for AI capabilities
- [Vercel](https://vercel.com/) for deployment platform

---

Built with ❤️ using Next.js and AI
