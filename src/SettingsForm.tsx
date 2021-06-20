import React, { Fragment } from 'react';
import {useState} from "react";
import { useForm } from 'react-hook-form';


interface SettingsForm {
  bar_fermat: boolean,
  tuplet: boolean,
  articulation: boolean,
  accidental: boolean,
  note_fermata: boolean,
  fingering: boolean,
  wedge: boolean,
  dynamics: boolean,
  musicxml: String
}

const textFormating = (input:String) => {
  return input.split('\n').map((line, index) => {return <p key={index}>{line}</p>})
}


function SettingsForm() {

  const [musicBraille, setMusicBraille] = useState("");

  const { register, handleSubmit, formState: { errors } } = useForm<SettingsForm>({
    defaultValues: {
      bar_fermat: true,
      tuplet: true,
      articulation: true,
      accidental: true,
      note_fermata: true,
      fingering: true,
      wedge: true,
      dynamics: true
    }
  });

  const onSubmit = (data: SettingsForm) => {
    console.log(data)

    fetch('https://musicxml--webelement7.repl.co/', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }).then(
      response => response.json()
    ).then(
      braillemusic => {
        setMusicBraille(braillemusic.musicpart);
      }
    )
  };
  console.log(errors);
  
  return (
    <div className="flex flex-wrap mt-8">
      <form onSubmit={handleSubmit(onSubmit)} className="pr-4 lg:w-2/12">
        <h2 className="text-2xl font-semibold">Settings</h2>
        <h3 className="text-xl mt-4 mb-2">Barline</h3>
        <div className="mb-2">
          <input type="checkbox" id="bar_fermat" placeholder="bar_fermat" {...register("bar_fermat", {})} />
          <label htmlFor="bar_fermat">Fermata</label>
        </div>
        <h3 className="text-xl mt-4 mb-2">Note</h3>
        <div className="mb-2">
          <input type="checkbox" id="tuplet" placeholder="tuplet" {...register("tuplet", {})} />
          <label htmlFor="tuplet">Tuplet</label>
        </div>
        <div className="mb-2">
          <input type="checkbox" id="articulation" placeholder="articulation" {...register("articulation", {})} />
          <label htmlFor="articulation">Articulation</label>
        </div>
        <div className="mb-2">
          <input type="checkbox" id="accidental" placeholder="accidental" {...register("accidental", {})} />
          <label htmlFor="accidental">Accidental</label>
        </div>
        <div className="mb-2">
          <input type="checkbox" id="note_fermata" placeholder="note_fermata" {...register("note_fermata", {})} />
          <label htmlFor="note_fermata">Accidental</label>
        </div>
        <div className="mb-2">
          <input type="checkbox" id="fingering" placeholder="fingering" {...register("fingering", {})} />
          <label htmlFor="fingering">Fingering</label>
        </div>
        <h3 className="text-xl mt-4 mb-2">Direction</h3>
        <div className="mb-2">
          <input type="checkbox" id="wedge" placeholder="wedge" {...register("wedge", {})} />
          <label htmlFor="wedge">Wedge</label>
        </div>
        <div className="mb-8">
          <input type="checkbox" id="dynamics" placeholder="dynamics" {...register("dynamics", {})} />
          <label htmlFor="dynamics">Dynamics</label>
        </div>
        <div className="mb-8">
          <label
            className=" flex flex-shrink items-center px-4 py-2 bg-white rounded-lg tracking-wide border-2 border-gray-400 hover:border-gray-600 cursor-pointer">
            <svg fill="#000" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z" />
            </svg>
            <span className="ml-2 font-semibold">Select a file</span>
            <input className="hidden" type='file' id="musicxml" placeholder="musicxml"  {...register("musicxml", {})} />
          </label>
        </div>
        <button className="py-2 px-4 mb-8 bg-green-600 hover:bg-green-800 active:bg-green-800 text-white font-semibold rounded-md shadow-md" type="submit">Submit</button>
      </form>
      <div className="bg-green-900 self-start flex-grow px-4 py-4 rounded-2xl shadow-xl ">
        <h2 className="text-2xl font-semibold text-green-400 mb-4">Result:</h2>
        <div className="text-white text-xl font-mono">
          {textFormating(musicBraille)}
        </div>
      </div>
    </div>
  );
}

export default SettingsForm;