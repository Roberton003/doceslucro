# Cloud SQL Instance
resource "google_sql_database_instance" "main" {
  name             = "${var.service_name}-db-instance"
  database_version = "POSTGRES_15"
  region           = var.region
  
  settings {
    tier = "db-f1-micro" # Free tier eligible-ish, low cost
    activation_policy = "ALWAYS"
    
    ip_configuration {
      ipv4_enabled    = true 
      # In a real PROD environment, we should use Private IP + VPC Connector
      # For this fast deployment, we stick to public IP with Cloud Run connection
    }
  }
  deletion_protection = false # For easier cleanup in this demo context
  depends_on          = [google_project_service.apis]
}

# Database User
resource "google_sql_user" "users" {
  name     = "django_user"
  instance = google_sql_database_instance.main.name
  password = var.db_password
}

# Database
resource "google_sql_database" "database" {
  name     = "doces_db"
  instance = google_sql_database_instance.main.name
}
