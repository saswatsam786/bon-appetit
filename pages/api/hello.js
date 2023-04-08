// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Fs from 'fs'
import CsvReadableStream from 'csv-reader'
import { writeBatch, doc, db } from "../../firebase/firebase"

let input = Fs.createReadStream(__dirname + '/RAW_recipes.csv', 'utf8');

const recipes = []
let ing = new Set()

export default function handler(req, res) {
  // print current directory
  let count = 0
  input.pipe(CsvReadableStream({ parseNumbers: true, parseBooleans: true, trim: true, asObject: true }))
    .on('data', function (row) {
      count += 1

      row.tags = convertStringToArray(row.tags);
      row.nutrition = JSON.parse(row.nutrition);
      row.steps = convertStringToArray(row.steps);
      row.ingredients = convertStringToArray(row.ingredients);
      row.ingredients.forEach(ingredient => {
        ing.add(ingredient)
      })



      if (count === 500) {
        console.log(recipes.length)
        add(recipes, ing)
      }
    })
    .on('close', function (data) {


    })

  res.status(200).json({ name: 'John Doe' })


}

const add = async (recipes, ing) => {
  const ingredients = Array.from(ing)
  const batch = writeBatch(db)

  console.log("hey")

  recipes.forEach((recipe, index) => {
    const recipeRef = doc(db, 'recipes', `${recipe.id}`)
    batch.set(recipeRef, recipe)
  })



  const res = await batch.commit()

  console.log(res)
}


const convertStringToArray = (string) => {
  // Remove the surrounding quotes and split the string by commas
  string = string.substring(1, string.length - 1);
  const trimmedString = string.trim().replace(/'/g, '');
  return trimmedString.split(', ');
};
