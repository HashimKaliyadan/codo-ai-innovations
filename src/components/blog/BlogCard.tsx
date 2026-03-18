export const BlogCard = ({ title, date }: { title: string, date: string }) => {
  return (
    <div className="border-b py-6 last:border-0">
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-sm text-gray-500 mt-2">{date}</p>
    </div>
  );
};
