"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

interface InfiniteScrollProps<T> {
  initialData: T[];
  fetchMoreFn: (page: number) => Promise<T[]>;
  renderItem: (item: T) => ReactNode;
  className?: string;
}

export default function InfiniteScroll<T extends { id: number }>({
  initialData,
  fetchMoreFn,
  renderItem,
  className = "p-5 flex flex-col gap-5",
}: InfiniteScrollProps<T>) {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const trigger = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      async (
        entries: IntersectionObserverEntry[],
        observer: IntersectionObserver
      ) => {
        const element = entries[0];
        if (element.isIntersecting && trigger.current) {
          observer.unobserve(trigger.current);
          setIsLoading(true);

          const newData = await fetchMoreFn(page + 1);

          if (newData.length !== 0) {
            setPage((prev) => prev + 1);
            setData((prev) => [...prev, ...newData]);
          } else {
            setIsLastPage(true);
          }
          setIsLoading(false);
        }
      },
      {
        threshold: 1.0,
      }
    );

    if (trigger.current) {
      observer.observe(trigger.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [page]);

  return (
    <div className={className}>
      {data.map((item) => renderItem(item))}
      {!isLastPage ? (
        <span
          ref={trigger}
          style={{
            marginTop: `${page + 1}vh`,
          }}
          className="mb-96 text-sm font-semibold bg-neutral-300 w-fit mx-auto px-3 py-2 rounded-md hover:opacity-90 active:scale-95"
        >
          {isLoading ? "로딩 중" : "Load more"}
        </span>
      ) : null}
    </div>
  );
}
