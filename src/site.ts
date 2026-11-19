// Facts about the site that aren't translated. Change these before launch.
const org = "https://github.com/morcheh-cloud"
const deploy = `${org}/.github`
const installer =
  "https://raw.githubusercontent.com/morcheh-cloud/.github/main/install.sh"
const serverInstall = `curl -fsSL ${installer} | sh`

export const site = {
  name: "Morche",
  // Contact inbox. Replace with the real one.
  email: "hello@morche.ir",
  // Absolute origin, used for canonical links and social previews.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://morche.cloud",
  // The public demo (../morche/demo); ?demo=1 signs the visitor in at once.
  demo: `${process.env.NEXT_PUBLIC_DEMO_URL ?? "https://demo.morche.cloud"}/login?demo=1`,
  // Morche is open source: the organization and its repositories.
  github: {
    org,
    morche: `${org}/morche`,
    backend: `${org}/backend`,
    frontend: `${org}/frontend`,
    issues: `${org}/morche/issues`,
  },
  install: {
    server: serverInstall,
    quickStart: `${serverInstall} -s -- --quick-start`,
    withHost: `curl -fsSL ${installer} | MORCHE_HOST=panel.example.com sh`,
    clone: `git clone ${deploy}.git morche\ncd morche`,
    readme: `${deploy}/blob/main/README.md`,
    compose: `${deploy}/blob/main/compose.yml`,
  },
}
