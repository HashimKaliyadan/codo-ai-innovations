export const PortfolioCard = ({ title, category }: { title: string, category: string }) => {
  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="h-48 bg-gray-200 dark:bg-gray-700"></div>
      <div className="p-4">
        <h3 className="font-bold">{title}</h3>
        <p className="text-sm text-gray-500">{category}</p>
      </div>
    </div>
  );
};
