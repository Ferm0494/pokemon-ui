export const sanitizeURLQueryPaginationParams = (params: {
  limit?: string | string[];
  offset?: string | string[];
}) => {
  const limit = params.limit
    ? parseInt(Array.isArray(params.limit) ? params.limit[0] : params.limit)
    : 12;
  const offset = params.offset
    ? parseInt(Array.isArray(params.offset) ? params.offset[0] : params.offset)
    : 0;

  return { limit, offset };
};
