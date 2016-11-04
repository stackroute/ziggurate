node {
  stage: 'Clean'
  sh "rm dist -rf"

  stage 'Checkout Repository'
  git url: 'https://github.com/stackroute/ziggurate.git', branch: "${env.BRANCH_NAME}"

  stage 'Installing Dependencies'
  sh "npm prune"
  sh "npm install"

  stage 'Linting'
  sh "npm run lint"

  stage 'Testing'
  sh "npm test"

  stage 'Building'
  sh "npm run build"

  sh "mkdir dist -p"
  sh "cd dist && tar cvzf ziggurate-dev-current.tar.gz *"
  step([$class: 'ArtifactArchiver', artifacts: 'dist/*.tar.gz', fingerprint: true])
}
