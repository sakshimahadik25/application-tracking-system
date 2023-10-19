import React, { useState } from "react";
import Select from "react-select";
import LocationModal from "./CustomModal";
import SkillsModal from "./CustomModal";
import ExperienceLevelModal from "./CustomModal";
import JobModeModal from "./CustomModal";
import ProfileModal from "./CustomProfileModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CONSTANTS } from "../data/Constants";
import {
  faEnvelope,
  faLocationDot,
  faPenToSquare,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";

const ProfilePage = () => {
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [skillsModalOpen, setSkillsModalOpen] = useState(false);
  const [ExpLevelModalOpen, setExpLevelModalOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [jobModeModalOpen, setJobModeModalOpen] = useState(false);

  const [profile, setProfile] = useState({
    name: "Adam Smith",
    university: "North Carolina State University",
    email: "abc@gmail.com",
    address: "2376 Champion Ct.",
    contact: "111-111-1111",
    skills: [{ value: "C++", label: "C++" }],
    locations: [{ value: "United States", label: "United States" }],
    experience_level: [{ label: "Entry-Level", value: "Entry-Level" }],
    modes: [{ label: "Internship", value: "Internship" }],
  });

  return (
    <div className="container">
      <div className="row gx-5">
        <div className="col-4 my-3">
          <div
            className="card p-4"
            style={{
              boxShadow: "0px 5px 12px 0px rgba(0,0,0,0.1)",
            }}
          >
            <FontAwesomeIcon
              icon={faPenToSquare}
              size="1x"
              onClick={() => setProfileModalOpen(true)}
              cursor="pointer"
              style={{ position: "absolute", top: "15", right: "15" }}
            />
            {/* <div className="text-center mt-3">
              <img
                src={require("../assets/profile.jpg")}
                style={{
                  height: "200px",
                  width: "200px",
                  borderRadius: "100%",
                }}
                alt="profile"
              />
            </div> */}
            <div className="text-center mt-3">
              <h3 className="card-title mb-1">{profile.name}</h3>
              <span style={{ fontSize: 20 }}>{profile.university}</span>
            </div>
            <hr className="my-4" />
            <div className="row gy-3">
              <div className="col-1 d-flex align-items-center">
                <FontAwesomeIcon icon={faEnvelope} size="1x" />
              </div>
              <div className="col-11">{profile.email}</div>
              <div className="col-1 d-flex align-items-center">
                <FontAwesomeIcon icon={faPhone} size="1x" />
              </div>
              <div className="col-11">{profile.contact}</div>
              <div className="col-1 d-flex align-items-center">
                <FontAwesomeIcon icon={faLocationDot} size="1x" />
              </div>
              <div className="col-11">{profile.address}</div>
            </div>
          </div>
        </div>
        <div className="col-8 px-0">
          <div
            className="card my-3 p-2"
            style={{
              boxShadow: "0px 5px 12px 0px rgba(0,0,0,0.1)",
            }}
          >
            <div className="card-body">
              <div className="d-flex justify-content-between px-0 mb-3">
                <h4 className="card-title mb-0 mx-1">Skills</h4>
                <div className="text-right">
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    size="1x"
                    onClick={() => setSkillsModalOpen(true)}
                    cursor="pointer"
                  />
                </div>
              </div>
              <div className="d-flex flex-wrap">
                {profile.skills.map((ele, index) => (
                  <span
                    className="badge rounded-pill m-1 py-2 px-3"
                    style={{
                      border: "2px solid",
                      backgroundColor: "#0096c7",
                      fontSize: 16,
                      fontWeight: "normal",
                    }}
                    key={index}
                  >
                    {ele.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div
            className="card my-3 p-2"
            style={{
              boxShadow: "0px 5px 12px 0px rgba(0,0,0,0.1)",
            }}
          >
            <div className="card-body">
              <div className="d-flex justify-content-between px-0 mb-3">
                <h4 className="card-title mb-0 mx-1">Experience Level</h4>
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  size="1x"
                  onClick={() => setExpLevelModalOpen(true)}
                  cursor="pointer"
                />
              </div>
              <div className="d-flex flex-wrap">
                {profile.experience_level.map((ele, index) => (
                  <span
                    className="badge rounded-pill m-1 py-2 px-3"
                    style={{
                      border: "2px solid",
                      backgroundColor: "#0096c7",
                      fontSize: 16,
                      fontWeight: "normal",
                    }}
                    key={index}
                  >
                    {ele.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div
            className="card my-3 p-2"
            style={{
              boxShadow: "0px 5px 12px 0px rgba(0,0,0,0.1)",
            }}
          >
            <div className="card-body">
              <div className="d-flex justify-content-between px-0 mb-3">
                <h4 className="card-title mb-0 mx-1">Locations</h4>
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  size="1x"
                  onClick={() => setLocationModalOpen(true)}
                  cursor="pointer"
                />
              </div>
              <div className="d-flex flex-wrap">
                {profile.locations.map((ele, index) => (
                  <span
                    className="badge rounded-pill m-1 py-2 px-3"
                    style={{
                      border: "2px solid",
                      backgroundColor: "#0096c7",
                      fontSize: 16,
                      fontWeight: "normal",
                    }}
                    key={index}
                  >
                    {ele.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div
            className="card my-3 p-2"
            style={{
              boxShadow: "0px 5px 12px 0px rgba(0,0,0,0.1)",
            }}
          >
            <div className="card-body">
              <div className="d-flex justify-content-between px-0 mb-3">
                <h4 className="card-title mb-0 mx-1">Mode of job</h4>
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  size="1x"
                  onClick={() => setJobModeModalOpen(true)}
                  cursor="pointer"
                />
              </div>
              <div className="d-flex flex-wrap">
                {profile.modes.map((ele, index) => (
                  <span
                    className="badge rounded-pill m-1 py-2 px-3"
                    style={{
                      border: "2px solid",
                      backgroundColor: "#0096c7",
                      fontSize: 16,
                      fontWeight: "normal",
                    }}
                    key={index}
                  >
                    {ele.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {locationModalOpen && (
        <LocationModal
          name={CONSTANTS.PROFILE.PREFERRED_LOCATIONS}
          options={CONSTANTS.COUNTRIES}
          profile={profile}
          setProfile={setProfile}
          setModalOpen={setLocationModalOpen}
        />
      )}
      {skillsModalOpen && (
        <SkillsModal
          name={CONSTANTS.PROFILE.SKILLS}
          options={CONSTANTS.SKILLS}
          profile={profile}
          setProfile={setProfile}
          setModalOpen={setSkillsModalOpen}
        />
      )}
      {ExpLevelModalOpen && (
        <ExperienceLevelModal
          name={CONSTANTS.PROFILE.EXPERIENCE_LEVEL}
          options={CONSTANTS.EXPERIENCE_LEVEL}
          profile={profile}
          setProfile={setProfile}
          setModalOpen={setExpLevelModalOpen}
        />
      )}
      {jobModeModalOpen && (
        <JobModeModal
          name={CONSTANTS.PROFILE.JOB_MODE}
          options={CONSTANTS.JOB_MODES}
          profile={profile}
          setProfile={setProfile}
          setModalOpen={setJobModeModalOpen}
        />
      )}
      {profileModalOpen && (
        <ProfileModal
          profile={profile}
          setProfile={setProfile}
          setModalOpen={setProfileModalOpen}
        />
      )}
    </div>
  );
};

export default ProfilePage;
