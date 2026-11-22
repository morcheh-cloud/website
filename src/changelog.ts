// What changed in Morche, newest first. Written from the git history of the
// panel (`frontend`), the server (`backend`) and the Docker setup (`morche`):
// run `pnpm changelog` to list the commits since the newest entry here, then
// turn them into short, user-facing lines. Raw commit messages stay out.

export type ChangeKind = "new" | "improved" | "fixed"

export type Change = {
  kind: ChangeKind
  text: string
  // A docs guide slug (and optional section) that explains it. Ignored when
  // the guide doesn't exist (yet).
  guide?: string
  section?: string
}

export type Release = {
  // Stable anchor and feed id.
  id: string
  // ISO date of the last day the release covers.
  date: string
  title: string
  summary: string
  changes: Change[]
}

export const releases: Release[] = [
  {
    id: "automations-and-point-in-time",
    date: "2026-11-22",
    title: "Automations, webhooks and point-in-time recovery",
    summary:
      "Morche can now react to what happens in it, call out to your other tools, and rewind a PostgreSQL database to any minute.",
    changes: [
      {
        kind: "new",
        text: "Automations: when an event happens, a URL is called or you press a button, run up to ten steps (notify, run a script, restart a service, check something, schedule a job, call a webhook, wait). Every automation has a dry run and a run history.",
        guide: "automations",
      },
      {
        kind: "new",
        text: "Webhooks with signed deliveries, a delivery log with Send it again, and one event catalog shared with Automations.",
        guide: "api",
        section: "webhooks",
      },
      {
        kind: "new",
        text: "API tokens for scripts and CI: read-only or full, with an expiry, shown once, revocable by you or an admin.",
        guide: "api",
        section: "tokens",
      },
      {
        kind: "new",
        text: "PostgreSQL point-in-time recovery with pgBackRest: pick any moment on a timeline and restore a copy beside the server or over it.",
        guide: "databases",
        section: "pitr",
      },
      {
        kind: "new",
        text: "ArvanCloud DNS and CDN: manage a domain's records, HTTPS, cache, firewall, WAF and rate limits from its zone page.",
        guide: "dns",
        section: "arvancloud",
      },
      {
        kind: "improved",
        text: "Database backups choose gzip or zstd, a compression level and parallel workers; restores show what each backup used.",
        guide: "databases",
        section: "size-speed",
      },
    ],
  },
  {
    id: "data-explorer-and-zero-downtime",
    date: "2026-11-21",
    title: "Data explorer and updates without downtime",
    summary:
      "Look inside your databases from the panel, and roll out a Compose service without dropping a request.",
    changes: [
      {
        kind: "new",
        text: "Data explorer for PostgreSQL, MySQL/MariaDB, SQL Server, MongoDB and Redis: browse tables and keys, filter and sort on the server, run queries, save filters and queries, and edit rows with a preview of the statements.",
        guide: "databases",
        section: "data",
      },
      {
        kind: "new",
        text: "Zero-downtime updates for Compose services: the new container starts beside the old one and takes over once it is healthy. Turn it on per service in the project's Production tab.",
        guide: "containers",
        section: "zero-downtime",
      },
      {
        kind: "improved",
        text: "The panel opens in the light theme by default; dark and system are one click away in Appearance.",
        guide: "access",
        section: "theme",
      },
    ],
  },
  {
    id: "public-demo-and-assets",
    date: "2026-11-19",
    title: "A public demo and an asset inventory",
    summary:
      "Try Morche without installing anything, and keep an inventory of everything the panel manages.",
    changes: [
      {
        kind: "new",
        text: "Public demo: enter a live panel with throwaway servers, databases and storage, no account needed. It resets on a schedule.",
        guide: "getting-started",
        section: "demo",
      },
      {
        kind: "new",
        text: "Assets: every server, cluster, database, storage and service gets a linked asset record, next to manual ones such as licences and domains. Owners, criticality, reviews, end-of-life dates, coverage checks and a relationship map.",
        guide: "assets",
      },
      {
        kind: "new",
        text: "Docker registry logins can be saved once and used on many servers.",
        guide: "containers",
        section: "registries",
      },
      {
        kind: "new",
        text: "Database syncs: compare and copy tables between databases, mirror them, or replace a target, with a dry run first.",
        guide: "databases",
        section: "sync",
      },
      {
        kind: "fixed",
        text: "Behind a reverse proxy, Morche trusts only the proxy's own forwarded address when it checks sign-in limits.",
      },
    ],
  },
  {
    id: "restore-from-a-file",
    date: "2026-11-17",
    title: "Restore a database from any file",
    summary: "Backups made elsewhere are no longer stranded.",
    changes: [
      {
        kind: "new",
        text: "Restore from a file: pick a dump on any storage or server, let Morche recognise its format, and restore it over a database or as a new one, with a safety backup first.",
        guide: "databases",
        section: "restore-file",
      },
    ],
  },
  {
    id: "install-in-one-line",
    date: "2026-11-16",
    title: "Install in one line, and a handier panel",
    summary:
      "Morche is now a pair of ready-made images with a one-line installer.",
    changes: [
      {
        kind: "new",
        text: "One-line installer and Docker Compose setup, with images on ghcr.io for amd64 and arm64.",
        guide: "getting-started",
      },
      {
        kind: "new",
        text: "A header with a create menu, a terminal launcher, notifications and an account menu.",
      },
      {
        kind: "improved",
        text: "The product is now Morche everywhere: code, headers, cookies and image names.",
      },
      {
        kind: "improved",
        text: "Cloning a virtual machine can start from a snapshot.",
      },
    ],
  },
  {
    id: "alerts-and-container-dashboards",
    date: "2026-11-15",
    title: "Alerts and container dashboards",
    summary: "Pages replace dialogs for the things you set up most.",
    changes: [
      {
        kind: "new",
        text: "A dashboard for each container environment: live usage, a clean map of which containers talk to which, resources, and activity.",
        guide: "containers",
        section: "dashboard",
      },
      {
        kind: "improved",
        text: "Alert channels and alert rules are full pages with presets and a plain-words summary of what a rule does.",
        guide: "alerts",
        section: "rules",
      },
      {
        kind: "improved",
        text: "Storage has Insights and Storages as separate pages, with 24-hour numbers on every card.",
        guide: "storage",
        section: "insights",
      },
    ],
  },
  {
    id: "cloud-and-virtual-machines",
    date: "2026-11-14",
    title: "Virtual machines, cloud servers and storage syncs",
    summary: "Morche now reaches below the operating system.",
    changes: [
      {
        kind: "new",
        text: "Virtual machines on Proxmox VE: power, console, hardware, snapshots, backups, cloud-init, firewall and high availability, over the Proxmox API with nothing installed.",
        guide: "virtual-machines",
      },
      {
        kind: "new",
        text: "Cloud: servers rented from ArvanCloud next to your own, with power and rename actions where you allow changes.",
        guide: "cloud",
      },
      {
        kind: "new",
        text: "Storage syncs and migrations between S3, FTP, SFTP and WebDAV storages and servers, including near-instant sync as files change.",
        guide: "storage",
        section: "sync",
      },
      {
        kind: "new",
        text: "About 360 ready-made container templates, and per-port allow lists for published Docker ports in the firewall.",
        guide: "containers",
        section: "templates",
      },
    ],
  },
  {
    id: "docker-auto-update-and-log-retention",
    date: "2026-11-13",
    title: "Auto-update for containers and log retention",
    summary: "Keep containers current, and keep Morche's own logs in check.",
    changes: [
      {
        kind: "new",
        text: "Container auto-update (Watchtower-like): policies pick containers, update or only tell you, run on a schedule or a webhook, roll back on failure and clean up.",
        guide: "containers",
        section: "auto-update",
      },
      {
        kind: "new",
        text: "Log retention: archive, copy or delete each kind of log by age or size, to disk or storage.",
        guide: "log-retention",
      },
      {
        kind: "new",
        text: "Alert rules for containers and a Docker engine config editor.",
        guide: "containers",
        section: "daemon-config",
      },
    ],
  },
  {
    id: "containers",
    date: "2026-11-12",
    title: "Containers",
    summary: "Docker and Podman, over each server's SSH.",
    changes: [
      {
        kind: "new",
        text: "Containers, images, volumes, networks, Compose projects and live logs and stats for Docker and Podman, with nothing installed on the server.",
        guide: "containers",
      },
    ],
  },
  {
    id: "monitoring-processes-and-audit",
    date: "2026-11-11",
    title: "Alerts, processes, packages and the audit log",
    summary: "The biggest day so far: a dozen features land together.",
    changes: [
      {
        kind: "new",
        text: "Alert rules and server metrics: CPU, memory, disk, load and more, with charts and notifications.",
        guide: "alerts",
      },
      {
        kind: "new",
        text: "Monitors from several locations, with plain-words rules for when a check counts as down.",
        guide: "monitoring",
        section: "locations",
      },
      {
        kind: "new",
        text: "Processes: top and htop in the browser, with signals, renice and a tree view.",
        guide: "processes",
      },
      {
        kind: "new",
        text: "Packages: installed, updates and history for apt, dnf, yum, zypper, apk and pacman, with a reviewed simulation before every change.",
        guide: "packages",
      },
      {
        kind: "new",
        text: "Audit log of every command Morche runs and every command typed in its terminals, next to replayable terminal recordings.",
        guide: "command-log",
      },
      {
        kind: "new",
        text: "Sign-in security: an address allowlist, your sessions, sign-in history and a 'Was it you?' alert.",
        guide: "access",
        section: "sign-ins",
      },
      {
        kind: "new",
        text: "Redirect rules for sites: import from other tools, check targets and see which rules are used.",
        guide: "reverse-proxy",
        section: "redirects",
      },
      {
        kind: "improved",
        text: "A redesigned Home with a health score, KPIs, performance and traffic cards.",
        guide: "getting-started",
        section: "home",
      },
      {
        kind: "improved",
        text: "Security headers on every page.",
      },
    ],
  },
  {
    id: "monitoring-and-applications",
    date: "2026-11-10",
    title: "Monitoring and the applications catalog",
    summary:
      "Know when something is down, and install software with one click.",
    changes: [
      {
        kind: "new",
        text: "Monitoring: HTTP, TCP, ping, DNS, TLS, database, mail, message queue, Docker, systemd, command and push monitors, with incidents.",
        guide: "monitoring",
      },
      {
        kind: "new",
        text: "Applications: a catalog of infrastructure software with built-in recipes, installed, updated and removed on many servers at once, plus your own recipes.",
        guide: "applications",
      },
    ],
  },
  {
    id: "reverse-proxy",
    date: "2026-11-09",
    title: "A full reverse proxy",
    summary: "Nginx, managed from the panel over plain SSH.",
    changes: [
      {
        kind: "new",
        text: "Reverse proxy sites, redirections, TCP/UDP streams and 404 hosts, with certificates, HSTS, rate limits and basic or forward login.",
        guide: "reverse-proxy",
      },
      {
        kind: "new",
        text: "Load balancing, caching with named rules, a traffic mirror and an 'always online' mode.",
        guide: "reverse-proxy",
        section: "load-balancing",
      },
      {
        kind: "new",
        text: "A web application firewall, Brotli, GeoIP country rules and live per-site traffic reports and logs.",
        guide: "reverse-proxy",
        section: "waf",
      },
      {
        kind: "new",
        text: "Nginx running in a container is supported, and proxy managers such as Nginx Proxy Manager can be added read-only.",
        guide: "reverse-proxy",
        section: "docker",
      },
    ],
  },
  {
    id: "storage-buckets",
    date: "2026-11-08",
    title: "S3 buckets",
    summary: "Bucket settings without leaving the file manager.",
    changes: [
      {
        kind: "new",
        text: "Bucket settings for S3 storages: access policy, versioning, tags, lifecycle, CORS, encryption and object lock.",
        guide: "storage",
        section: "buckets",
      },
    ],
  },
  {
    id: "firewall-and-dns",
    date: "2026-11-07",
    title: "Firewall, DNS and a dark theme",
    summary:
      "Network control for each server, and a second look for the panel.",
    changes: [
      {
        kind: "new",
        text: "Firewall for ufw and firewalld (nftables and iptables read-only), with a countdown that undoes a change that locks you out.",
        guide: "firewall",
      },
      {
        kind: "new",
        text: "DNS: any number of Technitium servers, with zones and records managed in one place.",
        guide: "dns",
      },
      {
        kind: "new",
        text: "A dark theme that follows your system or your choice.",
        guide: "access",
        section: "theme",
      },
    ],
  },
  {
    id: "ansible-and-scripts",
    date: "2026-11-04",
    title: "Ansible and scripts",
    summary: "Run work on many servers at once.",
    changes: [
      {
        kind: "new",
        text: "Ansible playbooks with a visual builder, a module browser and live run output.",
        guide: "ansible",
      },
      {
        kind: "new",
        text: "Saved scripts in bash, sh or Python, run on chosen servers with parameters and per-server output.",
        guide: "scripts",
      },
    ],
  },
  {
    id: "first-foundations",
    date: "2026-11-03",
    title: "Servers, storage and the service launcher",
    summary: "Where Morche starts: servers over SSH, kept in sight.",
    changes: [
      {
        kind: "new",
        text: "Servers over SSH with live status, a terminal, a file manager, cron, users, ports and fail2ban.",
        guide: "servers",
      },
      {
        kind: "new",
        text: "Storage connections (S3, FTP, SFTP, WebDAV) that are watched in the background.",
        guide: "storage",
      },
      {
        kind: "new",
        text: "Service launcher: your team's web tools with logos, logins and an audit log for every revealed password.",
        guide: "service-launcher",
      },
    ],
  },
]

export const kindLabels: Record<ChangeKind, string> = {
  new: "New",
  improved: "Improved",
  fixed: "Fixed",
}
