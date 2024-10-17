import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Spinner from "@/app/src/ui/Spinner";
import FeatureCard from "../../layout/HomeNew/FeatureSection/FeatureCard";

const SavedDiectories = () => {
  const { token } = useSelector((state) => state.auth);
  const [savedDirectories, setSavedDirectories] = useState([]);
  const [loading, setLoading] = useState(false);

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


  return (
    <div>
      {loading ? (
        <div className="my-20 flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        savedDirectories?.length > 0 ? 
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {savedDirectories.map((tool) => (
            <FeatureCard directory={tool.directory} key={tool.id} saved={true} />
          ))}
        </div>
        :
        <h3 className="text-2xl font-bold text-white text-center mt-8">No saved directories found!</h3>
      )}
    </div>
  );
};

export default SavedDiectories;
