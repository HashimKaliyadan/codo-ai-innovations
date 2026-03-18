export default function ProjectDetails({ params }: { params: { slug: string } }) {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold">Project: {params.slug}</h1>
    </div>
  );
}
