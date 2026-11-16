// Facts about the site that aren't translated. Change these before launch.
const org = "https://github.com/morcheh-cloud"

export const site = {
  name: "Morche",
  // Contact inbox. Replace with the real one.
  email: "hello@morche.ir",
  // Absolute origin, used for canonical links and social previews.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://morche.ir",
  // Morche is open source: the organization and its repositories.
  github: {
    org,
    morche: `${org}/morche`,
    backend: `${org}/backend`,
    frontend: `${org}/frontend`,
    issues: `${org}/morche/issues`,
  },
}
