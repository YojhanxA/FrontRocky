import React from "react";

export const Pagination = ({
  page,
  setPage,
  perPage,
  pageRowsLength,
  totalPages,
  filteredCount,
}) => {
  const from = (page - 1) * perPage + (pageRowsLength ? 1 : 0);
  const to = (page - 1) * perPage + pageRowsLength;

  return (
    <div className="af-foot">
      <div>
        Mostrando <strong>{from}</strong> - <strong>{to}</strong> de{" "}
        <strong>{filteredCount}</strong>
      </div>
      <div className="af-pager">
        <button onClick={() => setPage(1)} disabled={page === 1}>
          «
        </button>
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          ‹
        </button>
        <button disabled>
          {" "}
          Página {page}/{totalPages}{" "}
        </button>
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
        >
          ›
        </button>
        <button
          onClick={() => setPage(totalPages)}
          disabled={page === totalPages}
        >
          »
        </button>
      </div>
    </div>
  );
};
