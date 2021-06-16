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
    <>
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>Barline</h3>
      <div>
        <input type="checkbox" id="bar_fermat" placeholder="bar_fermat" {...register("bar_fermat", {})} />
        <label htmlFor="bar_fermat">Fermata</label>
      </div>
      <h3>Note</h3>
      <div>
        <input type="checkbox" id="tuplet" placeholder="tuplet" {...register("tuplet", {})} />
        <label htmlFor="tuplet">Tuplet</label>
      </div>
      <div>
        <input type="checkbox" id="articulation" placeholder="articulation" {...register("articulation", {})} />
        <label htmlFor="articulation">Articulation</label>
      </div>
      <div>
        <input type="checkbox" id="accidental" placeholder="accidental" {...register("accidental", {})} />
        <label htmlFor="accidental">Accidental</label>
      </div>
      <div>
        <input type="checkbox" id="note_fermata" placeholder="note_fermata" {...register("note_fermata", {})} />
        <label htmlFor="note_fermata">Accidental</label>
      </div>
      <div>
        <input type="checkbox" id="fingering" placeholder="fingering" {...register("fingering", {})} />
        <label htmlFor="fingering">Fingering</label>
      </div>
      <h3>Direction</h3>
      <div>
        <input type="checkbox" id="wedge" placeholder="wedge" {...register("wedge", {})} />
        <label htmlFor="wedge">Wedge</label>
      </div>
      <div>
        <input type="checkbox" id="dynamics" placeholder="dynamics" {...register("dynamics", {})} />
        <label htmlFor="dynamics">Dynamics</label>
      </div>
      <div>
        <input type="file" id="musicxml" placeholder="musicxml"  {...register("musicxml", {})} />
      </div>
      <button type="submit">Submit</button>
    </form>
    <div>
      {textFormating(musicBraille)}
    </div>
    </>
  );
}

export default SettingsForm;