# debt-collector

A nodejs util to identify, track and mesure technical debt in a project.

Note that debt-collector is an alpha version and you should consider that bugs may occur and API may change without warnings.
As debt-collector is a tool that does not interfere with your code base, even buggy, it is relatively safe to use.
Considering the previous informations, we recomend to install a fixed version of debt-collector as of now.

## Developer Documentation

### Prerequisites

- Node.js >= 18
- pnpm (recommended) or npm
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/gael-boyenval/debt-collector.git
cd debt-collector
```

2. Install dependencies:
```bash
pnpm install
```

### Development Setup

1. Build the project:
```bash
pnpm build
```

2. For development with watch mode:
```bash
pnpm dev
```

### Testing

The project uses Vitest for testing. Available test commands:

- Run tests once:
```bash
pnpm test
```

- Run tests in watch mode:
```bash
pnpm test:watch
```

- Run tests with coverage:
```bash
pnpm test:coverage
```

### Local Development and Testing

To test the CLI locally during development:

1. Link the package globally:
```bash
pnpm link --global
```

2. Now you can use the `debt-collector` command from anywhere to test your changes.

3. To unlink when you're done:
```bash
pnpm unlink --global
```

### Project Structure

```
debt-collector/
├── source/
│   ├── commands/     # CLI commands implementation
│   ├── components/   # React components for CLI UI
│   └── lib/         # Core library functionality
├── docs/            # Documentation
└── tests/           # Test files
```

### Code Style

The project uses:
- ESLint with XO React configuration
- Prettier for code formatting
- TypeScript for type safety

To lint your code:
```bash
pnpm lint
```

### Building for Production

To create a production build:
```bash
pnpm build
```

The build output will be in the `dist` directory.

### Contributing

1. Create a new branch for your feature
2. Make your changes
3. Run tests and linting
4. Submit a pull request

### Troubleshooting

If you encounter any issues:

1. Make sure you're using Node.js >= 18
2. Clear your node_modules and reinstall dependencies:
```bash
rm -rf node_modules
pnpm install
```
3. Check if the package is properly linked if testing locally:
```bash
which debt-collector
```

