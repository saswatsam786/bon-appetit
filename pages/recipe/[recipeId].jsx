import { useRouter } from "next/router";
import React from "react";

const RecipeID = () => {
  const router = useRouter();
  const { recipeId } = router.query;
  return <div>{recipeId}</div>;
};

export default RecipeID;
