import React, { useCallback, useRef } from "react";
import { useParams } from "react-router-dom";
import { toPng } from 'html-to-image';
import QRCode from "react-qr-code";
import './style.css';
import CIMG from '../assets/invite.jpeg';

const InviteCard = () => {
  const { name, department, rollNo } = useParams();
  const ref = useRef(null);

  // Function to capture the card and download it as PNG
  const onButtonClick = useCallback(() => {
    if (ref.current === null) {
      return;
    }

    toPng(ref.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'invite-card.png';
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ref]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 flex items-center gap-10 flex-col justify-center p-4">
        <h1 className="text-center text-2xl font-bold">Hey {name} 👋</h1>
      <p className="text-xl text-center">If possible, share this on your Wp status or socials to let others know. Don’t forget to come with the QR code! Thanks! ❤️</p>
      {/* Container for the card - Position relative to allow absolute positioning */}
      <div ref={ref} className="relative w-auto">
        {/* Name */}
        <h1 className="absolute text-2xl text-white pacifico-regular top-[11rem] left-[8rem] lg:top-[12rem] lg:left-[11rem]">
          {name}
        </h1>

        {/* QR Code */}
        <QRCode
          className="absolute bottom-[3.2rem] left-[8.5rem] lg:bottom-[4.5rem] lg:left-[11.5rem]"
          value={`Roll: ${rollNo}, Dept: ${department}`}
          size={100}
        />

        {/* Background Image */}
        <img src={CIMG} className="h-[27rem] lg:h-[30rem] w-auto" alt="Invite Card" />
      </div>

      <button
        onClick={onButtonClick}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
      >
        Download Invite
      </button>
    </div>
  );
};

export default InviteCard;
