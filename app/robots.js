
export default function robots(){
	return{
		rules: [
			{
				userAgent: '*',
				allow: '/',
				disallow: ['/dashboard', '/directory-manager', '/chat']
			}
		],
		sitemap: `https://www.myperfectai.app/sitemap.xml`
	}
}