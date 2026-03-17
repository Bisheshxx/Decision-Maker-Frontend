import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

interface IProps {
  setSearch: Dispatch<SetStateAction<string>>;
  search: string;
}

export default function SearchInput({ search, setSearch }: IProps) {
  return (
    <div className="relative">
      <Input
        className="md:w-[230px] w-[150px] text-xs md:text-xs h-[26px] pl-7"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        placeholder="Search for a decision"
      />
      <Search size={20} className="absolute top-0 h-[26px] pl-2" />
    </div>
  );
}
