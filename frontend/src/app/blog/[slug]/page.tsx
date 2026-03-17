export default function BlogPost({ params }: { params: { slug: string } }) {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold">Blog Post: {params.slug}</h1>
    </div>
  );
}
