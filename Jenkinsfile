pipeline {
    agent any
    options { disableConcurrentBuilds() }
    stages {
        stage ('Build') {
            agent any
            steps {
                sh 'npm install'
            }
        }
    }
}
