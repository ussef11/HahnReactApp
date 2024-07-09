import React, { useContext, useState } from 'react'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './Mypopup.css'
import { Context } from '../../Helper/Context';
const Mypopup = () => {
  const {open, setOpen} = useContext(Context);
  const closeModal = () => setOpen(false);
  return (
    <div>
  
    <Popup open={open} closeOnDocumentClick onClose={closeModal}>
      <div className="modal">
        <a className="close" onClick={closeModal}>
          &times;
        </a>
        <div style={{textAlign:'center'}}>
          <svg
            version="1.1"
            id="tick"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 37 37"
            style={{ enableBackground: 'new 0 0 37 37' , width :"62px" }}
            xmlSpace="preserve"
          >
            <path
              className="circ path"
              style={{ fill: '#0cdcc7', stroke: '#07a796', strokeWidth: 3, strokeLinejoin: 'round', strokeMiterlimit: 10 }}
              d="M30.5,6.5L30.5,6.5c6.6,6.6,6.6,17.4,0,24l0,0c-6.6,6.6-17.4,6.6-24,0l0,0c-6.6-6.6-6.6-17.4,0-24l0,0C13.1-0.2,23.9-0.2,30.5,6.5z"
            />
            <polyline
              className="tick path"
              style={{ fill: 'none', stroke: '#fff', strokeWidth: 3, strokeLinejoin: 'round', strokeMiterlimit: 10 }}
              points="11.6,20 15.9,24.2 26.4,13.8"
            />
          </svg>
        </div>
        <div className='congra'>Congratulations! You just bought a cargo transporter.</div>
      </div>
    </Popup>
  </div>
  )
}

export default Mypopup