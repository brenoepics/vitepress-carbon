export const dependabotTemplate = {
  'version': 2,
  'updates': [
    {
      'package-ecosystem': 'npm',
      'directory': '/',
      'schedule': {
        'interval': 'weekly'
      }
    },
    {
      'package-ecosystem': 'github-actions',
      'directory': '/',
      'schedule': {
        'interval': 'weekly'
      }
    }
  ]
}

const setupBun = {
  'name': 'Setup Bun',
  'uses': 'oven-sh/setup-bun@v2',
  'with': {
    'bun-version': 'latest'
  }
}

const setupNode = (cache: string) => ({
  'name': 'Setup Node',
  'uses': 'actions/setup-node@v4',
  'with': {
    'node-version': 20,
    'cache': cache
  }
})

function getSetupManager(packageManager: string) {
  if (packageManager === 'bun') {
    return setupBun
  }

  return setupNode(packageManager)
}

export const githubPagesTemplate = (packageManager: string) => ({
  'name': 'Deploy GitHub Pages',
  'on': {
    'push': {
      'branches': [
        'main'
      ]
    }
  },
  'permissions': {
    'contents': 'read',
    'pages': 'write',
    'id-token': 'write'
  },
  'concurrency': {
    'group': 'pages',
    'cancel-in-progress': false
  },
  'jobs': {
    'build': {
      'runs-on': 'ubuntu-latest',
      'steps': [
        {
          'name': 'Checkout',
          'uses': 'actions/checkout@v4',
          'with': {
            'fetch-depth': 0
          }
        },
        getSetupManager(packageManager),
        {
          'name': 'Setup Pages',
          'uses': 'actions/configure-pages@v4'
        },
        {
          'name': 'Install dependencies',
          'run': `${packageManager} install`
        },
        {
          'name': 'Build with VitePress',
          'run': `${packageManager} run docs:build`
        },
        {
          'name': 'Upload artifact',
          'uses': 'actions/upload-pages-artifact@v3',
          'with': {
            'path': '.vitepress/dist/'
          }
        }
      ]
    },
    'deploy': {
      'environment': {
        'name': 'github-pages',
        'url': '${{ steps.deployment.outputs.page_url }}'
      },
      'needs': 'build',
      'runs-on': 'ubuntu-latest',
      'name': 'Deploy',
      'steps': [
        {
          'name': 'Deploy to GitHub Pages',
          'id': 'deployment',
          'uses': 'actions/deploy-pages@v4'
        }
      ]
    }
  }
})
