export const SectionTitle = ({ title, subtitle }: { title: string, subtitle?: string }) => {
  return (
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold">{title}</h2>
      {subtitle && <p className="mt-4 text-gray-600 dark:text-gray-400">{subtitle}</p>}
    </div>
  );
};
