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
                sh '''curl -u admin:admin123 -X POST "http://51.215.229.41:9000/api/projects/delete?project=3094tguj389gh3uif390"'''
                withSonarQubeEnv('sonarcube') {
                sh '''$SCANNER_HOME/bin/sonar-scanner -Dsonar.projectKey=3094tguj389gh3uif390 \
                -Dsonar.projectName=chatbot \
                -Dsonar.sources=. \
                -Dsonar.host.url=http://51.215.229.41:9000 \
                -Dsonar.login=admin \
                -Dsonar.password=admin123 \
                -Dsonar.php.coverage.reportPath=phpunit.coverage.xml \
                -Dsonar.php.tests.reportPath=phpunit-sonar.xml'''
                }
            }
        }
        stage ('git pull') {
            agent any
              steps {
              sh 'ssh webadmin@kai bash /home/webadmin/apps/shell/bin/consolekalina-pull.sh'
            }
        }
    }
    post {
        always {
            echo 'Running Mail'
        }
        success {
            mail bcc: '', body: "<b>sSuccess!</b><br>Project: ${env.JOB_NAME} <br>Build Number: ${env.BUILD_NUMBER} <br> URL de build: ${env.BUILD_URL}", cc: '', charset: 'UTF-8', from: '', mimeType: 'text/html', replyTo: '', subject: "Success: Project name -> ${env.JOB_NAME}", to: "jennice.kalcare@gmail.com";
        }  
        failure {
            mail bcc: '', body: "<b>Failed!</b><br>Project: ${env.JOB_NAME} <br>Build Number: ${env.BUILD_NUMBER} <br> URL de build: ${env.BUILD_URL}", cc: '', charset: 'UTF-8', from: '', mimeType: 'text/html', replyTo: '', subject: "ERROR: Project name -> ${env.JOB_NAME}", to: "jennice.kalcare@gmail.com";
        }
    }
}
