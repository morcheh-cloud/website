// Facts about the site that aren't translated. Change these before launch.
export const site = {
  name: "Morcheh",
  // Where "Request a demo" goes. Replace with the real inbox.
  email: "hello@morcheh.ir",
  // Absolute origin, used for canonical links and social previews.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://morcheh.ir",
}

export function demoHref(subject: string) {
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}`
}
