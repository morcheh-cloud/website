export const en = {
  meta: {
    title: "Morcheh: a private cloud on your own servers",
    description:
      "Morcheh is a private cloud that installs on your organization's servers and runs your team's whole infrastructure from one panel: servers, databases, storage, DNS, backups and access.",
  },
  brand: "Morcheh",
  nav: {
    label: "Main",
    tour: "Tour",
    features: "Features",
    security: "Security",
    start: "Get started",
    faq: "Questions",
    demo: "Request a demo",
    menu: "Open menu",
    close: "Close menu",
    home: "Morcheh home",
    switchTo: "فارسی",
    switchLabel: "نسخه‌ی فارسی",
  },
  hero: {
    title: "Your own cloud, on your own servers.",
    lead: "Morcheh installs on your organization's servers and runs everything your team manages from one panel: servers, databases, storage, DNS, backups and access.",
    primary: "Request a demo",
    secondary: "See it in action",
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
    "Most teams run their servers from `PuTTY`, a shared `passwords.xlsx`, crontabs nobody remembers, a separate tool for every database and a chat group for alerts. Morcheh puts all of it in one place, and gives each person exactly the access their job needs.",
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
    lead: "Morcheh runs on your servers and talks to your machines over SSH. There's no outside service in the middle, and nothing to install on the servers you add.",
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
        icon: "undo",
        title: "No locking yourself out",
        body: "A firewall change that cuts off your access undoes itself.",
      },
    ],
  },
  start: {
    title: "Three steps to your own cloud.",
    steps: [
      {
        title: "Install it on one server",
        body: "Morcheh ships as Docker Compose: PostgreSQL, Redis, the backend and the panel.",
      },
      {
        title: "Add your servers",
        body: "Connect each one with an SSH key or a password. Morcheh checks the connection and starts watching right away.",
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
        a: "No. Morcheh runs on your own server and connects only to the machines and services you add to it.",
      },
      {
        q: "Do we need to install anything on our servers?",
        a: "No. Morcheh connects over SSH with a key or a password. Some features use tools most Linux servers already have, like systemd or ufw, and Morcheh tells you when one is missing.",
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
        q: "Does it work on a phone?",
        a: "Yes. On a phone the panel behaves like a native app, terminal and file manager included.",
      },
      {
        q: "How do we get started?",
        a: "Request a demo. We'll walk through it with your team and set it up on your own servers.",
      },
    ],
  },
  cta: {
    title: "Bring your servers home.",
    body: "Tell us about your infrastructure and we'll show you Morcheh running on it.",
    button: "Request a demo",
    or: "or write to",
    subject: "Morcheh demo request",
  },
  footer: {
    tagline: "A private cloud for organizations.",
    rights: "All rights reserved.",
  },
  notFound: {
    title: "This tunnel doesn't lead anywhere.",
    body: "The page you're looking for isn't here.",
    back: "Back to the home page",
  },
}

export type Dictionary = typeof en
