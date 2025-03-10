
import React from "react";

export const KeyFeatures = () => {
  return (
    <section className="mt-8 md:mt-[73px]">
      <h2 className="text-black text-xl md:text-[22px] font-medium leading-normal md:leading-[3]">
        Key Features
      </h2>
      <ul className="text-[rgba(14,14,14,1)] text-base md:text-lg font-light leading-7 md:leading-[37px] mt-3 md:mt-[13px] list-disc pl-5">
        <li>Submit dessert recipe and photo of the dish.</li>
        <li>Photo should make dessert look appetizing.</li>
        <li>
          Judges select top 20 based on recipe/photo quality, creativity, and
          originality.
        </li>
        <li>Final 120 must prepare dessert in person on May 19th.</li>
        <li>
          Judging criteria include taste, presentation, creativity, and overall
          appeal.
        </li>
        <li>Winner announced at end of competition.</li>
      </ul>
    </section>
  );
};
