variable "project_id" {
  type = string
}

variable "source_image_family" {
  type    = string
  default = "ubuntu-2404-lts-amd64"
}

variable "ssh_username" {
  type    = string
  default = "packer"
}

variable "zone" {
  type    = string
  default = "us-east1-b"
}

variable "machine_type" {
  type    = string
  default = "e2-standard-2"
}

variable "MYSQL_USERNAME" {
  type    = string
  default = "csye"
}

variable "MYSQL_PASSWORD" {
  type    = string
  default = "Pass@1234"
}

variable "MYSQL_DB_NAME" {
  type    = string
  default = "csye"
}

variable "TEST_MYSQL_DB_NAME" {
  type    = string
  default = "testdb"
}

variable "PORT" {
  type    = string
  default = "3000"
}
