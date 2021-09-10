pipeline {
    agent any
    options { disableConcurrentBuilds() }
    stages {
        stage ('Build') {
            agent any

            when 
            {
                expression 
                {
                    choice == 'consolekalina'
                }
            }

            steps {
                sh '''#!/bin/bash
                    echo "npm install"
                '''
            }
        }
    }
}
