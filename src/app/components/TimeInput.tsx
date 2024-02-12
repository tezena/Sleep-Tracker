import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";


interface Props {
  setBedTime: (newValue: Dayjs | null) => void;
  setAwakeTime: (newValue: Dayjs | null) => void;
  bedTime: Dayjs | null;
  awakeTime: Dayjs | null;
}
export default function TimeInput({ bedTime,awakeTime,setAwakeTime,setBedTime }: Props) {
  
 

  const handleBedtimeChange = (newValue: Dayjs | null) => {
    
    if (newValue && awakeTime && newValue.isAfter(awakeTime)) {
      setAwakeTime(newValue);
    }
    setBedTime(newValue);

  };

  const handleAwakeTimeChange = (newValue: Dayjs | null) => {
   
    if (newValue && bedTime && newValue.isBefore(bedTime)) {
      setBedTime(newValue);
    }
    setAwakeTime(newValue);
  };

 

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div>
        <DemoItem>
          <label htmlFor="bedtime">Bedtime:</label>
          <TimePicker
            value={bedTime}
            onChange={handleBedtimeChange}
            ampm={false} 
          />
        </DemoItem>
        <DemoItem>
          <label htmlFor="awakeTime">Awake Time:</label>
          <TimePicker
            value={awakeTime}
            onChange={handleAwakeTimeChange}
            ampm={false} 
          />
        </DemoItem>
      </div>
    </LocalizationProvider>
  );
}
