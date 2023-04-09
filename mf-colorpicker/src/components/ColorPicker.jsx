import React from 'react'

const ColorPicker = () => {
  return (
    <form>
      <input type="color" className='form-control' style={
        {
          width: "100%",
          height: "300px",
        }
      }
      title="Seleccione un color..."
      />

      <div className='text-center'>
        <h2 className='mt-3 fw-bolder'>
          <div style={{
            width: "20px",
            height: "20px",
            background: "#312828",
            display: "inline-block",
            margin: "0 1rem",
            borderRadius: "100%"
          }}>

          </div>
          #312828
        </h2>
      </div>
    </form>
  )
}

export default ColorPicker