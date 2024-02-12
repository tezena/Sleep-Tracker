import { Montserrat, Roboto } from "next/font/google";
import {
  Button,
  Checkbox,
  Label,
  Modal,
  TextInput,
  Textarea,
} from "flowbite-react";
import { useState, useRef } from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { LineChart } from "@mui/x-charts/LineChart";
import { BarChart } from "@mui/x-charts/BarChart";


// Fonts
const montitle = Montserrat({
  subsets: ["latin"],
  weight: "500",
  style: "italic",
});
const montitle2 = Montserrat({
  subsets: ["latin"],
  weight: "800",
  style: "normal",
});
const roboSub = Roboto({
  subsets: ["latin-ext"],
  weight: "500",
  style: "normal",
});



interface Props {
  duration: number[];
}



const TrackDisplay: React.FC<Props> = ({ duration }) => {
  const [comments, setComments] = useState<string[]>(
    Array(duration.length).fill("")
  );

    
    // different states 
  const [openModal, setOpenModal] = useState(false);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const [rates, setRates] = useState<number[]>([]);
    const length = duration.length;


  // handlers 
  const handleCommentChange = (index: number, comment: string) => {
    const newComments = [...comments];
    newComments[index] = comment;
    setComments(newComments);
  };

  const handleRateChange = (index: number, value: number) => {
    const newRates = [...rates];
    newRates[index] = value;
    setRates(newRates);
  };

    
    
  function getHoursAndMinutes(decimalHours: number) {
    const hours = Math.floor(decimalHours);
    const decimalMinutes = (decimalHours - hours) * 60;
      const minutes = Math.round(decimalMinutes);
      

      

    return (
      <p
        className={`text-sm font-normal text-gray-500 dark:text-slate-300 group-hover:text-gray-700 dark:group-hover:text-slate-200  mt-2 leading-6  text-justify  ${roboSub.className}`}
      >
        Your Sleep Duration {"    "} {hours} : {minutes}
      </p>
    );
  }

  return (
    <div className="h-1/2 flex-col items-center justify-center">
      <div className=" py-16 ">
        <h1
          className={`text-black dark:text-slate-100 md:text-4xl text-2xl sm:text-3xl ${montitle.className}`}
        >
          {" "}
          Your Sleep Track :
        </h1>
        {duration.length == 0 && (
          <p
            className={` text-xl mt-16 sm:text-2xl font-bold text-gray-500 dark:text-slate-400 group-hover:text-gray-700  dark:group-hover:text-slate-300 ${montitle2.className}`}
          >
            Currenlty You do not have any Track.
          </p>
        )}
      </div>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
        {duration.map((item, index) => {
          return (
            <div
              key={index}
              className=" relative group shadow-lg hover:shadow-2xl duration-200 delay-75 w-full bg-white dark:bg-gray-900 rounded-sm py-6 "
            >
              <div className="px-5">
                <p
                  className={` text-xl sm:text-2xl font-bold text-gray-500 dark:text-slate-400 group-hover:text-gray-700  dark:group-hover:text-slate-300 ${montitle2.className}`}
                >
                  Day {index + 1}
                </p>
                {getHoursAndMinutes(item)}
                <Box
                  sx={{
                    "& > legend": { mt: 2 },
                  }}
                >
                  <p
                    className={` text-lg mt-5 font-bold text-gray-500 dark:text-slate-400 group-hover:text-gray-700  dark:group-hover:text-slate-300 ${montitle2.className}`}
                  >
                    Rate
                  </p>
                  <Rating
                    name="simple-controlled"
                    value={rates[index]}
                    onChange={(e, newValue) => {
                      if (newValue !== null) {
                        handleRateChange(index, newValue);
                      }
                    }}
                  />
                </Box>
                <p
                  className={` text-lg mt-5 font-bold text-gray-500 dark:text-slate-400 group-hover:text-gray-700  dark:group-hover:text-slate-300 ${montitle2.className}`}
                >
                  Comment
                </p>

                <p
                  className={`text-sm font-normal text-gray-500 dark:text-slate-300 group-hover:text-gray-700 dark:group-hover:text-slate-200  mt-2 leading-6  text-justify  ${roboSub.className}`}
                >
                  {comments[index]}
                </p>
                <>
                  <Button
                    onClick={() => setOpenModal(true)}
                    className="w-24 h-8 text-xs bg-[#DAA520] mt-5 py-2 "
                  >
                    comment
                  </Button>
                  <Modal
                    show={openModal}
                    size="md"
                    popup
                    onClose={() => setOpenModal(false)}
                    initialFocus={emailInputRef}
                  >
                    <Modal.Header />
                    <Modal.Body>
                      <div className="space-y-6">
                        <div>
                          <Textarea
                            id="comment"
                            placeholder="Leave a comment..."
                            rows={4}
                            value={comments[index]}
                            onChange={(e) =>
                              handleCommentChange(index, e.target.value)
                            }
                          />
                        </div>
                        <div className="w-full">
                          <Button
                            onClick={() => setOpenModal(false)}
                            className="bg-[#DAA520] "
                          >
                            Save
                          </Button>
                        </div>
                      </div>
                    </Modal.Body>
                  </Modal>
                </>
              </div>
              <div className="bg-[#DAA520]   group-hover:bg-opacity-75 h-4 w-full absolute top-0 ">
                {" "}
              </div>

              <div className="bg-[#DAA520]   group-hover:bg-opacity-75 h-4 w-full absolute bottom-0 ">
                {" "}
              </div>
            </div>
          );
        })}
      </div>
      <h1
        className={`text-black mt-6 dark:text-slate-100 md:text-2xl text-2xl sm:text-xl ${montitle.className}`}
      >
        {" "}
        Your Progress
      </h1>
      {duration.length !== 0 &&
        rates.length !== 0 &&
        duration.length === rates.length && (
          <BarChart
            xAxis={[
              {
                scaleType: "band",
                data: Array.from({ length }, (_, index) => `Day ${index + 1}`),
              },
            ]}
            series={[{ data: duration }, { data: rates }]}
            width={500}
            height={300}
          />
        )}
    </div>
  );
};

export default TrackDisplay;
