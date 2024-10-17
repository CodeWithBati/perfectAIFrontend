import BlogDetail from '@/app/src/components/Blog/BlogDetail';
import axios from "axios";

// export async function generateMetadata({ params: { directoryName } }) {
//   const response = await axios.get(
//     `${process.env.NEXT_PUBLIC_API_URL}/directories/${directoryName}`
//   );

//   const title = `${response.data.name} Reviews, Alternatives, Pricing, Features, Use Cases`
//   const description = response.data.description.replace(/<[^>]+>/g, "")
//   const dirImage = response.data.icon

//   return {
//     title: title,
//     description: description,
//     openGraph: {
//       images: [dirImage]
//     }
//   };
// }

const BlogDetails = () => {
  return (
    <BlogDetail />
  );
};

export default BlogDetails;
