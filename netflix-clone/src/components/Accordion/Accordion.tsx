import "./Accordion.css";
import { useState } from "react";
import { ButtonArrowDown } from "../Buttons/ButtonArrowDown";

interface AccordionProps {
  children: React.ReactNode;
  alturaCerrado: string;
}

export const Accordion = ({ children, alturaCerrado }: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClickAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`accordion ${isOpen ? "open" : "close"}`}
      style={{
        height: isOpen ? "100%" : alturaCerrado,
      }}
    >
      {children}
      <div
        className={`accordion-up-down ${isOpen ? "open" : "close"}`}
        onClick={handleClickAccordion}
      >
        <ButtonArrowDown />
      </div>
    </div>
  );
};
