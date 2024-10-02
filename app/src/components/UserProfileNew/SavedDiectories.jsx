import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import DirectoresCard from "../../layout/Home/Directories/DirectoresCard";
import { useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import { truncateWithEllipsis } from "@/lib/form";
import Spinner from "@/app/src/ui/Spinner";
import { useRouter } from "next/navigation";
import FeatureCard from "../../layout/HomeNew/FeatureSection/FeatureCard";

const SavedDiectories = () => {
  const { token } = useSelector((state) => state.auth);
  const [savedDirectories, setSavedDirectories] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/saves`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          setSavedDirectories(response.data.results);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [token]);

  const sentToDirectoryView = (dirSlug) => {
    router.push(`/directories/${dirSlug}`);
  };

  const aiToolsData = [
    {
      id: 1,
      title: "GetGenie",
      description: "GetGenie is an AI-powered tool for content creation and SEO, offering over 30 templates for various use cases.",
      pricing: "Freemium",
      rating: 5,
      reviews: 100,
      featured: true,
      verified: true,
      badge: "Featured",
      imageUrl: "/images/feat1.jpeg"
    },
    {
      id: 2,
      title: "Devin AI",
      description: "Devin AI, developed by Cognition Labs, is an advanced AI model that autonomously handles software engineering tasks.",
      pricing: "Free",
      rating: 5,
      reviews: 100,
      featured: true,
      verified: false,
      badge: "Featured",
      imageUrl: "/images/feat2.jpeg"
    },
    {
      id: 3,
      title: "Taranis",
      description: "Taranis is an AI-powered crop intelligence platform that provides high-resolution aerial imagery and data-driven insights to support precision farming.",
      pricing: "Paid",
      rating: 5,
      reviews: 100,
      featured: false,
      verified: false,
      imageUrl: "/images/feat1.jpeg"
    },
    {
      id: 4,
      title: "Agremo",
      description: "Agremo is an AI-powered crop analysis platform designed to provide detailed insights into crop health and yield prediction.",
      pricing: "Paid",
      rating: 5,
      reviews: 100,
      featured: false,
      verified: false,
      imageUrl: "/images/feat1.jpeg"
    },
    {
      id: 5,
      title: "Comma",
      description: "Comma.ai is an autonomous driving technology company that provides open-source software and hardware for enhancing vehicle automation.",
      pricing: "Paid",
      rating: 5,
      reviews: 100,
      featured: false,
      verified: false,
      imageUrl: "/images/feat1.jpeg"
    },
    {
      id: 6,
      title: "Jupiter AI",
      description: "Jupiter AI is a robust AI platform that provides predictive analytics and risk management solutions to various industries.",
      pricing: "Paid",
      rating: 5,
      reviews: 100,
      featured: false,
      verified: true,
      imageUrl: "/images/feat1.jpeg"
    },
    {
      id: 7,
      title: "ClimateAI",
      description: "ClimateAI is an AI-powered platform that provides climate risk forecasting and adaptation solutions to businesses and governments.",
      pricing: "Paid",
      rating: 5,
      reviews: 100,
      featured: false,
      verified: false,
      imageUrl: "/images/feat2.jpeg"
    },
    {
      id: 8,
      title: "DeepL",
      description: "DeepL is an AI-powered translation tool designed to provide highly accurate and nuanced translation services in various languages.",
      pricing: "Free",
      rating: 5,
      reviews: 100,
      featured: false,
      verified: false,
      imageUrl: "/images/feat2.jpeg"
    }
  ];

  return (
    <div>
      {loading ? (
        <div className="my-20 flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {aiToolsData.map((tool) => (
            <FeatureCard feature={tool} key={tool.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedDiectories;
