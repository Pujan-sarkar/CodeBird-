import React, { useCallback, useRef } from "react";
import { useParams } from "react-router-dom";
import { toPng } from 'html-to-image';
import QRCode from "react-qr-code";
import './style.css';
import CIMG from '../assets/inv.jpeg';

const InviteCard = () => {
  const { name, department, rollNo } = useParams();
  const refCard = useRef(null); // Reference for the invitation card
  const refQR = useRef(null);   // Reference for the QR code page

  // Function to capture both the invitation card and QR code and merge them into one PNG
  const onButtonClick = useCallback(() => {
    if (refCard.current === null || refQR.current === null) {
      return;
    }

    // Capture the invitation card as PNG
    toPng(refCard.current, { cacheBust: true })
      .then((cardDataUrl) => {
        // Capture the QR code as PNG
        toPng(refQR.current, { cacheBust: true })
          .then((qrDataUrl) => {
            // Create a canvas to combine both images
            const cardImg = new Image();
            const qrImg = new Image();

            cardImg.src = cardDataUrl;
            qrImg.src = qrDataUrl;

            cardImg.onload = () => {
              qrImg.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                // Set canvas size to fit both images
                const width = Math.max(cardImg.width, qrImg.width);
                const height = cardImg.height + qrImg.height;

                canvas.width = width;
                canvas.height = height;

                // Draw the invitation card and QR code on the canvas
                ctx.drawImage(cardImg, 0, 0);
                ctx.drawImage(qrImg, 0, cardImg.height);

                // Convert the canvas to PNG and download
                canvas.toBlob((blob) => {
                  const link = document.createElement('a');
                  link.download = 'invite-card.png';
                  link.href = URL.createObjectURL(blob);
                  link.click();
                });
              };
            };
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refCard, refQR]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 flex items-center gap-10 flex-col justify-center p-4">
      <h1 className="text-center text-2xl font-bold">Hey {name} 👋</h1>
      <p className="text-xl text-center">
        If possible, share this on your Wp status or socials to let others know. Don’t forget to come with the QR code! Thanks! ❤️
      </p>

      {/* First Page - Invitation Card */}
      <div ref={refCard} className="relative w-auto">
        

        <h1 className="w-[200px] mx-auto absolute text-sm sm:text-2xl text-white pacifico-regular top-[13rem] sm:top-[12rem] left-[6.5rem] lg:top-[14rem] lg:left-[9rem]">
          {name}
        </h1>
       


      

        {/* Background Image */}
        <img src={CIMG} className="h-[27rem] lg:h-[30rem] w-auto" alt="Invite Card" />
      </div>

      {/* Second Page - Only QR Code */}
      <div ref={refQR} className="bg-white p-[4.1rem] lg:p-[7.2rem] sm:p-[5.6rem] md:p-[7.8rem] flex items-center justify-center">
        <QRCode
          value={`Roll: ${rollNo}, Dept: ${department}`}
          size={250}
        />
      </div>

      {/* Download Button */}
      <button
        onClick={onButtonClick}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
      >
        Download Invitation Card
      </button>
    </div>
  );
};

export default InviteCard;
