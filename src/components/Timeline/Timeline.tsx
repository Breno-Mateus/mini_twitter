import HeaderTimeline from "../HeaderTimeline/HeaderTimeline";
import FooterTimeline from "../FooterTimeline/FooterTimeline";
import Feed from "../Feed/Feed";

function Timeline() {
  return(
    <div className="flex flex-col h-screen overflow-hidden">
      <HeaderTimeline />
      <Feed />
      <FooterTimeline />
    </div>
  );
}

export default Timeline;