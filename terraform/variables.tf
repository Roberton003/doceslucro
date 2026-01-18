variable "project_id" {
  description = "The NEW and UNIQUE GCP Project ID for DocesGIamor (e.g., doces-giamor-prod)"
  type        = string
}

variable "region" {
  description = "GCP Region"
  type        = string
  default     = "us-central1"
}

variable "service_name" {
  description = "Cloud Run Service Name"
  type        = string
  default     = "doces-lucros-api"
}

variable "db_password" {
  description = "Password for the database user"
  type        = string
  sensitive   = true
}

variable "django_secret_key" {
  description = "Secret key for Django"
  type        = string
  sensitive   = true
}

variable "container_image" {
  description = "Container image URL (e.g., gcr.io/PROJECT/IMAGE:TAG)"
  type        = string
}
