pipeline {
  agent none

  stages {
    stage('Backend: yarn install') {
      agent {
        docker {
          image 'node:18.12.1'
          args '-v /var/run/docker.sock:/var/run/docker.sock'
        }
      }
      steps {
        sh 'cd backend && yarn install'
      }
    }

    stage('Backend: yarn test') {
      agent {
        docker {
          image 'node:18.12.1'
          args '-v /var/run/docker.sock:/var/run/docker.sock'
        }
      }
      steps {
        sh 'cd backend && yarn test'
      }
    }

    stage('Frontend: npm install') {
      agent {
        docker {
          image 'node:18.12.1'
          args '-v /var/run/docker.sock:/var/run/docker.sock'
        }
      }
      steps {
        sh 'cd frontend && npm install'
      }
    }

    stage('Frontend: npm test') {
      agent {
        docker {
          image 'node:18.12.1'
          args '-v /var/run/docker.sock:/var/run/docker.sock'
        }
      }
      steps {
        sh 'cd frontend && npm test'
      }
    }

    stage('Docker Build') {
      agent {
        docker {
          image 'node:18.12.1'
          args '-v /var/run/docker.sock:/var/run/docker.sock'
        }
      }
      steps {
        sh 'docker build -t my-app:latest .'
      }
    }
  }
}
