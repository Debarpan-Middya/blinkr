"use client";

import qs from "query-string";
import { useState } from "react";
import { SearchIcon, X } from "lucide-react";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Search = () => {
  const router = useRouter();
  const [value, setValue] = useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!value) return;

    const url = qs.stringifyUrl({
      url: "/search",
      query: { term: value },
    }, { skipEmptyString: true });

    router.push(url);
  };

  const onClear = () => {
    setValue("");
  };

  return (
    <form
      onSubmit={onSubmit}
      className="relative w-full lg:w-[400px] flex items-center gap-2"
    >
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search"
        className="rounded-r focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 border border-white/5 bg-white/5"
      />
      {value && (
        <X
          className="absolute top-2.5 right-14 h-5 w-5 text-muted-foreground cursor-pointer hover:opacity-75 transition"
          onClick={onClear}
        />
      )}
      <Button 
        type="submit"
        size="sm"
        variant="primary"
        className="rounded-md "
      >
        <SearchIcon className="h-5 w-5 text-primary" />
      </Button>
    </form>
  );
};