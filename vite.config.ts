import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { execSync } from 'child_process'

function getGitHash(): string {
  try {
    return execSync('git rev-parse --short=8 HEAD').toString().trim()
  } catch {
    return 'unknown'
  }
}

function getVersion(): string {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${year}.${month}.${day}`
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte()],
  server: {
    allowedHosts: ['.ngrok-free.dev']
  },
  define: {
    __APP_VERSION__: JSON.stringify(getVersion()),
    __GIT_HASH__: JSON.stringify(getGitHash())
  }
})
