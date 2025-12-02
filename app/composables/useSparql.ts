export const useSparqlSelect = async (query: string, { format = 'application/sparql-results+json', method = 'GET' } = {}) => {
  const apiEndpoint = useGetPrezAPIEndpoint();
  const params = new URLSearchParams();
    params.append('query', query);
    params.append('format', format);
    const response = await fetch(`${apiEndpoint}${apiEndpoint.endsWith('/') ? '' : '/'}sparql?${params}`, {
      method: method,
      headers: {
        'Accept': format,
      }
    });
    return response.json();
};