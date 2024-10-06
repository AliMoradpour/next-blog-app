"use client";
import useMoveBack from "@/hooks/useMoveBack";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

function NotFound() {
    const moveBack = useMoveBack();

  return (
    <div className="h-screen">
      <div className="container xl:max-w-screen-xl">
        <div className="flex justify-center pt-10">
          <div>
            <p className="text-xl font-bold text-secondary-700 mb-8">هیچ پستی با این مشخصات یافت نشد</p>
            <Link href="/blogs" className="inline-flex text-secondary-500 bg-primary-100 rounded-md px-4 py-2">
            رفتن به صفحه پست ها
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default NotFound;
