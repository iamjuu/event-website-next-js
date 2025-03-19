import React from "react";
import DOMPurify from "isomorphic-dompurify";

interface AboutEventProps {
  description: string;
}

export const AboutEvent: React.FC<AboutEventProps> = ({ description }) => {
  const sanitizedContent = DOMPurify.sanitize(description || "");

  return (
    <section className="mt-8 md:mt-[47px]">
      <h2 className="text-black text-xl md:text-[22px] font-medium leading-normal md:leading-[3]">
        About Event
      </h2>
    
      <p
        className="text-[rgba(14,14,14,1)] text-base md:text-lg font-light leading-6 md:leading-7 mt-3 md:mt-[23px]"
        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      />
    </section>
  );
};
