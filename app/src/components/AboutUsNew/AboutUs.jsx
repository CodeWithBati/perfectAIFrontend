import Image from "next/image"
import Header from "../../layout/Header/HeaderNew"
import blog1 from '../../../../public/images/blog1.jpeg'
import Footer from "../../layout/FooterNew"


function AboutUs() {
  return (
    <section className="relative flex flex-col items-center justify-center min-w-screen min-h-screen pt-20 lg:pt-32 pb-16 text-white bg-center bg-no-repeat bg-[#181C1F] lg:bg-cover bg-[url('/images/mobileSomeBg.png')] lg:bg-[url('/images/someBg.png')]">


      <div className="min-h-screen text-white">
        <div className="lg:max-w-4xl w-full mx-auto px-[30px] lg:px-6">
          {/* About Us Section */}
          <section className="text-center mb-8 lg:mb-16">
            <h1 className="text-4xl font-bold mb-6">About us</h1>
            <p className="text-lg">
              Moreover, technological marvels have transformed our behavior. For instance, many of us now prefer online
              shopping over buying products from brick-and-mortar stores. Basically, people don&apos;t have enough time to
              physically visit local markets, explore dozens of shops, and purchase the required products.
            </p>
            <p className="text-lg mt-4">
              Although online shopping was already convenient and stress-free, the incorporation of modern technologies,
              especially visual search, has made it much easier than ever. This article will discuss visual search
              technology and how it&apos;s transforming the online shopping experience.
            </p>
          </section>

          {/* Image */}
          <div className=" mb-8 lg:mb-16">
            <Image
              src={blog1} // Assuming the image is located in the public folder
              alt="Visual Search"
              width={800}
              height={550}
              className="w-full object-cover rounded-lg"
            />
          </div>

          {/* Visual Search Section */}
          <section>
            <h2 className="text-2xl lg:text-3xl font-bold mb-6">What is Visual Search?</h2>
            <p className="text-base lg:text-lg mb-4">
              Visual search is a modern method of retrieving data from search engines and other databases. In this method,
              netizens use a digital image instead of text-based keywords as a search query.
            </p>
            <p className="text-base lg:text-lg mb-4">
              Once a user uploads a photo on a visual search engine, it analyzes all the elements of the source photo and
              searches for similar images uploaded online. This particular technology has made online searches quicker and
              more accurate.
            </p>
            <p className="text-base lg:text-lg mb-4">
              For instance, if you have a photo of an unknown bird and want to know about it, just upload the source photo
              to an AI-powered reverse image search engine. That engine will analyze the photo elements and show you links
              to web pages where similar images have been uploaded.
            </p>
            <p className="text-base lg:text-lg mb-4">
              Visual search engines use AI technology, especially computer vision, deep neural networks, and machine
              learning technology, to analyze and interpret photos. These subsets of AI help them perfectly identify all
              the elements and show you the correct output on your screens.
            </p>
          </section>
          <section>

            <h2 className="text-2xl lg:text-3xl font-bold mb-6">Impact of Visual Search on Online Shopping</h2>
            <p className="text-base lg:text-lg mb-4">
              Visual search has significantly improved online shoppers shopping experience. From finding the right products to comparing prices and avoiding scams, it offers consumers many benefits. Have a look at a few of the blessings of visual search in online shopping.


            </p>
            <h3 className="text-xl font-bold mb-6" >1. Discover Reviews</h3>
            <p className="text-base lg:text-lg mb-4 ">
              Online shoppers can easily find authentic and detailed reviews about different products using a modern reverse im search tool. Generally, e-commerce store owners add fake reviews to their websites to win consumer&apos;s trust. These
            </p>
          </section>
        </div>
      </div>

    </section>

  )
}

export default AboutUs
