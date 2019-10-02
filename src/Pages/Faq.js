import React from 'react';

function Faq(){
  return(
    <React.Fragment>
      <div className="content">
        <div className="info-container">
          <h1 className="uploadTitle">FAQ</h1>
          <p>FREQUENTLY ASKED QUESTIONS (FAQ)
In this section we try to answer any questions that you may have about our video conversion service.

Is there a limit to the number of files I can convert?
Our video conversion service is totally free and there's no limit to the number of files you can convert, so feel free to use our website as much as you want.


How long does it take to convert a video?
While we offer one of the fastest conversion rates, the actual duration may vary based on the length of the original video and the time of the day. As our service is very popular, it might take slightly longer to convert during busy periods due to heavy load on our servers. The speed and stability of your internet connection may also affect the time it takes to complete the conversion process. To give you an idea, a five-minute video usually takes roughly a minute or less to convert.


What video formats do you support?
We support conversions to most of the available media formats out there, which include .mp3, .m4a, .aac, .flac, .ogg, .wav, .wma, .mp4, .avi, .mpg, .wmv, .mov, .flv and .m4v.


Can I convert videos using my tablet or smartphone?
It depends. If your device is powered by Android then yes, you can definitely convert videos and download the converted files directly to your tablet or smartphone. However, if you are using an iOS device, you will not be able to download the converted file due to software limitations of the iOS web browser. We are currently developing a mobile application, which aims to resolve this issue and make it easier to do video conversions on a mobile device.

</p>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Faq