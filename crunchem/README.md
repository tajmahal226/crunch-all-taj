# Gotta Crunch Them All

**Crush every calculation** - A comprehensive calculator platform with 120+ tools across 15 categories from calculus to cooking.

## 🚀 Features

- **120+ Calculators**: From basic arithmetic to advanced engineering calculations
- **15 Categories**: Including Mathematics, Physics, Finance, Cooking, Sports, and more
- **AI-Powered Tutor**: Get help with complex calculations and concepts
- **Clean Design**: Simple, intuitive interface that doesn't sacrifice functionality
- **Mobile Responsive**: Works seamlessly on all devices

## 🛠️ Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Backend**: Supabase (Edge Functions)
- **AI Integration**: OpenAI + Gemini APIs
- **Deployment**: Minimax.io

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/gotta-crunch-them-all.git crunchem
cd crunchem
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
# Add your Supabase and API keys
```

4. Start the development server:
```bash
pnpm dev
```

## 🚢 Deploying to Vercel

This project includes a `vercel.json` configuration so it can be deployed as a static Vite site on [Vercel](https://vercel.com/):

1. Ensure your dependencies are installed locally and all tests pass:
   ```bash
   pnpm install
   pnpm run build
   ```
2. Commit your changes and push the repository to GitHub.
3. In the Vercel dashboard, create a new project and import this repository.
4. When prompted, use the default **Root Directory** (`.`) and keep the Build and Output settings from `vercel.json` (`pnpm run build` and `dist`).
5. Add any required environment variables under **Settings → Environment Variables**.
6. Deploy the project. Subsequent pushes to the default branch will automatically trigger new deployments.

## 🏗️ Project Structure

```
src/
├── components/     # React components
├── data/          # Calculator definitions
├── contexts/      # React contexts
├── hooks/         # Custom hooks
├── lib/           # Utilities and configurations
└── types/         # TypeScript type definitions
```

## 🧮 Calculator Categories

- **Mathematics**: Basic arithmetic, algebra, calculus
- **Physics**: Mechanics, thermodynamics, electromagnetics
- **Chemistry**: Molecular calculations, stoichiometry
- **Finance**: Loans, investments, taxes
- **Engineering**: Structural, electrical, mechanical
- **Health & Fitness**: BMI, calories, workout planning
- **Cooking**: Unit conversions, recipe scaling
- **Sports**: Performance metrics, statistics
- **And more!**

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🌟 Live Demo

Visit the live application: [Gotta Crunch Them All](https://your-deployment-url.com)