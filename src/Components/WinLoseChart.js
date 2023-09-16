// src/components/WinLoseChart.js
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";

const WinLoseChart = () => {
  const [data, setData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://example.com/win-lose-data");
        const jsonData = response.data;

        // Process JSON data and update state with new data
        // Assuming jsonData structure: { labels: [], winData: [], loseData: [] }

        setData({
          labels: jsonData.labels,
          datasets: [
            {
              label: "Win Probability",
              data: jsonData.winData,
              borderColor: "green",
              fill: false,
            },
            {
              label: "Lose Probability",
              data: jsonData.loseData,
              borderColor: "red",
              fill: false,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    // Schedule data fetch every 5 minutes
    const intervalId = setInterval(fetchData, 5 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <h2>Win/Lose Probabilities</h2>
      <Line data={data} />
    </div>
  );
};

export default WinLoseChart;