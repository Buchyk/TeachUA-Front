pipeline {
    agent {
        docker {
            image 'node:latest' 
        }
    }
    stages {
        stage('NPM Clear cache') { 
            steps {
                echo 'Clear cache for npm'
                sh 'npm cache clean --force' 
            }
        }
        stage('Install all dependencies') { 
            steps {
                echo 'Install all dependencies which was declarate in package.json'
                sh 'npm install' 
            }
        }
        stage('Build our app') { 
            steps {
                echo 'Build our front'
                sh 'npm run build'
                sh 'tar czf build-${BUILD_NUMBER}.tar.gz build/'
            }
        }
        stage('Push to artifact server') { 
             steps {
                withCredentials([usernamePassword(credentialsId: 'artifact', usernameVariable: 'USERNAME', passwordVariable: 'USERPASS')]) {
                    sshPublisher(
                        failOnError: true,
                        continueOnError: false,
                        publishers: [
                            sshPublisherDesc(
                                configName: 'artifact_server',
                                sshCredentials: [
                                    username: "$USERNAME",
                                    encryptedPassphrase: "$USERPASS"
                                ], 
                                transfers: [
                                    sshTransfer(
                                        sourceFiles: 'build-${BUILD_NUMBER}.tar.gz',
                                        remoteDirectory: '/front_artifactory',
                                        
                                    )
                                ]
                            )
                        ]
                    )
                }
            }
        }
    stage('DeployToStaging') {
            when {
                branch 'main'
            }
            steps {
                withCredentials([usernamePassword(credentialsId: 'frontend', usernameVariable: 'USERNAME', passwordVariable: 'USERPASS')]) {
                    sshPublisher(
                        failOnError: true,
                        continueOnError: false,
                        publishers: [
                            sshPublisherDesc(
                                configName: 'backend_root',
                                sshCredentials: [
                                    username: "$USERNAME",
                                    encryptedPassphrase: "$USERPASS"
                                ], 
                                transfers: [
                                    sshTransfer(
                                        sourceFiles: 'build/',
                                        remoteDirectory: '/home/teachua/www/front/'
                                        execCommand: 'sudo docker restart apache_prod' 
                                    //   execCommand: 'sudo rm -rf /home/teachua/www/front/* && unzip /app/build.zip -d /home/teachua/www/front && sudo docker restart apache_prod'
                                    )
                                ]
                            )
                        ]
                    )
                }
            }
        }
    }
}
