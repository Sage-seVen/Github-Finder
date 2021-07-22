import React, { useEffect, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Button, TextField } from "@material-ui/core";
import GithubCard from "../components/GithubCard";
import GithubData from "../models/githubData";
import DetailsPage from "./DetailsPage";

function HomePage(props: any) {
  const [userName, setUserName] = useState("");
  const [currentGithubData, setCurrentGithubData] = useState<GithubData[]>([]);
  const [isDetailsPage, setIsDetailsPage] = useState(false);

  //this useEffect is run only on component render, setting local state from browser Storage for persistency
  useEffect(() => {
    let storageObject = localStorage.getItem("githubUserData");
    if (storageObject) {
      let parsedStorageObject = JSON.parse(storageObject) as GithubData[];
      if (parsedStorageObject.length > currentGithubData.length) {
        //console.log("got item from storage and setting react state");
        setCurrentGithubData(JSON.parse(storageObject));
      }
    }
    console.log(currentGithubData);
  }, []);

  //this useeffect is run every time State changes and it updates the local storage
  useEffect(() => {
    localStorage.setItem("githubUserData", JSON.stringify(currentGithubData));
  }, [currentGithubData]);

  const handleUserNameChange = (e: any) => {
    console.log("Setting UserName");
    console.log(e.target.value);
    setUserName(e.target.value);
  };

  const handleisDetailsStateChange = () => {
    setIsDetailsPage(true);
    console.log("mah state is changed boi");
  };

  const getApiData = () => {
    fetch(`https://api.github.com/users/${userName}`)
      .then((res) => {
        if (res.ok) {
          console.log("Response Fetched");
        } else {
          //Showing Popup for Bad Response
          window.alert("User Not Found");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);

        //takes existing array of currentGithubData and appends data to it
        setCurrentGithubData((currentGithubData) => [...currentGithubData, data]);

        //commenting this out, as setting storage in useEffect
        //localStorage.setItem("githubUserData", JSON.stringify(currentGithubData));
      });
  };

  return (
    <div>
      <TextField label="UserName" variant="outlined" onChange={(e) => handleUserNameChange(e)}></TextField>
      <Button variant="contained" color="primary" onClick={getApiData}>
        Search
      </Button>
      {currentGithubData ? (
        currentGithubData.map((data, index) => (
          <GithubCard key={index.toString()} cardData={data} goToDetailPage={handleisDetailsStateChange} />
        ))
      ) : (
        <div>Please Search Something</div>
      )}
    </div>
  );
}

export default HomePage;
