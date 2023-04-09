
import { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import { query, collection, getDocs, db, where, limit, startAt, endAt, orderBy } from "@/firebase/firebase";
import React from "react";
import { Loader, Text, Image, Button } from '@mantine/core';
import Navbar from '@/components/navbar/navbar';
import { useStyles } from './recipe.styles';
import { Carousel } from '@mantine/carousel';



const RecipeID = () => {
  const router = useRouter();
  const { recipeId } = router.query;
  const { classes } = useStyles();



  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [steps, setSteps] = useState([])
  const [currentStep, setCurrentStep] = useState(1)
  const [embla, setEmbla] = useState(null);


  useEffect(() => {
    const getRecipes = async () => {
      console.log(recipeId)
      const docRef = collection(db, "recipes");
      const q = query(docRef, where("id", "==", Number(recipeId)));

      const querySnapshot = await getDocs(q);
      console.log(querySnapshot)
      querySnapshot.forEach((doc) => {

        console.log(doc.id, " => ", doc.data());
        setData(doc.data());
        setSteps(["Start the recipe", ...doc.data().steps])
        setLoading(false);
      })

    }
    getRecipes()




  }, [router])




  if (loading)
    return <div style={{
      height: "100vh",
      width: "100vw",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}><Loader></Loader></div>





  return <>
    <Navbar></Navbar>
    <Text
      className={classes.gradient}
      align="center"
      weight={700}
      style={{ fontFamily: "Greycliff CF, sans-serif" }}
    >{data.name}</Text>

    <div className={classes.main}>
      <div className={classes.wrapper}>
        <div className={classes.root}>
          <Image height={200} width={200} radius="md" src="/default-1.jpg"></ Image>
          <span className={classes.textGradient}>Description</span> {data.description}
          <br></br>
          <span className={classes.textGradient}>Ingridients </span> {String(data.ingredients)}
          <br></br>
          <Carousel
            style={{
              maxWidth: "70%",
              margin: "auto"
            }}
            getEmblaApi={setEmbla}
            onSlideChange={(index) => {
              console.log(currentStep)
              let utterance = new SpeechSynthesisUtterance(steps[index]);
              utterance.volume = 1
              speechSynthesis.speak(utterance);
            }}
            withIndicators
            slideSize="100%" height={200} slideGap="lg" controlSize={25} draggable={false} >
            {steps.map((step, idx) => <Carousel.Slide key={idx} >

              <div className={classes.slide}>
                <div style={{ margin: "auto" }}>{step}</div>
              </div>

            </Carousel.Slide>)}


          </Carousel>




        </div>
      </div>
    </div>

  </>;
};

export default RecipeID;
