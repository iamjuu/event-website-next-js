import React from "react";

export const LocationMap = () => {
  return (
    <section className="py-12 md:py-16">
      <div className="max-w-[1208px] mx-auto px-4 md:px-6">
      <h2 className=" mb-3 text-black text-xl md:text-2xl font-semibold relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-1 after:w-16 after:rounded-full after:bg-[#4F46E5]">
        Location
      </h2>
        <div className="w-full h-[300px] md:h-[400px] rounded-lg overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3926.0039041892604!2d76.32362827496555!3d10.25633208987386!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080b82ed0f3b27%3A0x2f27f9a6c4fd8064!2sLe%20Meridien%20Kochi!5e0!3m2!1sen!2sin!4v1709720244432!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
};
