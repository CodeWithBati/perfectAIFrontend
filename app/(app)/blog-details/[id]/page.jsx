import BlogDetail from '@/app/src/components/Blog/BlogDetail';
import axios from "axios";

export async function generateMetadata({ params: { id } }) {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/blogs/${id}`
  );

  const title = `${response.data.title}`
  const description = response.data.content.replace(/<[^>]+>/g, "")
  const dirImage = response.data.cover

  return {
    title: title,
    description: description,
    openGraph: {
      images: [dirImage]
    }
  };
}

const BlogDetails = () => {
  return (
    <BlogDetail />
  );
};

export default BlogDetails;
