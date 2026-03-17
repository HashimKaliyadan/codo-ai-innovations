export const JobCard = ({ title, location }: { title: string, location: string }) => {
  return (
    <div className="border p-6 rounded-lg flex justify-between items-center">
      <div>
        <h3 className="font-bold">{title}</h3>
        <p className="text-sm text-gray-500">{location}</p>
      </div>
      <button className="text-blue-600 font-medium">Apply Now</button>
    </div>
  );
};
