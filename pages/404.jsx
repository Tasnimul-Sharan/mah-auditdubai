import Custom404 from "@/components/Custom404";

export default function NotFoundPage() {
  return <Custom404 />;
}

NotFoundPage.getLayout = (page) => page;