"use client";
import * as React from "react";
import { useRef } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "../global/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import { faCopy } from "@fortawesome/free-solid-svg-icons";

import AlternativeComponet from "./StepperComponents/AlternativeComponet";
import Pricing from "./StepperComponents/Pricing";
import Recommended from "./StepperComponents/Recommended";
import Why from "./StepperComponents/Why";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";

import useAutosizeTextArea from "../../customHooks/useAutoSizeTextArea";
import Input from "../form/Input";

export default function VerticalStepper({ data }) {
  const steps = [
    {
      label: "Recommended AI tool",
      sublabel: "",
      description: `Get recommendations based on your unique needs...`,
      component: () => <Recommended data={data?.recommended} />,
    },
    {
      label: "Why it’s",
      sublabel: "Perfect",
      remLabal: "for your task",
      description: `Dive deeper into the reasoning behind each recommended...`,
      component: () => <Why data={data?.why} />,
    },
    {
      label: "Pricing information",
      sublabel: "",
      description: "Understand the cost implications...",
      component: () => <Pricing data={data?.pricing} />,
    },
    {
      label: "Alternatives",
      sublabel: "",
      description: `Explore various chatbot options...`,
      component: () => <AlternativeComponet data={data?.alternatives} />,
    },
  ];

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  return (
    <div className="my-20">
      <input
        className="w-full sm:w-[500px] md:w-[800px] border border-gray-300 rounded-lg resize-none bg-transparent dark:text-white"
        disabled
        value={data.taskTitle}
      />
      <Box sx={{ width: "100%" }} fontFamily={'sansation'}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label} >
              <StepLabel
                onClick={handleStep(index)}
                style={{ cursor: "pointer", fontFamily: 'sansation' }}
              >
                <p className=" dark:text-white text-black" style={{ fontFamily: 'sansation'}} >
                  {step.label}
                  <span className=" bg-gradient-to-r to-custom-blue-light from-custom-purple-light dark:to-custom-blue-dark dark:from-custom-purple-dark bg-clip-text text-transparent font-bold">
                    {" "}
                    {step.sublabel}
                  </span>{" "}
                  {step?.remLabal}
                </p>
              </StepLabel>
              <StepContent>
                <div className=" w-auto sm:w-[400px] md:w-[700px]">
                  {step.component()}
                </div>
                <Box sx={{ mb: 2 }}>
                  <div className=" flex flex-row justify-end gap-2">
                    <Button
                      className={`bg-blue-600 text-white hover:bg-blue-800 my-2 ${
                        index === 0 ? "hidden" : ""
                      }`}
                      onClick={handleBack}
                    >
                      <FontAwesomeIcon icon={faArrowLeft} /> Back
                    </Button>
                    <Button
                      onClick={handleNext}
                      className={`bg-blue-600 text-white hover:bg-blue-800 my-2`}
                    >
                      {index === steps.length - 1 ? (
                        "Finish"
                      ) : (
                        <p>
                          Next{" "}
                          <FontAwesomeIcon
                            className="ml-2"
                            icon={faArrowRight}
                          />{" "}
                        </p>
                      )}
                    </Button>
                  </div>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </Box>
    </div>
  );
}
