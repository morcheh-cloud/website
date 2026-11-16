import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import type { Dictionary } from "@/copy"

export function Faq({ t }: { t: Dictionary }) {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="px-5 py-20 sm:px-8 sm:py-32"
    >
      <div className="mx-auto max-w-3xl">
        <h2 id="faq-title" className="t-title text-center">
          {t.faq.title}
        </h2>
        <Accordion className="mt-12 grid gap-2 sm:mt-16">
          {t.faq.items.map((item) => (
            <AccordionItem
              key={item.q}
              value={item.q}
              className="rounded-2xl border border-line bg-surface/60 px-5 transition-colors data-[open]:border-white/12 data-[open]:bg-surface sm:px-7"
            >
              <AccordionTrigger className="gap-6 rounded-none py-5 font-medium text-[1.0625rem] text-lumen hover:no-underline focus-visible:ring-0 **:data-[slot=accordion-trigger-icon]:mt-1.5 **:data-[slot=accordion-trigger-icon]:text-dust">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="max-w-[62ch] pb-6 text-base text-dust leading-relaxed">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
