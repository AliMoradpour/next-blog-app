import Spinner from "@/ui/Spinner";

const loading = () => {
  return (
    <div className="flex flex-col items-center gap-x-4">
      <span className="text-lg text-secondary-500">درحال بارگذاری پست ها</span>
      <Spinner />
    </div>
  );
};

export default loading;
