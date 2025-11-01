
resource "ovh_domain_zone_record" "main-1" {
  zone     = "contentblueprint.ovh"
  fieldtype = "A"
  subdomain = "@"
  target    = "185.199.108.153"
  ttl       = 3600
}


resource "ovh_domain_zone_record" "main-2" {
  zone     = "contentblueprint.ovh"
  fieldtype = "A"
  subdomain = "@"
  target    = "185.199.109.153"
  ttl       = 3600
}


resource "ovh_domain_zone_record" "main-3" {
  zone     = "contentblueprint.ovh"
  fieldtype = "A"
  subdomain = "@"
  target    = "185.199.110.153"
  ttl       = 3600
}


resource "ovh_domain_zone_record" "main-4" {
  zone     = "contentblueprint.ovh"
  fieldtype = "A"
  subdomain = "@"
  target    = "185.199.111.153"
  ttl       = 3600
}

resource "ovh_domain_zone_record" "cname_www" {
  zone      = "contentblueprint.ovh"
  fieldtype = "CNAME"
  subdomain = "www"
  target    = "gaultierq.github.io."
  ttl       = 3600
}

