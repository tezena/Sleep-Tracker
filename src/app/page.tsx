"use client";

import InputModal from "./components/InputModal";
import { useState } from "react";
import { Dayjs } from "dayjs";
import TrackDisplay from "./components/TrackDisplay";

export default function Home() {
  const [duration, setDuration] = useState<number[]>([]);

  const handleNewTrack = (bedTime: Dayjs | null, awakeTime: Dayjs | null) => {
    if (bedTime && awakeTime) {
      const differenceInHours = awakeTime.diff(bedTime, "minute") / 60.0;

      setDuration((PrevState) => [...PrevState, differenceInHours]);
    }
    
  };

  return (
    <div className="lg:px-32  px-16 pb-16">
      <TrackDisplay duration={duration} />
      <div className="w-[25%]">
        <InputModal handleNewTrack={handleNewTrack} />
      </div>
    </div>
  );
}
