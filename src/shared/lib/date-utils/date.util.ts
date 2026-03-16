export function formatRelativeOrNZDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 10) return "just now";
  if (diffSec < 60) return `${diffSec} seconds ago`;
  if (diffMin < 60) return `${diffMin} minutes ago`;
  if (diffHour < 24) return `${diffHour} hours ago`;
  if (diffDay < 7) return `${diffDay} days ago`;

  // NZ format: DD/MM/YYYY, HH:mm (24-hour)
  const nzDate = new Date(
    date.toLocaleString("en-NZ", { timeZone: "Pacific/Auckland" }),
  );
  const day = nzDate.getDate().toString().padStart(2, "0");
  const month = (nzDate.getMonth() + 1).toString().padStart(2, "0");
  const year = nzDate.getFullYear();
  //   const hours = nzDate.getHours().toString().padStart(2, "0");
  //   const minutes = nzDate.getMinutes().toString().padStart(2, "0");
  return `${day}/${month}/${year}`;
}
