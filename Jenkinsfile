pipeline {
  agent none

  stages {
    stage('Backend: yarn install') {
      agent {
        docker {
          image 'node:14'
        }
      }
      steps {
        sh 'cd backend && yarn install'
      }
    }

    stage('Backend: yarn test') {
      agent {
        docker {
          image 'node:14'
        }
      }
      steps {
        sh 'cd backend && yarn test'
      }
    }

    stage('Frontend: npm install') {
      agent {
        docker {
          image 'node:14'
        }
      }
      steps {
        sh 'cd frontend && npm install'
      }
    }

    stage('Frontend: npm test') {
      agent {
        docker {
          image 'node:14'
        }
      }
      steps {
        sh 'cd frontend && npm test'
      }
    }

    stage('Docker Build') {
      agent any
      steps {
        sh 'docker build -t my-app:latest .'
      }
    }
  }
}
