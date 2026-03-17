import ConfirmEmailPage from "@/features/auth/components/confirm-email-component";
import { Suspense } from "react";

export default function page() {
  //localhost:3000/confirm-email?userId=0710f48e-14e2-4d44-9cd2-7c14508fa457&token=CfDJ8FTKI2bjRq1Bj3ESJ6IFWbwFL%2BVXyM26Se2%2Bsthvp5SRiW3AKhoyoF7srDfJeXd2WYP6GnkUAtVxzghjJXZKc1tzCya9%2B40GFy1N7Q%2FfPLh0moGHAtL5axbZpex6GuwshUhDd1GsrcB2AIi2clM%2BkiKNsA673sSn0DSKnNqQ99%2BS6RU8niyKH8E1lkgAhfOBOM26bWyX7OhIW%2BskjVUG%2Bmdds3icjb4dbN9nNZ%2F1h5IY3ye2sXtJWmKs%2FdtJ8jS%2BRQ%3D%3D

  return (
    <Suspense>
      <ConfirmEmailPage />
    </Suspense>
  );
}
