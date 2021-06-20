import React, { useState } from 'react'
import SettingsForm from "./SettingsForm";

function App() {
  return (
    <div className="App">
      <h1 className="font-bold text-4xl mb-2 text-green-900">musicXML to BRAILLE</h1>
      <p className="max-w-lg text-gray-600 font-semibold">With this converter you can convert musicxml files to Braille. This
      is done
      according to the
      rules of the German Braille music and the output is in computer braille.</p>
      <SettingsForm />
    </div>
  )
}

export default App
