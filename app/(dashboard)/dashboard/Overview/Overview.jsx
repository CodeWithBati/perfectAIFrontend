"use client";
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import InfoTiles from "@/app/src/components/Dashboard/InfoTiles";
import NewUsers from "@/app/src/components/Dashboard/NewUsers";
import Spinner from "@/app/src/ui/Spinner";

const Overview = () => {
  const [userStats, setUserStats] = useState({});
  const [users, setUsers] = useState([]);
  const { token } = useSelector((state) => state.auth);
  const [spinnershow, setSpinnershow] = useState(false);

  const fetchData = useCallback(async () => {
    setSpinnershow(true);
    try {
      const [statsResponse, usersResponse] = await Promise.all([
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/stats`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/?page=1&limit=5`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      ]);

      if (statsResponse.status === 200) {
        setUserStats(statsResponse.data);
      }

      if (usersResponse.status === 200) {
        setUsers(usersResponse.data.results);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setSpinnershow(false);
    }
  }, [token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      {spinnershow ? (
        <div className=" w-full h-full flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <>
          <div className=" grid md:grid-cols-2 lg:grid-cols-3">
            <InfoTiles
              title="New Users"
              accent
              data={{
                totalUsers: userStats.totalUsers,
                totalUsersLastMonth: userStats.totalUsersLastMonth,
                totalUsersThisMonth: userStats.totalUsersThisMonth,
                totalUsersThisYear: userStats.totalUsersThisYear,
                percentageChange: userStats.percentageChange,
              }}
            />
          </div>
          <div className="w-full lg:w/9/12 py-3">
            <NewUsers users={users} />
          </div>
        </>
      )}
    </>
  );
};

export default Overview;
