export const getPagination = (page?: string, limit?: string) => {
  const safePage = Math.max(1, Number(page || 1));
  const safeLimit = Math.max(1, Math.min(20, Number(limit || 10)));

  return {
    page: safePage,
    limit: safeLimit,
    skip: (safePage - 1) * safeLimit
  };
};
