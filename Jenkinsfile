pipeline {
    agent none
    options { disableConcurrentBuilds() }
    stages {
        stage ('install') {
            agent any
            steps {
                sh 'npm install'
            }
        }
        stage ('build') {
            agent any
            steps {
                sh 'npm run build'
            }
        }
    }
}
