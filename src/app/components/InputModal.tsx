"use client";

import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";
import TimeInput from "./TimeInput";
import dayjs, { Dayjs } from "dayjs";


interface Props {
  handleNewTrack: (bedTime: Dayjs | null, awakeTime: Dayjs | null) => void;
}

const InputModal = ({ handleNewTrack }: Props) => {
  const [openModal, setOpenModal] = useState(false);
  const [bedTime, setBedtime] = useState<Dayjs | null>(
    dayjs().hour(10).minute(0)
  );

  const [awakeTime, setAwakeTime] = useState<Dayjs | null>(
    dayjs().hour(6).minute(0)
  );

  const  onCloseModal=()=> {
    setOpenModal(false);
  }

  const handleTrack = () => {
    handleNewTrack(bedTime, awakeTime);
    onCloseModal();
  };

  return (
    <>
      <Button
        onClick={() => setOpenModal(true)}
        className="mt-8 bg-[#DAA520] hover:bg-[#f4c856ee] "
      >
        Add New
      </Button>
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Add your sleep and wake time.
            </h3>
            <div>
              <TimeInput
                bedTime={bedTime}
                awakeTime={awakeTime}
                setBedTime={setBedtime}
                setAwakeTime={setAwakeTime}
              />
            </div>
            <div className="w-full">
              <Button onClick={handleTrack} className="bg-[#DAA520]">
                Set
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default InputModal;
