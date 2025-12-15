# Create the project root
mkdir react-firebase-chakra-starter
cd react-firebase-chakra-starter

# Initialize with Vite (fast, modern, TypeScript-ready)
npm create vite@latest . -- --template react-ts

# Install dependencies
npm install

# Install required libraries
npm install firebase react-router-dom @chakra-ui/react @emotion/react @emotion/styled

# Install dev dependencies (optional but recommended)
npm install -D @types/react @types/react-dom