import React from "react";
import "./About.css";
import { Button, Typography, Avatar } from "@mui/material";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";

const About = () => {
    const visitInstagram = () => {
        window.location = "http://www.google.com";
      };
    return (
        <div className="aboutSection">
        <div></div>
        <div className="aboutSectionGradient"></div>
        <div className="aboutSectionContainer">
          <Typography component="h1">About Us</Typography>
  
          <div>
            <div>
              <Avatar
                style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
                src="https://png.pngtree.com/png-clipart/20190604/original/pngtree-business-logo-design-png-image_915991.jpg"
                alt="Founder"
              />
              <Typography>Swastik Computer Education</Typography>
              <Button onClick={visitInstagram} color="primary">
                Visit Instagram
              </Button>
              <span>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Necessitatibus repellendus vel dicta magni ipsa quod at tempora.
              </span>
            </div>
            <div className="aboutSectionContainer2">
              <Typography component="h2">Our Brands</Typography>
              <a
                href="jhjhj"
                target="blank"
              >
                <YouTubeIcon className="youtubeSvgIcon" />
              </a>
  
              <a href="ggg" target="blank">
                <InstagramIcon className="instagramSvgIcon" />
              </a>
            </div>
          </div>
        </div>
      </div>
    )
}

export default About
