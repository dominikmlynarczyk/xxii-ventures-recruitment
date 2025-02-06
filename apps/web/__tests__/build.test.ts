import { exec, type ChildProcess } from 'node:child_process'
import { expect, test, afterAll } from 'vitest'
import path from 'node:path'

let buildProcess: ChildProcess | null = null
const timeout = 60_000

afterAll(() => {
  if (buildProcess?.pid) {
    try {
      /**
       * @description: Check if process exists and kill it
       */
      process.kill(buildProcess.pid, 0)
      process.kill(buildProcess.pid)
    } catch (error) {
      console.info('Process already terminated or cannot be killed.')
    }
  }
})

test(
  'Web (Next.js) build completes',
  async () => {
    buildProcess = exec('yarn build', {
      cwd: path.resolve(__dirname, '..'),
    })

    const buildOutput = new Promise<string>((resolve, reject) => {
      let output = ''
      buildProcess?.stdout?.on('data', (data) => {
        output += data.toString()
      })
      buildProcess?.stderr?.on('data', (data) => {
        output += data.toString()
      })
      buildProcess?.on('close', (code) => {
        if (code === 0) {
          resolve(output)
        } else {
          reject(new Error(`Build process exited with code ${code}`))
        }
      })
    })

    const result = await buildOutput

    // Check for yarn build output
    expect(result).toContain('built @xxii-ventures/config')
    expect(result).toContain('built @xxii-ventures/ui')

    // Check for Next.js version and build process
    expect(result).toContain('Next.js 14')
    expect(result).toContain('Creating an optimized production build')

    // Check for route information
    expect(result).toContain('Route (app)')
    expect(result).toContain('First Load JS shared by all')

    // Check for specific route patterns
    expect(result).toContain('○ /')
    expect(result).toContain('○ /_not-found')

    // Check for chunk information
    expect(result).toContain('chunks')

    // Check for static and dynamic route indicators
    expect(result).toMatch(/○\s+\(Static\)\s+prerendered as static content/)
    // expect(result).toMatch(/ƒ\s+\(Dynamic\)\s+server-rendered on demand/)
  },
  timeout
)
