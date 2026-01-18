output "service_url" {
  value = google_cloud_run_v2_service.default.uri
}

output "database_connection_name" {
  value = google_sql_database_instance.main.connection_name
}

output "database_ip" {
  value = google_sql_database_instance.main.public_ip_address
}
