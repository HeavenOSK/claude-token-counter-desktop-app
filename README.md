# Claude Token Counter Desktop App

A desktop application for counting tokens using the Claude API.

## Features

- 🔢 Accurate token counting using Claude API
- 🔐 Secure API key storage using system keychain
- 📝 Token count history tracking and display
- 🎯 Support for multiple Claude models
- 🖥️ Cross-platform support (Windows, macOS, Linux)

## Installation

1. Download the latest installer from the [releases page](https://github.com/HeavenOSK/claude-token-counter-desktop-app/releases)
2. Run the installer to install the application
3. Get your API key from [Anthropic](https://console.anthropic.com/)
4. Set up your API key in the application settings

## Development

### Requirements

- Node.js 22.12.0
- [mise](https://mise.jdx.dev/) (recommended for Node.js version management)
- [Biome](https://biomejs.dev/) (for linting and formatting)

### Setup

```bash
# Clone the repository
git clone https://github.com/HeavenOSK/claude-token-counter-desktop-app.git
cd claude-token-counter-desktop-app

# Install dependencies
npm install

# Start in development mode
npm run dev
```

### Available Scripts

- `npm run dev` - Start in development mode
- `npm run build` - Build the application
- `npm run dist` - Create distribution package
- `npm run type-check` - Run TypeScript type checking
- `npm run clean` - Clean build directories
- `npm run build-renderer` - Build Next.js frontend
- `npm run build-electron` - Build Electron main process
- `npm run pack-app` - Create unpacked application
- `npm run release` - Create release build
- `npm run lint` - Run Biome linter
- `npm run lint:fix` - Run Biome linter with auto-fix

### Project Structure

| Directory | Description |
|-----------|-------------|
| `/renderer` | Next.js frontend |
| `/electron-src` | Electron main process |
| `/main` | Built Electron code |
| `/dist` | Distribution package |

### Development Tools

#### Biome

This project uses [Biome](https://biomejs.dev/) for linting and formatting. Configuration can be found in `biome.json`.

#### Lefthook

[Lefthook](https://github.com/evilmartians/lefthook) is used for managing Git hooks. It's automatically installed when you run `npm install` through the `prepare` script.

## License

[MIT License](LICENSE)

## Related Links

- [Claude Token Counting API Documentation](https://docs.anthropic.com/en/docs/build-with-claude/token-counting)
