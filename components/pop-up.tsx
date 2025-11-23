"use client";

export default function Popup({
  message,
  type,
}: {
  message: string | null;
  type: "success" | "error" | null;
}) {
  if (!message || !type) return null;

  return (
    <div
          className={`text-h3 font-semibold text-background items-center justify-center fixed inset-0 flex flex-col w-fit h-fit px-5 py-3 mx-auto my-auto rounded-md ${
            type === "success" ? "bg-green-600" : "bg-red-600"
          } ${
            message ? "scale-100" : "scale-0"
          } smooth transition-all duration-300`}
        >
          <h3>{message}</h3>
        </div>
  );
}
