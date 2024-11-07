export default async function sitemap() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/directories?limit=10000`
  );
  const { results } = await response.json();

	const directoryEntries = results.map(({slug}) => ({
		url: `https://www.myperfectai.app/directories/${slug}`
	}))

  return [
    {
      url: `https://www.myperfectai.app/`,
    },
		...directoryEntries
  ];
}
