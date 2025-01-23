import { Suspense } from "react";
import CardsWrapper from "./_components/CardsWrapper";
import SpinnerMini from "@/ui/SpinnerMini";
import LatestPost from "./_components/LatestPost";

const Profile = async () => {
  return (
    <div>
      <h1 className="text-xl mb-8 text-secondary-700">داشبورد</h1>
      <Suspense fallback={<SpinnerMini />}>
        <CardsWrapper />
      </Suspense>

      <h2 className="text-xl mb-4 text-secondary-600">آخرین پست ها</h2>
      <Suspense fallback={<SpinnerMini />}>
        <LatestPost />
      </Suspense>
    </div>
  );
};

export default Profile;
