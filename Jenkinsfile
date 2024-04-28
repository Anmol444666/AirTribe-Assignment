pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                script {
                    git 'https://github.com/Anmol444666/AirTribe-Assignment.git'
                }
            }
        }
        stage('Install Dependencies') {
            steps {
                script {
                    bat 'npm install'
                }
            }
        }
        stage('Build') {
            steps {
                script {
                    bat 'npm run build'
                }
            }
        }
        stage('Run Tests') {
            steps {
                script {
                    bat 'npm test'
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    bat 'npm run deploy'
                }
            }
        }
    }
}
