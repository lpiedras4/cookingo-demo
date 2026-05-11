import React from 'react'
import { useParams, Navigate } from 'react-router-dom';
import { getLesson } from "../../data/lessons";
import CompletedRecipeScreen from '../../components/lesson/CompletedRecipeScreen';

const RecipePage = () => {
  const {lessonName} = useParams();
  const lesson = getLesson("overnight-oats");
  return (
    <CompletedRecipeScreen lesson = {lesson}/>
  )
}

export default RecipePage
