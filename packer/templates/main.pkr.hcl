packer {
  required_plugins {
    googlecompute = {
      source  = "github.com/hashicorp/googlecompute"
      version = "~> 1"
    }
  }
}

locals {
  date_time_stamp = formatdate("MM-DD-YYYY-hh-mm-ss", timestamp())
}

source "googlecompute" "centos" {
  project_id = var.project_id
  # gcloud compute images list
  source_image_family = var.source_image_family
  zone                = var.zone
  machine_type        = var.machine_type
  ssh_username        = var.ssh_username
  image_name          = format("ubuntu-machine-image-%s", local.date_time_stamp)
}

build {
  sources = ["source.googlecompute.centos"]

  provisioner "shell" {
    script = "./scripts/update.sh"
  }

  provisioner "shell" {
    script = "./scripts/installRequirements.sh"
  }

  # Comment as we are doing this in terraform 
  # provisioner "shell" {
  #  script           = "./scripts/installMySQL.sh"
  #  environment_vars = ["DB_DATABASE=${var.MYSQL_DB_NAME}", "DB_PASSWORD=${var.MYSQL_PASSWORD}", "DB_USERNAME=${var.MYSQL_USERNAME}" ]
  # }

  provisioner "shell" {
    script = "./scripts/createUser.sh"
  }

  provisioner "file" {
    source      = "../app"
    destination = "/tmp"
  }

  provisioner "shell" {
    script = "./scripts/moveApp.sh"
  }

  provisioner "shell" {
    script = "./scripts/installOpsAgent.sh"
  }

  provisioner "shell" {
    script = "./scripts/configureOpsAgent.sh"
  }

  # Comment as we are doing this in terraform 
  # provisioner "shell" {
  #   script           = "./scripts/createEnv.sh"
  #   environment_vars = ["MYSQL_USERNAME=${var.MYSQL_USERNAME}", "MYSQL_PASSWORD=${var.MYSQL_PASSWORD}", "MYSQL_DB_NAME=${var.MYSQL_DB_NAME}", "TEST_MYSQL_DB_NAME=${var.TEST_MYSQL_DB_NAME}", "PORT=${var.PORT}", "MYSQL_HOST=localhost"]
  # }

  provisioner "shell" {
    script = "./scripts/runNpmInstall.sh"
  }

  provisioner "shell" {
    script = "./scripts/updatePermission.sh"
  }

  # Comment as we are doing this in Github
  # provisioner "shell" {
  #    script = "./scripts/runTests.sh"
  # }

  provisioner "file" {
    source      = "./serviceFile/runApp.service"
    destination = "/tmp/runApp.service"
  }

  provisioner "shell" {
    script = "./scripts/moveServiceFile.sh"
  }

  provisioner "shell" {
    script = "./scripts/enableService.sh"
  }

}
