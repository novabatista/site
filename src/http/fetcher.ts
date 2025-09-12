async function fetcherGet<T=any>(url: string): Promise<T> {
  const request = await fetch(url)
  return request.json();
}

const fetcher = {
  get: fetcherGet,
};

export default fetcher;