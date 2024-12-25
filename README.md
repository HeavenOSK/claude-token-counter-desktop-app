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

### Project Structure

| Directory | Description |
|-----------|-------------|
| `/renderer` | Next.js frontend |
| `/electron-src` | Electron main process |
| `/main` | Built Electron code |
| `/dist` | Distribution package |

## License

[MIT License](LICENSE)

## Related Links

- [Claude Token Counting API Documentation](https://docs.anthropic.com/en/docs/build-with-claude/token-counting)
