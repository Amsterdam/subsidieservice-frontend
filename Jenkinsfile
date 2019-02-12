#!groovy

def tryStep(String message, Closure block, Closure tearDown = null) {
    try {
        block()
    }
    catch (Throwable t) {
        slackSend message: "${env.JOB_NAME}: ${message} failure ${env.BUILD_URL}", channel: '#ci-channel', color: 'danger'

        throw t
    }
    finally {
        if (tearDown) {
            tearDown()
        }
    }
}

node {
    stage("Checkout") {
        checkout scm
    }
}

node {
    stage("Build acceptance image") {
        tryStep "build", {
            def image = docker.build("build.app.amsterdam.nl:5000/cto/subsidieservicefrontend:${env.BUILD_NUMBER}",
                "--shm-size 1G " +
                "--build-arg VUE_APP_API_URL=https://acc.subsidieservice.amsterdam.nl/api/v2 " +
                ". ")
            image.push()
        }
    }
}


String BRANCH = "${env.BRANCH_NAME}"

if (BRANCH == "master") {

    node {
        stage('Push acceptance image') {
            tryStep "image tagging", {
                def image = docker.image("build.app.amsterdam.nl:5000/cto/subsidieservicefrontend:${env.BUILD_NUMBER}")
                image.pull()
                image.push("acceptance")
            }
        }
    }

    node {
        stage("Deploy to ACC") {
            tryStep "deployment", {
                build job: 'Subtask_Openstack_Playbook',
                parameters: [
                    [$class: 'StringParameterValue', name: 'INVENTORY', value: 'acceptance'],
                    [$class: 'StringParameterValue', name: 'PLAYBOOK', value: 'deploy-subsidieservice-frontend.yml'],
                ]
            }
        }
    }

    stage('Waiting for approval') {
        slackSend channel: '#ci-channel', color: 'warning', message: 'subsidieservice frontend is waiting for Production Release - please confirm'
        input "Deploy to Production?"
    }

    node {
        stage("Build and Push Production image") {
            tryStep "build", {
                def image = docker.build("build.app.amsterdam.nl:5000/cto/subsidieservicefrontend:${env.BUILD_NUMBER}",
                    "--shm-size 1G " +
                    "--build-arg VUE_APP_API_URL=https://subsidieservice.amsterdam.nl/api/v2 " +
                    ".")
                image.push("production")
                image.push("latest")
            }
        }
    }

    node {
        stage("Deploy") {
            tryStep "deployment", {
                build job: 'Subtask_Openstack_Playbook',
                parameters: [
                    [$class: 'StringParameterValue', name: 'INVENTORY', value: 'production'],
                    [$class: 'StringParameterValue', name: 'PLAYBOOK', value: 'deploy-subsidieservice-frontend.yml'],
                ]
            }
        }
    }
}
