pipeline {
    agent none
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
                    echo "agung"
                '''
            }
        }
    }
}
