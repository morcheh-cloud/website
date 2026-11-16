export const copy = {
  meta: {
    title: "Morche: an open-source private cloud on your own servers",
    description:
      "Morche is an open-source private cloud that runs on your own servers with Docker and runs your team's whole infrastructure from one panel: servers, databases, storage, DNS, backups and access.",
  },
  brand: "Morche",
  nav: {
    label: "Main",
    tour: "Tour",
    features: "Features",
    security: "Security",
    start: "Get started",
    faq: "Questions",
    install: "Install",
    github: "Morche on GitHub",
    menu: "Open menu",
    close: "Close menu",
    home: "Morche home",
  },
  hero: {
    title: "Your own cloud, on your own servers.",
    lead: "Morche installs on your organization's servers and runs everything your team manages from one panel: servers, databases, storage, DNS, backups and access.",
    badge: "Open source · self-hosted with Docker",
    primary: "Install Morche",
    secondary: "View on GitHub",
  },
  tour: {
    label: "A tour of the panel",
    pause: "Pause the tour",
    play: "Play the tour",
    areas: [
      {
        id: "servers",
        title: "Servers",
        blurb:
          "Live health, terminal, files, firewall and services for every server.",
      },
      {
        id: "databases",
        title: "Databases",
        blurb: "See what's slow, blocked and connected. Back up on a schedule.",
      },
      {
        id: "storage",
        title: "Storage",
        blurb: "S3, FTP, SFTP and WebDAV in one file manager.",
      },
      {
        id: "dns",
        title: "DNS",
        blurb: "Every Technitium server and zone from one screen.",
      },
      {
        id: "automation",
        title: "Automation",
        blurb: "Ansible, scripts and scheduled jobs across many servers.",
      },
      {
        id: "team",
        title: "Team and access",
        blurb: "Workspaces, four access levels and a trail of who did what.",
      },
    ],
  },
  works: {
    title: "Works with what you already run",
    note: "and any Linux server you can reach over SSH.",
  },
  // Words in backticks are tool names, set in mono.
  statement:
    "Most teams run their servers from `PuTTY`, a shared `passwords.xlsx`, crontabs nobody remembers, a separate tool for every database and a chat group for alerts. Morche puts all of it in one place, and gives each person exactly the access their job needs.",
  features: {
    title: "One panel instead of ten tools.",
    lead: "Built for the work your team does every day, from a quick look at a server to a restore at three in the morning.",
    items: [
      {
        icon: "terminal",
        title: "Terminal in the browser",
        body: "Tabs that survive a reload, a Ctrl row on phones, and no credentials to hunt for.",
      },
      {
        icon: "folder",
        title: "File manager",
        body: "Edit, upload, compress and move files on any server, or send them straight to a storage.",
      },
      {
        icon: "activity",
        title: "Live health",
        body: "CPU, memory, disk and network every second, and a red count in the menu when something breaks.",
      },
      {
        icon: "shield",
        title: "Firewall and fail2ban",
        body: "Rules, bans and jails on every server. A change that cuts you off undoes itself.",
      },
      {
        icon: "database",
        title: "Database monitoring",
        body: "Sessions, slow queries, locks, space and replication for six database engines.",
      },
      {
        icon: "archive",
        title: "Backups",
        body: "Full or incremental, to several storages at once, kept by days or grandfather-father-son.",
      },
      {
        icon: "storage",
        title: "Storage",
        body: "Buckets, share links that expire, and space used over time, biggest folders first.",
      },
      {
        icon: "globe",
        title: "DNS",
        body: "Zones and records on every Technitium server, with out-of-sync copies flagged.",
      },
      {
        icon: "workflow",
        title: "Ansible",
        body: "Playbooks with a visual builder, a check of every host before the run, and live output.",
      },
      {
        icon: "code",
        title: "Scripts",
        body: "Save a script once and run it on any set of servers, with every output kept.",
      },
      {
        icon: "clock",
        title: "Scheduled jobs",
        body: "Syncs, archives, backup checks and reboots on a schedule, with a history of every run.",
      },
      {
        icon: "network",
        title: "Network map",
        body: "See which servers can reach which, and what's open to the outside.",
      },
      {
        icon: "grid",
        title: "Service launcher",
        body: "Your team's web tools in one place. Shared logins are shown only to people allowed to see them.",
      },
      {
        icon: "video",
        title: "Terminal recordings",
        body: "Replay any terminal session later. Output only, never what was typed.",
      },
      {
        icon: "users",
        title: "Workspaces and access",
        body: "A workspace per team or customer, and Viewer, Operator, Engineer or Owner for each person.",
      },
      {
        icon: "phone",
        title: "An app on your phone",
        body: "Full-screen views, bottom sheets and the terminal, built for a thumb.",
      },
    ],
  },
  security: {
    title: "It all stays inside your walls.",
    lead: "Morche runs on your servers and talks to your machines over SSH. There's no outside service in the middle, and nothing to install on the servers you add.",
    points: [
      {
        icon: "server",
        title: "Self-hosted",
        body: "Your data, credentials and logs stay on your own servers.",
      },
      {
        icon: "plug",
        title: "No agents",
        body: "It works over plain SSH. Nothing gets installed on your servers.",
      },
      {
        icon: "key",
        title: "Encrypted secrets",
        body: "Passwords and keys are encrypted with a key only you hold.",
      },
      {
        icon: "users",
        title: "Only the access a job needs",
        body: "Set each person's level per workspace, server or storage. The server enforces it, not just the screen.",
      },
      {
        icon: "eye",
        title: "A clear trail",
        body: "Every password reveal is logged, and terminal sessions can be recorded.",
      },
      {
        icon: "code",
        title: "Open source",
        body: "Read every line that touches your servers, on GitHub. No black box, no licence server.",
      },
    ],
  },
  start: {
    title: "Three steps to your own cloud.",
    steps: [
      {
        title: "Install it on one server",
        body: "One script and Docker Compose: PostgreSQL, Redis, the backend and the panel, from public images.",
      },
      {
        title: "Add your servers",
        body: "Connect each one with an SSH key or a password. Morche checks the connection and starts watching right away.",
      },
      {
        title: "Bring your team",
        body: "Invite people, put them in groups and give each one the access they need.",
      },
    ],
    copy: "Copy",
    copied: "Copied",
    codeLabel: "Install commands",
  },
  faq: {
    title: "Questions teams ask us",
    items: [
      {
        q: "Does any of our data leave our network?",
        a: "No. Morche runs on your own server and connects only to the machines and services you add to it.",
      },
      {
        q: "Do we need to install anything on our servers?",
        a: "No. Morche connects over SSH with a key or a password. Some features use tools most Linux servers already have, like systemd or ufw, and Morche tells you when one is missing.",
      },
      {
        q: "What does it work with?",
        a: "Linux servers; PostgreSQL, MySQL, MariaDB, SQL Server, MongoDB and Redis; S3 and S3-compatible storage, FTP/FTPS, SFTP and WebDAV; and Technitium for DNS.",
      },
      {
        q: "Can several teams or customers share one installation?",
        a: "Yes. Each workspace has its own servers, storage and people, and access can be set for a whole workspace or for a single server.",
      },
      {
        q: "Is it really free and open source?",
        a: "Yes. The backend, the panel and the Docker setup are all public on GitHub. Install it, read the code, open an issue or send a pull request.",
      },
      {
        q: "Does it work on a phone?",
        a: "Yes. On a phone the panel behaves like a native app, terminal and file manager included.",
      },
      {
        q: "How do we get started?",
        a: "Clone the morche repository on any Linux server with Docker and run ./install.sh. It takes about ten minutes, and the install guide covers HTTPS, updates and backups.",
      },
    ],
  },
  cta: {
    title: "Bring your servers home.",
    body: "Free and open source. One script on any Linux server with Docker, and it's yours.",
    button: "Install Morche",
    github: "Star it on GitHub",
    or: "Questions? Write to",
  },
  footer: {
    tagline: "An open-source private cloud for organizations.",
    built: "Open source, built in the open.",
  },
  pages: {
    product: "Product",
    security: "Security",
    install: "Install",
    docs: "Docs",
    tutorials: "Tutorials",
    faq: "Questions",
  },
  footerCols: {
    product: "Product",
    resources: "Resources",
    tutorials: "Tutorials",
    allTutorials: "All tutorials",
    source: "Open source",
    contact: "Contact",
    gettingStarted: "Getting started",
    issues: "Report an issue",
    repos: { morche: "Docker setup", backend: "Backend", frontend: "Panel" },
  },
  home: {
    featuresMore: "See everything Morche does",
    securityMore: "How Morche keeps you safe",
    startMore: "Read the install guide",
    docs: {
      title: "Answers before you ask.",
      body: "Every feature ships with a guide: what it does, how to use it, recommended settings and what to do when something goes wrong. These are the same guides the panel opens from its help button.",
      button: "Browse the docs",
      count: "guides",
      sections: "sections",
      minutes: "minutes of reading",
    },
  },
  product: {
    description:
      "Servers, databases, storage, DNS, reverse proxy, containers, automation and access: everything Morche does, area by area.",
    title: "Everything your team runs, in one panel.",
    lead: "Morche starts with your servers and grows into the rest of your infrastructure. Here is what each part does.",
    guides: "Guides",
    areas: [
      {
        id: "servers",
        title: "Servers",
        lead: "Every Linux server you can reach over SSH, with its whole toolbox one click away.",
        points: [
          "Live CPU, memory, disk and network, every second",
          "A terminal with tabs that survive a reload, and a file manager with an editor",
          "Firewall, fail2ban, users, packages, services and processes in plain forms",
          "Folders, tags and favourites, and a map of which server can reach which",
        ],
        guides: [
          "servers",
          "terminal",
          "files",
          "firewall",
          "packages",
          "processes",
        ],
      },
      {
        id: "databases",
        title: "Databases",
        lead: "Six engines watched from one place: what's slow, what's blocked, who's connected and how much room is left.",
        points: [
          "Sessions, slow queries, locks and replication lag, refreshed live",
          "Explain a query without running it, or end a stuck session",
          "Scheduled backups, full or incremental, to several storages at once",
          "Restores that take a safety backup first",
        ],
        guides: ["databases", "alerts"],
      },
      {
        id: "storage",
        title: "Storage",
        lead: "S3, FTP, SFTP and WebDAV in the same file manager you use on servers.",
        points: [
          "Buckets, share links that expire, lifecycle and access rules",
          "Syncs and migrations between storages, even the moment a folder changes",
          "Space used over time, biggest folders first",
          "Send files from any server to any storage, streamed by Morche",
        ],
        guides: ["storage", "tasks"],
      },
      {
        id: "dns",
        title: "DNS and reverse proxy",
        lead: "Zones on every Technitium server, and nginx sites with HTTPS, caching and a firewall, without hand-written config.",
        points: [
          "Every zone on one screen, out-of-sync copies flagged",
          "Proxy sites, redirects and load balancing in plain forms",
          "Certificates from Let's Encrypt and other ACME providers",
          "Every config tested before nginx reloads",
        ],
        guides: ["dns", "reverse-proxy", "network-map"],
      },
      {
        id: "automation",
        title: "Automation",
        lead: "Do a thing once, then on fifty servers, then every night.",
        points: [
          "Ansible playbooks with a visual builder and live output",
          "Saved scripts run on any set of servers, every output kept",
          "Scheduled syncs, archives, backup checks, upgrades and reboots",
          "Software installed and kept up to date from a catalog",
        ],
        guides: ["ansible", "scripts", "cronjobs", "applications"],
      },
      {
        id: "team",
        title: "Team and access",
        lead: "A workspace per team or customer, and exactly the access each person's job needs.",
        points: [
          "Viewer, Operator, Engineer or Owner, per workspace, server or storage",
          "Groups, sign-up approvals and sign-in alerts",
          "A log of every command Morche runs and every terminal typed in",
          "Shared web logins shown only to people allowed to see them",
        ],
        guides: [
          "access",
          "command-log",
          "terminal-recordings",
          "service-launcher",
        ],
      },
    ],
    moreTitle: "And a lot more in the box",
    more: [
      {
        guide: "containers",
        title: "Containers",
        body: "Docker and Podman projects, images, volumes, updates and security scans.",
      },
      {
        guide: "virtual-machines",
        title: "Virtual machines",
        body: "Proxmox VMs and containers: console, snapshots, backups and hardware.",
      },
      {
        guide: "cloud",
        title: "Cloud servers",
        body: "Servers rented from cloud providers, managed through their API.",
      },
      {
        guide: "monitoring",
        title: "Monitoring",
        body: "Twenty kinds of checks, from websites to message queues, from several places.",
      },
      {
        guide: "alerts",
        title: "Alerts",
        body: "Rules on CPU, disks, services and databases, sent to email, Telegram, Slack and more.",
      },
      {
        guide: "server-metrics",
        title: "Metrics history",
        body: "Thirty days of CPU, memory, disk and network, with your limits drawn in.",
      },
      {
        guide: "log-retention",
        title: "Logs and archives",
        body: "Keep logs as long as you need, then archive them to a storage.",
      },
      {
        guide: "server-notes",
        title: "Server notes",
        body: "Notes in Markdown beside each server, pinned ones on its overview.",
      },
    ],
  },
  securityPage: {
    description:
      "How Morche protects your infrastructure: self-hosted, no agents, four access levels enforced by the server, sign-in security, a full audit trail and changes that undo themselves.",
    title: "Built for teams that can't afford a mistake.",
    lead: "Morche runs inside your network, enforces every permission on the server and keeps a record of what happened. Here is how.",
    levels: {
      title: "Four levels, set where they matter",
      body: "Give a person or a group a level for a whole workspace, or for one server, storage or service. The panel hides what a level can't do, and the backend refuses it anyway.",
      items: [
        {
          name: "Viewer",
          body: "Sees status, lists and reports. Changes nothing.",
        },
        {
          name: "Operator",
          body: "Runs checks, restarts services, reads logs and sessions.",
        },
        {
          name: "Engineer",
          body: "Changes configuration: firewall, files, containers, playbooks.",
        },
        {
          name: "Owner",
          body: "Manages access, credentials, backups and restores.",
        },
      ],
    },
    topics: [
      {
        id: "sign-in",
        icon: "lock",
        title: "Sign-in security",
        guide: "access",
        items: [
          "Allow sign-ins only from your office's address ranges",
          "See every session, and end any of them",
          "A record of every sign-in, failed ones included",
          "A “Was it you?” alert for a new device or place",
        ],
      },
      {
        id: "trail",
        icon: "scroll",
        title: "A trail of who did what",
        guide: "command-log",
        items: [
          "Every SSH command Morche runs, and every command typed in its terminals",
          "Terminal sessions recorded for replay, output only",
          "Every reveal of a shared password logged",
          "Kept as long as you need, then archived to a storage",
        ],
      },
      {
        id: "secrets",
        icon: "key",
        title: "Secrets stay secret",
        guide: "access",
        items: [
          "SSH keys, passwords and tokens encrypted with a key only you hold",
          "Masked until someone allowed to see them asks",
          "Never sent to the browser in lists",
          "A session cookie only: nothing kept in the browser's scripts",
        ],
      },
      {
        id: "safe",
        icon: "undo",
        title: "Changes that can be undone",
        guide: "firewall",
        items: [
          "A firewall change that cuts you off rolls back by itself",
          "nginx config tested before it reloads",
          "Package changes simulated and reviewed before they run",
          "A safety backup before a database restore",
        ],
      },
    ],
    readGuide: "Read the guide",
  },
  install: {
    description:
      "Install Morche on your own Linux server with Docker: requirements, the installer, the first admin, HTTPS, updates and backups.",
    title: "Running on your server in ten minutes.",
    lead: "One script on any Linux server with Docker, from public images built from the open-source code. You keep everything: the data, the keys and the updates.",
    needsTitle: "What you need",
    needs: [
      "A Linux server with Docker 24 or newer and the compose plugin",
      "2 GB of memory and 10 GB of disk",
      "Ports 3200 (panel) and 8080 (API) open, or a reverse proxy in front",
      "SSH from it to the servers you'll add",
    ],
    stepsTitle: "Install",
    steps: [
      {
        title: "Download Morche",
        body: "Clone the release repository on the server.",
        code: "git clone https://github.com/morcheh-cloud/morche.git\ncd morche",
      },
      {
        title: "Run the installer",
        body: "It asks for the address people will reach the panel at, writes .env with fresh secrets, starts every service and prints a setup token.",
        code: "./install.sh",
      },
      {
        title: "Create the first admin",
        body: "Open the panel at that address on port 3200. The first visit asks for the setup token, then your admin account.",
        code: "",
      },
      {
        title: "Add your servers",
        body: "Add each one with an SSH key or a password. Morche checks the connection and starts watching right away.",
        code: "",
      },
    ],
    afterTitle: "After installing",
    after: [
      {
        id: "secrets",
        title: "Keep a copy of SECRETS_KEY",
        body: "It encrypts every stored password and key. Without it they can't be read, so keep a copy of .env somewhere other than this server.",
        code: "",
      },
      {
        id: "https",
        title: "Put it behind HTTPS",
        body: "Use any reverse proxy, with one name for the panel and one for the API, then set PANEL_URL and API_URL in .env to those addresses.",
        code: "",
      },
      {
        id: "update",
        title: "Update",
        body: "Pin MORCHE_VERSION in .env if you like, then pull and restart.",
        code: "docker compose pull\ndocker compose up -d",
      },
      {
        id: "backup",
        title: "Back up",
        body: "Two things matter: the database and .env.",
        code: "docker compose exec -T postgres pg_dump -U morche morche | gzip > morche-$(date +%F).sql.gz\ncp .env /somewhere/safe/",
      },
    ],
    settingsTitle: "Settings in .env",
    settingsHead: ["Setting", "What it does"],
    settings: [
      ["MORCHE_VERSION", "Which release to run (default: the latest)."],
      ["PANEL_URL", "The panel's address, as people open it."],
      ["API_URL", "The API's address, as the browser reaches it."],
      ["SECRETS_KEY", "Encrypts stored credentials. Keep a copy."],
      ["COOKIE_INSECURE", "Allow sign-in over plain http (testing only)."],
      ["TRUST_PROXY", "Read the visitor's address from your reverse proxy."],
      ["TZ", "Time zone for schedules and reports."],
    ],
    copy: "Copy",
    copied: "Copied",
    help: "Stuck? Open",
    helpOr: "or write to",
    readme: "Full guide in the repository",
    issue: "an issue on GitHub",
  },
  docs: {
    title: "Documentation",
    description:
      "Every guide from Morche's help center: what each feature does, how to use it, recommended settings and troubleshooting.",
    lead: "Every guide from the panel's help center: what each feature does, how to use it and what to do when something goes wrong.",
    search: "Search the guides",
    searchShort: "Search",
    placeholder: "Search the guides…",
    empty: "Nothing matches that. Try fewer or other words.",
    loading: "Loading the guides…",
    failed: "The search couldn't load. Check your connection and try again.",
    hint: "Type a feature, a task or a problem.",
    guides: "guides",
    sections: "sections",
    minutes: "min read",
    onThisPage: "On this page",
    allGuides: "All guides",
    previous: "Previous",
    next: "Next",
    copyLink: "Copy link to this section",
    groups: {
      Basics: "Basics",
      "On a server": "On a server",
      Infrastructure: "Infrastructure",
      Storage: "Storage",
      Administration: "Administration",
    } as Record<string, string>,
  },
  tutorials: {
    title: "Server management tutorials",
    description:
      "Practical tutorials for running Linux servers: file sync to S3, MinIO and FTP, backups, monitoring, alerts, nginx, Docker, security and automation, step by step.",
    lead: "Practical, step-by-step tutorials for the jobs every ops team repeats: syncing files, backups, monitoring, alerts, nginx, Docker, security and automation. Each one explains the task itself, then shows how to do it in Morche.",
    topics: "Topics",
    latest: "Latest tutorials",
    all: "All tutorials",
    tutorials: "tutorials",
    minutes: "min read",
    updated: "Updated",
    onThisPage: "On this page",
    related: "Related tutorials",
    inDocs: "In the Morche docs",
    inDocsBody:
      "The reference guides behind this tutorial: every option, default and limit.",
    tagged: "Tagged",
    topicDocs: "Reference guides for this topic",
    moreIn: "More in",
    tagTitle: "Tutorials tagged",
    forGuide: "Tutorials for this feature",
    tryIt: "Try it on your own servers",
    tryItBody:
      "Morche is free and open source. One script on any Linux server with Docker and it's yours.",
    install: "Install Morche",
    browse: "Browse all tutorials",
  },
  notFound: {
    title: "This tunnel doesn't lead anywhere.",
    body: "The page you're looking for isn't here.",
    back: "Back to the home page",
  },
}

export type Dictionary = typeof copy
