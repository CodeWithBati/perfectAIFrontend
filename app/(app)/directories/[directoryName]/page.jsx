import React from "react";
import DirectivesOverview from "@/app/src/components/Directives/DirectivesOverview";
import { usePathname } from "next/navigation";
import { capitalizeAllWords } from "@/app/src/utilities/helperfunctions";
import Head from "next/head";
import axios from "axios";
import Directory from "@/app/src/components/DirectoryNew/Directory";

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

const DirectivePage = () => {
  return (
    <>
      <Directory />
      {/* <DirectivesOverview /> */}
    </>
  );
};

export default DirectivePage;
