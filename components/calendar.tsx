
type DayStatus = "HADIR" | "IZIN" | "BOLOS" | null;

interface Props {
  year: number;
  month: number;
  data: Record<number, DayStatus>;
}

export default function Calendar({ year, month, data }: Props) {
  const daysInMonth = new Date(year, month, 0).getDate();

  const getColor = (status: DayStatus) => {
    if (status === "HADIR") return "bg-green-500 text-white";
    if (status === "IZIN") return "bg-yellow-400 text-black";
    if (status === "BOLOS") return "bg-red-500 text-white";
    return "bg-gray-300";
  };

  return (
    <div className="grid grid-cols-7 gap-2 mt-5">
      {Array.from({ length: daysInMonth }, (_, i) => {
        const day = i + 1;
        const status = data[day] || null;

        return (
          <div
            key={day}
            className={`w-full p-3 rounded-lg text-center font-semibold ${getColor(
              status
            )}`}
          >
            {day}
          </div>
        );
      })}
    </div>
  );
}
