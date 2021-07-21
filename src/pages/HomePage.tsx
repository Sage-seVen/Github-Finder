import React, { useEffect, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Button, TextField } from "@material-ui/core";
import GithubCard from "../components/GithubCard";
import GithubData from "../models/githubData";

function HomePage(props: any) {
  const [userName, setUserName] = useState("");
  const [currentGithubData, setCurrentGithubData] = useState<GithubData>();
  const [isDetailsPage, setIsDetailsPage] = useState(false);

  useEffect(() => {
    let storageObject = localStorage.getItem("githubUserData");
    if (storageObject) {
      setCurrentGithubData(JSON.parse(storageObject));
    }
    console.log(storageObject);
  }, []);

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
          //show popup here
          window.alert("User Not Found");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setCurrentGithubData(data);
        console.log(currentGithubData);
        localStorage.setItem("githubUserData", JSON.stringify(data));
      });
  };

  return (
    <div>
      <TextField label="UserName" variant="outlined" onChange={(e) => handleUserNameChange(e)}></TextField>
      <Button variant="contained" color="primary" onClick={getApiData}>
        Search
      </Button>
      {currentGithubData ? (
        <GithubCard cardData={currentGithubData} goToDetailPage={handleisDetailsStateChange} />
      ) : (
        <div>Please Search Something</div>
      )}
      <div>{JSON.stringify(currentGithubData)}</div>
    </div>
  );
}

export default HomePage;
