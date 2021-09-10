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
        stage ('sonarqube') 
        {
            agent any
            environment 
            {
            SCANNER_HOME = tool 'kalcare'
            }
            
            steps {
                withSonarQubeEnv('sonarcube') {
                sh '''$SCANNER_HOME/bin/sonar-scanner -Dsonar.projectKey=3094tguj389gh3uif390 \
                -Dsonar.projectName=consolekalina-prod \
                -Dsonar.sources=. \
                -Dsonar.host.url=http://54.255.209.10:9000 \
                -Dsonar.login=admin \
                -Dsonar.password=admin \
                -Dsonar.php.coverage.reportPath=phpunit.coverage.xml \
                -Dsonar.php.tests.reportPath=phpunit-sonar.xml'''
                }
            }
        }
    }
}
