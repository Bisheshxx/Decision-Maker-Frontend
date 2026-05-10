import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(90,120,255,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(45,212,191,0.14),transparent_30%),linear-gradient(to_bottom_right,rgba(255,255,255,0.02),transparent)] dark:bg-[radial-gradient(circle_at_top_left,rgba(90,120,255,0.22),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(45,212,191,0.12),transparent_30%),linear-gradient(to_bottom_right,rgba(255,255,255,0.03),transparent)]" />
      <div className="absolute inset-0 -z-10 opacity-40 bg-[linear-gradient(rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.12)_1px,transparent_1px)] bg-size-[56px_56px]" />

      <div className="mx-auto flex min-h-screen w-full max-w-4xl items-center justify-center px-6 py-16">
        <section className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-border/70 bg-card/80 p-8 shadow-2xl backdrop-blur md:p-12">
          <div className="absolute inset-x-10 top-0 h-px bg-linear-to-r from-transparent via-primary/70 to-transparent" />

          <div className="flex flex-col gap-8 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border border-border bg-background/80 text-3xl font-semibold tracking-tight text-primary shadow-sm">
              404
            </div>

            <div className="space-y-3">
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">
                Page not found
              </p>
              <h1 className="text-balance text-3xl font-semibold tracking-tight md:text-5xl">
                The page you&apos;re looking for doesn&apos;t exist.
              </h1>
              <p className="mx-auto max-w-xl text-pretty text-sm leading-6 text-muted-foreground md:text-base">
                The link may be broken, the page may have moved, or the address
                may be wrong.
              </p>
            </div>

            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" className="min-w-40">
                <Link href="/dashboard">Go to dashboard</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="min-w-40">
                <Link href="/login">Back to login</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
