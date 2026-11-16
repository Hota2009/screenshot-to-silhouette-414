import { createFileRoute, notFound } from "@tanstack/react-router";
import { seoHead } from "@/lib/seo";
import { ServicePage } from "@/components/site/ServicePage";
import { serviceId } from "@/lib/service-routes";

export const Route = createFileRoute("/services/$slug")({
  loaderDeps: ({ search }) => ({ lang: search.lang ?? ("en" as const) }),
  loader: ({ params, deps }) => {
    const id = serviceId(params.slug);
    if (!id) throw notFound();
    return { id, lang: deps.lang };
  },
  head: ({ loaderData }) =>
    loaderData
      ? seoHead(loaderData.lang, loaderData.id)
      : { meta: [{ name: "robots", content: "noindex, follow" }] },
  component: ServiceRoute,
});

function ServiceRoute() {
  const { id } = Route.useLoaderData();
  return <ServicePage id={id} />;
}
