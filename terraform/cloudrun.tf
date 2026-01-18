# Cloud Run Service
resource "google_cloud_run_v2_service" "default" {
  name     = var.service_name
  location = var.region
  ingress = "INGRESS_TRAFFIC_ALL"

  template {
    scaling {
      max_instance_count = 1
    }

    volumes {
      name = "cloudsql"
      cloud_sql_instance {
        instances = [google_sql_database_instance.main.connection_name]
      }
    }

    containers {
      image = var.container_image
      
      ports {
        container_port = 8080
      }

      env {
        name  = "DEBUG"
        value = "False"
      }
      env {
        name  = "ALLOWED_HOSTS"
        value = "*" # Or specifically ".run.app"
      }
      # Database connection override for production
      env {
        name  = "DATABASE_URL"
        value = "postgres://django_user:${var.db_password}@/${google_sql_database.database.name}?host=/cloudsql/${google_sql_database_instance.main.connection_name}"
        # Cloud Run connects via Unix socket in /cloudsql/INSTANCE_CONNECTION_NAME
      }
      env {
        name = "SECRET_KEY"
        value = var.django_secret_key
      }
      
      volume_mounts {
        name       = "cloudsql"
        mount_path = "/cloudsql"
      }
    }
  }

  depends_on = [google_project_service.apis, google_sql_database_instance.main]
}

# Allow unauthenticated access (public API)
resource "google_cloud_run_service_iam_member" "public_access" {
  service  = google_cloud_run_v2_service.default.name
  location = google_cloud_run_v2_service.default.location
  role     = "roles/run.invoker"
  member   = "allUsers"
}
