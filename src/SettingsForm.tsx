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
  return input.split('\n').map((line, index) => {return <p className="mb-2" key={index}>{line}</p>})
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
          <label htmlFor="bar_fermat" className="ml-2">Fermata</label>
        </div>
        <h3 className="text-xl mt-4 mb-2">Note</h3>
        <div className="mb-2">
          <input type="checkbox" id="tuplet" placeholder="tuplet" {...register("tuplet", {})} />
          <label htmlFor="tuplet" className="ml-2">Tuplet</label>
        </div>
        <div className="mb-2">
          <input type="checkbox" id="articulation" placeholder="articulation" {...register("articulation", {})} />
          <label htmlFor="articulation" className="ml-2">Articulation</label>
        </div>
        <div className="mb-2">
          <input type="checkbox" id="accidental" placeholder="accidental" {...register("accidental", {})} />
          <label htmlFor="accidental" className="ml-2">Accidental</label>
        </div>
        <div className="mb-2">
          <input type="checkbox" id="note_fermata" placeholder="note_fermata" {...register("note_fermata", {})} />
          <label htmlFor="note_fermata" className="ml-2">Accidental</label>
        </div>
        <div className="mb-2">
          <input type="checkbox" id="fingering" placeholder="fingering" {...register("fingering", {})} />
          <label htmlFor="fingering" className="ml-2">Fingering</label>
        </div>
        <h3 className="text-xl mt-4 mb-2">Direction</h3>
        <div className="mb-2">
          <input type="checkbox" id="wedge" placeholder="wedge" {...register("wedge", {})} />
          <label htmlFor="wedge" className="ml-2">Wedge</label>
        </div>
        <div className="mb-8">
          <input type="checkbox" id="dynamics" placeholder="dynamics" {...register("dynamics", {})} />
          <label htmlFor="dynamics" className="ml-2">Dynamics</label>
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
        <div className="text-white text-md font-mono">
          {textFormating(musicBraille)}
        </div>
        <div className="mt-8 flex justify-end">
          <button className="py-2 px-4 bg-white hover:bg-green-50 active:bg-green-800 font-semibold rounded-md shadow-md">
            <svg className="inline mr-2"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 115.77 122.88" height="18" width="18" >              
                    <path d="M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02 v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02 c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1 c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7 h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01 c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65 v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01 c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02 v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z"/>             
            </svg>
            <span>Copy to Clipboard</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SettingsForm;