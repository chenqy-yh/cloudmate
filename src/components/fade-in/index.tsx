import React, { useEffect, useState } from "react";
import { styled } from "styled-components";

const FadeWrapper = styled.div`
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 2s ease-out, transform 2s ease-out;

  &.fade-in {
    opacity: 1;
    transform: translateY(0);
  }
`;

type FadeInComponentProps = {
  children: React.ReactNode;
};

const FadeInComponent: React.FC<FadeInComponentProps> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <FadeWrapper className={isVisible ? "fade-in" : ""}>{children}</FadeWrapper>
  );
};

export default FadeInComponent;
