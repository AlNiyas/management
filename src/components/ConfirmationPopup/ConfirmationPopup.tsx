import React, { useEffect, useState } from "react";
import { mergeStyleSets, DefaultButton, FocusTrapZone, Layer, Overlay, Popup, PrimaryButton, IButtonStyles } from '@fluentui/react';
import { useBoolean } from '@fluentui/react-hooks';
import { Link } from "react-router-dom";
import { IConfirmationPopupProps } from "../models/model";

const popupStyles = mergeStyleSets({
  root: {
    background: 'rgba(0, 0, 0, 0.2)',
    bottom: '0',
    left: '0',
    position: 'fixed',
    right: '0',
    top: '0',
  },
  content: {
    background: 'white',
    left: '50%',
    maxWidth: '400px',
    padding: '10px 2em 1em',
    position: 'absolute',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
});

const buttonStyles:Partial<IButtonStyles> = {
  root:{
    marginTop: 15
  }

};

const ConfirmationPopup = ( { userId, popupMessage, okNavigationPath }:IConfirmationPopupProps  ) => {
  //const [isPopupVisible, { setTrue: showPopup, setFalse: hidePopup }] = useState<Boolean>(false);
  console.log("Rendering ConfirmationPopup");
  const [isPopupVisible, setIsPopupVisible] = useState(true);

  useEffect(()=>{
    setIsPopupVisible(true);
  },[userId]);
  return (
    <>
      {isPopupVisible && (
        <Layer>
          <Popup
            className={popupStyles.root}
            role="dialog"
            aria-modal="true"
            onDismiss={()=>setIsPopupVisible(false)}
          >
            {/* <Overlay onClick={hidePopup} /> */}
            <FocusTrapZone>
              <div role="document" className={popupStyles.content}>
                <p>
                  {popupMessage}
                </p>
                {okNavigationPath==="" && <PrimaryButton onClick={()=>setIsPopupVisible(false)} styles={buttonStyles} >OK</PrimaryButton>}
                {okNavigationPath!=="" && <Link to={okNavigationPath}><PrimaryButton styles={buttonStyles}>OK</PrimaryButton></Link>}
                
              </div>
            </FocusTrapZone>
          </Popup>
        </Layer>
      )}
    </>
  );
};


export default ConfirmationPopup;